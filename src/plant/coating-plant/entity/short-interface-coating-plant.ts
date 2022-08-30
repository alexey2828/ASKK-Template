import { TMember } from '../../../infrastructure/api-platform';

export interface IShortCoatingPlant extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortCoatingPlant(obj: any): obj is IShortCoatingPlant {
  return obj && typeof obj.name === 'string';
}
