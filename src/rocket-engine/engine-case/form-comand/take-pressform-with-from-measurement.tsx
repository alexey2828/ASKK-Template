import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { TITLES_ENGINE_CASE } from '../const/title';
import { MainTitles } from 'const/titles-main';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IUser } from 'users/entity/user';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { LockButton } from 'component-ui/buttons/lock-button';

type TTakePressformWithTzpFromMeasurementDto = {
  masterUserId: string;
  apparatchikUserId: string;
};

export const TakePressformWithTzpFromMeasurement = ({
  route,
}: INavigate<IEngineCase, TTakePressformWithTzpFromMeasurementDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [TakePressformWithTzpFromMeasurementDto, setTakePressformWithTzpFromMeasurementDto] =
    useState<TTakePressformWithTzpFromMeasurementDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    if (masterUser && apparatchikUser) {
      setTakePressformWithTzpFromMeasurementDto({
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setTakePressformWithTzpFromMeasurementDto(null);
    }
  }, [masterUser, apparatchikUser]);

  if (!isEngineCase(entity)) {
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
              {TITLES_ENGINE_CASE.name}:<Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {TakePressformWithTzpFromMeasurementDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={TakePressformWithTzpFromMeasurementDto}
            endpoint={endpointTransition.TAKE_PRESSFORM_WITH_TZP_FROM_MEASUREMENT}
            entity={entity}
            title={ETransitionsUK.commandTakePressformWithTzpFromMeasurement + '?'}
          />
        ) : (
          <LockButton />
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
