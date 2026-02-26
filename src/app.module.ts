import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/user.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EncryptInterceptor } from './common/interceptors/encrypt.interceptor';
import { DecryptMiddleware } from './common/middleware/decrypt.middleware';
import { EncryptController } from './common/utils/encrypt.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
    
    
    AuthModule],
  controllers: [AppController,EncryptController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: EncryptInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(DecryptMiddleware)
    .forRoutes('*path');
  }
}
