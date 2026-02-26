import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class DecryptMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    try {
        console.log('middleware hit:', req.url);     
      console.log('body received:', req.body);  
      // Check if encrypted payload exists
      if (req.body && req.body.payload) {

        const decryptedData = CryptoUtil.decrypt(req.body.payload);

        // Replace request body with decrypted data
        req.body = decryptedData;
        console.log('decrypted body:', req.body); 
      }

      next();

    } catch (error) {
      console.error('Error in decrypt middleware:', error);
      throw new BadRequestException('Invalid encrypted payload');
    }
  }
}