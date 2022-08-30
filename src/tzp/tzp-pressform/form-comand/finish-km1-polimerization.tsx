import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { ENavigationName } from 'infrastructure/const/navigation-name';

export const FinishKM1Polimerization = ({ route }: INavigate<ITzpPressform, null>): ReactElement => {
  const { entity } = route.params;

  if (!isTzpPressform(entity)) {
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
              {TITLES_TZP_PRESSFORM.pressformNumber}:
              <Text style={CNstyles.defaultPurple}> {entity?.pressformNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
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
