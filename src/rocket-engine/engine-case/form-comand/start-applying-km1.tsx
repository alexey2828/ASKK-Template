import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ScrollView, Text, View } from 'react-native';
import { MainTitles } from 'const/titles-main';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { IUser } from 'users/entity/user';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { EFields } from 'buildings/const/fields';
import { styles } from 'component-ui/common-block-styles.styles';
import { API_COAT_PLANT_SHORT_URL, API_MIXING_TYPE_SHORT_URL } from 'infrastructure/const/urls';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { TITLES_ENGINE_CASE } from '../const/title';
import { isEquipmentEnginePressform } from 'materials/equipment-engine-pressform/entity/equipment-engine-pressform';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IMixing, isMixing } from 'mixing';
import { TITLES_MIXING } from 'mixing/const/titles';
import { MixingAutocompleteCard } from 'mixing/ui/mixing-card/mixing-card';
import { ICoatingPlant } from 'plant/coating-plant/entity/coating-plant';
import { TITLES_COATING_PLANT } from 'plant/coating-plant/const/title';
import { CoatPlantAutocompleteCard } from 'plant/coating-plant/ui/coat-plant-card';
import { EState } from 'mixing/const/choose-ua-title-transition-state';
import { LockButton } from 'component-ui/buttons/lock-button';

const searchParamForMixingKc = {
  state: EState.READY_FOR_USE,
  'mixingProcess.mixer.locatedAt.name': '516-1',
  'mixingType.mixingTypeAbstract.workflowName': 'mixing_km1',
};

type TStartApplyingKm1Dto = {
  mixingKm1Id: string;
  masterUserId: string;
  apparatchikUserId: string;
  coatingPlantId: string;
};

export const StartApplyingKm1 = ({ route }: INavigate<IEngineCase, TStartApplyingKm1Dto>): ReactElement => {
  const { entity } = route.params;
  const [coatingPlant, setCoatingPlant] = useState<ICoatingPlant | null>(null);
  const [mixing, setMixing] = useState<IMixing | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [startApplyingKm1Dto, setStartApplyingKm1Dto] = useState<TStartApplyingKm1Dto | null>(null);
  const [errorScanCoatingPlant, setErrorScanCoatingPlant] = useState('');
  const [errorScanMixing, setErrorScanMixing] = useState('');

  const onScanMixing = (entity: IMixing): void => {
    if (isMixing(entity) && searchParamForMixingKc) {
      if (checkValidEntityFromScan(searchParamForMixingKc, entity)) {
        setErrorScanMixing('');
        setMixing(entity);
      }
    }
  };

  const resetErrorScanMixing = () => {
    setErrorScanMixing('');
  };

  const onSelectedMixing = (Mixing: IMixing | null): void => {
    setMixing(Mixing);
  };

  const onScanCoatingPlant = (entity: ICoatingPlant): void => {
    if (isEquipmentEnginePressform(entity)) {
      setErrorScanCoatingPlant('');
      setCoatingPlant(entity);
    }
  };

  const resetErrorScancoatingPlant = () => {
    setErrorScanCoatingPlant('');
  };

  const onSelectedCoatingPlant = (CoatingPlant: ICoatingPlant | null): void => {
    setCoatingPlant(CoatingPlant);
  };

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    if (coatingPlant && apparatchikUser && masterUser && mixing) {
      setStartApplyingKm1Dto({
        mixingKm1Id: mixing.id,
        masterUserId: masterUser.id,
        apparatchikUserId: apparatchikUser.id,
        coatingPlantId: coatingPlant.id,
      });
    } else {
      setStartApplyingKm1Dto(null);
    }
  }, [coatingPlant, apparatchikUser, masterUser, mixing]);

  if (!isEngineCase(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanCoatingPlant}
        noValidEntity={errorScanCoatingPlant}
        resetNoValidEntity={resetErrorScancoatingPlant}
      />
      <EntityFromScanner
        onScanEntity={onScanMixing}
        noValidEntity={errorScanMixing}
        resetNoValidEntity={resetErrorScanMixing}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.title}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_COATING_PLANT.title}
            pathname={API_COAT_PLANT_SHORT_URL}
            renderCard={CoatPlantAutocompleteCard}
            onSelectedEntities={onSelectedCoatingPlant}
            isNoValid={!coatingPlant}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_MIXING.choice}
            pathname={API_MIXING_TYPE_SHORT_URL}
            renderCard={MixingAutocompleteCard}
            searchParameters={searchParamForMixingKc}
            onSelectedEntities={onSelectedMixing}
            isNoValid={!mixing}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {startApplyingKm1Dto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={startApplyingKm1Dto}
              endpoint={endpointTransition.START_APPLYING_KM1}
              entity={entity}
              title={ETransitionsUK.commandStartApplyingKM1 + '?'}
            />
          </>
        ) : (
          <LockButton />
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
