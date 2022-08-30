import { Image, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { styles } from '../screens-styles/home-screen.styles';
import { ChooseStructureMenuItems } from './model/choose-sructure-menu-item';
import { Warning } from '../../viewError/warning';
import { TITLES_BUILDING } from '../../../buildings/const/titles';
import { BuildingContext } from '../../../infrastructure/context/building-context';

export const HomeScreen = (): React.ReactElement => {
  const message = TITLES_BUILDING.chooseBuildingWarn;
  const { buildingName } = useContext(BuildingContext);
  return (
    <View style={styles.container}>
      <View style={styles.defaultFlex}>
        <Image style={styles.buildigIco} source={require('../../../../public/images/PlaceIco.png')} />
        <Text style={styles.defaultText}>{buildingName}</Text>
      </View>
      <View style={{ flex: 1 }}>
        {buildingName ? null : <Warning message={message} />}
        <View style={styles.contentContainer}>{ChooseStructureMenuItems(buildingName)}</View>
      </View>
    </View>
  );
};
