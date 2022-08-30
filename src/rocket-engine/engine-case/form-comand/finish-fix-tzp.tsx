import React, { ReactElement, useEffect, useState } from 'react';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ScrollView, Text, View } from 'react-native';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from 'users/model/search-user-master';
import { MainTitles } from 'const/titles-main';
import { TITLES_ENGINE_CASE } from '../const/title';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { INavigate } from 'hooks/use-navigate';
import { IUser } from 'users/entity/user';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { Input } from '@ui-kitten/components';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { LockButton } from 'component-ui/buttons/lock-button';

type TFinishFixTzpDefectDto = {
  comment: string;
  masterUserId: string;
};

export const FinishFixTzpDefect = ({ route }: INavigate<IEngineCase, TFinishFixTzpDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [comment, setComment] = useState('');
  const [validComment, setValidComment] = useState(isStringCommon(comment));
  const [finishFixTzpDefectDto, setFinishFixTzpDefectDto] = useState<TFinishFixTzpDefectDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidComment(isStringCommon(comment));
  }, [comment]);

  useEffect(() => {
    if (masterUser && validComment.valid) {
      setFinishFixTzpDefectDto({
        masterUserId: masterUser?.id,
        comment: comment,
      });
    } else {
      setFinishFixTzpDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterUser, validComment]);

  if (!isEngineCase(entity)) {
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
              {TITLES_ENGINE_CASE.name}:<Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setComment(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_ENGINE_CASE.comment}
          />
          {!validComment.valid ? <Text style={{ color: 'red' }}>{validComment.message}</Text> : null}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {finishFixTzpDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={finishFixTzpDefectDto}
            endpoint={endpointTransition.FINISH_FIX_TZP}
            entity={entity}
            title={ETransitionsUK.commandFinishFixTzp + '?'}
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
