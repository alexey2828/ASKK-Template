import React from 'react';
import { View, Text, Image } from 'react-native';
import { IComponentBatchPlace, isComponentBatchPlace } from '../../entity/component-batch-place';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { ETitleComponentBatchPlace } from '../../../infrastructure/const/entity/component-batch-place-title';
import { TITLES_COMPONENT_BATCH } from '../../entity/component-batch/const/titles';

export const ComponentBatchPlaceAutocompleteCard: TAutocompleteCard<IComponentBatchPlace> = ({
  entity: componentBatchPlace,
}) => {
  if (!isComponentBatchPlace(componentBatchPlace)) {
    return <></>;
  }

  return (
    <>
      <View key={componentBatchPlace.id}>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <View style={{ width: 20, height: 20 }}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../../../public/images/componentsIco.png')}
              />
            </View>
            <Text style={{ color: '#ffffff', marginLeft: 5 }}>
              {' '}
              {componentBatchPlace.componentBatch.componentType.name}{' '}
            </Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View>
              <Text style={{ color: '#a1a1a1' }}>
                {' '}
                {TITLES_COMPONENT_BATCH.batchNumber}: {componentBatchPlace.componentBatch.batchNumber}{' '}
              </Text>
            </View>
            <View>
              <Text style={{ color: '#a1a1a1' }}>
                {' '}
                {ETitleComponentBatchPlace.createPartyPlace}: {componentBatchPlace.batchPlaceNumber}{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
