import { TMember } from '../../../infrastructure/api-platform';

export interface IShortEngineCase extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortEngineCase(obj: any): obj is IShortEngineCase {
  return obj && typeof obj.name === 'string';
}
