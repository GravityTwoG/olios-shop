import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsBoolean, IsDate, IsEmail, IsEnum, IsString } from 'class-validator';

export class UserDTO {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsBoolean()
  isEmailVerified: boolean;

  @ApiProperty()
  @IsEnum(UserRole)
  role: UserRole;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  patronymic: string;

  @ApiProperty()
  @IsDate()
  birthDate: Date | null;

  @ApiProperty()
  @IsBoolean()
  isActive: boolean;
}
