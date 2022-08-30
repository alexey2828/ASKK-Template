import { TMember } from '../../../infrastructure/api-platform';
import { IMixer, isMixer } from '../mixer/mixer';
import { ITimeProcess, isTimeProcess } from '../time-process';

export interface IMixingProcess extends TMember, ITimeProcess {
  mixer: IMixer;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixingProcess(obj: any): obj is IMixingProcess {
  return obj && isMixer(obj.mixer) && isTimeProcess(obj);
}
