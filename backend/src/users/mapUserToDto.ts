import { User } from '@prisma/client';
import { UserDTO } from './dto/user.dto';

export function mapUserToDto(user: Omit<User, 'password'>): UserDTO {
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
