import { Controller,Post,Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { LoginResponseDto } from './dto/auth-response.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signup')
    async signup(@Body() signupDto: SignupDto): Promise<LoginResponseDto> {
        return this.authService.signup(signupDto);
    }

    @Post('login')
    async login(@Body() LoginDto: LoginDto): Promise<LoginResponseDto> {
        return this.authService.login(LoginDto);
    }
}
