import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { INavigate } from '../../../hooks/use-navigate';
import { API_THERMINAL_CHAMBERS_SHORT_URL } from '../../../infrastructure/const/urls';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { AsyncAutoComplete } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { EntityFromScanner } from '../../../infrastructure/entity-from-scanner/entity-from-scanner';
import { ETypeTimePickerSecond, TimePickerSeconds } from '../../../infrastructure/date-picker-m-h/time-picker-seconds';
import { ThermalChamberAutocompleteCard } from '../entity/thermal-chamber/ui/thermal-chamber-autocomplete-card/thermal-chamber-card';
import { isThermalChamber, IThermalChamber } from '../entity/thermal-chamber/entity/thermal-chamber';
import { EFields } from '../const/fields';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { IUser } from '../../../users/entity/user';
import { TITLE_THERMAL_CHAMBERS } from '../entity/thermal-chamber/const/titles';
import { TITLES_AUTOCOMPLETE } from '../../../infrastructure/async-auto-complete/const/titles';
import { ScrollView } from 'react-native-gesture-handler';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { BuildingContext } from '../../../infrastructure/context/building-context';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../../users/model/search-user-apparatchik';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { LockButton } from 'component-ui/buttons/lock-button';

type TPutIntoKMPolymerizationWithOpenCapDto = {
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

export const PutIntoKMPolymerizationWithOpenCap = ({
  route,
}: INavigate<ITzpPressform, TPutIntoKMPolymerizationWithOpenCapDto>): ReactElement => {
  const { entity } = route.params;

  const [settingTime, setSettingTime] = useState<number | null>(null);
  const [isValidSettingTime, setIsValidSettingTime] = useState(false);
  const [thermalChamber, setThermalChamber] = useState<IThermalChamber | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [putIntoKMPolymerizationWithOpenCapDto, setРutIntoKMPolymerizationWithOpenCapDto] =
    useState<TPutIntoKMPolymerizationWithOpenCapDto | null>(null);
  const [errorScanMixingThermalChamber, setErrorScanThermalChamber] = useState('');
  const [searchParametersThermalChumber, setSearchParametersThermalChumber] =
    useState<ISearchParametersThermalChumber>();
  const { buildingName } = useContext(BuildingContext);

  const searchParameters: TGetParameter = {
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

  useEffect(() => {
    const initSearchParametersThermalChumber: ISearchParametersThermalChumber = {
      items: '50',
      'locatedAt.name': buildingName,
    };
    setSearchParametersThermalChumber(initSearchParametersThermalChumber);
  }, [buildingName]);

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
    if (thermalChamber && isValidSettingTime && apparatchikUser && masterUser) {
      setРutIntoKMPolymerizationWithOpenCapDto({
        settingTime: Number(settingTime),
        thermalChamberId: thermalChamber?.id,
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setРutIntoKMPolymerizationWithOpenCapDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidSettingTime, thermalChamber, apparatchikUser, masterUser]);

  if (!isTzpPressform(entity)) {
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
              {TITLES_TZP_PRESSFORM.pressformNumber}:
              <Text style={CNstyles.defaultPurple}> {entity?.pressformNumber}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLE_THERMAL_CHAMBERS.choice}:<Text style={CNstyles.defaultPurple}> {thermalChamber?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLE_THERMAL_CHAMBERS.choice}
            pathname={API_THERMINAL_CHAMBERS_SHORT_URL}
            renderCard={ThermalChamberAutocompleteCard}
            searchParameters={searchParameters}
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
        {putIntoKMPolymerizationWithOpenCapDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
              dtoTransitions={putIntoKMPolymerizationWithOpenCapDto}
              endpoint={endpointTransition.TRANSITION_PUT_INTO_KM1_POLYMERIZATION_WITH_OPEN_CAP}
              entity={entity}
              title={ETransitionsUK.TRANSITION_PUT_INTO_KM1_POLYMERIZATION_WITH_OPEN_CAP + '?'}
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
