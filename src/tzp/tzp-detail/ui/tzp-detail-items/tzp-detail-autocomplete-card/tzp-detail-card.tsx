import React from 'react';
import { View, Text, Image } from 'react-native';
import { ITzpDetail } from '../../../entity/tzp-detail';
import { TAutocompleteCard } from '../../../../../infrastructure/async-auto-complete/asyncAutoComplete';

export const TZPDetailAutocompleteCard: TAutocompleteCard<ITzpDetail> = ({ entity: tzpDetail }) => {
  if (!tzpDetail) {
    return <></>;
  }

  return (
    <>
      <View key={tzpDetail.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../../../../../public/images/TZPDetailIco.png')}
            />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {tzpDetail?.detailNumber} </Text>
        </View>
      </View>
    </>
  );
};
