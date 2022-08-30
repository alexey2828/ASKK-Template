import { TAutocompleteCard } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { ICassetsEnginePressform } from 'materials/cassets-engine-pressform/entity/cassets-engine-pressform';
import React from 'react';
import { View, Text, Image } from 'react-native';

export const CassetteEnginePressformAutocompleteCard: TAutocompleteCard<ICassetsEnginePressform> = ({
  entity: CassetteEnginePressform,
}) => {
  if (!CassetteEnginePressform) {
    return <></>;
  }

  return (
    <>
      <View key={CassetteEnginePressform.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {CassetteEnginePressform?.name} </Text>
        </View>
      </View>
    </>
  );
};
