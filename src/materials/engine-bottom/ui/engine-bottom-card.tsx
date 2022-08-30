import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IEngineBottom } from '../entity/engine-bottom';

export const EngineBottomAutocompleteCard: TAutocompleteCard<IEngineBottom> = ({ entity: EngineBottom }) => {
  if (!EngineBottom) {
    return <></>;
  }

  return (
    <>
      <View key={EngineBottom.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {EngineBottom?.name} </Text>
        </View>
      </View>
    </>
  );
};
