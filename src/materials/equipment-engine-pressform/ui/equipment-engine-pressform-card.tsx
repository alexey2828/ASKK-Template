import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IEquipmentEnginePressform } from '../entity/equipment-engine-pressform';

export const EquipmentEnginePressformAutocompleteCard: TAutocompleteCard<IEquipmentEnginePressform> = ({
  entity: EquipmentEnginePressform,
}) => {
  if (!EquipmentEnginePressform) {
    return <></>;
  }

  return (
    <>
      <View key={EquipmentEnginePressform.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {EquipmentEnginePressform?.name} </Text>
        </View>
      </View>
    </>
  );
};
