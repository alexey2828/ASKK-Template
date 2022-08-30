import { IPremises, isPremises } from 'plant/premises/entity/premises';
import { TMember } from '../../../../infrastructure/api-platform';

export interface IUzdPlant extends TMember {
  name: string;
  premises: IPremises | null;
  parameterTableName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isUzdPlant(obj: any): obj is IUzdPlant {
  return (
    obj &&
    typeof obj.name === 'string' &&
    (!obj.premises || isPremises(obj.premises)) &&
    typeof obj.parameterTableName === 'string'
  );
}
