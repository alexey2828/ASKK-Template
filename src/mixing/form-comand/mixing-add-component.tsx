import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, ScrollView } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { styles } from '../../component-ui/common-block-styles.styles';
import { routes } from './const/route';
import { EntityFromScanner } from '../../infrastructure/entity-from-scanner/entity-from-scanner';
import { API_COMPONENT_BATCH_PLACE_SHORT_URL } from '../../infrastructure/const/urls';
import { AsyncAutoComplete } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { Input } from '@ui-kitten/components';
import { ComponentBatchPlaceAutocompleteCard } from '../../component-batch-place/ui/component-batch-place-autocomplete-card/component-batch-place-autocomplete-card';
import { IComponentBatchPlace, isComponentBatchPlace } from '../../component-batch-place/entity/component-batch-place';
import { IMixing, isMixing } from '../entity/mixing/mixing';
import { EFields } from '../../component-batch-place/const/fields';
import { TITLES_MIXING, TITLES_MIXING_COMPONENTS } from '../const/titles';
import { TITLES_COMPONENT_BATCH_PLACE } from '../../component-batch-place/const/titles';
import { TITLES_AUTOCOMPLETE } from '../../infrastructure/async-auto-complete/const/titles';
import { EState, ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { ETitleComponentBatchPlace } from '../../infrastructure/const/entity/component-batch-place-title';
import { isPositiveStringNumber } from '../../infrastructure/utils/validate/validate-positive-string-number';
import { BuildingContext } from '../../infrastructure/context/building-context';
import { IUser } from 'users/entity/user';
import { SearchUserMaster } from '../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../users/model/search-user-apparatchik';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';

type TMixingAddComponentDto = {
  weight: number;
  componentBatchPlaceId: string;
  masterUserId: string;
  apparatchikUserId: string;
};

const lengthValidParam = {
  maxLength: 9,
  minLength: 1,
};

interface ISearchParametersComponentBatchPlace extends TGetParameter {
  'state[]': string[];
  'componentBatch.componentType.id[]': string[];
  'locatedAt.name': string;
}

export const MixingAddComponent = ({ route }: INavigate<IMixing, TMixingAddComponentDto>): ReactElement => {
  const { entity: mixing } = route.params;
  const [componentBatchPlace, setComponentBatchPlace] = useState<IComponentBatchPlace | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [weight, setWeight] = useState('');
  const [mixingAddComponentDto, setMixingAddComponentDto] = useState<TMixingAddComponentDto | null>(null);
  const [validWeight, setValidWeight] = useState(isPositiveStringNumber(weight, lengthValidParam));
  const [searchParametersComponentBatchPlace, setSearchParametersComponentBatchPlace] =
    useState<ISearchParametersComponentBatchPlace>();
  const [errorScanComponent, setErrorScanComponent] = useState('');

  const { buildingName } = useContext(BuildingContext);

  const onScanComponentBatchPlace = (entity: IComponentBatchPlace): void => {
    if (isComponentBatchPlace(entity) && searchParametersComponentBatchPlace) {
      if (checkValidEntityFromScan(searchParametersComponentBatchPlace, entity)) {
        setErrorScanComponent('');
        setComponentBatchPlace(entity);
      } else {
        setErrorScanComponent(
          `${TITLES_COMPONENT_BATCH_PLACE.choice} ${buildingName}, тип допустимих компонентів визначається у типі змішування`,
        );
      }
    }
  };

  const resetErrorScanComponent = () => {
    setErrorScanComponent('');
  };

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  const onSelectedComponentBatchPlace = (componentBatchPlace: IComponentBatchPlace | null): void => {
    setErrorScanComponent('');
    setComponentBatchPlace(componentBatchPlace);
  };

  useEffect(() => {
    const initSearchParametersComponentBatchPlace: ISearchParametersComponentBatchPlace = {
      'state[]': [EState.READY_FOR_USE],
      'componentBatch.componentType.id[]':
        mixing?.mixingType.componentsUsed.map(componentType => {
          return componentType.id;
        }) || [],
      'locatedAt.name': buildingName,
    };
    setSearchParametersComponentBatchPlace(initSearchParametersComponentBatchPlace);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildingName]);

  useEffect(() => {
    setValidWeight(isPositiveStringNumber(weight));
  }, [weight]);

  useEffect(() => {
    if (componentBatchPlace && validWeight.valid && apparatchikUser && masterUser) {
      setMixingAddComponentDto({
        weight: Number(weight),
        componentBatchPlaceId: String(componentBatchPlace?.id),
        masterUserId: String(masterUser?.id),
        apparatchikUserId: String(apparatchikUser?.id),
      });
    } else {
      setMixingAddComponentDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentBatchPlace, validWeight, apparatchikUser, masterUser]);

  if (!isMixing(mixing)) {
    return <></>;
  }

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanComponentBatchPlace}
        noValidEntity={errorScanComponent}
        resetNoValidEntity={resetErrorScanComponent}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_MIXING.title}: <Text style={CNstyles.defaultPurple}>{mixing?.name}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {`${TITLES_COMPONENT_BATCH_PLACE.createTitleApproveForUse}: `}
              {componentBatchPlace && (
                <Text style={CNstyles.defaultPurple}>
                  {`${componentBatchPlace.componentBatch.componentType.name}. ${ETitleComponentBatchPlace.party} № ${componentBatchPlace.componentBatch.batchNumber}. ${ETitleComponentBatchPlace.batchPlace} № ${componentBatchPlace.batchPlaceNumber}`}
                </Text>
              )}
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <ScrollView>
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setWeight(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_MIXING_COMPONENTS.weight}
          />
          {!validWeight.valid && <Text style={{ color: 'red' }}>{validWeight.message}</Text>}
          {searchParametersComponentBatchPlace && (
            <AsyncAutoComplete
              title={TITLES_COMPONENT_BATCH_PLACE.title}
              pathname={API_COMPONENT_BATCH_PLACE_SHORT_URL}
              value={componentBatchPlace?.componentBatch.componentType.name}
              renderCard={ComponentBatchPlaceAutocompleteCard}
              searchParameters={searchParametersComponentBatchPlace}
              onSelectedEntities={onSelectedComponentBatchPlace}
              isNoValid={!componentBatchPlace}
              helperText={TITLES_AUTOCOMPLETE.noDataInput}
              fieldName={EFields.COMPONENT_BATCH_TYPE_NAME}
            />
          )}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />

        <View style={CNstyles.defaultHeight} />
        {mixingAddComponentDto ? (
          <>
            <GoNext
              routeName={routes.CHANGE_STATE_MIXING}
              dtoTransitions={mixingAddComponentDto}
              endpoint={endpointTransition.ADD_COMPONENT}
              entity={mixing}
              title={ETransitionsUK.ADD_COMPONENT + '?'}
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
