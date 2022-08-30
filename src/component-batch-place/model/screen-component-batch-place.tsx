import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { INavigate } from '../../hooks/use-navigate';
import { BuildingContext } from '../../infrastructure/context/building-context';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { EntityList } from '../../infrastructure/entity-list';
import { ComponentBatchPlaceItem } from '../ui/component-batch-place-items/component-batch-place-item';

const SEARCH_FIELD_NAME = 'componentBatch.componentType.name';

export const ScreenComponentBatchPlace: React.FC<INavigate<null>> = ({ route }) => {
  const { buildingName } = useContext(BuildingContext);

  const orderByBuilding: TGetParameter = {
    items: '10',
    'locatedAt.name': buildingName ? buildingName : '516-1',
  };

  return (
    <View style={{ backgroundColor: '#121212', height: 800 }}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={SEARCH_FIELD_NAME}>
          {ComponentBatchPlaceItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
