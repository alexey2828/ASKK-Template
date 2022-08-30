import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IMidaSensor } from '../entity/mida-sensor';

export const MidaSensorAutocompleteCard: TAutocompleteCard<IMidaSensor> = ({ entity: MidaSensor }) => {
  if (!MidaSensor) {
    return <></>;
  }

  return (
    <>
      <View key={MidaSensor.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {MidaSensor?.factoryNumber} </Text>
        </View>
      </View>
    </>
  );
};
