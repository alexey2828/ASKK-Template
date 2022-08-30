import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { endpointTransition } from './const/endpoint-transition';
import { IComponentBatchPlace, isComponentBatchPlace } from '../entity/component-batch-place';
import { TITLES_COMPONENT_BATCH } from '../entity/component-batch/const/titles';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { ENavigationName } from 'infrastructure/const/navigation-name';

export const SendToLaboratory = ({ route }: INavigate<IComponentBatchPlace, null>): ReactElement => {
  const { entity } = route.params;

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
              <Text style={CNstyles.defaultPurple}> {entity?.componentBatch?.componentType.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_COMPONENT_BATCH_PLACE_SCREEN}
          dtoTransitions={null}
          endpoint={endpointTransition.SEND_TO_LABORATORY}
          entity={entity}
          isActive={true}
          title={ETransitionsUa.TRANSITION_SEND_TO_LABORATORY + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
