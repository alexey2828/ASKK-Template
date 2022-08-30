import { isMember } from 'infrastructure/api-platform';
import { isTimeProcess, ITimeProcess } from 'mixing/entity/time-process';
import React from 'react';
import { TimeProcessTimer } from 'time-process/model/time-process-timer';

type TTimeProcessViewStateEntity = {
  data: Record<string, unknown>;
};

export const TimeProcessViewStateEntity = ({ data }: TTimeProcessViewStateEntity): JSX.Element => {
  if (!data?.state) {
    return <></>;
  }

  let processes: ITimeProcess[] = [];
  processes = findTimeProcess(data, processes);

  return <TimeProcessTimer timeProcesses={processes} />;
};

const findTimeProcess = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any,
  processes: ITimeProcess[],
): ITimeProcess[] => {
  Object.keys(data).forEach(key => {
    const obj = data[key];
    if (isMember(obj)) {
      findTimeProcess(obj, processes);
    }
    if (isTimeProcess(obj)) {
      processes.push(obj);
    }
  });
  return processes;
};
