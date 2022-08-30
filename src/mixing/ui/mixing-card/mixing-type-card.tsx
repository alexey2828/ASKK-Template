import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IMixingType } from '../../entity/mixing-type/mixing-type';

export const MixingTypeAutocompleteCard: TAutocompleteCard<IMixingType> = ({ entity: Mixing }) => {
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
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {Mixing?.mixingTypeAbstract?.name} </Text>
        </View>
        <Text style={{ color: '#ffffff', marginLeft: 10 }}>
          {Mixing?.normativeDocuments.map(normativeDocument => {
            return (
              <>
                <Text style={{ color: '#a1a1a1', marginLeft: 10 }} key={normativeDocument.id}>
                  {' '}
                  {normativeDocument.name}
                </Text>
              </>
            );
          })}
        </Text>
      </View>
    </>
  );
};
