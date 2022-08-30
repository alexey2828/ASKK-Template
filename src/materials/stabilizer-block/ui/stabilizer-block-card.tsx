import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IStabilizerBlock } from '../entity/stabilizer-block';

export const StabilizerBlockAutocompleteCard: TAutocompleteCard<IStabilizerBlock> = ({ entity: StabilizerBlock }) => {
  if (!StabilizerBlock) {
    return <></>;
  }

  return (
    <>
      <View key={StabilizerBlock.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {StabilizerBlock?.name} </Text>
        </View>
      </View>
    </>
  );
};
