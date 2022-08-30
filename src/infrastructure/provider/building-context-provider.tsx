import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { BuildingContext, initBuildingContext } from '../context/building-context';

const NAME_STORE = 'building';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const BuildingProvider = (props: any) => {
  const [buildingName, setBuildingName] = useState(initBuildingContext.buildingName);

  const getBuildingFromStorage = (): void => {
    AsyncStorage.getItem(NAME_STORE).then(value => {
      if (value) {
        setBuildingName(value);
      }
    });
  };

  useEffect(() => {
    getBuildingFromStorage();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(NAME_STORE, buildingName);
  }, [buildingName]);

  return (
    <BuildingContext.Provider value={{ buildingName, setBuildingName }}>{props.children}</BuildingContext.Provider>
  );
};
