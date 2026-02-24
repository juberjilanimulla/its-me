import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class DecryptMiddleware implements NestMiddleware {

  use(req: Request, res: Response, next: NextFunction) {
    try {
      // Check if encrypted payload exists
      if (req.body && req.body.payload) {

        const decryptedData = CryptoUtil.decrypt(req.body.payload);

        // Replace request body with decrypted data
        req.body = decryptedData;
      }

      next();

    } catch (error) {
      throw new BadRequestException('Invalid encrypted payload');
    }
  }
}