import { IBuilding, isBuilding } from '../../../buildings/entity/building';
import { TMember } from '../../../infrastructure/api-platform';

export interface IMixer extends TMember {
  name: string;
  available: boolean;
  locatedAt: IBuilding;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixer(obj: any): obj is IMixer {
  return obj && typeof obj.name === 'string' && typeof obj.available === 'boolean' && isBuilding(obj.locatedAt);
}
