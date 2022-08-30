import React from 'react';

type TBuildingContext = {
  buildingName: string;
  getBuildingFromStorage?: () => void;
  setBuildingName: (ip: string) => void;
};

export const initBuildingContext: TBuildingContext = {
  buildingName: '',
  getBuildingFromStorage: () => {},
  setBuildingName: () => {},
};

export const BuildingContext = React.createContext<TBuildingContext>(initBuildingContext);
