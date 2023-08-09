import { IUser, UserSchema } from '@/src/types/IUser';
import {
  axiosInstance,
  ListDTO,
  PaginationQueryDTO,
  createListResponseSchema,
  createResponseSchema,
} from './lib';

const BASE_ROUTE = '/users';

export const UserResponseSchema = createResponseSchema(UserSchema);
export const UsersListSchema = createListResponseSchema(UserSchema);

export const fetchUsers = async (
  query: PaginationQueryDTO & { searchQuery?: string },
): Promise<ListDTO<IUser>> => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return UsersListSchema.parse(response.data).data;
};

export const blockOrUnblockUser = async (query: {
  userId: string;
  isActive: boolean;
}): Promise<IUser> => {
  const response = await axiosInstance.post(
    `${BASE_ROUTE}/blockOrUnblock/${query.userId}`,
    {},
    {
      params: { isActive: query.isActive },
    },
  );

  return UserResponseSchema.parse(response.data).data;
};
