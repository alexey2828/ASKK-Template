import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
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

type TRegisterOverestimatedThicknessTzpDefect = {
  masterUserId: string;
};

export const RegisterOverestimatedThicknessTzpDefect = ({
  route,
}: INavigate<IEngineCase, TRegisterOverestimatedThicknessTzpDefect>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [registerOverestimatedThicknessTzpDefectDto, setRegisterOverestimatedThicknessTzpDefectDto] =
    useState<TRegisterOverestimatedThicknessTzpDefect | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    if (masterUser) {
      setRegisterOverestimatedThicknessTzpDefectDto({
        masterUserId: masterUser?.id,
      });
    } else {
      setRegisterOverestimatedThicknessTzpDefectDto(null);
    }
  }, [masterUser]);

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
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {registerOverestimatedThicknessTzpDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={registerOverestimatedThicknessTzpDefectDto}
            endpoint={endpointTransition.REGISTER_OVERESTIMATED_THICKNESS_TZP_DEFECT}
            entity={entity}
            title={ETransitionsUK.commandRegisterOverestimatedThicknessTzpDefect + '?'}
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
