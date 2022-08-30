import { TMember } from '../../infrastructure/api-platform';

export interface IShortNormativeDocument extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortNormativeDocument(obj: any): obj is IShortNormativeDocument {
  return obj && typeof obj.name === 'string';
}
