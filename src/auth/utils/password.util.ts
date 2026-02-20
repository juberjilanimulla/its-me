import * as argon2 from 'argon2';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordUtil{
    async hashPassword(password:string):Promise<string>{
        try {
            return await argon2.hash(password);
        } catch (error:any) {
            throw new Error('Password hashing failed:'+ error.message);
        }
    }

    async verifyPassword(password:string, hash:string):Promise<boolean>{
        try {
            return await argon2.verify(hash,password);
        } catch (error:any) {
            console.error('Password verification failed',error.message);
            return false;
        }
    }
}

export const hashPassword = async (password:string):Promise<string>=>{
    return await argon2.hash(password);
}
export const comparePassword = async (password:string,hash:string):Promise<boolean>=>{
    return await argon2.verify(hash,password);
}