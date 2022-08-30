import React, { ReactElement, useEffect, useState } from 'react';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { INavigate } from 'hooks/use-navigate';
import { Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IUser } from 'users/entity/user';
import { LockButton } from 'component-ui/buttons/lock-button';

type TFixAapRoughingDto = {
  masterUserId: string;
  apparatchikUserId: string;
};

export const EquipmentEnginePressformFixAapRoughing = ({
  route,
}: INavigate<IEquipmentEnginePressform, TFixAapRoughingDto>): ReactElement => {
  const { entity } = route.params;
  const [dtoStartRoughing, setDtoStartRoughing] = useState<TFixAapRoughingDto | null>(null);
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

  if (!isEquipmentEnginePressform(entity)) {
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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
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
              routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
              dtoTransitions={dtoStartRoughing}
              endpoint={endpointTransition.FIX_AAP_ROUGHING}
              entity={entity}
              title={ETransitionsUK.commandFixAapRoughing + '?'}
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
