import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/entities/user.entity';    
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/auth-response.dto';
import { hashPassword, comparePassword } from '../auth/utils/password.util';  
import { generateToken } from '../auth/utils/jwt.util';                        

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) {}

    async signup(signupDto: SignupDto): Promise<LoginResponseDto> {
        const { firstName, middleName, lastName, email, password, mobile } = signupDto;

        const existingUser = await this.userRepository.findOne({ where: { email } });
        if (existingUser) {
            throw new ConflictException('Email already registered');   
        }

        const hashedPassword = await hashPassword(password);

        const user = this.userRepository.create({
            firstName,
            middleName,
            lastName,
            email,
            password: hashedPassword,
            mobile,
            isActive: true
        });

        const savedUser = await this.userRepository.save(user);
        const token = generateToken({ id: savedUser.id, email: savedUser.email });

        return {
            user: {
                id: savedUser.id,
                firstName: savedUser.firstName,
                middleName: savedUser.middleName,
                lastName: savedUser.lastName,
                email: savedUser.email,
                isActive: savedUser.isActive,
                mobile: savedUser.mobile,
                createdAt: savedUser.createdAt
            },
            accessToken: token,
            tokenType: 'Bearer',
            expiresIn: 86400
        };
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