import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { INavigate } from '../../hooks/use-navigate';
import { BuildingContext } from '../../infrastructure/context/building-context';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { EntityList } from '../../infrastructure/entity-list';
import { MixingItem } from '../ui/mixings-items/mixing-item';
import { styles } from '../../component-ui/common-block-styles.styles';

const SEARCH_FIELD_NAME = 'name';

export const ScreenMixing: React.FC<INavigate<null>> = ({ route }) => {
  const { buildingName } = useContext(BuildingContext);

  const orderByBuilding: TGetParameter = {
    items: '10',
    'mixingProcess.mixer.locatedAt.name': buildingName,
  };

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={SEARCH_FIELD_NAME}>
          {MixingItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
