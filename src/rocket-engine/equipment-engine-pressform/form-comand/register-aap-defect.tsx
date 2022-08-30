import { Input } from '@ui-kitten/components';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { INavigate } from 'hooks/use-navigate';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { styles } from 'component-ui/common-block-styles.styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { IUser } from 'users/entity/user';
import { SearchUserMaster } from 'users/model/search-user-master';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { endpointTransition } from './const/endpoint-transition';
import { LockButton } from 'component-ui/buttons/lock-button';

type TRegisterAapDefectDto = {
  defectAap: string;
  masterUserId: string;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 1,
};

export const EquipmentEnginePressformRegisterAAPDefect = ({
  route,
}: INavigate<IEquipmentEnginePressform, TRegisterAapDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [aapDefect, setAapDefect] = useState('');
  const [validAapDefect, setValidAapDefect] = useState(isStringCommon(aapDefect, leughtValidParam));
  const [tZPPressFormRegisterAAPDefectDto, setTZPPressFormRegisterAAPDefectDto] =
    useState<TRegisterAapDefectDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidAapDefect(isStringCommon(aapDefect, leughtValidParam));
  }, [aapDefect]);

  useEffect(() => {
    if (validAapDefect.valid && masterUser) {
      setTZPPressFormRegisterAAPDefectDto({
        defectAap: aapDefect,
        masterUserId: masterUser?.id,
      });
    } else {
      setTZPPressFormRegisterAAPDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validAapDefect, masterUser]);

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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: {entity?.name}
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
            placeholder={TITLES_EQUIPMENT_ENGINE_PRESSFORM.registerAAPDefect}
          />
          {!validAapDefect.valid ? <Text style={{ color: 'red' }}>{validAapDefect.message}</Text> : null}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {tZPPressFormRegisterAAPDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
            dtoTransitions={tZPPressFormRegisterAAPDefectDto}
            endpoint={endpointTransition.TRANSITION_REGISTER_AAP_DEFECT}
            entity={entity}
            title={ETransitionsUK.commandRegisterAapDefect + '?'}
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
