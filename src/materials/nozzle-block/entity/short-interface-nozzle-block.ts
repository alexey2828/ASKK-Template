import { TMember } from 'infrastructure/api-platform';

export interface IShortNozzleBlock extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortNozzleBlock(obj: any): obj is IShortNozzleBlock {
  return obj && typeof obj.name === 'string';
}
