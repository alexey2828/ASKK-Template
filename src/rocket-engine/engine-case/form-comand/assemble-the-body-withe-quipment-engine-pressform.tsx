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
import { API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL, API_MIDA_SENSOR_SHORT_URL } from 'infrastructure/const/urls';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from 'materials/equipment-engine-pressform/const/titles';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { TITLES_ENGINE_CASE } from '../const/title';
import {
  IEquipmentEnginePressform,
  isEquipmentEnginePressform,
} from 'materials/equipment-engine-pressform/entity/equipment-engine-pressform';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { EquipmentEnginePressformAutocompleteCard } from 'materials/equipment-engine-pressform/ui/equipment-engine-pressform-card';
import { IMidaSensor } from 'plant/mida-sensor/entity/mida-sensor';
import { TITLES_MIDA_SENSOR } from 'plant/mida-sensor/const/title';
import { MidaSensorAutocompleteCard } from 'plant/mida-sensor/ui/mida-sensor-card';
import { LockButton } from 'component-ui/buttons/lock-button';

const searchParamForSensorMida = {
  state: 'STATE_READY_FOR_USE',
};

const searchParamForEqipmentEnginePressform = {
  state: 'STATE_READY_FOR_USE',
};

type TAssembleTheBodyWitheQuipmentEnginePressformDto = {
  premisesOfTheBuildingId: string;
  masterUserId: string;
  apparatchikUserId: string;
  equipmentEnginePressform: string;
  midaSensorId?: string;
};

export const AssembleTheBodyWitheQuipmentEnginePressform = ({
  route,
}: INavigate<IEngineCase, TAssembleTheBodyWitheQuipmentEnginePressformDto>): ReactElement => {
  const { entity } = route.params;
  const [equipmentEnginePressform, setEquipmentEnginePressform] = useState<IEquipmentEnginePressform | null>(null);
  const [midaSensor, setMidaSensor] = useState<IMidaSensor | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [assembleTheBodyWitheQuipmentEnginePressformDto, setAssembleTheBodyWitheQuipmentEnginePressformDto] =
    useState<TAssembleTheBodyWitheQuipmentEnginePressformDto | null>(null);
  const [errorScanEquipmentEnginePressformId, setErrorScanEquipmentEnginePressformId] = useState('');
  const [errorScanMidaSensor, setErrorScanMidaSensor] = useState('');

  const onScanMidaSensor = (entity: IMidaSensor): void => {
    if (isEquipmentEnginePressform(entity) && searchParamForSensorMida) {
      if (checkValidEntityFromScan(searchParamForSensorMida, entity)) {
        setErrorScanMidaSensor('');
        setMidaSensor(entity);
      }
    }
  };

  const resetErrorScanMidaSensor = () => {
    setErrorScanMidaSensor('');
  };

  const onSelectedMidaSensor = (MidaSensor: IMidaSensor | null): void => {
    setMidaSensor(MidaSensor);
  };

  const onScanEquipmentEnginePressform = (entity: IEquipmentEnginePressform): void => {
    if (isEquipmentEnginePressform(entity) && searchParamForEqipmentEnginePressform) {
      if (checkValidEntityFromScan(searchParamForEqipmentEnginePressform, entity)) {
        setErrorScanEquipmentEnginePressformId('');
        setEquipmentEnginePressform(entity);
      }
    }
  };

  const resetErrorScanEquipmentEnginePressform = () => {
    setErrorScanEquipmentEnginePressformId('');
  };

  const onSelectedEquipmentEnginePressform = (equipmentEnginePressformId: IEquipmentEnginePressform | null): void => {
    setEquipmentEnginePressform(equipmentEnginePressformId);
  };

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    if (equipmentEnginePressform && apparatchikUser && masterUser && midaSensor) {
      setAssembleTheBodyWitheQuipmentEnginePressformDto({
        premisesOfTheBuildingId: equipmentEnginePressform.id,
        masterUserId: equipmentEnginePressform.id,
        apparatchikUserId: equipmentEnginePressform.id,
        equipmentEnginePressform: equipmentEnginePressform.id,
        midaSensorId: midaSensor.id,
      });
    } else {
      setAssembleTheBodyWitheQuipmentEnginePressformDto(null);
    }
  }, [equipmentEnginePressform, apparatchikUser, masterUser, midaSensor]);

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
        onScanEntity={onScanEquipmentEnginePressform}
        noValidEntity={errorScanEquipmentEnginePressformId}
        resetNoValidEntity={resetErrorScanEquipmentEnginePressform}
      />
      <EntityFromScanner
        onScanEntity={onScanMidaSensor}
        noValidEntity={errorScanMidaSensor}
        resetNoValidEntity={resetErrorScanMidaSensor}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.title}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}:
              <Text style={CNstyles.defaultPurple}> {equipmentEnginePressform?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}
            pathname={API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL}
            renderCard={EquipmentEnginePressformAutocompleteCard}
            searchParameters={searchParamForEqipmentEnginePressform}
            onSelectedEntities={onSelectedEquipmentEnginePressform}
            isNoValid={!equipmentEnginePressform}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_MIDA_SENSOR.choice}
            pathname={API_MIDA_SENSOR_SHORT_URL}
            renderCard={MidaSensorAutocompleteCard}
            searchParameters={searchParamForSensorMida}
            onSelectedEntities={onSelectedMidaSensor}
            isNoValid={!equipmentEnginePressform}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <View style={styles.border} />
          <View style={CNstyles.defaultHeight} />
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
        {assembleTheBodyWitheQuipmentEnginePressformDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={assembleTheBodyWitheQuipmentEnginePressformDto}
              endpoint={endpointTransition.ASSEMBLE_THE_BODY_WITHE_QUIPMENT_ENGINE_PRESSFORM}
              entity={entity}
              title={ETransitionsUK.commandAddCaseLeakTestResult + '?'}
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
