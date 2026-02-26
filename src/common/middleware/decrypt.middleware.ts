import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class DecryptMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    try {
      if(process.env.ISENCRYPTED_PAYLOAD === 'true') {
      // Check if encrypted payload exists
      if (req.body && req.body.result) {

        const decryptedData = CryptoUtil.decrypt(req.body.result);

        // Replace request body with decrypted data
        req.body = decryptedData;
    
      }
    }

      next();

    } catch (error) {
      console.error('Error in decrypt middleware:', error);
      throw new BadRequestException('Invalid encrypted payload');
    }
  }
}