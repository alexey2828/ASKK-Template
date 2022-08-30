import { IPremises, isPremises } from 'plant/premises/entity/premises';
import { TMember } from '../../../../infrastructure/api-platform';
import { ILeakTest, isLeakTest } from './leak-test-entity';

export interface IAssembly extends TMember {
  premises: IPremises;
  leakTests: ILeakTest[] | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAssembly(obj: any): obj is IAssembly {
  return obj && isPremises(obj.premises) && (!obj.leakTests || !obj.leakTests[0] || isLeakTest(obj.leakTests[0]));
}
