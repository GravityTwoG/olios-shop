import { UserDTO } from './dto/user.dto';
import { RequestUser } from 'src/auth/types';

export function mapUserToDto(user: RequestUser): UserDTO {
  return {
    id: user.id,
    email: user.email,
    birthDate: user.birthDate,
    firstName: user.firstName ?? '',
    lastName: user.lastName ?? '',
    patronymic: user.patronymic ?? '',
    isActive: user.isActive,
    isEmailVerified: user.isEmailVerified,
    role: user.role,
  };
}
