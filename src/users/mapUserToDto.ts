import { User } from '@prisma/client';
import { UserOutputDto } from './dto/user-output.dto';

export function mapUserToDto(user: User): UserOutputDto {
  return {
    id: user.id,
    email: user.email,
    birthDate: user.birthDate,
    firstName: user.firstName,
    isActive: user.isActive,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
    lastName: user.lastName,
    patronymic: user.patronymic,
  };
}
