import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MailModule } from '../mail/mail.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([User]), 
    MailModule  
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
