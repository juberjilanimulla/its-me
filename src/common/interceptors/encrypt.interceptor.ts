import {Injectable,NestInterceptor,ExecutionContext,CallHandler} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CryptoUtil } from '../utils/crypto.util';

@Injectable()
export class EncryptInterceptor implements NestInterceptor {

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

    // 👇 skip encryption for the encrypt utility route
    const request = context.switchToHttp().getRequest();
    if (request.url.includes('/encrypt')) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        if (!data) return data;
        const encrypted = CryptoUtil.encrypt(data);
        return { payload: encrypted };
      }),
    );
  }
}