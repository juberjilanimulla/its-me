import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordUtil{
    /**
     * Hash a password using argon2
     */
    async hashPassword(password:string):Promise<string>{
        try {
            return await argon2.hash(password);
        } catch (error:any) {
            throw new Error('Password hashing failed:'+ error.message);
        }
    }

    /**
     * verify a password using argon2
     */
    async verifyPassword(password:string, hash:string):Promise<boolean>{
        try {
            return await argon2.verify(hash,password);
        } catch (error:any) {
            console.error('Password verification failed',error.message);
            return false;
        }
    }
}