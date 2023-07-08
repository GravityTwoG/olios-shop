import { User } from '@prisma/client';
import { UserOutputDto } from './dto/user-output.dto';

export function mapUserToDto(user: Omit<User, 'password'>): UserOutputDto {
  return {
    id: user.id,
    email: user.email,
    birthDate: user.birthDate,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    patronymic: user.patronymic || '',
    isActive: user.isActive,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
  };
}
