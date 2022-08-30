import {
  IShortTzpDefect,
  isShortTzpDefect,
} from 'rocket-engine/engine-case/tzp-deffect/entity/short-interface-tzp-defect';
import { TMember } from '../../../../infrastructure/api-platform';
import {
  IShortAppliedMixingForEngineCase,
  isShortAppliedMixingForEngineCase,
} from '../../applied-mixing/entity/short-interface-applied-mixing-for-engine-case';

export interface IShortTzpEngineCase extends TMember {
  createAt: string;
  appliedMixings: IShortAppliedMixingForEngineCase[];
  tzpDefects: IShortTzpDefect[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortTzpEngineCase(obj: any): obj is IShortTzpEngineCase {
  return (
    obj &&
    typeof obj.createAt === 'string' &&
    (!obj.appliedMixings[0] || isShortAppliedMixingForEngineCase(obj.appliedMixings[0])) &&
    (!obj.tzpDefects[0] || isShortTzpDefect(obj.tzpDefects[0]))
  );
}
