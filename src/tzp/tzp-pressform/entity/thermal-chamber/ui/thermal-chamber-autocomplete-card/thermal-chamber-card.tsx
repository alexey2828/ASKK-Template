import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IThermalChamber } from '../../entity/thermal-chamber';

export const ThermalChamberAutocompleteCard: TAutocompleteCard<IThermalChamber> = ({ entity: thermalChamber }) => {
  if (!thermalChamber) {
    return <></>;
  }

  return (
    <>
      <View key={thermalChamber.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require('../../../../../../../public/images/mixingIco.png')}
            />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}> {thermalChamber?.name} </Text>
        </View>
      </View>
    </>
  );
};
