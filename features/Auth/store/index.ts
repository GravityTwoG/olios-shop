import { createEvent, createStore, createEffect } from 'effector';
import { IUser, ILoginCredentials, IRegisterCredentials } from '../types';
import { AuthService } from '../api';

export const $isAuthorized = createStore(false);
export const setIsAuthorized = createEvent<boolean>('set isAuthorized');
$isAuthorized.on(setIsAuthorized, (_, payload) => payload);

export const $isAuthorizationChecked = createStore(false);
export const setIsAuthorizationChecked = createEvent<boolean>(
  'set isAuthorizedChecked',
);
$isAuthorizationChecked.on(setIsAuthorizationChecked, (_, payload) => payload);

const defaultUser: IUser = {
  id: '',
  email: '',
  firstName: '',
  lastName: '',
  patronymic: '',
  roles: [],
  customerProfileId: '',
  birthDate: '',
};

export const $user = createStore<IUser>(defaultUser);
export const setUser = createEvent<IUser>('set user');
$user.on(setUser, (_, user) => user);

export const $loginError = createStore('');
export const setLoginError = createEvent<string>('set loginError');
$loginError.on(setLoginError, (_, payload) => payload);

export const loginFx = createEffect<ILoginCredentials, IUser>(
  async (credentials): Promise<IUser> => {
    const user = await AuthService.login(credentials);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      roles: user.roles,
      customerProfileId: user.customerProfileId,
      birthDate: user.birthDate,
    };
  },
);

loginFx.done.watch(({ result }) => {
  setLoginError('');
  setUser(result);
  setIsAuthorized(true);
});

loginFx.fail.watch(({ error }) => {
  setLoginError(error.message);
});

export const $registerError = createStore('');
export const setRegisterError = createEvent<string>('set registerError');
$registerError.on(setRegisterError, (_, payload) => payload);

export const registerFx = createEffect<IRegisterCredentials, IUser>(
  async (credentials): Promise<IUser> => {
    const user = await AuthService.register(credentials);
    await AuthService.login(credentials);

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      roles: user.roles,
      customerProfileId: user.customerProfileId,
      birthDate: user.birthDate,
    };
  },
);

registerFx.done.watch(({ result }) => {
  setRegisterError('');
  setUser(result);
  setIsAuthorized(true);
});

registerFx.fail.watch(({ error }) => {
  setRegisterError(error.message);
});

export const checkAuthorizationFx = createEffect<void, IUser>(
  async (): Promise<IUser> => {
    const user = await AuthService.check();

    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      patronymic: user.patronymic,
      roles: user.roles,
      customerProfileId: user.customerProfileId,
      birthDate: user.birthDate,
    };
  },
);

checkAuthorizationFx.done.watch(({ result }) => {
  setUser(result);
  setIsAuthorized(true);
  setIsAuthorizationChecked(true);
});

checkAuthorizationFx.fail.watch(() => {
  setUser(defaultUser);
  setIsAuthorized(false);
  setIsAuthorizationChecked(true);
});

export const logoutFx = createEffect<void, void>(async (): Promise<void> => {
  await AuthService.logout();
});

logoutFx.done.watch(() => {
  setLoginError('');
  setUser(defaultUser);
  setIsAuthorized(false);
});

logoutFx.fail.watch(({ error }) => {
  console.log(error);
});
