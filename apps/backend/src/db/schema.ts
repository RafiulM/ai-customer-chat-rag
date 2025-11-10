import { pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

// Chats table to store chat messages
export const chats = pgTable('chats', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  message: text('message').notNull(),
  response: text('response').notNull(),
  metadata: jsonb('metadata'), // Store additional data like grounding chunks
  ragStoreName: text('rag_store_name'), // Link to RAG store if applicable
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// RAG stores table to store user's RAG store metadata
export const ragStores = pgTable('rag_stores', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(), // Internal RAG store name
  displayName: text('display_name').notNull(), // User-visible name
  documentCount: serial('document_count').default(0), // Number of documents in the store
  metadata: jsonb('metadata'), // Store additional metadata
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Types for TypeScript
export type Chat = typeof chats.$inferSelect;
export type NewChat = typeof chats.$inferInsert;

export type RagStore = typeof ragStores.$inferSelect;
export type NewRagStore = typeof ragStores.$inferInsert;