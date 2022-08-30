import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { initIPContext, IpContext } from '../context/ip-context';

const NAME_STORE = 'ip';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const IpProvider = (props: any) => {
  const [ip, setIp] = useState(initIPContext.ip);

  const getIPFromStorage = (): void => {
    AsyncStorage.getItem(NAME_STORE).then(value => {
      if (value) {
        setIp(value);
      }
    });
  };

  useEffect(() => {
    getIPFromStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(NAME_STORE, ip);
  }, [ip]);

  return <IpContext.Provider value={{ ip, setIp }}>{props.children}</IpContext.Provider>;
};
