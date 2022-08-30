import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { Input } from '@ui-kitten/components/ui';
import { LockButton } from 'component-ui/buttons/lock-button';

type TTakeToWorkDto = {
  opinionOnAdmission: string;
  masterUserId: string;
  apparatchikUserId: string;
};

export const EquipmentEnginePressformTakeToWork = ({
  route,
}: INavigate<IEquipmentEnginePressform, TTakeToWorkDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [dtoTZPPressFormTakeToWork, setDtoTZPPressFormTakeToWork] = useState<TTakeToWorkDto | null>(null);

  const [opinionOnAdmission, setOpinionOnAdmission] = useState<string>('');
  const [validateOpinionOnAdmission, setValidateOpinionOnAdmission] = useState(isStringCommon(opinionOnAdmission));

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setValidateOpinionOnAdmission(isStringCommon(opinionOnAdmission));
  }, [opinionOnAdmission]);

  useEffect(() => {
    if (masterUser && apparatchikUser && validateOpinionOnAdmission.valid) {
      setDtoTZPPressFormTakeToWork({
        opinionOnAdmission: opinionOnAdmission,
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setDtoTZPPressFormTakeToWork(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterUser, apparatchikUser, validateOpinionOnAdmission]);

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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: <Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setOpinionOnAdmission(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_EQUIPMENT_ENGINE_PRESSFORM.opinionOnAdmission}
          />
          {!validateOpinionOnAdmission.valid && (
            <Text style={{ color: 'red' }}>{validateOpinionOnAdmission.message}</Text>
          )}

          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {dtoTZPPressFormTakeToWork ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
            dtoTransitions={dtoTZPPressFormTakeToWork}
            endpoint={endpointTransition.TRANSITION_TAKE_TO_WORK}
            entity={entity}
            title={ETransitionsUK.commandTakeToWork + '?'}
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
