/* eslint-disable prettier/prettier */
import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { TITLES_ENGINE_CASE } from '../const/title';

export const FinishDrying = ({ route }: INavigate<IEngineCase, null>): ReactElement => {
  const { entity } = route.params;

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
              {TITLES_ENGINE_CASE.timeReturnToRmc}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
          dtoTransitions={null}
          endpoint={endpointTransition.FINISH_DRYING}
          entity={entity}
          isActive={true}
          title={ETransitionsUK.commandFinishDrying + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
