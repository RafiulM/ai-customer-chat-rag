# Backend Product Specification

## Overview

RESTful API server providing chat history and RAG store management with user authentication and PostgreSQL persistence.

## Technology Stack

- **Runtime**: Node.js with Express.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk (optional, falls back to admin user ID)
- **Validation**: express-validator
- **Language**: TypeScript

## Core Features

### 1. Authentication & Authorization

- Clerk-based authentication middleware
- Optional authentication: falls back to `ADMIN_USER_ID` environment variable if not authenticated
- User-scoped data isolation (chats and RAG stores are user-specific)
- CORS configuration supporting multiple frontend origins

### 2. Chat Management (`/api/chats`)

- **POST `/api/chats`**: Save chat messages
  - Validates message (1-10000 chars), response (1-10000 chars)
  - Optional RAG store name linking
  - Stores metadata (e.g., grounding chunks)
  - Returns created chat record
- **GET `/api/chats`**: Retrieve user's chat history
  - Optional filtering by RAG store name
  - Pagination support (limit, offset)
  - Ordered by creation timestamp
- **DELETE `/api/chats/:id`**: Delete a chat message
  - User-scoped deletion (only own chats)

### 3. RAG Store Management (`/api/ragstores`)

- **POST `/api/ragstores`**: Create a new RAG store
  - Validates name (alphanumeric, underscores, hyphens, slashes)
  - Validates display name (1-255 chars)
  - Prevents duplicate names per user
  - Stores metadata (e.g., file names, example questions)
- **GET `/api/ragstores`**: List user's RAG stores
  - Ordered by most recently updated
- **GET `/api/ragstores/:name`**: Get specific RAG store details
  - Includes chat count for the store
- **PUT `/api/ragstores/:name`**: Update RAG store
  - Updates display name, metadata, document count
  - Updates timestamp automatically
- **DELETE `/api/ragstores/:name`**: Delete RAG store
  - Cascades deletion to associated chats
  - User-scoped deletion

### 4. Database Schema

**chats table**:

- `id` (serial, primary key)
- `user_id` (text, required)
- `message` (text, required)
- `response` (text, required)
- `metadata` (jsonb, optional)
- `rag_store_name` (text, optional)
- `created_at` (timestamp)

**rag_stores table**:

- `id` (serial, primary key)
- `user_id` (text, required)
- `name` (text, required, unique per user)
- `display_name` (text, required)
- `document_count` (integer, default 0)
- `metadata` (jsonb, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

### 5. Error Handling

- Validation errors return 400 with details
- Authentication errors return 401
- Not found errors return 404
- Server errors return 500
- Graceful error messages for client consumption

### 6. Health & Info Endpoints

- **GET `/health`**: Server health check
- **GET `/api`**: API information and available endpoints

## Environment Variables

- `PORT`: Server port (default: 3001)
- `DATABASE_URL`: PostgreSQL connection string
- `CLERK_SECRET_KEY`: Clerk authentication secret (optional)
- `ADMIN_USER_ID`: Fallback user ID when authentication is not available
- `FRONTEND_URL`: Comma-separated allowed CORS origins
- `NODE_ENV`: Environment mode (development/production)

## API Response Format

All endpoints return JSON:

- Success: `{ message: string, [data]: object }`
- Error: `{ error: string, [details]: any }`
- List endpoints: `{ [items]: array, pagination?: object }`
