export interface IHydraGet<T> {
  'hydra:member': (T & TMember)[];
  'hydra:totalItems'?: number;
  'hydra:view'?: THydraView;
}

export type THydraView = {
  '@id': string;
  'hydra:first': string;
  'hydra:last': string;
  'hydra:next'?: string;
  'hydra:previous'?: string;
};

export interface IAuthenticationToken {
  refresh_token: string;
  token: string;
}

export type TMember = {
  id: string;
  '@type': string;
  '@id': string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMember(obj: any): obj is TMember {
  return obj && obj.id !== undefined && obj['@type'] !== undefined;
}
