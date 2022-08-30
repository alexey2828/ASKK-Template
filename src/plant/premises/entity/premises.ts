import { IBuilding, isBuilding } from 'buildings/entity/building';
import { TMember } from '../../../infrastructure/api-platform';

export interface IPremises extends TMember {
  name: string;
  locatedAt: IBuilding;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPremises(obj: any): obj is IPremises {
  return obj && typeof obj.name === 'string' && isBuilding(obj.locatedAt);
}
