import { TITLES_MIXING } from '../../mixing/const/titles';
import { isMixingProcess } from '../../mixing/entity/mixing-process/mixing-process';
import { isPolymerizationProcess } from '../../mixing/entity/polymerization-process/polymerization-process';
import { ITimeProcess } from '../../mixing/entity/time-process';
import { TITLES_TIME_PROCESS } from '../const/titles';

export const getNameTimeProcess = (process: ITimeProcess | null): string => {
  if (process) {
    if (isMixingProcess(process)) return TITLES_MIXING.title;
    if (isPolymerizationProcess(process)) return TITLES_TIME_PROCESS.polymerization;
  }
  return '';
};

interface IGetCurrentTimeProcess {
  (processes: ITimeProcess[]): ITimeProcess | null;
}

export const getCurrentTimeProcess: IGetCurrentTimeProcess = processes => {
  const process = processes.find(item => {
    return item.startTime !== null && item.endTime === null;
  });
  if (process) {
    return process;
  }

  return null;
};
