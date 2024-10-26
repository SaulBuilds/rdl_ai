// src/modules/authorization/authFlowManager.ts

import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export interface AuthSession {
  token: string;
  expiration: Date;
}

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is not set.");
}

/**
 * Starts an authentication session by generating a JWT token
 * @param userId - The user's unique identifier
 * @param expiresInHours - Optional parameter to define session duration in hours (defaults to 2 hours)
 * @returns AuthSession object containing the token and expiration time
 */
export function startAuthSession(userId: string, expiresInHours: number = 2): AuthSession {
  const expiration = new Date();
  expiration.setHours(expiration.getHours() + expiresInHours);

  const token = jwt.sign({ userId, exp: Math.floor(expiration.getTime() / 1000) }, SECRET_KEY!);
  return { token, expiration };
}

/**
 * Verifies a JWT token and returns true if valid, false otherwise
 * @param token - The JWT token to verify
 * @returns boolean indicating if the token is valid
 */
export function verifyToken(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY!);
    return true;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      console.error("Token expired:", error.message);
    } else if (error instanceof JsonWebTokenError) {
      console.error("Invalid token:", error.message);
    } else {
      console.error("Token verification failed:", error);
    }
    return false;
  }
}
