import { IsEmail, MinLength } from 'class-validator';

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;
}
