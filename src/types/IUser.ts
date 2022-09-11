export enum IUserRole {
  CUSTOMER = 'CUSTOMER',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

export type IUser = {
  id: string;
  email: string;
  role: IUserRole;
  firstName: string;
  lastName: string;
  customerProfileId: string;
  patronymic: string;
  birthDate: string;
};
