import { IPremises, isPremises } from 'plant/premises/entity/premises';
import { TMember } from '../../../../infrastructure/api-platform';

export interface IWeightEngineCase extends TMember {
  weight: number;
  stateEngineCase: string;
  premises: IPremises | null;
  createAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isWeightEngineCase(obj: any): obj is IWeightEngineCase {
  return (
    obj &&
    typeof obj.weight === 'number' &&
    typeof obj.stateEngineCase === 'string' &&
    (!obj.premises || isPremises(obj.premises)) &&
    typeof obj.createAt === 'string'
  );
}
