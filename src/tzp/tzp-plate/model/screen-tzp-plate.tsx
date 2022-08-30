import React from 'react';
import { ScrollView, View } from 'react-native';
import { INavigate } from '../../../hooks/use-navigate';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { EntityList } from '../../../infrastructure/entity-list';
import { TzpPlateItem } from '../ui/tzp-plate-items/tzp-plate-item';

const SEARCH_FIELD_NAME = 'name';

export const ScreenTzpPlate: React.FC<INavigate<null>> = ({ route }) => {
  const orderByBuilding: TGetParameter = {
    items: '10',
  };

  return (
    <View style={{ backgroundColor: '#121212', height: 800 }}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={SEARCH_FIELD_NAME}>
          {TzpPlateItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
