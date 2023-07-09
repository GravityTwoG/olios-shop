import { z } from 'zod';
import { IEmployeeRole } from './IUser';

export const InviteCodeSchema = z.object({
  id: z.string(),
  code: z.string(),
  role: z.nativeEnum(IEmployeeRole),

  firstName: z.string(),
  lastName: z.string(),
  patronymic: z.string(),
  birthDate: z.string(),

  isUsed: z.boolean(),
  usedBy: z.string().nullable(),

  createdAt: z.string(),
  updatedAt: z.string(),
});

export type IInviteCode = z.infer<typeof InviteCodeSchema>;
