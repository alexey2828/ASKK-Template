import { TMember } from 'infrastructure/api-platform';
import { IShortMixing, isShortMixing } from 'mixing/entity/mixing/short-interface-mixing';
import {
  IPolymerizationProcess,
  isPolymerizationProcess,
} from 'mixing/entity/polymerization-process/polymerization-process';
import { IPremises, isPremises } from 'plant/premises/entity/premises';

export interface IGluingCuffsToEngineCase extends TMember {
  mixingKmk1: IShortMixing | null;
  premises: IPremises | null;
  polymerizationProcessKmk1: IPolymerizationProcess | null;
  createAt: string;
}

export function isGluingCuffsToEngineCase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IGluingCuffsToEngineCase {
  return (
    obj &&
    (!obj.mixingKmk1 || isShortMixing(obj.mixingKmk1)) &&
    (!obj.premises || isPremises(obj.premises)) &&
    (!obj.polymerizationProcessKmk1 || isPolymerizationProcess(obj.polymerizationProcessKmk1)) &&
    typeof obj.createAt === 'string'
  );
}
