import { TAutocompleteCard } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import React from 'react';
import { View, Text, Image } from 'react-native';
import { IPremises } from '../entity/premises';

export const PremisesAutocompleteCard: TAutocompleteCard<IPremises> = ({ entity: Premises }) => {
  if (!Premises) {
    return <></>;
  }

  return (
    <>
      <View key={Premises.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/PlaceIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {Premises?.name} </Text>
        </View>
      </View>
    </>
  );
};
