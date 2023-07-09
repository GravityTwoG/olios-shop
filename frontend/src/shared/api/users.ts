import { UserSchema } from '@/src/types/IUser';
import { axiosInstance } from './lib/instance';
import { PaginationQueryDTO, createListOutputSchema } from './lib/types';

const BASE_ROUTE = '/users';

const UsersListSchema = createListOutputSchema(UserSchema);

export const fetchUsers = async (query: PaginationQueryDTO) => {
  const response = await axiosInstance.get(`${BASE_ROUTE}`, { params: query });

  return UsersListSchema.parse(response.data);
};

export const blockOrUnblockUser = async (query: {
  userId: string;
  isActive: boolean;
}) => {
  const response = await axiosInstance.post(
    `${BASE_ROUTE}/blockOrUnblock/${query.userId}`,
    {},
    {
      params: { isActive: query.isActive },
    },
  );

  return UserSchema.parse(response.data);
};
