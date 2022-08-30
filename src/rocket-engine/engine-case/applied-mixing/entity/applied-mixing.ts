import { TMember } from 'infrastructure/api-platform';
import { IShortMixingType, isShortMixingType } from 'mixing/entity/mixing-type/short-interface-mixing-type';
import {
  IPolymerizationProcess,
  isPolymerizationProcess,
} from 'mixing/entity/polymerization-process/polymerization-process';
import { IShortCoatingPlant, isShortCoatingPlant } from 'plant/coating-plant/entity/short-interface-coating-plant';
import {
  IShortTzpDetailSampleForTzpEngineCase,
  isShortTzpDetailSampleForTzpEngineCase,
} from 'tzp/tzp-plate/entity/short-interface-tzp-detail-sample-for-tzp-engine-case';

export interface IAppliedMixing extends TMember {
  createAt: string;
  mixing: IShortMixingType;
  whereApplied: IShortCoatingPlant | null;
  polymerizationProcess: IPolymerizationProcess | null;
  weight: number | null;
  tzpDetailSamples: IShortTzpDetailSampleForTzpEngineCase[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isAppliedMixing(obj: any): obj is IAppliedMixing {
  return (
    obj &&
    typeof obj.createAt === 'string' &&
    isShortMixingType(obj.mixing) &&
    (!obj.whereApplied || isShortCoatingPlant(obj.whereApplied)) &&
    (!obj.polymerizationProcess || isPolymerizationProcess(obj.polymerizationProcess)) &&
    (!obj.weight || typeof obj.weight === 'number') &&
    (!obj.tzpDetailSamples[0] || isShortTzpDetailSampleForTzpEngineCase(obj.tzpDetailSamples[0]))
  );
}
