import { TMember } from '../../../infrastructure/api-platform';
import {
  IThermalChamber,
  isThermalChamber,
} from '../../../tzp/tzp-pressform/entity/thermal-chamber/entity/thermal-chamber';
import { ITimeProcess, isTimeProcess } from '../time-process';

export interface IPolymerizationProcess extends TMember, ITimeProcess {
  polymerizedIn: IThermalChamber;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPolymerizationProcess(obj: any): obj is IPolymerizationProcess {
  return Boolean(obj && isThermalChamber(obj.polymerizedIn) && isTimeProcess(obj));
}
