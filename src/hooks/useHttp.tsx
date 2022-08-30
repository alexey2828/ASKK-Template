/* eslint-disable @typescript-eslint/no-explicit-any,react-hooks/rules-of-hooks */
import { useCallback, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../infrastructure/context/auth-context';
import { IpContext } from '../infrastructure/context/ip-context';
import { IAuthenticationToken } from '../infrastructure/api-platform';
import { choiceUAResponseStatus, FAILED_TO_FETCH } from './const/http-response-status';

type TFetchParam = {
  url: RequestInfo;
  method?: RequestInit['method'];
  body?: RequestInit['body'];
  headers?: RequestInit['headers'];
};

type UseHttp<T> = {
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  updateResponse: (fetchParam: TFetchParam) => void;
  resetError: () => void;
};

type TRefreshAuthenticationDto = {
  user_id: string;
  refresh_token: string;
};

/**
 * User HTTP HOOK
 * type UseHttp<T> = {
 * data: T | null;
 * error: Error | null;
 * isLoading: boolean;
 * updateResponse: (fetchParam: TFetchParam) => void;
 * resetError: () => void;
 * }
 * 1. Default HTTP method: 'get'
 * 2. Before running we init next states:
 *    - isLoading: true
 * 3. The data state is never reset. It is set only through the updateResponse function.
 */

class FetchException extends Error {
  constructor(response: Response) {
    super(choiceUAResponseStatus[response.status] || response.statusText || FAILED_TO_FETCH);
  }
}

export function useHttp<T>(): UseHttp<T> {
  const [data, setData] = useState<UseHttp<T>['data']>(null);
  const [error, setError] = useState<UseHttp<T>['error']>(null);
  const [isLoading, setIsLoading] = useState<UseHttp<T>['isLoading']>(false);

  const { token, user, refreshToken, logout, login } = useContext(AuthContext);

  const { ip } = useContext(IpContext);

  const resetError: UseHttp<T>['resetError'] = useCallback(() => {
    setError(null);
  }, []);

  const updateResponse: UseHttp<T>['updateResponse'] = useCallback(
    fetchParam => {
      const { url, method = 'get', body, headers } = fetchParam;
      function addCurrentUser(body: any | null | undefined): any | null | undefined {
        if (typeof body === 'string' && user) {
          return JSON.stringify({
            ...JSON.parse(body),
            controllerUserId: user.id,
          });
        }
        return body;
      }

      async function refreshLogin(): Promise<void> {
        if (refreshToken && user && ip) {
          const dto: TRefreshAuthenticationDto = {
            user_id: user.id,
            refresh_token: refreshToken,
          };
          const response = await fetch(`${ip}/refresh_token`, {
            body: JSON.stringify(dto),
            headers: {
              'Content-Type': 'application/ld+json',
            },
            method: 'POST',
          });
          if (!response.ok) {
            logout();
            throw new FetchException(response);
          }
          if (!response.json) {
            await refreshLogin();
          } else {
            const data: IAuthenticationToken = await response.json();
            login(data.token, data.refresh_token, user.phoneNumber);
            useEffect(() => {
              http();
            }, []);
          }
        } else {
          logout();
        }
      }

      let newHeaders = { ...headers };
      const http = async (inToken = token): Promise<void> => {
        resetError();
        setIsLoading(true);
        try {
          if (!ip) {
            return;
          }

          if (body) {
            newHeaders = {
              ...newHeaders,
              'Content-Type': 'application/ld+json',
            };
          }
          if (inToken) {
            newHeaders = {
              ...newHeaders,
              Authorization: `Bearer ${inToken}`,
            };
          }
          console.log('useHttp - start: ', method, addCurrentUser(body));
          const response = await fetch(ip + url, {
            body: addCurrentUser(body),
            headers: newHeaders,
            method,
          });
          console.log('useHttp', response);
          if (response.status === 401 && refreshToken) {
            await refreshLogin();
          } else if (!response.ok) {
            throw new FetchException(response);
          }

          const fetchedData = await response.json();
          setIsLoading(false);
          setData(fetchedData);
        } catch (e) {
          if (e.message === 'Failed to fetch') {
            e.message = FAILED_TO_FETCH;
          }
          setError(e);
          setIsLoading(false);
        }
      };
      http();
    },
    [ip, login, logout, refreshToken, resetError, token, user],
  );

  return { data, error, isLoading, updateResponse, resetError };
}
