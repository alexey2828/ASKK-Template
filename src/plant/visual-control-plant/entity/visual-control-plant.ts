import { TMember } from '../../../infrastructure/api-platform';
import { IPremises, isPremises } from '../../premises/entity/premises';

export interface IVisualCoatingPlant extends TMember {
  name: string;
  premises: IPremises | null;
  available: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isVisualCoatingPlant(obj: any): obj is IVisualCoatingPlant {
  return (
    obj &&
    typeof obj.name === 'string' &&
    (!obj.premises || isPremises(obj.premises)) &&
    typeof obj.available === 'boolean'
  );
}
