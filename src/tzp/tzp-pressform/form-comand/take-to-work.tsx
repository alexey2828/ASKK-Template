import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TTakeToWorkDto = {
  masterUserId: string;
};

export const TakeToWork = ({ route }: INavigate<ITzpPressform, TTakeToWorkDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [dtoTZPPressFormTakeToWork, setDtoTZPPressFormTakeToWork] = useState<TTakeToWorkDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    if (masterUser) {
      setDtoTZPPressFormTakeToWork({
        masterUserId: masterUser?.id,
      });
    } else {
      setDtoTZPPressFormTakeToWork(null);
    }
  }, [masterUser]);

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
              {TITLES_TZP_PRESSFORM.pressformNumber}:
              <Text style={CNstyles.defaultPurple}>{entity?.pressformNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {dtoTZPPressFormTakeToWork ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
            dtoTransitions={dtoTZPPressFormTakeToWork}
            endpoint={endpointTransition.TRANSITION_TAKE_TO_WORK}
            entity={entity}
            title={ETransitionsUK.TRANSITION_TAKE_TO_WORK + '?'}
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
