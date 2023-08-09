import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDTO {
  @ApiProperty()
  @IsEmail()
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDate?: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  patronymic?: string;
}
