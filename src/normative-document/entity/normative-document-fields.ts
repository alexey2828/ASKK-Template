import { TMember } from '../../infrastructure/api-platform';

export interface INormativeDocumentField extends TMember {
  name: string;
  norm: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isNormativeDocumentField(obj: any): obj is INormativeDocumentField {
  return obj && typeof obj.name === 'string' && typeof obj.norm === 'string';
}
