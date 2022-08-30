import { TMember } from '../../../infrastructure/api-platform';
import {
  IShortNormativeDocument,
  isShortNormativeDocument,
} from '../../../normative-document/entity/short-normative-document';

export interface IComponentType extends TMember {
  name: string;
  normativeDocuments: IShortNormativeDocument[];
}

export function isComponentType(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  obj: any,
): obj is IComponentType {
  return (
    (obj && typeof obj.name === 'string') ||
    (obj.normativeDocuments[0] && isShortNormativeDocument(obj.normativeDocuments[0]))
  );
}
