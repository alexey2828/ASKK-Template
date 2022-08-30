import { TMember } from '../../infrastructure/api-platform';

export interface IBuilding extends TMember {
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isBuilding(obj: any): obj is IBuilding {
  return obj && typeof obj.name === 'string';
}
