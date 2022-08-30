import { IBuilding, isBuilding } from '../../../../../buildings/entity/building';
import { TMember } from '../../../../../infrastructure/api-platform';

export interface IThermalChamber extends TMember {
  name: string;
  locatedAt: IBuilding;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isThermalChamber(obj: any): obj is IThermalChamber {
  return obj && typeof obj.name === 'string' && isBuilding(obj.locatedAt);
}
