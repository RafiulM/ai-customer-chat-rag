import { ClerkExpressRequireAuth, ClerkExpressWithAuth, createClerkClient } from '@clerk/clerk-sdk-node';
import { Request, Response, NextFunction } from 'express';

// Extend the Request type to include auth information
declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string;
        sessionId: string;
        user?: {
          id: string;
          firstName?: string;
          lastName?: string;
          email?: string;
        };
      };
    }
  }
}

// Initialize Clerk client explicitly to ensure proper configuration
const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

// Use ClerkExpressWithAuth to attach auth info without throwing errors
const clerkWithAuth = ClerkExpressWithAuth({
  clerkClient,
  onError: (error) => {
    console.error('Clerk authentication error:', error);
  },
});

// Middleware to optionally authenticate and use admin user ID if not authenticated
export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Use ClerkExpressWithAuth first to attach auth info, but don't fail on error
  clerkWithAuth(req, res, (err?: any) => {
    // If there's an error or no auth, use admin user ID from env
    if (err || !req.auth || !req.auth.userId) {
      const adminUserId = process.env.ADMIN_USER_ID;
      if (adminUserId) {
        // Set auth info using admin user ID
        req.auth = {
          userId: adminUserId,
          sessionId: 'admin-session',
          user: {
            id: adminUserId,
          },
        };
      } else {
        console.warn('ADMIN_USER_ID not set in environment variables');
        // Still allow request but without userId - routes will handle this
      }
    }

    next();
  });
};

// Middleware to attach auth info (optional)
export const withAuth = ClerkExpressWithAuth({
  onError: (error) => {
    console.error('Clerk auth error:', error);
  },
});

// Custom middleware to extract user information
export const extractUser = (req: Request, res: Response, next: NextFunction) => {
  if (req.auth?.userId) {
    // User is authenticated, attach user info to request
    req.user = {
      id: req.auth.userId,
      email: req.auth.user?.email,
      firstName: req.auth.user?.firstName,
      lastName: req.auth.user?.lastName,
    };
  }
  next();
};