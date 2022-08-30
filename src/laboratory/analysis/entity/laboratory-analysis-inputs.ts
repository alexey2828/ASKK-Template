import { TMember } from '../../../infrastructure/api-platform';
import {
  INormativeDocumentField,
  isNormativeDocumentField,
} from '../../../normative-document/entity/normative-document-fields';

export interface ILaboratoryAnalysisInputs extends TMember {
  normativeDocumentField: INormativeDocumentField;
  value: string;
}

export function isLaboratoryAnalysisInputs(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is ILaboratoryAnalysisInputs {
  return obj && isNormativeDocumentField(obj.normativeDocumentField) && typeof obj.value === 'string';
}
