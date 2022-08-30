import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { SearchUserMaster } from 'users/model/search-user-master';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { TITLES_ENGINE_CASE } from '../const/title';
import { MainTitles } from 'const/titles-main';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IUser } from 'users/entity/user';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { Input } from '@ui-kitten/components';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { LockButton } from 'component-ui/buttons/lock-button';

type TRegisterTzpVisualDefect = {
  name: string;
  masterUserId: string;
};

export const RegisterTzpVisualDefect = ({ route }: INavigate<IEngineCase, TRegisterTzpVisualDefect>): ReactElement => {
  const { entity } = route.params;
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [commentDefect, setCommentDefect] = useState<string>('');
  const [validCommentDefect, setValidCommentDefect] = useState(isStringCommon(commentDefect));
  const [registerTzpVisualDefectDto, setRegisterTzpVisualDefectDto] = useState<TRegisterTzpVisualDefect | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  useEffect(() => {
    setValidCommentDefect(isStringCommon(commentDefect));
  }, [commentDefect]);

  useEffect(() => {
    if (masterUser && validCommentDefect.valid) {
      setRegisterTzpVisualDefectDto({
        masterUserId: masterUser?.id,
        name: commentDefect,
      });
    } else {
      setRegisterTzpVisualDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterUser, validCommentDefect]);

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
            onChangeText={(val): void => setCommentDefect(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_ENGINE_CASE.comment}
          />
          {!validCommentDefect.valid ? <Text style={{ color: 'red' }}>{validCommentDefect.message}</Text> : null}
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        {registerTzpVisualDefectDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={registerTzpVisualDefectDto}
            endpoint={endpointTransition.REGISTER_TZP_VISUAL_DEFECT}
            entity={entity}
            title={ETransitionsUK.commandRegisterTzpVisualDefect + '?'}
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
