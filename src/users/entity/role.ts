import { TMember } from '../../infrastructure/api-platform';

export interface IRole extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isRole(obj: any): obj is IRole {
  return obj && typeof obj.name === 'string';
}
