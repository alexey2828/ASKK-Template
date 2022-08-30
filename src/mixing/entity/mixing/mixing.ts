import { TMember } from '../../../infrastructure/api-platform';
import { isEnabledTransition, TEnabledTransition } from '../../../infrastructure/change-state';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { IMixingComponents, isMixingComponents } from './mixing-components';
import { IMixingProcess, isMixingProcess } from '../mixing-process/mixing-process';
import { IMixingType, isMixingType } from '../mixing-type/mixing-type';
import { IPolymerizationProcess, isPolymerizationProcess } from '../polymerization-process/polymerization-process';

export interface IMixing extends TMember {
  name: string;
  state: string;
  mixingComponents: IMixingComponents[];
  mixingProcess: IMixingProcess;
  polymerizationProcess: IPolymerizationProcess | null;
  mixingType: IMixingType;
  createAt: string;
  comment: string | null;
  timeSendToLaboratory: string | null;
  endTime: string | null;
  laboratoryAnalyzes: ILaboratoryAnalysis[];
  enabledTransitions: TEnabledTransition[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixing(obj: any): obj is IMixing {
  return (
    obj &&
    typeof obj.name === 'string' &&
    typeof obj.state === 'string' &&
    (!obj.mixingComponents[0] || isMixingComponents(obj.mixingComponents[0])) &&
    isMixingProcess(obj.mixingProcess) &&
    (!obj.polymerizationProcess || isPolymerizationProcess(obj.polymerizationProcess)) &&
    isMixingType(obj.mixingType) &&
    typeof obj.createAt === 'string' &&
    (!obj.comment || typeof obj.comment === 'string') &&
    (!obj.timeSendToLaboratory || typeof obj.timeSendToLaboratory === 'string') &&
    (!obj.endTime || typeof obj.endTime === 'string') &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
