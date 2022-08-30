import { TMember } from 'infrastructure/api-platform';
import { isEnabledTransition, TEnabledTransition } from 'infrastructure/change-state';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from 'laboratory/analysis/entity/laboratory-analysis';
import { IShortCurrentMixingOperation } from 'mixing';
import { IShortMixing, isShortMixing } from 'mixing/entity/mixing/short-interface-mixing';
import { INormativeDocument, isNormativeDocument } from 'normative-document/entity/normative-document';
import { IPolymerizationProcess, isPolymerizationProcess } from 'time-process';

export interface IEquipmentEnginePressform extends TMember {
  currentAap: IShortCurrentMixingOperation | null;
  fixedAap: IShortMixing | null;
  polymerizationProcessAap: IPolymerizationProcess | null;
  polymerizationProcessFixedAap: IPolymerizationProcess | null;
  defectAap: string | null;
  laboratoryAnalyzes: ILaboratoryAnalysis[];
  name: string;
  formularNumber: string;
  drawingNumber: string;
  createdAt: string;
  state: string;
  defect: string | null;
  timeSendToLaboratory: string | null;
  timeReturnToRmc: string | null;
  normativeDocuments: INormativeDocument[];
  enabledTransitions: TEnabledTransition[];
}

export function isEquipmentEnginePressform(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IEquipmentEnginePressform {
  return (
    obj &&
    (!obj.currentAap || isShortMixing(obj.currentAap)) &&
    (!obj.fixedAap || isShortMixing(obj.fixedAap)) &&
    (!obj.polymerizationProcessAap || isPolymerizationProcess(obj.polymerizationProcessAap)) &&
    (!obj.polymerizationProcessFixedAap || isPolymerizationProcess(obj.polymerizationProcessFixedAap)) &&
    (!obj.defectAap || typeof obj.defectAap === 'string') &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    typeof obj.name === 'string' &&
    typeof obj.formularNumber === 'string' &&
    typeof obj.drawingNumber === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.state === 'string' &&
    (!obj.defect || typeof obj.defect === 'string') &&
    (!obj.timeSendToLaboratory || typeof obj.timeSendToLaboratory === 'string') &&
    (!obj.timeReturnToRmc || typeof obj.timeReturnToRmc === 'string') &&
    (!obj.normativeDocuments[0] || isNormativeDocument(obj.normativeDocuments[0])) &&
    (!obj.enabledTransitions[0] || isEnabledTransition(obj.enabledTransitions[0]))
  );
}
