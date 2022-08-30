import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { endpointTransition } from '../const/endpoint-transition';
import { TITLES_TZP_DETAIL_SAMPLES } from '../const/titles';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { isTzpDetailSample, ITzpDetailSample } from '../entity/tzp-plate';
import { ENavigationName } from 'infrastructure/const/navigation-name';

export const TZPDetailSampleFinishKM1Polymerization = ({ route }: INavigate<ITzpDetailSample, null>): ReactElement => {
  const { entity } = route.params;

  if (!isTzpDetailSample(entity)) {
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
              {TITLES_TZP_DETAIL_SAMPLES.samples}:<Text style={CNstyles.defaultPurple}>{entity?.number}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_TZP_DETAIL_SAMPLE}
          dtoTransitions={null}
          endpoint={endpointTransition.TRANSITION_FINISH_KM1_POLYMERIZATION}
          entity={entity}
          isActive={true}
          title={ETransitionsUK.TRANSITION_FINISH_KM1_POLYMERIZATION + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
