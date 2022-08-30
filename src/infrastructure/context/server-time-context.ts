import React from 'react';

export type TServerTimeContext = {
  deSyncTimeSeconds: number | null;
  syncServerTime: () => void;
};

export const initServerTimeContext: TServerTimeContext = {
  deSyncTimeSeconds: null,
  syncServerTime: () => {},
};

export const ServerTimeContext = React.createContext<TServerTimeContext>(initServerTimeContext);
