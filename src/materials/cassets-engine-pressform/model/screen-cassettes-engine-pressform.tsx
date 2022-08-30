import React from 'react';
import { ScrollView, View } from 'react-native';
import { INavigate } from '../../../hooks/use-navigate';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { EntityList } from '../../../infrastructure/entity-list';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { CassetteEnginePressformItem } from '../ui/cassette-engine-pressform-item';

export const ScreenCassettesEnginePressform: React.FC<INavigate<null>> = ({ route }) => {
  const entitySearchField = '&name=';

  const orderByBuilding: TGetParameter = {
    items: '10',
  };

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={entitySearchField}>
          {CassetteEnginePressformItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
