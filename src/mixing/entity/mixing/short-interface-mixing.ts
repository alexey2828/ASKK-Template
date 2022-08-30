import { TMember } from '../../../infrastructure/api-platform';

export interface IShortMixing extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortMixing(obj: any): obj is IShortMixing {
  return obj && typeof obj.name === 'string';
}
