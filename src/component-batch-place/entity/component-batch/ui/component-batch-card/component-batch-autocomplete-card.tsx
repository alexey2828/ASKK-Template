import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IComponentBatch } from '../../component-batch';
import { TITLES_COMPONENT_BATCH } from '../../const/titles';

export const ComponentBatchAutocompleteCard: TAutocompleteCard<IComponentBatch> = ({ entity: componentBatch }) => {
  if (!componentBatch) {
    return <></>;
  }

  return (
    <>
      <View key={componentBatch.id}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ width: 20, height: 20 }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../../../../../public/images/componentsIco.png')}
              />
            </View>
            <View style={{ flexDirection: 'column' }} />
            <Text style={{ color: '#ffffff', marginLeft: 10 }}>{componentBatch.componentType.name} </Text>
            <View>
              <Text style={{ color: '#a1a1a1', marginLeft: 10 }}>
                {TITLES_COMPONENT_BATCH.batchNumber}: {componentBatch.batchNumber}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
