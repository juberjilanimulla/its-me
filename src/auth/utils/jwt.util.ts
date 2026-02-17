import  * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';

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
    private readonly expiresIn: string = '24h'; // 24 hours in seconds
   /**
    * Generate JWT Token
    */
   generateToken(payload:Omit<JwtPayload, 'iat' | 'exp'>): string {
        return jwt.sign(payload, this.secret,
             { expiresIn: this.expiresIn,
                issuer:'its-me-app',
             });
    }
}