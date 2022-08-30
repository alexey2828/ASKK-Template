import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { IEnginePressform, isEnginePressform } from '../engine-pressform/entity/engine-pressform';
import { endpointTransition } from './const/endpoint-transition';
import { IUser } from '../../users/entity/user';
import { isStringCommon } from '../../infrastructure/utils/validate/validate-string-common';
import { Input } from '@ui-kitten/components';
import { TITLES_TZP_PRESSFORM } from '../../tzp/tzp-pressform/const/titiles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { ChooseCurrentUrlTransition } from '../model/choose-current-url-transition';
import { SearchUserMaster } from '../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../users/model/search-user-apparatchik';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { LockButton } from 'component-ui/buttons/lock-button';

type TRegisterPressFormDefectDto = {
  pressformDefect: string;
  masterUserId: string;
  apparatchikUserId: string;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 1,
};

export const RegisterMaterialDefect = ({
  route,
}: INavigate<IEnginePressform, TRegisterPressFormDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [tZPPressFormRegisterPressFormDefectDto, setTZPPressFormRegisterPressFormDefectDto] =
    useState<TRegisterPressFormDefectDto | null>(null);
  const [pressformDefect, setPressformDefect] = useState('');
  const [validPressformDefect, setValidPressformDefect] = useState(isStringCommon(pressformDefect, leughtValidParam));

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setValidPressformDefect(isStringCommon(pressformDefect, leughtValidParam));
  }, [pressformDefect]);

  useEffect(() => {
    if (validPressformDefect && masterUser && apparatchikUser) {
      setTZPPressFormRegisterPressFormDefectDto({
        pressformDefect: pressformDefect,
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setTZPPressFormRegisterPressFormDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apparatchikUser, masterUser, validPressformDefect]);

  if (!isEnginePressform(entity)) {
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
              Матеріал:
              <Text style={CNstyles.defaultPurple}> {entity?.formularNumber}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setPressformDefect(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_PRESSFORM.title}
          />
          {!validPressformDefect.valid ? <Text style={{ color: 'red' }}>{validPressformDefect.message}</Text> : null}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        {validPressformDefect ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_MATERIALS}
            dtoTransitions={tZPPressFormRegisterPressFormDefectDto}
            endpoint={endpointTransition.REGISTER_MATERIAL_DEFECT}
            entity={entity}
            currentUrl={ChooseCurrentUrlTransition(entity)?.toString()}
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
