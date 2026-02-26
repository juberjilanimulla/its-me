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
        const randomPassword = crypto.randomBytes(12).toString('hex');
       
        const hashedPassword = await hashPassword(randomPassword);

        await this.userRepository.query(
      `CALL sp_create_user(?, ?, ?, ?, ?, ?, @p_insert_id);`,
      [firstName, middleName, lastName, email, hashedPassword, mobile],
    );

        const result = await this.userRepository.query(
      `SELECT @p_insert_id as id;`,
    );
    const userId = result[0].id;

    const token = generateToken({id: userId, email});
   return SendResponseUtil.success(
        { token },
       'User registered successfully',
       HttpStatus.CREATED,
    );
    } catch (error:any) {
    return SendResponseUtil.error(
      error.message || 'Internal Server Error',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );  
    }
}      

    async login(loginDto: LoginDto){
        const { email, password } = loginDto;

       const result = await this.userRepository.query(
      `CALL sp_login_user(?);`,
      [email],
    );

   const user = result[0][0]; // first row

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Compare Password (bcrypt)
    const isPasswordValid = await comparePassword(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT Token
    const token = generateToken({
      id: user.id,
      email: user.email,
    });
     return SendResponseUtil.success({ token },'User logged in successfully',HttpStatus.OK);
   } catch (error: any) {
    return SendResponseUtil.error(
      error.message || 'Login',
      HttpStatus.INTERNAL_SERVER_ERROR,
      error,
    );
}
}