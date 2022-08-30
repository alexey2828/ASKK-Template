import React from 'react';
import { ScrollView, View } from 'react-native';
import { INavigate } from '../../../hooks/use-navigate';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { EntityList } from '../../../infrastructure/entity-list';
import { TzpPressformItem } from '../ui/tzp-pressform-items/tzp-pressform-item';
import { styles } from '../ui/tzp-pressform-items/tzp-pressform-item.styles';

const SEARCH_FIELD_NAME = 'pressformNumber';

export const ScreenTzpPressform: React.FC<INavigate<null>> = ({ route }) => {
  const orderByBuilding: TGetParameter = {
    items: '10',
  };

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={SEARCH_FIELD_NAME}>
          {TzpPressformItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
