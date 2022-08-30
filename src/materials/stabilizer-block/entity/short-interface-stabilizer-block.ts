import { TMember } from '../../../infrastructure/api-platform';

export interface IShortStabilizerBlock extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortStabilizerBlock(obj: any): obj is IShortStabilizerBlock {
  return obj && typeof obj.name === 'string';
}
