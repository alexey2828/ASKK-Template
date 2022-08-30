import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IEngineCase } from '../entity/engine-case';

export const EngineCaseAutocompleteCard: TAutocompleteCard<IEngineCase> = ({ entity: EngineCase }) => {
  if (!EngineCase) {
    return <></>;
  }

  return (
    <>
      <View key={EngineCase.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {EngineCase?.name} </Text>
        </View>
      </View>
    </>
  );
};
