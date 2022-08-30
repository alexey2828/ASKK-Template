import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { MainTitles } from 'const/titles-main';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { styles } from 'component-ui/common-block-styles.styles';
import { API_VISUAL_CONTROL_PLANT_SHORT_URL } from 'infrastructure/const/urls';
import { BuildingAutocompleteCard } from 'buildings/building-card/building-card';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { TITLES_ENGINE_CASE } from '../const/title';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_VISUAL_CONTROL_PLANT } from 'plant/visual-control-plant/title';
import { isVisualCoatingPlant, IVisualCoatingPlant } from 'plant/visual-control-plant/entity/visual-control-plant';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
type TStartMeasuringTheThicknessOfTzpDto = {
  visualControlPlantId: string;
};

export const StartMeasuringTheThicknessOfTzp = ({
  route,
}: INavigate<IEngineCase, TStartMeasuringTheThicknessOfTzpDto>): ReactElement => {
  const { entity } = route.params;
  const [visualControlPlant, setVisualControlPlant] = useState<IVisualCoatingPlant | null>(null);
  const [startMeasuringTheThicknessOfTzpDto, setStartMeasuringTheThicknessOfTzpDto] =
    useState<TStartMeasuringTheThicknessOfTzpDto | null>(null);
  const [errorScanVisualControlPlant, setErrorScanVisualControlPlant] = useState('');

  const onScanVisualControlPlant = (entity: IVisualCoatingPlant): void => {
    if (isVisualCoatingPlant(entity)) {
      setErrorScanVisualControlPlant('');
      setVisualControlPlant(entity);
    }
  };

  const resetErrorScanBuilding = () => {
    setErrorScanVisualControlPlant('');
  };

  const onSelectedBuilding = (visualControlPlant: IVisualCoatingPlant | null): void => {
    setErrorScanVisualControlPlant('');
    setVisualControlPlant(visualControlPlant);
  };

  useEffect(() => {
    if (visualControlPlant) {
      setStartMeasuringTheThicknessOfTzpDto({
        visualControlPlantId: String(visualControlPlant?.id),
      });
    } else {
      setStartMeasuringTheThicknessOfTzpDto(null);
    }
  }, [visualControlPlant]);

  if (!isEngineCase(entity)) {
    return <></>;
  }

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanVisualControlPlant}
        noValidEntity={errorScanVisualControlPlant}
        resetNoValidEntity={resetErrorScanBuilding}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.title}: <Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_VISUAL_CONTROL_PLANT.title}
            pathname={API_VISUAL_CONTROL_PLANT_SHORT_URL}
            value={visualControlPlant?.name}
            renderCard={BuildingAutocompleteCard}
            onSelectedEntities={onSelectedBuilding}
            isNoValid={!visualControlPlant}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={'factoryNumber'}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />

        <View style={CNstyles.defaultHeight} />
        {startMeasuringTheThicknessOfTzpDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={startMeasuringTheThicknessOfTzpDto}
              endpoint={endpointTransition.START_MEASURING_THE_THICKNESS_OF_TZP}
              entity={entity}
              title={ETransitionsUK.commandStartMeasuringTheThicknessOfTzp + '?'}
              titleBtn={MainTitles.SEND}
            />
          </>
        ) : (
          <TouchableHighlight onPress={(): void => {}}>
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
                {MainTitles.SEND}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
        <View style={CNstyles.defaultHeight} />
      </View>
    </View>
  );
};
