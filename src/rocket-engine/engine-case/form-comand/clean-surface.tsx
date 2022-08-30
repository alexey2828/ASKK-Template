import React, { ReactElement, useEffect, useState } from 'react';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ScrollView, Text, View } from 'react-native';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { MainTitles } from 'const/titles-main';
import { TITLES_ENGINE_CASE } from '../const/title';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { INavigate } from 'hooks/use-navigate';
import { IUser } from 'users/entity/user';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { LockButton } from 'component-ui/buttons/lock-button';

type TCleanSurfaceDto = {
  masterUserId: string;
  apparatchikUserId: string;
};

export const CleanSurface = ({ route }: INavigate<IEngineCase, TCleanSurfaceDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [cleanSurfaceDto, setCleanSurfaceDto] = useState<TCleanSurfaceDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    if (masterUser && apparatchikUser) {
      setCleanSurfaceDto({
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setCleanSurfaceDto(null);
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
        {cleanSurfaceDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={cleanSurfaceDto}
            endpoint={endpointTransition.CLEAN_SURFACE}
            entity={entity}
            title={ETransitionsUK.commandCleanSurface + '?'}
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
