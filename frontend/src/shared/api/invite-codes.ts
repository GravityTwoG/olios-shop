import { InviteCodeSchema } from '@/src/types/IInviteCode';
import { axiosInstance } from './lib/instance';
import { PaginationQueryDTO, createListOutputSchema } from './lib/types';
import { IEmployeeRole } from '@/src/types/IUser';

const BASE_ROUTE = '/auth/invite-codes';

const InviteCodesListSchema = createListOutputSchema(InviteCodeSchema);

export type CreateInviteCodeDTO = {
  firstName: string;
  lastName: string;
  patronymic: string;
  role: IEmployeeRole;
  birthDate: string;
};

export const createInviteCode = async (payload: CreateInviteCodeDTO) => {
  const response = await axiosInstance.post(`${BASE_ROUTE}`, payload);

  return InviteCodeSchema.parse(response.data);
};

export const fetchInviteCodes = async (
  query: PaginationQueryDTO & { searchQuery?: string },
) => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return InviteCodesListSchema.parse(response.data);
};

export const deleteInviteCode = async (query: { id: string }) => {
  await axiosInstance.delete(`${BASE_ROUTE}`, { params: query });
};
