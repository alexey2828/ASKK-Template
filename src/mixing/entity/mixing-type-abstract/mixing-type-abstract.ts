import { TMember } from '../../../infrastructure/api-platform';

export interface IMixingTypeAbstract extends TMember {
  name: string;
  workflowName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixingTypeAbstracts(obj: any): obj is IMixingTypeAbstract {
  return obj && typeof obj.name === 'string' && typeof obj.workflowName === 'string';
}
