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
   - Frontend: Create a `.env.local` file in the `apps/frontend` directory with your Gemini API key:
     ```
     GEMINI_API_KEY=your_api_key_here
     ```
   - Backend: Create a `.env` file in the `apps/backend` directory (optional):
     ```
     PORT=3001
     NODE_ENV=development
     ```

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
- **AI**: Google Gemini API

