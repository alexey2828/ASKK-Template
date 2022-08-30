import React, { useCallback, useEffect, useState } from 'react';
import { AuthContext, initAuthContext, TAuthContext } from '../context/auth-context';
import { useHttp } from '../../hooks/useHttp';
import { IHydraGet } from '../api-platform';
import { API_USERS_SHORT_URL } from '../const/urls';
import { IUser } from '../../users/entity/user';
import { getQueryString } from '../custom-query-string/custom-query-string';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NAME_STORE = 'authUser';

type TAuthUser = {
  username: string;
  token: string;
  refreshToken: string;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AuthProvider = (props: any): JSX.Element => {
  const [user, setUser] = useState(initAuthContext.user);
  const [token, setToken] = useState(initAuthContext.token);
  const [refreshToken, setRefreshToken] = useState(initAuthContext.refreshToken);
  const [username, setUsername] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState(initAuthContext.isAuth);

  const loadRec = useHttp<IHydraGet<IUser>>();

  const logout: TAuthContext['logout'] = useCallback(() => {
    setRefreshToken(null);
    setToken(null);
    setUser(null);
    setUsername(null);
    setIsAuth(false);
    AsyncStorage.setItem(NAME_STORE, JSON.stringify({}));
  }, []);

  const login: TAuthContext['login'] = useCallback((token, refreshToken, username) => {
    setRefreshToken(refreshToken);
    setToken(token);
    setUsername(username);
  }, []);

  const getUserFromStorage = (): void => {
    AsyncStorage.getItem(NAME_STORE).then(value => {
      if (value) {
        const user: TAuthUser = JSON.parse(value);
        setRefreshToken(user.refreshToken);
        setToken(user.token);
        setUsername(user.username);
      }
    });
  };

  useEffect(() => {
    getUserFromStorage();
  }, []);

  useEffect(() => {
    if (username && token && !user) {
      const newSearchParameters = {
        phoneNumber: username,
      };
      const url = getQueryString(API_USERS_SHORT_URL, newSearchParameters);
      loadRec.updateResponse({
        url,
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username, token]);

  useEffect(() => {
    if (!loadRec.error && loadRec.data) {
      const user = loadRec.data?.['hydra:member'] ? loadRec.data?.['hydra:member'][0] : null;
      if (user) {
        setUser(user);
      }
    }
  }, [loadRec.data, loadRec.error]);

  useEffect(() => {
    if (user && token && refreshToken && username) {
      AsyncStorage.setItem(
        NAME_STORE,
        JSON.stringify({
          username,
          token,
          refreshToken,
        }),
      );
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [refreshToken, token, user, username]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuth,
        refreshToken,
        logout,
        login,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
