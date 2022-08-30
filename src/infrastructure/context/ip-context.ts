import React from 'react';

export type TIPContext = {
  ip: string;
  setIp: (ip: string) => void;
};

export const initIPContext: TIPContext = {
  ip: 'http://67.207.75.200:81',
  setIp: () => {},
};

export const IpContext = React.createContext<TIPContext>(initIPContext);
