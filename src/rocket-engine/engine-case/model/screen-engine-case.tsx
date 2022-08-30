import { INavigate } from 'hooks/use-navigate';
import { BuildingContext } from 'infrastructure/context/building-context';
import { TGetParameter } from 'infrastructure/custom-query-string/custom-query-string';
import { EntityList } from 'infrastructure/entity-list';
import { styles } from 'component-ui/common-block-styles.styles';
import React, { useContext } from 'react';
import { ScrollView, View } from 'react-native';
import { EngineCaseItem } from '../ui/engine-case-items/engine-caseItem-item';

const SEARCH_FIELD_NAME = 'name';

export const ScreenEngineCase: React.FC<INavigate<null>> = ({ route }) => {
  const { buildingName } = useContext(BuildingContext);

  const orderByBuilding: TGetParameter = {
    items: '10',
    'mixingProcess.mixer.locatedAt.name': buildingName,
  };

  return (
    <View style={styles.ScreenContainer}>
      <ScrollView>
        <EntityList getParameters={orderByBuilding} route={route} searchFieldName={SEARCH_FIELD_NAME}>
          {EngineCaseItem}
        </EntityList>
      </ScrollView>
    </View>
  );
};
