import { IPremises, isPremises } from 'plant/premises/entity/premises';
import { TMember } from '../../../../infrastructure/api-platform';

export interface ITzpVisualDefect extends TMember {
  typeOfCorrectiveWork: string;
  createAt: string;
  name: string;
  premises: IPremises | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpVisualDefect(obj: any): obj is ITzpVisualDefect {
  return (
    obj &&
    typeof obj.typeOfCorrectiveWork === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.createAt === 'string' &&
    (!obj.premises || isPremises(obj.premises))
  );
}
