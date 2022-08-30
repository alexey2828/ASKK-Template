import { TMember } from '../../../infrastructure/api-platform';
import { TEnabledTransition, isEnabledTransition } from '../../../infrastructure/change-state';
import { IShortCurrentMixingOperation } from '../../../mixing';
import { isShortCurrentMixingOperation } from '../../../mixing/entity/mixing/short-current-mixing-operation';
import {
  IPolymerizationProcess,
  isPolymerizationProcess,
} from '../../../mixing/entity/polymerization-process/polymerization-process';
import { IQualityReport, isQualityReport } from '../../quality-report';
import {
  IShortTzpDetailSample,
  isShortTzpDetailSample,
} from '../../tzp-plate/entity/short-interface-tzp-detail-sample';
import {
  IShortTzpPressform,
  isShortTzpPressform,
} from '../../tzp-pressform/entity/short-interface-tzp-pressform/short-interface-tzp-pressform';

export interface ITzpDetail extends TMember {
  detailNumber: string;
  state: string;
  tzpPressform: IShortTzpPressform;
  mixingAap: IShortCurrentMixingOperation;
  mixingKm1: IShortCurrentMixingOperation;
  createdAt: string;
  usedTime: string | null;
  endProductionTime: string | null;
  defectDescription: string | null;
  qualityReport: IQualityReport | null;
  startRoughingTime: string | null;
  completedRoughingTime: string | null;
  tzpDetailSamples: IShortTzpDetailSample[] | null;
  polymerizationProcessAapAware: IPolymerizationProcess;
  polymerizationProcessKm1Aware: IPolymerizationProcess | null;
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpDetail(obj: any): obj is ITzpDetail {
  return (
    obj &&
    typeof obj.detailNumber === 'string' &&
    typeof obj.state === 'string' &&
    isShortTzpPressform(obj.tzpPressform) &&
    (!obj.currentAap || isShortCurrentMixingOperation(obj.currentAap)) &&
    (!obj.currentKm1 || isShortCurrentMixingOperation(obj.currentKm1)) &&
    typeof obj.createdAt === 'string' &&
    (!obj.usedTime || typeof obj.usedTime === 'string') &&
    (!obj.endProductionTime || typeof obj.endProductionTime === 'string') &&
    (!obj.defectDescription || typeof obj.defectDescription === 'string') &&
    (!obj.qualityReport || isQualityReport(obj.qualityReport)) &&
    (!obj.startRoughingTime || typeof obj.startRoughingTime === 'string') &&
    (!obj.completedRoughingTime || typeof obj.completedRoughingTime === 'string') &&
    (!obj.tzpDetailSample || !obj.tzpDetailSample[0] || isShortTzpDetailSample(obj.tzpDetailSamples[0])) &&
    isPolymerizationProcess(obj.polymerizationProcessAapAware) &&
    (!obj.polymerizationProcessKm1Aware || isPolymerizationProcess(obj.polymerizationProcessKm1Aware)) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
