import { TMember } from '../../../infrastructure/api-platform';
import {
  IShortNormativeDocument,
  isShortNormativeDocument,
} from '../../../normative-document/entity/short-normative-document';
import { ILaboratoryAnalysisInputs, isLaboratoryAnalysisInputs } from './laboratory-analysis-inputs';

export interface ILaboratoryAnalysis extends TMember {
  name: string;
  createdAt: string;
  isPositive: boolean | null;
  comment: string | null;
  validUntil: string | null;
  inputs: ILaboratoryAnalysisInputs[];
  analysisCompletionTime: string | null;
  normativeDocument: IShortNormativeDocument;
  materialTitle: string;
  materialLink: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isLaboratoryAnalysis(obj: any): obj is ILaboratoryAnalysis {
  return (
    obj &&
    typeof obj.name === 'string' &&
    typeof obj.createdAt === 'string' &&
    (!obj.isPositive || typeof obj.isPositive === 'boolean') &&
    (!obj.comment || typeof obj.comment === 'string') &&
    (!obj.validUntil || typeof obj.validUntil === 'string') &&
    isLaboratoryAnalysisInputs(obj.inputs[0]) &&
    (!obj.analysisCompletionTime || typeof obj.analysisCompletionTime === 'string') &&
    isShortNormativeDocument(obj.normativeDocument) &&
    typeof obj.materialTitle === 'string' &&
    typeof obj.materialLink === 'string'
  );
}
