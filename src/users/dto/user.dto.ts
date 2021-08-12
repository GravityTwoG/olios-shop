import { UserRole } from '../user-role.enum';

export class UserDto {
  id: string;

  customerProfileId: string;

  email: string;

  isEmailVerified: boolean;

  password: string;

  roles: UserRole[];

  firstName: string;

  lastName: string;

  patronymic: string;

  birthDate: Date;

  isActive: boolean;
}
