import { IBuilding, isBuilding } from '../../buildings/entity/building';
import { TMember } from '../../infrastructure/api-platform';
import { TEnabledTransition, isEnabledTransition } from '../../infrastructure/change-state';
import { isLaboratoryAnalysis } from '../../laboratory/analysis';
import { ILaboratoryAnalysis } from '../../laboratory/analysis/entity/laboratory-analysis';
import { IComponentBatch, isComponentBatch } from './component-batch/component-batch';

export interface IComponentBatchPlace extends TMember {
  componentBatch: IComponentBatch;
  batchPlaceNumber: string;
  locatedAt: IBuilding;
  state: string;
  endTime: string | null;
  timeSendToLaboratory: string | null;
  comment: string | null;
  laboratoryAnalyzes: ILaboratoryAnalysis[];
  enabledTransitions: TEnabledTransition[];
  createAt: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isComponentBatchPlace(obj: any): obj is IComponentBatchPlace {
  return (
    obj &&
    isComponentBatch(obj.componentBatch) &&
    typeof obj.batchPlaceNumber === 'string' &&
    isBuilding(obj.locatedAt) &&
    (!obj.comment || typeof obj.comment === 'string') &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    (!obj.endTime || typeof obj.endTime === 'string') &&
    (!obj.timeSendToLaboratory || typeof obj.timeSendToLaboratory === 'string') &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0])) &&
    typeof obj.createAt === 'string'
  );
}
