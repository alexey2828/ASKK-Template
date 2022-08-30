import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { ICoatingPlant, isCoatingPlant } from '../entity/coating-plant';

export const CoatPlantAutocompleteCard: TAutocompleteCard<ICoatingPlant> = ({ entity: CoatingPlant }) => {
  if (!isCoatingPlant) {
    return <></>;
  }

  return (
    <>
      <View key={CoatingPlant?.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {CoatingPlant?.name} </Text>
        </View>
      </View>
    </>
  );
};
