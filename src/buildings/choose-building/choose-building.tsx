import React, { ReactElement, useContext, useState } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';
import { BuildingAutocompleteCard } from '../building-card/building-card';
import { AsyncAutoComplete } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { API_BUILDINGS_SHORT_URL } from '../../infrastructure/const/urls';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { EFields } from '../const/fields';
import { IBuilding } from '../entity/building';
import { styles } from '../../component-ui/screen/screens-styles/home-screen.styles';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { ENavigationName } from '../../infrastructure/const/navigation-name';
import { TMember } from '../../infrastructure/api-platform';
import { TITLES_BUILDING } from '../const/titles';
import { TITLES_AUTOCOMPLETE } from '../../infrastructure/async-auto-complete/const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { BuildingContext } from '../../infrastructure/context/building-context';

const searchParameters: TGetParameter = {
  items: '100',
};

export const ChooseBuilding = (): ReactElement => {
  const [choisedBuildingName, setChoisedBuildingName] = useState<string | null>(null);

  const { buildingName, setBuildingName } = useContext(BuildingContext);
  const { goTo } = useNavigate<TMember>();

  const onSelecteBuilding = (building: IBuilding | null): void => {
    if (building) {
      setChoisedBuildingName(building.name);
    }
  };

  const changeBuilding = (): void => {
    if (choisedBuildingName) {
      setBuildingName(choisedBuildingName);
      const argsNavigateTo: TArgsNavigate<TMember, undefined> = {
        route: ENavigationName.HOME,
        params: {},
      };
      goTo(argsNavigateTo);
    }
  };

  return (
    <>
      <View style={{ height: 900, backgroundColor: '#191919' }}>
        <View style={{ margin: 10 }}>
          <View style={styles.defaultFlex}>
            <Image
              style={{ width: 60, height: 70, alignSelf: 'center' }}
              source={require('../../../public/images/PlaceIco.png')}
            />
            <Text style={{ color: 'white', fontSize: 25, margin: 20 }}>
              Будівля: {choisedBuildingName ? choisedBuildingName : <Text>{buildingName}</Text>}
            </Text>
          </View>
          <Text style={{ color: 'white', fontSize: 16, marginTop: 20 }}>{TITLES_BUILDING.chooseBuilding}</Text>

          <AsyncAutoComplete
            title={TITLES_BUILDING.chooseBuilding}
            pathname={API_BUILDINGS_SHORT_URL}
            renderCard={BuildingAutocompleteCard}
            searchParameters={searchParameters}
            onSelectedEntities={onSelecteBuilding}
            isNoValid={!choisedBuildingName && !buildingName}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
            value={buildingName}
          />
          <View style={{ marginTop: 20 }}>
            {choisedBuildingName && choisedBuildingName !== buildingName ? (
              <View style={{ marginTop: 10 }}>
                <TouchableHighlight onPress={changeBuilding}>
                  <View
                    style={{
                      backgroundColor: '#323232',
                      width: '100%',
                      borderRadius: 10,
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        color: 'white',
                        margin: 15,
                        fontSize: 16,
                      }}
                    >
                      {ETitles.CONFIRM_MOVE}
                    </Text>
                  </View>
                </TouchableHighlight>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};
