import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { isThermalChamber, IThermalChamber } from 'tzp/tzp-pressform/entity/thermal-chamber/entity/thermal-chamber';
import { IUser } from 'users/entity/user';
import { BuildingContext } from 'infrastructure/context/building-context';
import { ETypeTimePickerSecond, TimePickerSeconds } from 'infrastructure/date-picker-m-h/time-picker-seconds';
import { TGetParameter } from 'infrastructure/custom-query-string/custom-query-string';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_ENGINE_CASE } from '../const/title';
import { TITLE_THERMAL_CHAMBERS } from 'tzp/tzp-pressform/entity/thermal-chamber/const/titles';
import { API_THERMINAL_CHAMBERS_SHORT_URL } from 'infrastructure/const/urls';
import { ThermalChamberAutocompleteCard } from 'tzp/tzp-pressform/entity/thermal-chamber/ui/thermal-chamber-autocomplete-card/thermal-chamber-card';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { EFields } from 'buildings/const/fields';
import { styles } from 'component-ui/common-block-styles.styles';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { LockButton } from 'component-ui/buttons/lock-button';

type TPutIntoCuringKmk1Dto = {
  thermalChamberId: string;
  settingTime: number;
  masterUserId: string;
  apparatchikUserId: string;
};

const timePickerSettings = {
  type: ETypeTimePickerSecond.ddhhmm,
  maxDay: 8,
  maxHours: 24,
  maxMinutes: 60,
};

interface ISearchParametersThermalChumber extends TGetParameter {
  items: string;
  'locatedAt.name': string;
}

export const PutIntoCuringKmk1 = ({ route }: INavigate<IEngineCase, TPutIntoCuringKmk1Dto>): ReactElement => {
  const { entity } = route.params;
  const [thermalChamber, setThermalChamber] = useState<IThermalChamber | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [putIntoCuringKMK1Dto, setPutCuringKMK1Dto] = useState<TPutIntoCuringKmk1Dto | null>(null);
  const [settingTime, setSettingTime] = useState<number | null>(null);
  const [isValidSettingTime, setIsValidSettingTime] = useState(false);
  const [errorScanMixingThermalChamber, setErrorScanThermalChamber] = useState('');

  const { buildingName } = useContext(BuildingContext);

  const searchParametersThermalChumber: ISearchParametersThermalChumber = {
    items: '50',
    'locatedAt.name': buildingName,
  };

  const onScanThermalChamber = (entity: IThermalChamber): void => {
    if (isThermalChamber(entity) && searchParametersThermalChumber) {
      if (checkValidEntityFromScan(searchParametersThermalChumber, entity)) {
        setErrorScanThermalChamber('');
        setThermalChamber(entity);
      }
    }
  };

  const resetErrorScanThermalChamber = () => {
    setErrorScanThermalChamber('');
  };

  const onSelectedThermalChamber = (thermalChamber: IThermalChamber | null): void => {
    setThermalChamber(thermalChamber);
  };

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setIsValidSettingTime(!!settingTime);
  }, [settingTime]);

  useEffect(() => {
    if (isValidSettingTime && thermalChamber && apparatchikUser && masterUser) {
      setPutCuringKMK1Dto({
        settingTime: Number(settingTime),
        thermalChamberId: thermalChamber?.id,
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setPutCuringKMK1Dto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thermalChamber, isValidSettingTime, apparatchikUser, masterUser]);

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
        onScanEntity={onScanThermalChamber}
        noValidEntity={errorScanMixingThermalChamber}
        resetNoValidEntity={resetErrorScanThermalChamber}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.title}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLE_THERMAL_CHAMBERS.title}:<Text style={CNstyles.defaultPurple}> {thermalChamber?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLE_THERMAL_CHAMBERS.choice}
            pathname={API_THERMINAL_CHAMBERS_SHORT_URL}
            renderCard={ThermalChamberAutocompleteCard}
            searchParameters={searchParametersThermalChumber}
            onSelectedEntities={onSelectedThermalChamber}
            isNoValid={!thermalChamber}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <View style={styles.border} />
          <TimePickerSeconds
            titleFormat={ETypeTimePickerSecond.ddhhmm}
            onChange={setSettingTime}
            settings={timePickerSettings}
          />
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
        {putIntoCuringKMK1Dto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
              dtoTransitions={putIntoCuringKMK1Dto}
              endpoint={endpointTransition.PUT_INTO_CURING_KMK1}
              entity={entity}
              title={ETransitionsUK.commandPutIntoCuringKMK1 + '?'}
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
