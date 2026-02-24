import {Injectable,NestInterceptor,ExecutionContext,CallHandler,} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class EncryptInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    return next.handle().pipe(
      map((data) => {

        // Do not encrypt empty responses
        if (!data) {
          return data;
        }

        const encrypted = CryptoUtil.encrypt(data);

        return {
          payload: encrypted,
        };
      }),
    );
  }
}