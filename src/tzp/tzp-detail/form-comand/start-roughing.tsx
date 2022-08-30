import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../../const/titles-main';
import { INavigate } from '../../../hooks/use-navigate';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL } from '../const/titles';
import { isTzpDetail, ITzpDetail } from '../entity/tzp-detail';
import { endpointTransition } from './const/endpoint-transition';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../../users/model/search-user-apparatchik';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TStartRoughingDto = {
  masterUserId: string;
  apparatchikUserId: string;
};

export const StartRoughing = ({ route }: INavigate<ITzpDetail, TStartRoughingDto>): ReactElement => {
  const { entity } = route.params;

  const [dtoStartRoughing, setDtoStartRoughing] = useState<TStartRoughingDto | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    if (apparatchikUser && masterUser) {
      setDtoStartRoughing({
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setDtoStartRoughing(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apparatchikUser, apparatchikUser]);

  if (!isTzpDetail(entity)) {
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
              {TITLES_TZP_DETAIL.detailNumber}:<Text style={CNstyles.defaultPurple}> {entity?.detailNumber}</Text>
            </Text>
          </View>
        </View>
        <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        <SearchUserApparatchik
          apparatchikUser={apparatchikUser}
          onSelected={onSelectedApparatchikUser}
          isNoValid={!apparatchikUser}
        />
        <View style={CNstyles.defaultHeight} />

        {dtoStartRoughing ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_TZP_DETAIL}
              dtoTransitions={dtoStartRoughing}
              endpoint={endpointTransition.START_ROUGHING}
              entity={entity}
              title={ETransitionsUa.TRANSITION_START_ROUGHING + '?'}
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
