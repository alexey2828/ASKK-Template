import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { endpointTransition } from './const/endpoint-transition';
import { isStringCommon } from '../../infrastructure/utils/validate/validate-string-common';
import { Input } from '@ui-kitten/components/ui';
import { styles } from '../../component-ui/common-block-styles.styles';
import { IComponentBatchPlace, isComponentBatchPlace } from '../entity/component-batch-place';
import { TITLES_COMPONENT_BATCH } from '../entity/component-batch/const/titles';
import { TITLES_COMPONENT_BATCH_PLACE } from '../const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { LockButton } from 'component-ui/buttons/lock-button';

type TRejectForUseDto = { comment: string };

export const RejectForUse = ({ route }: INavigate<IComponentBatchPlace, TRejectForUseDto>): ReactElement => {
  const { entity } = route.params;

  const [comment, setComment] = useState('');
  const [validComment, setValidComment] = useState(isStringCommon(comment));
  const [rejectForUseDto, setRejectForUseDto] = useState<TRejectForUseDto | null>(null);

  useEffect(() => {
    setValidComment(isStringCommon(comment));
  }, [comment]);

  useEffect(() => {
    if (validComment.valid) {
      setRejectForUseDto({
        comment: String(comment),
      });
    } else {
      setRejectForUseDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validComment]);

  if (!isComponentBatchPlace(entity)) {
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
              {TITLES_COMPONENT_BATCH.title}:
              <Text style={CNstyles.defaultPurple}> {entity?.componentBatch.componentType.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <Input
          placeholderTextColor="#a1a1a1"
          onChangeText={(val): void => setComment(val)}
          style={CNstyles.CNtextInputc}
          placeholder={TITLES_COMPONENT_BATCH_PLACE.addComment}
        />
        {!validComment.valid ? <Text style={{ color: 'red' }}>{validComment.message}</Text> : null}
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {rejectForUseDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_COMPONENT_BATCH_PLACE_SCREEN}
            dtoTransitions={rejectForUseDto}
            endpoint={endpointTransition.END}
            entity={entity}
            title={ETransitionsUa.TRANSITION_REJECT_FOR_USE + '?'}
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
