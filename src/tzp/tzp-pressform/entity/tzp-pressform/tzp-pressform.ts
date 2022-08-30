import { TMember } from '../../../../infrastructure/api-platform';
import { TEnabledTransition, isEnabledTransition } from '../../../../infrastructure/change-state';
import { isLaboratoryAnalysis } from '../../../../laboratory/analysis';
import { ILaboratoryAnalysis } from '../../../../laboratory/analysis/entity/laboratory-analysis';
import { INormativeDocument, isNormativeDocument } from '../../../../normative-document/entity/normative-document';
import { isTypeTzpDetail, ITypeTzpDetail } from '../../../type-tzp-detail/entity/type-tzp-detail';
import { IShortTzpDetail, isShortTzpDetail } from '../../../tzp-detail/entity/short-interface-tzp-detail';
import {
  IShortCurrentMixingOperation,
  isShortCurrentMixingOperation,
} from '../../../../mixing/entity/mixing/short-current-mixing-operation';
import {
  IPolymerizationProcess,
  isPolymerizationProcess,
} from '../../../../mixing/entity/polymerization-process/polymerization-process';

export interface ITzpPressform extends TMember {
  state: string;
  formularNumber: string;
  pressformNumber: string;
  pressformDefect: string | null;
  aapDefect: string | null;
  numberUsedAap: number;
  polymerizationUsedKm1ClosedCap: number;
  currentTzpDetail: IShortTzpDetail | null;
  typeTzpDetail: ITypeTzpDetail;
  createAt: string;
  currentAap: IShortCurrentMixingOperation;
  currentKm1: IShortCurrentMixingOperation;
  timeSendToLaboratory: string | null;
  timeReturnToRmc: string | null;
  polymerizationProcess: IPolymerizationProcess | null;
  laboratoryAnalyzes: ILaboratoryAnalysis[];
  normativeDocuments: INormativeDocument;
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpPressform(obj: any): obj is ITzpPressform {
  return (
    obj &&
    typeof obj.state === 'string' &&
    typeof obj.formularNumber === 'string' &&
    typeof obj.pressformNumber === 'string' &&
    (!obj.pressformDefect || typeof obj.pressformDefect === 'string') &&
    (!obj.aapDefect || typeof obj.aapDefect === 'string') &&
    typeof obj.numberUsedAap === 'number' &&
    typeof obj.polymerizationUsedKm1ClosedCap === 'number' &&
    (!obj.currentTzpDetail || isShortTzpDetail(obj.currentTzpDetail)) &&
    isTypeTzpDetail(obj.typeTzpDetail) &&
    typeof obj.createAt === 'string' &&
    (!obj.currentAap || isShortCurrentMixingOperation(obj.currentAap)) &&
    (!obj.currentKm1 || isShortCurrentMixingOperation(obj.currentKm1)) &&
    (!obj.timeSendToLaboratory || typeof obj.timeSendToLaboratory === 'string') &&
    (!obj.timeReturnToRmc || typeof obj.timeReturnToRmc === 'string') &&
    (!obj.polymerizationProcess || isPolymerizationProcess(obj.polymerizationProcess)) &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    (obj.normativeDocuments[0] || isNormativeDocument(obj.normativeDocuments[0])) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
