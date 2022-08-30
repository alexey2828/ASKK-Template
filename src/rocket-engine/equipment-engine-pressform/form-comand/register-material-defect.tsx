import { Input } from '@ui-kitten/components';
import { LockButton } from 'component-ui/buttons/lock-button';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { INavigate } from 'hooks/use-navigate';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { IUser } from 'users/entity/user';
import { SearchUserMaster } from 'users/model/search-user-master';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { endpointTransition } from './const/endpoint-transition';

type TRegisterquipmentEnginePressformDefectDto = {
  defect: string;
  masterUserId: string;
};

export const RegisterEquipmentEnginePressformDefect = ({
  route,
}: INavigate<IEquipmentEnginePressform, TRegisterquipmentEnginePressformDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [registerquipmentEnginePressformDefectDto, setRegisterquipmentEnginePressformDefectDto] =
    useState<TRegisterquipmentEnginePressformDefectDto | null>(null);
  const [pressformDefect, setPressformDefect] = useState('');
  const [validPressformDefect, setValidPressformDefect] = useState(isStringCommon(pressformDefect));

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidPressformDefect(isStringCommon(pressformDefect));
  }, [pressformDefect]);

  useEffect(() => {
    if (validPressformDefect.valid && masterUser) {
      setRegisterquipmentEnginePressformDefectDto({
        defect: pressformDefect,
        masterUserId: masterUser?.id,
      });
    } else {
      setRegisterquipmentEnginePressformDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validPressformDefect, masterUser]);

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
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setPressformDefect(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_EQUIPMENT_ENGINE_PRESSFORM.registerMaterialDefect}
          />
          {!validPressformDefect.valid ? <Text style={{ color: 'red' }}>{validPressformDefect.message}</Text> : null}
          <SearchUserMaster onSelected={onSelectedMasterUser} masterUser={masterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        {registerquipmentEnginePressformDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
            dtoTransitions={registerquipmentEnginePressformDefectDto}
            endpoint={endpointTransition.TRANSITION_REGISTER_PRESSFORM_DEFECT}
            entity={entity}
            title={ETransitionsUK.commandRegisterMaterialDefect + '?'}
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
