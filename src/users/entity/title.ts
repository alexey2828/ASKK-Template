import { TMember } from '../../infrastructure/api-platform';

export interface ITitle extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTitle(obj: any): obj is ITitle {
  return obj && typeof obj.name === 'string';
}
