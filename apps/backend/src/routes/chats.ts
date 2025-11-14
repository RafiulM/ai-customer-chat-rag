import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { db } from '../db/connection.js';
import { chats, ragStores } from '../db/schema.js';
import { requireAuth } from '../middleware/auth.js';
import { eq, and } from 'drizzle-orm';

const router = Router();

// Validation middleware
const validateChatMessage = [
  body('message')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Message must be between 1 and 10000 characters'),
  body('response')
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Response must be between 1 and 10000 characters'),
  body('ragStoreName')
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage('RAG store name must be less than 255 characters'),
  body('metadata')
    .optional()
    .isObject()
    .withMessage('Metadata must be a valid object'),
];

// POST /api/chats - Save a chat message
router.post('/', requireAuth, validateChatMessage, async (req: Request, res: Response) => {
  try {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array(),
      });
    }

    const { message, response, ragStoreName, metadata } = req.body;
    const userId = req.auth?.userId || process.env.ADMIN_USER_ID;

    if (!userId) {
      return res.status(500).json({ error: 'Server configuration error: ADMIN_USER_ID not set' });
    }

    // Verify RAG store exists if provided
    if (ragStoreName) {
      const ragStore = await db.select()
        .from(ragStores)
        .where(and(
          eq(ragStores.name, ragStoreName),
          eq(ragStores.userId, userId)
        ))
        .limit(1);

      if (ragStore.length === 0) {
        return res.status(404).json({ error: 'RAG store not found' });
      }
    }

    // Insert chat message
    const [newChat] = await db.insert(chats).values({
      userId,
      message,
      response,
      ragStoreName: ragStoreName || null,
      metadata: metadata || null,
    }).returning();

    res.status(201).json({
      message: 'Chat saved successfully',
      chat: newChat,
    });
  } catch (error) {
    console.error('Error saving chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/chats - Get user's chat history
router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId || process.env.ADMIN_USER_ID;
    const { ragStoreName, limit = 50, offset = 0 } = req.query;

    if (!userId) {
      return res.status(500).json({ error: 'Server configuration error: ADMIN_USER_ID not set' });
    }

    // Build query
    let query = db.select()
      .from(chats)
      .where(eq(chats.userId, userId))
      .orderBy(chats.createdAt);

    // Filter by RAG store if provided
    if (ragStoreName) {
      query = query.where(and(
        eq(chats.userId, userId),
        eq(chats.ragStoreName, ragStoreName as string)
      ));
    }

    // Apply pagination
    const parsedLimit = parseInt(limit as string) || 50;
    const parsedOffset = parseInt(offset as string) || 0;
    query = query.limit(parsedLimit).offset(parsedOffset);

    const userChats = await query;

    res.json({
      chats: userChats,
      pagination: {
        limit: parsedLimit,
        offset: parsedOffset,
        total: userChats.length,
      },
    });
  } catch (error) {
    console.error('Error fetching chats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/chats/:id - Delete a chat message
router.delete('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const userId = req.auth?.userId || process.env.ADMIN_USER_ID;
    const chatId = parseInt(req.params.id);

    if (!userId) {
      return res.status(500).json({ error: 'Server configuration error: ADMIN_USER_ID not set' });
    }

    if (isNaN(chatId)) {
      return res.status(400).json({ error: 'Invalid chat ID' });
    }

    // Delete chat if it belongs to the user
    const deleteResult = await db.delete(chats)
      .where(and(
        eq(chats.id, chatId),
        eq(chats.userId, userId)
      ))
      .returning();

    if (deleteResult.length === 0) {
      return res.status(404).json({ error: 'Chat not found or access denied' });
    }

    res.json({ message: 'Chat deleted successfully' });
  } catch (error) {
    console.error('Error deleting chat:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;