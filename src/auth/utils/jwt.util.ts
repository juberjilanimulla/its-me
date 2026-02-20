import  * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { SignOptions } from 'jsonwebtoken';

export interface JwtPayload {
    sub:number;   //user id
    email:string;
    name:string;
    iat?:number;  // issued at
    exp?:number;  // expiration 
}

@Injectable()
export class JwtUtil {

    private readonly secret: string = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    private readonly expiresIn: number = 24 * 60 * 60; // 24 hours in seconds
   /**
    * Generate JWT Token
    */
   generateToken(payload:Omit<JwtPayload, 'iat' | 'exp'>): string {
        const options: SignOptions = {
            expiresIn: this.expiresIn,
            issuer: 'its-me-app',
        };
        return jwt.sign(payload, this.secret, options);
    }

    /**
     * Verify JWT Token
     */
    verifyToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, this.secret) as unknown as JwtPayload;
      return decoded;
    } catch (error:any) {
      console.error('Token verification failed:', error.message);
      return null;
    }
  }

  /**
   * Decode JWT Token without verification (use only for inspection)
   */
  decodeToken(token: string): JwtPayload | null {
    try {
      const decoded = jwt.decode(token) as unknown as JwtPayload;
      return decoded;
    } catch (error: any) {
      console.error('Token decode failed:', error.message);
      return null;
    }
  }

  /**
   * Get expiration time in seconds
   */
  getExpiresInSeconds(): number {
    // 24h = 86400 seconds
    return 24 * 60 * 60;
  }

  /**
   * Refresh token (optional - for implementing refresh tokens)
   */
  generateRefreshToken(payload: Omit<JwtPayload, 'iat' | 'exp'>): string {
    const options: SignOptions = {
      expiresIn: '7d', // Refresh token valid for 7 days
    };
    return jwt.sign(payload, this.secret, options);
    }
}
export const generateToken = (payload: { id: number; email: string }): string => {
    const secret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
    const options: SignOptions = {
        expiresIn: 86400,
        issuer: 'its-me-app',
    };
    return jwt.sign(payload, secret, options);
};