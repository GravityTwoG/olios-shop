export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  CONTENT_MANAGER = 'CONTENT_MANAGER',
}

export type IUser = {
  id: string;
  email: string;
  roles: UserRole[];
  firstName: string;
  lastName: string;
  customerProfileId: string;
  patronymic: string;
  birthDate: string;
};

export type ILoginCredentials = {
  email: string;
  password: string;
};

export type IRegisterCredentials = {
  email: string;
  password: string;
};
