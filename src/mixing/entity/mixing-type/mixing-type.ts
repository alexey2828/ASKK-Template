import { IComponentType, isComponentType } from '../../../component-batch-place/entity/component-type/component-type';
import { TMember } from '../../../infrastructure/api-platform';
import { INormativeDocument, isNormativeDocument } from '../../../normative-document/entity/normative-document';
import { IMixingTypeAbstract, isMixingTypeAbstracts } from '../mixing-type-abstract/mixing-type-abstract';

export interface IMixingType extends TMember {
  mixingTypeAbstract: IMixingTypeAbstract;
  componentsUsed: IComponentType[];
  normativeDocuments: INormativeDocument[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixingType(obj: any): obj is IMixingType {
  return (
    obj &&
    isMixingTypeAbstracts(obj.mixingTypeAbstract) &&
    (!obj.componentsUsed.length || isComponentType(obj.componentsUsed[0])) &&
    (obj?.normativeDocuments[0] || isNormativeDocument(obj.normativeDocuments[0]))
  );
}
