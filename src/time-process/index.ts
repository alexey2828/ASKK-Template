import { IMixer, isMixer } from '../mixing/entity/mixer/mixer';
import { isThermalChamber, IThermalChamber } from '../tzp/tzp-pressform/entity/thermal-chamber/entity/thermal-chamber';

export interface ITimeProcess {
  startTime: string | null;
  lastStartTime: string | null;
  settingTime: number | null;
  endTime: string | null;
  pauseStatus: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTimeProcess(obj: any): obj is ITimeProcess {
  return (
    obj.startTime !== undefined &&
    obj.lastStartTime !== undefined &&
    obj.settingTime !== undefined &&
    obj.endTime !== undefined &&
    obj.pauseStatus !== undefined
  );
}

export interface IMixingProcess extends ITimeProcess {
  mixer: IMixer | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMixingProcess(obj: any): obj is IMixingProcess {
  return isMixer(obj.mixer) && isTimeProcess(obj);
}

export interface IPolymerizationProcess extends ITimeProcess {
  polymerizedIn: IThermalChamber | null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPolymerizationProcess(obj: any): obj is IPolymerizationProcess {
  return isThermalChamber(obj.polymerizedIn) && isTimeProcess(obj);
}
