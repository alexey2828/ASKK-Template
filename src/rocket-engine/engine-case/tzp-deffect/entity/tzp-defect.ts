import { TMember } from '../../../../infrastructure/api-platform';
import { IAppliedMixing, isAppliedMixing } from '../../applied-mixing/entity/applied-mixing';

export interface ITzpDefect extends TMember {
  typeDefect: string;
  createAt: string;
  dateRoughing: string;
  appliedMixing: IAppliedMixing | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpDefect(obj: any): obj is ITzpDefect {
  return (
    obj &&
    typeof obj.typeDefect === 'string' &&
    typeof obj.createAt === 'string' &&
    typeof obj.dateRoughing === 'string' &&
    (!obj.appliedMixing || !obj.appliedMixing[0] || isAppliedMixing(obj.appliedMixing[0]))
  );
}
