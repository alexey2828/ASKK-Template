import React, { useEffect, useState } from 'react';
import { initServerTimeContext, ServerTimeContext } from '../context/server-time-context';
import { useHttp } from '../../hooks/useHttp';
import { API_SERVER_TIME_SHORT_URL } from '../const/urls';
import moment from 'moment';

interface IServerDateTimes {
  currentDate: {
    date: string;
    timezone_type: number;
    timezone: string;
  };
}

export const ServerTimeProvider: React.FC = ({ children }) => {
  const [deSyncTimeSeconds, setDeSyncTimeSeconds] = useState(initServerTimeContext.deSyncTimeSeconds);

  const { data, updateResponse, error } = useHttp<IServerDateTimes>();

  const syncServerTime = (): void => {
    if (!deSyncTimeSeconds) {
      updateResponse({ url: API_SERVER_TIME_SHORT_URL });
    }
  };

  useEffect(() => {
    syncServerTime();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && !error) {
      const currentDate = String(data.currentDate.date);
      const clientTime = moment();
      const serverTimeMoment = moment(currentDate);
      const deSyncTimeSeconds = serverTimeMoment.diff(clientTime) / 1000;
      setDeSyncTimeSeconds(deSyncTimeSeconds);
    }
  }, [data, error]);

  return (
    <ServerTimeContext.Provider value={{ deSyncTimeSeconds, syncServerTime }}>{children}</ServerTimeContext.Provider>
  );
};
