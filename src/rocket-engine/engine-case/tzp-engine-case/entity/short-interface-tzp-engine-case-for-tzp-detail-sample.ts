import { IShortEngineCase, isShortEngineCase } from 'rocket-engine/engine-case/entity/short-interface-engine-case';
import { TMember } from '../../../../infrastructure/api-platform';

export interface IShortInterfaceTzpDetailCaseForTzpDetailSample extends TMember {
  engineCase: IShortEngineCase;
}

export function isShortInterfaceTzpDetailCaseForTzpDetailSample(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IShortInterfaceTzpDetailCaseForTzpDetailSample {
  return obj && isShortEngineCase(obj.engineCase);
}
