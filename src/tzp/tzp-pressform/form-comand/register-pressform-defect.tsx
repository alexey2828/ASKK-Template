import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { INavigate } from '../../../hooks/use-navigate';
import { Input } from '@ui-kitten/components/ui';
import { isStringCommon } from '../../../infrastructure/utils/validate/validate-string-common';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TRegisterPressFormDefectDto = {
  pressformDefect: string;
  masterUserId: string;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 1,
};

export const RegisterPressFormDefect = ({
  route,
}: INavigate<ITzpPressform, TRegisterPressFormDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [tZPPressFormRegisterPressFormDefectDto, setTZPPressFormRegisterPressFormDefectDto] =
    useState<TRegisterPressFormDefectDto | null>(null);
  const [pressformDefect, setPressformDefect] = useState('');
  const [validPressformDefect, setValidPressformDefect] = useState(isStringCommon(pressformDefect, leughtValidParam));

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidPressformDefect(isStringCommon(pressformDefect, leughtValidParam));
  }, [pressformDefect]);

  useEffect(() => {
    if (validPressformDefect && masterUser) {
      setTZPPressFormRegisterPressFormDefectDto({
        pressformDefect: pressformDefect,
        masterUserId: masterUser?.id,
      });
    } else {
      setTZPPressFormRegisterPressFormDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validPressformDefect, masterUser]);

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
              <Text style={CNstyles.defaultPurple}> {entity?.pressformNumber}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setPressformDefect(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_PRESSFORM.registerMaterialDefect}
          />
          {!validPressformDefect.valid ? <Text style={{ color: 'red' }}>{validPressformDefect.message}</Text> : null}
          <SearchUserMaster onSelected={onSelectedMasterUser} masterUser={masterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        {tZPPressFormRegisterPressFormDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
            dtoTransitions={tZPPressFormRegisterPressFormDefectDto}
            endpoint={endpointTransition.TRANSITION_REGISTER_PRESSFORM_DEFECT}
            entity={entity}
            title={ETransitionsUK.TRANSITION_REGISTER_MATERIAL_DEFECT + '?'}
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
