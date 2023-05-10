import { z } from 'zod';

export enum IUserRole {
  CUSTOMER = 'CUSTOMER',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  role: z.nativeEnum(IUserRole),
  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string(),
  birthDate: z.string(),
});

export type IUser = z.infer<typeof UserSchema>;
