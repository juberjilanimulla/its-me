import {IsString,IsEmail,MinLength,MaxLength,IsOptional, IsMobilePhone} from 'class-validator';

export class SignupDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsOptional()
  @IsString()
  middleName?: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(50)
  password: string;

  @IsMobilePhone()
  @IsOptional()
  @IsString()
  @MaxLength(20)
  mobile?: string;
}