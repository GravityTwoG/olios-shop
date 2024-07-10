import {
  IInviteCode,
  InviteCodeSchema,
} from '@olios-shop/admin/types/IInviteCode';
import { IEmployeeRole } from '@olios-shop/admin/types/IUser';
import {
  axiosInstance,
  ListDTO,
  PaginationQueryDTO,
  createListResponseSchema,
  createResponseSchema,
} from './lib';

const BASE_ROUTE = '/auth/invite-codes';

const InviteCodeResponseSchema = createResponseSchema(InviteCodeSchema);
const InviteCodesListSchema = createListResponseSchema(InviteCodeSchema);

export type CreateInviteCodeDTO = {
  firstName: string;
  lastName: string;
  patronymic: string;
  role: IEmployeeRole;
  birthDate: string;
};

export const createInviteCode = async (
  payload: CreateInviteCodeDTO,
): Promise<IInviteCode> => {
  const response = await axiosInstance.post(`${BASE_ROUTE}`, payload);

  return InviteCodeResponseSchema.parse(response.data).data;
};

export const fetchInviteCodes = async (
  query: PaginationQueryDTO & { searchQuery?: string },
): Promise<ListDTO<IInviteCode>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return InviteCodesListSchema.parse(response.data).data;
};

export const deleteInviteCode = async (query: { id: string }) => {
  await axiosInstance.delete(`${BASE_ROUTE}`, { params: query });
};
