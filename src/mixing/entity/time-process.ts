import { TMember } from '../../infrastructure/api-platform';

export interface ITimeProcess extends TMember {
  startTime: string | null;
  lastStartTime: string | null;
  endTime: string | null;
  settingTime: number | null;
  pauseStatus: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isTimeProcess(obj: any): obj is ITimeProcess {
  return (
    obj &&
    (!obj.startTime || typeof obj.startTime === 'string') &&
    (!obj.endTime || typeof obj.endTime === 'string') &&
    (!obj.lastStartTime || typeof obj.lastStartTime === 'string') &&
    (!obj.settingTime || typeof obj.settingTime === 'number') &&
    typeof obj.pauseStatus === 'boolean'
  );
}
