import { TMember } from 'infrastructure/api-platform';

export interface IShortEnginePressform extends TMember {
  name: string;
  state: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortEnginePressform(obj: any): obj is IShortEnginePressform {
  return obj && typeof obj.name === 'string' && typeof obj.state === 'string';
}
