import { IsDate, IsEmail, IsString, MinLength } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @MinLength(8)
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  passwordSalt: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthDate: Date;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  patronymic: string;
}
