import { TMember } from '../../../infrastructure/api-platform';

export interface IShortCurrentMixingOperation extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortCurrentMixingOperation(obj: any): obj is IShortCurrentMixingOperation {
  return obj && typeof obj.name === 'string';
}
