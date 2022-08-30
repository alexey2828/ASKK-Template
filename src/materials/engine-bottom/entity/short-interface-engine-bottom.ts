import { TMember } from '../../../infrastructure/api-platform';

export interface IShortEngineBottom extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortEngineBottom(obj: any): obj is IShortEngineBottom {
  return obj && typeof obj.name === 'string';
}
