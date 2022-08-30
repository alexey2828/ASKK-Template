import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { INavigate } from '../../../hooks/use-navigate';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { ETypeTimePickerSecond, TimePickerSeconds } from '../../../infrastructure/date-picker-m-h/time-picker-seconds';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../../users/model/search-user-apparatchik';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TPutIntoKMPolymerizationWithClosedCapDto = {
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

export const PutIntoKMPolymerizationWithClosedCap = ({
  route,
}: INavigate<ITzpPressform, TPutIntoKMPolymerizationWithClosedCapDto>): ReactElement => {
  const { entity } = route.params;
  const [settingTime, setSettingTime] = useState<number | null>(null);
  const [isValidSettingTime, setIsValidSettingTime] = useState(false);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [tZPPressFormPutIntoKMPolymerizationWithClosedCapDto, setTZPPressFormPutIntoKMPolymerizationWithClosedCapDto] =
    useState<TPutIntoKMPolymerizationWithClosedCapDto | null>(null);

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
    if (isValidSettingTime && apparatchikUser && masterUser) {
      setTZPPressFormPutIntoKMPolymerizationWithClosedCapDto({
        settingTime: Number(settingTime),
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setTZPPressFormPutIntoKMPolymerizationWithClosedCapDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidSettingTime, apparatchikUser, masterUser]);

  if (!isTzpPressform(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_TZP_PRESSFORM.title}:<Text style={CNstyles.defaultPurple}> {entity?.pressformNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <ScrollView>
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
        {tZPPressFormPutIntoKMPolymerizationWithClosedCapDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
              dtoTransitions={tZPPressFormPutIntoKMPolymerizationWithClosedCapDto}
              endpoint={endpointTransition.TRANSITION_PUT_INTO_KM1_POLYMERIZATION_WITH_CLOSED_CAP}
              entity={entity}
              title={ETransitionsUK.TRANSITION_PUT_INTO_KM1_POLYMERIZATION_WITH_CLOSED_CAP + '?'}
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
