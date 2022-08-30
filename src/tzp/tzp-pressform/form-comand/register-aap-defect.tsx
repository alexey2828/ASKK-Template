import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { Input } from '@ui-kitten/components/ui';
import { isStringCommon } from '../../../infrastructure/utils/validate/validate-string-common';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { TITLES_TZP_DETAIL } from '../../tzp-detail/const/titles';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserApparatchik } from '../../../users/model/search-user-apparatchik';
import { IUser } from 'users/entity/user';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TRegisterAAPDefectDto = {
  aapDefect: string;
  masterUserId: string;
  apparatchikUserId: string;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 1,
};

export const RegisterAAPDefect = ({ route }: INavigate<ITzpPressform, TRegisterAAPDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [aapDefect, setAapDefect] = useState('');
  const [validAapDefect, setValidAapDefect] = useState(isStringCommon(aapDefect, leughtValidParam));
  const [tZPPressFormRegisterAAPDefectDto, setTZPPressFormRegisterAAPDefectDto] =
    useState<TRegisterAAPDefectDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setValidAapDefect(isStringCommon(aapDefect, leughtValidParam));
  }, [aapDefect]);

  useEffect(() => {
    if (validAapDefect && apparatchikUser && masterUser) {
      setTZPPressFormRegisterAAPDefectDto({
        aapDefect: aapDefect,
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setTZPPressFormRegisterAAPDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validAapDefect, apparatchikUser, masterUser]);

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
              {TITLES_TZP_PRESSFORM.pressformNumber}: {entity?.pressformNumber}
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setAapDefect(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_DETAIL.registerAAPDefect}
          />
          {!validAapDefect.valid ? <Text style={{ color: 'red' }}>{validAapDefect.message}</Text> : null}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {tZPPressFormRegisterAAPDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
            dtoTransitions={tZPPressFormRegisterAAPDefectDto}
            endpoint={endpointTransition.TRANSITION_REGISTER_AAP_DEFECT}
            entity={entity}
            title={ETransitionsUK.TRANSITION_REGISTER_AAP_DEFECT + '?'}
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
