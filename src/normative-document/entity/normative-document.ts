import { TMember } from '../../infrastructure/api-platform';
import { INormativeDocumentField, isNormativeDocumentField } from './normative-document-fields';

export interface INormativeDocument extends TMember {
  name: string;
  fields: INormativeDocumentField[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNormativeDocument(obj: any): obj is INormativeDocument {
  return obj && typeof obj.name === 'string' && isNormativeDocumentField(obj.fields[0]);
}
