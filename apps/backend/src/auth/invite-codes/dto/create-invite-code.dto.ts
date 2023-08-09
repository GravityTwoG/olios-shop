import { ApiProperty } from '@nestjs/swagger';
import { EmployeeRole } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsString, MinLength } from 'class-validator';

export class CreateInviteCodeDto {
  @ApiProperty()
  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  lastName: string;

  @ApiProperty()
  @IsString()
  @MinLength(0)
  patronymic: string;

  @ApiProperty()
  @Type(() => Date)
  @IsDate()
  birthDate: Date;
}
