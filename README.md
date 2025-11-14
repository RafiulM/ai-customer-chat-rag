# AI Customer Chat RAG

A Turbo monorepo powered by pnpm for building an AI-powered customer chat application with RAG (Retrieval-Augmented Generation) capabilities.

## Prerequisites

- Node.js >= 18
- pnpm >= 9.0.0

## Getting Started

1. **Install pnpm** (if not already installed):

   ```bash
   npm install -g pnpm
   ```

2. **Install dependencies**:

   ```bash
   pnpm install
   ```

3. **Set up environment variables**:

   **Backend** (`apps/backend/.env`):

   - Copy `.env.example` to `.env`:
     ```bash
     cp apps/backend/.env.example apps/backend/.env
     ```
   - Required variables:
     - `DATABASE_URL` - PostgreSQL connection string (e.g., `postgresql://postgres:postgres@localhost:5432/ai_chat_rag`)
     - `CLERK_SECRET_KEY` - Clerk secret key from [Clerk Dashboard](https://dashboard.clerk.com)
     - `ADMIN_USER_ID` - Fallback user ID for unauthenticated requests
   - Optional variables:
     - `PORT` - Server port (default: 3001)
     - `NODE_ENV` - Environment mode (default: development)
     - `FRONTEND_URL` - Comma-separated list of allowed frontend URLs for CORS

   **Frontend** (`apps/frontend/.env.local`):

   - Copy `.env.example` to `.env.local`:
     ```bash
     cp apps/frontend/.env.example apps/frontend/.env.local
     ```
   - Required variables:
     - `VITE_CLERK_PUBLISHABLE_KEY` - Clerk publishable key from [Clerk Dashboard](https://dashboard.clerk.com)
     - `GEMINI_API_KEY` - Google Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Optional variables:
     - `VITE_API_URL` - Backend API URL (default: http://localhost:3001)
     - `VITE_ALLOWED_EMAIL` - Restrict access to a specific email address (leave empty to allow all)
     - `VITE_DEFAULT_RAG_STORE_NAME` - Default RAG store name for unauthenticated users

4. **Run the development servers**:

   ```bash
   pnpm dev
   ```

   This will start:

   - Frontend app on `http://localhost:5177`
   - Backend API on `http://localhost:3001`

## Available Scripts

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps for production
- `pnpm preview` - Preview production builds
- `pnpm lint` - Run linting across all apps

## Project Structure

```
.
├── apps/
│   ├── frontend/          # React + Vite frontend application
│   └── backend/           # Express.js REST API server
├── package.json           # Root package.json with Turbo configuration
├── pnpm-workspace.yaml    # pnpm workspace configuration
├── turbo.json             # Turbo build system configuration
└── .npmrc                 # pnpm configuration
```

## Adding New Apps

To add a new app to the monorepo:

1. Create a new directory under `apps/` (e.g., `apps/api`)
2. Add a `package.json` with the app's dependencies
3. The workspace will automatically include it

## Tech Stack

- **Monorepo**: Turbo
- **Package Manager**: pnpm
- **Frontend**: React 19, Vite, TypeScript
- **Backend**: Express.js 4, TypeScript, nodemon
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Clerk
- **AI**: Google Gemini API

## Environment Variables

See `.env.example` files in each app directory for detailed environment variable documentation:

- `apps/backend/.env.example` - Backend environment variables
- `apps/frontend/.env.example` - Frontend environment variables
