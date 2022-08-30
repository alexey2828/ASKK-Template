import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IBuilding } from '../entity/building';

export const BuildingAutocompleteCard: TAutocompleteCard<IBuilding> = ({ entity: Building }) => {
  if (!Building) {
    return <></>;
  }

  return (
    <>
      <View key={Building.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../public/images/PlaceIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {Building?.name} </Text>
        </View>
      </View>
    </>
  );
};
