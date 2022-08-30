import { TMember } from 'infrastructure/api-platform';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from 'laboratory/analysis/entity/laboratory-analysis';
import { INormativeDocument, isNormativeDocument } from 'normative-document/entity/normative-document';

export interface IMaterialState extends TMember {
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
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMaterialState(obj: any): obj is IMaterialState {
  return (
    obj &&
    (!obj.laboratoryAnalyzes[0] || isLaboratoryAnalysis(obj.laboratoryAnalyzes[0])) &&
    typeof obj.name === 'string' &&
    typeof obj.formularNumber === 'string' &&
    typeof obj.drawingNumber === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.state === 'string' &&
    (!obj.defect || typeof obj.defect === 'string') &&
    (!obj.timeSendToLaboratory || typeof obj.timeSendToLaboratory === 'string') &&
    (!obj.timeReturnToRmc || typeof obj.timeReturnToRmc === 'string') &&
    (!obj.normativeDocuments[0] || isNormativeDocument(obj.normativeDocuments[0]))
  );
}
