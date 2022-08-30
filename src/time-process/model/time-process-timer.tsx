import React, { useContext, useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import moment from 'moment';
import { ITimeProcess } from '../../mixing/entity/time-process';
import { getCurrentTimeProcess, getNameTimeProcess } from './get-current-time-process';
import { ServerTimeContext } from '../../infrastructure/context/server-time-context';

interface IStateProcessTimer {
  timeProcesses: ITimeProcess[];
}

export const TimeProcessTimer: React.FC<IStateProcessTimer> = ({ timeProcesses }) => {
  const timeProcess = getCurrentTimeProcess(timeProcesses);
  const timeFormat = Math.abs(timeProcess?.settingTime || 0) > 86400 ? 'DD:HH:mm:ss' : 'HH:mm:ss';
  const nameTimeProcess = getNameTimeProcess(timeProcess);

  const [signedNeg, setSignedNeg] = useState(false);
  const [stringTimer, setStringTimer] = useState<string>('');

  const { deSyncTimeSeconds, syncServerTime } = useContext(ServerTimeContext);

  useEffect(() => {
    let myInterval: NodeJS.Timeout;

    if (deSyncTimeSeconds) {
      if (timeProcess?.settingTime) {
        if (timeProcess.pauseStatus) {
          const deltaTimeMs = timeProcess.settingTime * 1000;
          const newStringTimer = buildStringTimer(deltaTimeMs);
          setStringTimer(newStringTimer);
          setSignedNeg(deltaTimeMs < 0);
        } else {
          myInterval = setInterval(() => {
            const deltaTimeMs = calcDeltaTimeMs(timeProcess, deSyncTimeSeconds);
            const newStringTimer = buildStringTimer(deltaTimeMs);
            setStringTimer(newStringTimer);

            setSignedNeg(deltaTimeMs < 0);
          }, 1000);
        }
      } else {
        syncServerTime();
      }
    }
    return (): void => {
      if (myInterval) {
        clearInterval(myInterval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!timeProcess || !timeProcess.settingTime || !timeProcess.lastStartTime || !deSyncTimeSeconds) {
    return null; // TODO не удалось вічислить время процесса
  }

  return (
    <>
      <View style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, paddingTop: 5 }}>
        <Image
          style={{ width: 25, height: 23, marginTop: -2 }}
          source={require('../../../public/images/loading.gif')}
        />
        {!timeProcess.pauseStatus ? (
          signedNeg ? (
            <Text
              style={{
                marginLeft: 5,
                color: '#fdd663',
                fontSize: 16,
              }}
            >
              {nameTimeProcess}: -{stringTimer}
            </Text>
          ) : (
            <Text
              style={{
                marginLeft: 5,
                color: '#67E761',
                fontSize: 16,
              }}
            >
              {nameTimeProcess}: {stringTimer}
            </Text>
          )
        ) : (
          <Text style={{ marginLeft: 5, color: '#a1a1a1', fontSize: 16 }}>
            {nameTimeProcess}:{' '}
            {moment.utc(Math.abs(timeProcess.settingTime * 1000)).format(signedNeg ? '-' : '' + timeFormat)}
          </Text>
        )}
      </View>
    </>
  );
};

interface ICalcDeltaTimeMs {
  (currentProcess: ITimeProcess, deSyncTimeSeconds: number): number;
}

const calcDeltaTimeMs: ICalcDeltaTimeMs = (timeProcess, deSyncTimeSeconds) => {
  const currentDateTime = moment();
  const lastStartTimeMoment = moment(timeProcess.lastStartTime);
  const finishDateTime = lastStartTimeMoment.add(Number(timeProcess.settingTime) - deSyncTimeSeconds, 'seconds');

  return finishDateTime.diff(currentDateTime);
};

interface IBuildStringTimer {
  (deltaTimeMs: number): string;
}

const buildStringTimer: IBuildStringTimer = deltaTimeMs => {
  const processTime = moment.duration(deltaTimeMs);

  const processTimeDays = Math.abs(processTime.get('day'));
  const processTimeHours = Math.abs(processTime.get('hours'));
  const processTimeMinutes = Math.abs(processTime.get('minutes'));
  const processTimeSeconds = Math.abs(processTime.get('seconds'));
  if (processTimeDays) {
    return [
      processTimeDays.toString().padStart(2, '0'),
      processTimeHours.toString().padStart(2, '0'),
      processTimeMinutes.toString().padStart(2, '0'),
      processTimeSeconds.toString().padStart(2, '0'),
    ].join(':');
  }
  return [
    processTimeHours.toString().padStart(2, '0'),
    processTimeMinutes.toString().padStart(2, '0'),
    processTimeSeconds.toString().padStart(2, '0'),
  ].join(':');
};
