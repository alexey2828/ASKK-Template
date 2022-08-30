import { TMember } from '../../../infrastructure/api-platform';
import { isEnabledTransition, TEnabledTransition } from '../../../infrastructure/change-state';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { IComponentType, isComponentType } from '../component-type/component-type';

export interface IComponentBatch extends TMember {
  componentType: IComponentType;
  batchNumber: string;
  createAt: string;
  state: string;
  comment: string | null;
  endTime: string | null;
  timeSendToLaboratory: string | null;
  laboratoryAnalyzes: ILaboratoryAnalysis[];
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isComponentBatch(obj: any): obj is IComponentBatch {
  return (
    obj &&
    isComponentType(obj.componentType) &&
    typeof obj.batchNumber === 'string' &&
    typeof obj.createAt === 'string' &&
    typeof obj.state === 'string' &&
    (!obj.comment || typeof obj.comment === 'string') &&
    (!obj.endTime || typeof obj.endTime === 'string') &&
    (!obj.timeSendToLaboratory || typeof obj.timeSendToLaboratory === 'string') &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
