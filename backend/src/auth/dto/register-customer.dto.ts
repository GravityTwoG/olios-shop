import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, MinLength } from 'class-validator';

export class RegisterCustomerDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @MinLength(8)
  password: string;
}
