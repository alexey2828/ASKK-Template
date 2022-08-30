import React from 'react';
import { ScrollView, View } from 'react-native';
import { INavigate } from '../../../hooks/use-navigate';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { EntityList } from '../../../infrastructure/entity-list/model/entity-list';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { EnginePressformItem } from '../ui/engine-pressform-item';

const SEARCH_FIELD_NAME = 'name';

export const ScreenEnginePressform: React.FC<INavigate<null>> = ({ route }) => {
  const orderByBuilding: TGetParameter = {
    items: '10',
  };

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={SEARCH_FIELD_NAME}>
          {EnginePressformItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
