import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { MainTitles } from '../../const/titles-main';
import { INavigate } from '../../hooks/use-navigate';
import { routes } from './const/route';
import { TITLES_MIXING } from '../const/titles';
import { IMixing, isMixing } from '../entity/mixing/mixing';

export const MixingUnPause = ({ route }: INavigate<IMixing, null>): ReactElement => {
  const { entity } = route.params;
  const routeName = routes.CHANGE_STATE_MIXING;
  const endpoint = endpointTransition.MIXER_UNPAUSE;

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
              {TITLES_MIXING.title}:<Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={routeName}
          dtoTransitions={null}
          endpoint={endpoint}
          entity={entity}
          title={TITLES_MIXING.unpause}
          isActive={true}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
