import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

export function mapUserEntityToDto(user: User): UserDto {
  return {
    id: user.id,
    email: user.email,
    password: user.password,
    birthDate: user.birthDate,
    customerProfileId: user.customerProfile as unknown as string,
    firstName: user.firstName,
    isActive: user.isActive,
    isEmailVerified: user.isEmailVerified,
    roles: user.roles,
    lastName: user.lastName,
    patronymic: user.patronymic,
  };
}
