import React from 'react';
import { IUser } from 'users/entity/user';

export type TAuthContext = {
  token: string | null;
  refreshToken: string | null;
  user: IUser | null;
  isAuth: boolean;
  login: (token: string, refreshToken: string, username: string) => void;
  logout: () => void;
};

export const initAuthContext: TAuthContext = {
  token: null,
  refreshToken: null,
  user: null,
  isAuth: false,
  login: () => {},
  logout: () => {},
};

export const AuthContext = React.createContext<TAuthContext>(initAuthContext);
