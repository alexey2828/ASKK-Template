import { ENavigationName } from 'infrastructure/const/navigation-name';
import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../../const/titles-main';
import { INavigate } from '../../../hooks/use-navigate';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { ETransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL } from '../const/titles';
import { isTzpDetail, ITzpDetail } from '../entity/tzp-detail';
import { endpointTransition } from './const/endpoint-transition';

export const TTZPDetailDegreaseSurface = ({ route }: INavigate<ITzpDetail, null>): ReactElement => {
  const { entity } = route.params;

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
              {TITLES_TZP_DETAIL.detailNumber}:<Text style={CNstyles.defaultPurple}> {entity?.detailNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_TZP_DETAIL}
          dtoTransitions={null}
          endpoint={endpointTransition.DEGREASE_SURFACE}
          entity={entity}
          title={ETransitionsUa.TRANSITION_DEGREASE_SURFACE + '?'}
          isActive={true}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
