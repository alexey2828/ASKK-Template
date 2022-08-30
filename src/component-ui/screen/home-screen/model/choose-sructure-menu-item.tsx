import React from 'react';
import { Menu } from '../../../menu/menu';
import { strMenuItemBuilding153Rmc } from '../structs/struct-menuItem-building-153-rmc';
import { strMenuItemBuilding508And3 } from '../structs/struct-menuItem-building-508-3';
import { strMenuItemBuilding508And6 } from '../structs/struct-menuItem-building-508-6';
import { strMenuItemBuilding509And9And10 } from '../structs/struct-menuItem-building-509-9-10';
import { strMenuItemBuilding516And1 } from '../structs/struct-menuItem-building-516-1';
import { strMenuItemBuilding605 } from '../structs/struct-menuItem-building-605';

export const ChooseStructureMenuItems = (building: string): JSX.Element => {
  if (building === '508-3') {
    return <Menu itemsList={strMenuItemBuilding508And3} />;
  }
  if (building === '508-6') {
    return <Menu itemsList={strMenuItemBuilding508And6} />;
  }
  if (building === '605') {
    return <Menu itemsList={strMenuItemBuilding605} />;
  }
  if (building === '516-1') {
    return <Menu itemsList={strMenuItemBuilding516And1} />;
  }
  if (building === '509-9-10') {
    return <Menu itemsList={strMenuItemBuilding509And9And10} />;
  }
  if (building === '153-РМЦ') {
    return <Menu itemsList={strMenuItemBuilding153Rmc} />;
  }
  return <></>;
};
