import {IsString,IsEmail,MinLength,MaxLength,IsOptional} from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  middleName?: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  mobile?: string;
}