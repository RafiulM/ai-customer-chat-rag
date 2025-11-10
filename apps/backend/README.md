# Backend API

Express.js REST API server with TypeScript and nodemon for development.

## Getting Started

### Development

Run the development server with hot reload:

```bash
pnpm dev
```

The server will start on `http://localhost:3001` (or the port specified in `.env`).

### Build

Build the TypeScript code:

```bash
pnpm build
```

### Production

Run the production build:

```bash
pnpm start
```

## Environment Variables

Create a `.env` file in the `apps/backend` directory:

```
PORT=3001
NODE_ENV=development
```

## Project Structure

```
backend/
├── src/
│   └── index.ts      # Main server entry point
├── dist/             # Compiled JavaScript (generated)
├── package.json
└── tsconfig.json
```

## API Routes

- `GET /health` - Health check endpoint
- `GET /api` - API welcome message
- `GET /api/users` - Example users endpoint

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js 4
- **Language**: TypeScript
- **Dev Tool**: nodemon + tsx for hot reload

