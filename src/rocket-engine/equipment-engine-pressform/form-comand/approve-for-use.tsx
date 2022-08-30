import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { Input } from '@ui-kitten/components';
import { TITLES_TZP_DETAIL } from 'tzp/tzp-detail/const/titles';
import { SearchUserMaster } from 'users/model/search-user-master';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IUser } from 'users/entity/user';
import { LockButton } from 'component-ui/buttons/lock-button';

type ApproveForUseDto = {
  comment: string;
  masterUserId: string;
};

export const EquipmentEnginePressformApproveForUse = ({
  route,
}: INavigate<IEquipmentEnginePressform, ApproveForUseDto>): ReactElement => {
  const { entity } = route.params;
  const [comment, setComment] = useState<string>('');
  const [validComment, setValidComment] = useState(isStringCommon(comment));
  const [tZPDetailApproveForUseDto, setTZPDetailApproveForUseDto] = useState<ApproveForUseDto | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidComment(isStringCommon(comment));
  }, [comment]);

  useEffect(() => {
    if (validComment.valid && masterUser) {
      setTZPDetailApproveForUseDto({
        comment: comment,
        masterUserId: masterUser?.id,
      });
    } else {
      setTZPDetailApproveForUseDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validComment, masterUser]);

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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: <Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setComment(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_DETAIL.comment}
          />
          {!validComment.valid && <Text style={{ color: 'red' }}>{validComment.message}</Text>}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {tZPDetailApproveForUseDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
            dtoTransitions={tZPDetailApproveForUseDto}
            endpoint={endpointTransition.APPROVE_FOR_USE}
            entity={entity}
            title={ETransitionsUK.commandApproveForUse + '?'}
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
