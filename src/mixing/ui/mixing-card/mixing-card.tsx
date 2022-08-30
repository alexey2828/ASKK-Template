import React from 'react';
import { View, Text, Image } from 'react-native';
import { IMixing } from '../..';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';

export const MixingAutocompleteCard: TAutocompleteCard<IMixing> = ({ entity: Mixing }) => {
  if (!Mixing) {
    return <></>;
  }

  return (
    <>
      <View key={Mixing.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {Mixing?.name} </Text>
        </View>
      </View>
    </>
  );
};
