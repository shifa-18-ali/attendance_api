import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/* -----------------------------------------
   Extend Request type LOCALLY
------------------------------------------ */
interface AuthRequest extends Request {
  user?: {
    userId: string;
    role: "admin" | "employee";
  };
}

/* -----------------------------------------
   Admin-only Middleware
------------------------------------------ */
export const requireAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as {
      userId: string;
      role: "admin" | "employee";
    };

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    // ✅ No TS error
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
