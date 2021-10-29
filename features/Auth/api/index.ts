import { ILoginCredentials, IRegisterCredentials } from '../types';

export class AuthService {
  static async login(credentials: ILoginCredentials) {
    const res = await fetch('http://localhost:5000/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.message || 'Unauthorized');
    }

    return res.json();
  }

  static async register(credentials: IRegisterCredentials) {
    const res = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.message);
    }

    return res.json();
  }

  static async check() {
    const res = await fetch('http://localhost:5000/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.message || 'Unauthorized');
    }

    return res.json();
  }

  static async logout() {
    const res = await fetch('http://localhost:5000/auth/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok && res.status !== 401) {
      const body = await res.json();
      throw new Error(body.message || 'Unauthorized');
    }

    return res.json();
  }
}
