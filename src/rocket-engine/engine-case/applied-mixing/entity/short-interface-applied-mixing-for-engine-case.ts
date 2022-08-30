import { TMember } from 'infrastructure/api-platform';
import { IShortCurrentMixingOperation } from 'mixing';
import { isShortCurrentMixingOperation } from 'mixing/entity/mixing/short-current-mixing-operation';
import { isPolymerizationProcess } from 'mixing/entity/polymerization-process/polymerization-process';
import { IShortCoatingPlant, isShortCoatingPlant } from 'plant/coating-plant/entity/short-interface-coating-plant';
import { IPolymerizationProcess } from 'time-process';
import {
  IShortTzpDetailSampleForTzpEngineCase,
  isShortTzpDetailSampleForTzpEngineCase,
} from 'tzp/tzp-plate/entity/short-interface-tzp-detail-sample-for-tzp-engine-case';

export interface IShortAppliedMixingForEngineCase extends TMember {
  createAt: string;
  mixing: IShortCurrentMixingOperation;
  whereApplied: IShortCoatingPlant | null;
  polymerizationProcess: IPolymerizationProcess | null;
  weight: number | null;
  tzpDetailSamples: IShortTzpDetailSampleForTzpEngineCase[];
}

export function isShortAppliedMixingForEngineCase(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IShortAppliedMixingForEngineCase {
  return (
    obj &&
    typeof obj.createAt === 'string' &&
    isShortCurrentMixingOperation(obj.mixing) &&
    (!obj.whereApplied || isShortCoatingPlant(obj.whereApplied)) &&
    (!obj.polymerizationProcess || isPolymerizationProcess(obj.polymerizationProcess)) &&
    (!obj.weight || typeof obj.weight === 'number') &&
    (!obj.tzpDetailSamples[0] || isShortTzpDetailSampleForTzpEngineCase(obj.tzpDetailSamples[0]))
  );
}
