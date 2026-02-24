import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! NestJS is running on port ${process.env.PORT || 3000}`;
  }
}
