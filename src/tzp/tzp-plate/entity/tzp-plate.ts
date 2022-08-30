import { TMember } from '../../../infrastructure/api-platform';
import { TEnabledTransition, isEnabledTransition } from '../../../infrastructure/change-state';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { IShortTzpDetail, isShortTzpDetail } from '../../tzp-detail/entity/short-interface-tzp-detail';

export interface ITzpDetailSample extends TMember {
  number: string;
  state: string;
  endOfPolymerization: string | null;
  sendToLaboratory: string | null;
  createdAt: string;
  tzpDetails: IShortTzpDetail[];
  laboratoryAnalyzes: ILaboratoryAnalysis[];
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTzpDetailSample(obj: any): obj is ITzpDetailSample {
  return (
    obj &&
    typeof obj.number === 'string' &&
    typeof obj.state === 'string' &&
    (!obj.endOfPolymerization || typeof obj.endOfPolymerization === 'string') &&
    (!obj.sendToLaboratory || typeof obj.sendToLaboratory === 'string') &&
    typeof obj.createdAt === 'string' &&
    (obj.tzpDetails || isShortTzpDetail(obj.tzpDetails)) &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
