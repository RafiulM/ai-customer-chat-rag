import { ClerkExpressRequireAuth, ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
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

// Middleware to require authentication
export const requireAuth = ClerkExpressRequireAuth({
  // Add custom error handling
  onError: (error) => {
    console.error('Clerk auth error:', error);
  },
});

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