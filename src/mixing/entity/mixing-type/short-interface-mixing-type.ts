import { INormativeDocument, isNormativeDocument } from 'normative-document/entity/normative-document';
import { TMember } from '../../../infrastructure/api-platform';

export interface IShortMixingType extends TMember {
  normativeDocuments: INormativeDocument[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isShortMixingType(obj: any): obj is IShortMixingType {
  return obj && (!obj.normativeDocuments[0] || isNormativeDocument(obj.normativeDocuments[0]));
}
