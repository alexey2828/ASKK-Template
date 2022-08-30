import { TMember } from '../../../infrastructure/api-platform';
import { isEnabledTransition, TEnabledTransition } from '../../../infrastructure/change-state';

export interface IShortTzpDetail extends TMember {
  detailNumber: string;
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortTzpDetail(obj: any): obj is IShortTzpDetail {
  return (
    obj &&
    typeof obj.detailNumber === 'string' &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
