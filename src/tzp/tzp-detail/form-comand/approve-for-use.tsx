import { Input } from '@ui-kitten/components';
import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../../const/titles-main';
import { INavigate } from '../../../hooks/use-navigate';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { isStringCommon } from '../../../infrastructure/utils/validate/validate-string-common';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL } from '../const/titles';
import { isTzpDetail, ITzpDetail } from '../entity/tzp-detail';
import { endpointTransition } from './const/endpoint-transition';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TTZPDetailApproveForUseDto = {
  comment: string;
  masterUserId: string;
};

export const TZPDetailApproveForUse = ({ route }: INavigate<ITzpDetail, TTZPDetailApproveForUseDto>): ReactElement => {
  const { entity } = route.params;
  const [comment, setComment] = useState<string>('');
  const [validComment, setValidComment] = useState(isStringCommon(comment));
  const [tZPDetailApproveForUseDto, setTZPDetailApproveForUseDto] = useState<TTZPDetailApproveForUseDto | null>(null);
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
              {TITLES_TZP_DETAIL.title}:<Text style={CNstyles.defaultPurple}> {entity?.detailNumber}</Text>
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
            routeName={ENavigationName.CHANGE_STATE_TZP_DETAIL}
            dtoTransitions={tZPDetailApproveForUseDto}
            endpoint={endpointTransition.APPROVE_FOR_USE}
            entity={entity}
            title={ETransitionsUa.TRANSITION_APPROVE_FOR_USE + '?'}
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
