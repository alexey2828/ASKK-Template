import { TMember } from '../../../infrastructure/api-platform';

export interface ITypeTzpDetail extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTypeTzpDetail(obj: any): obj is ITypeTzpDetail {
  return obj && typeof obj.name === 'string';
}
