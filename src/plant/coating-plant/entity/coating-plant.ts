import { TMember } from '../../../infrastructure/api-platform';
import { IPremises, isPremises } from '../../premises/entity/premises';

export interface ICoatingPlant extends TMember {
  name: string;
  premises: IPremises;
  available: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isCoatingPlant(obj: any): obj is ICoatingPlant {
  return (
    obj &&
    typeof obj.name === 'string' &&
    (!obj.premises || isPremises(obj.premises)) &&
    typeof obj.available === 'boolean'
  );
}
