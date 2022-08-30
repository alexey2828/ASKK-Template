import { TMember } from '../../../infrastructure/api-platform';

export interface IShortMidaSensor extends TMember {
  factoryNumber: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortMidaSensor(obj: any): obj is IShortMidaSensor {
  return obj && typeof obj.factoryNumber === 'string';
}
