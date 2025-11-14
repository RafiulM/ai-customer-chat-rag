import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { testConnection } from "./db/connection.js";
import chatRoutes from "./routes/chats.js";
import ragStoreRoutes from "./routes/ragstores.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
  : ["http://localhost:5177", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In development, allow localhost origins
        if (
          process.env.NODE_ENV !== "production" &&
          origin.startsWith("http://localhost:")
        ) {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"));
        }
      }
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", message: "Server is running" });
});

// API routes
app.get("/api", (_req: Request, res: Response) => {
  res.json({
    message: "Welcome to the AI Customer Chat RAG API",
    endpoints: {
      chats: "/api/chats",
      ragstores: "/api/ragstores",
      health: "/health",
    },
  });
});

// Protected API routes
app.use("/api/chats", chatRoutes);
app.use("/api/ragstores", ragStoreRoutes);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handler
app.use(
  (err: any, _req: Request, res: Response, _next: express.NextFunction) => {
    // Handle authentication errors specifically
    if (
      err.message === "Unauthenticated" ||
      err.name === "UnauthenticatedError" ||
      err.status === 401
    ) {
      return res.status(401).json({
        error: "Unauthenticated",
        message: "Authentication required. Please sign in.",
      });
    }

    console.error("Error:", err.stack || err.message || err);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  }
);

// Start server with database connection test
const startServer = async () => {
  try {
    // Test database connection (will show warning if DB is not available)
    await testConnection();

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(
        `🔧 Clerk authentication: ${
          process.env.CLERK_SECRET_KEY ? "Configured" : "Not configured"
        }`
      );
      console.log(
        `🗄️  Database: ${
          process.env.DATABASE_URL ? "Configured" : "Not configured"
        }`
      );
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
