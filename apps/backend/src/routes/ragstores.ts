import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../db/connection.js';
import { ragStores, chats } from '../db/schema.js';
import { requireAuth } from '../middleware/auth.js';
import { eq, and, desc } from 'drizzle-orm';

const router = Router();

// Validation middleware
const validateRagStore = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Name must be between 1 and 255 characters')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Name can only contain letters, numbers, underscores, and hyphens'),
  body('displayName')
    .trim()
    .isLength({ min: 1, max: 255 })
    .withMessage('Display name must be between 1 and 255 characters'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be a valid object'),
];

// POST /api/ragstores - Create a new RAG store
router.post('/', requireAuth, validateRagStore, async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const { name, displayName, metadata } = req.body;
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Check if RAG store name already exists for this user
    const existingStore = await db.select()
      .from(ragStores)
      .where(and(
        eq(ragStores.name, name),
        eq(ragStores.userId, userId)
      ))
      .limit(1);

    if (existingStore.length > 0) {
      return res.status(409).json({ error: 'RAG store with this name already exists' });
    }

    // Create new RAG store
    const [newStore] = await db.insert(ragStores).values({
      userId,
      name,
      displayName,
      metadata: metadata || null,
      documentCount: 0,
    }).returning();

    res.status(201).json({
      message: 'RAG store created successfully',
      ragStore: newStore,
    });
  } catch (error) {
    console.error('Error creating RAG store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ragstores - Get user's RAG stores
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const userRagStores = await db.select()
      .from(ragStores)
      .where(eq(ragStores.userId, userId))
      .orderBy(desc(ragStores.updatedAt));

    res.json({
      ragStores: userRagStores,
    });
  } catch (error) {
    console.error('Error fetching RAG stores:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/ragstores/:name - Get a specific RAG store
router.get('/:name', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const storeName = req.params.name;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const ragStore = await db.select()
      .from(ragStores)
      .where(and(
        eq(ragStores.name, storeName),
        eq(ragStores.userId, userId)
      ))
      .limit(1);

    if (ragStore.length === 0) {
      return res.status(404).json({ error: 'RAG store not found' });
    }

    // Get chat count for this store
    const chatCount = await db.select()
      .from(chats)
      .where(and(
        eq(chats.userId, userId),
        eq(chats.ragStoreName, storeName)
      ))
      .then(result => result.length);

    res.json({
      ragStore: ragStore[0],
      chatCount,
    });
  } catch (error) {
    console.error('Error fetching RAG store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/ragstores/:name - Update a RAG store
router.put('/:name', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const storeName = req.params.name;
    const { displayName, metadata, documentCount } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Build update object with only provided fields
    const updateData: any = {
      updatedAt: new Date(),
    };

    if (displayName !== undefined) {
      updateData.displayName = displayName;
    }
    if (metadata !== undefined) {
      updateData.metadata = metadata;
    }
    if (documentCount !== undefined) {
      updateData.documentCount = documentCount;
    }

    const [updatedStore] = await db.update(ragStores)
      .set(updateData)
      .where(and(
        eq(ragStores.name, storeName),
        eq(ragStores.userId, userId)
      ))
      .returning();

    if (!updatedStore) {
      return res.status(404).json({ error: 'RAG store not found or access denied' });
    }

    res.json({
      message: 'RAG store updated successfully',
      ragStore: updatedStore,
    });
  } catch (error) {
    console.error('Error updating RAG store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/ragstores/:name - Delete a RAG store
router.delete('/:name', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId;
    const storeName = req.params.name;

    if (!userId) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    // Check if RAG store exists and belongs to user
    const existingStore = await db.select()
      .from(ragStores)
      .where(and(
        eq(ragStores.name, storeName),
        eq(ragStores.userId, userId)
      ))
      .limit(1);

    if (existingStore.length === 0) {
      return res.status(404).json({ error: 'RAG store not found or access denied' });
    }

    // Delete all chats associated with this RAG store
    await db.delete(chats)
      .where(and(
        eq(chats.userId, userId),
        eq(chats.ragStoreName, storeName)
      ));

    // Delete the RAG store
    await db.delete(ragStores)
      .where(and(
        eq(ragStores.name, storeName),
        eq(ragStores.userId, userId)
      ));

    res.json({ message: 'RAG store and associated chats deleted successfully' });
  } catch (error) {
    console.error('Error deleting RAG store:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;