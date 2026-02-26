import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';    
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/auth-response.dto';
import { hashPassword, comparePassword } from '../auth/utils/password.util';  
import { generateToken } from '../auth/utils/jwt.util';                        
import * as crypto from 'crypto';
import { SendResponseUtil } from '../common/utils/sendResponse.util';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signup(signupDto: SignupDto)
    {
        try {
        const { firstName, middleName, lastName, email, mobile } = signupDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
      return SendResponseUtil.error(
        'Email already registered',
        HttpStatus.CONFLICT,
      );
    }
        const randomPassword = crypto.randomBytes(6).toString('hex');
        const hashedPassword = await hashPassword(randomPassword);

        const user = this.userRepository.create({
            firstName,
            middleName,
            lastName,
            email,
            mobile,
            isActive: true
        });

        const savedUser = await this.userRepository.save(user);
        const token = generateToken({ id: savedUser.id, email: savedUser.email });

   return SendResponseUtil.success({
      message: 'User registered successfully',
      status: HttpStatus.CREATED,
    });
    } catch (error:any) {
    return SendResponseUtil.error(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );
       
    }
}      

    async login(loginDto: LoginDto): Promise<LoginResponseDto> {
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = generateToken({ id: user.id, email: user.email });

        return {
            user: {
                id: user.id,
                firstName: user.firstName,
                middleName: user.middleName,
                lastName: user.lastName,
                email: user.email,
                isActive: user.isActive,
                mobile: user.mobile,
                createdAt: user.createdAt
            },
            accessToken: token,
            tokenType: 'Bearer',
            expiresIn: 86400
        };
    }
}
