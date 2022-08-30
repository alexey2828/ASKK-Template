import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { routes } from './const/route';
import { styles } from '../../component-ui/common-block-styles.styles';
import { Input } from '@ui-kitten/components/ui';
import { isStringCommon } from '../../infrastructure/utils/validate/validate-string-common';
import { TITLES_MIXING } from '../const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { IMixing, isMixing } from '../entity/mixing/mixing';
import { LockButton } from 'component-ui/buttons/lock-button';

type TMixingRejectForUseDto = { comment: string };

export const MixingRejectForUse = ({ route }: INavigate<IMixing, TMixingRejectForUseDto>): ReactElement => {
  const { entity } = route.params;
  const endpoint = endpointTransition.REJECT_FOR_USE;
  const routeName = routes.CHANGE_STATE_MIXING;
  const [comment, setComment] = useState('');
  const [validComment, setValidComment] = useState(isStringCommon(comment));
  const [mixingRejectForUseDto, setMixingRejectForUseDto] = useState<TMixingRejectForUseDto | null>(null);

  useEffect(() => {
    setValidComment(isStringCommon(comment));
  }, [comment]);

  useEffect(() => {
    if (validComment) {
      setMixingRejectForUseDto({
        comment: String(comment),
      });
    } else {
      setMixingRejectForUseDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validComment]);

  if (!isMixing(entity)) {
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
              {TITLES_MIXING.title}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <Input
          placeholderTextColor="#a1a1a1"
          onChangeText={(val): void => setComment(val)}
          style={CNstyles.CNtextInputc}
          placeholder={TITLES_MIXING.comment}
        />
        {!validComment.valid ? <Text style={{ color: 'red' }}>{validComment.message}</Text> : null}
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {mixingRejectForUseDto ? (
          <GoNext
            routeName={routeName}
            dtoTransitions={mixingRejectForUseDto}
            endpoint={endpoint}
            entity={entity}
            title={TITLES_MIXING.rejectForUse}
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
