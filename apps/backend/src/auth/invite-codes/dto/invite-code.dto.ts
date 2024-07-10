import { EmployeeRole } from '@prisma/client';
import { IsBoolean, IsDate, IsEnum, IsString } from 'class-validator';
import { IsNullable } from 'src/lib/validators/IsNullable';

export class InviteCodeDTO {
  @IsString()
  id: string;

  @IsString()
  code: string;

  @IsEnum(EmployeeRole)
  role: EmployeeRole;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  patronymic: string;

  @IsDate()
  birthDate: Date;

  @IsBoolean()
  isUsed: boolean;

  @IsString()
  @IsNullable()
  usedBy: string | null;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
