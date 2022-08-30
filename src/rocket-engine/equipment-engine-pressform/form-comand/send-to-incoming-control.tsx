import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { INavigate } from 'hooks/use-navigate';
import { ITzpPressform } from 'tzp/tzp-pressform/entity/tzp-pressform/tzp-pressform';
import { endpointTransition } from './const/endpoint-transition';
import { isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { ENavigationName } from 'infrastructure/const/navigation-name';

export const EquipmentEnginePressformSendToIncomingControl = ({
  route,
}: INavigate<ITzpPressform, null>): ReactElement => {
  const { entity } = route.params;

  if (!isEquipmentEnginePressform(entity)) {
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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}:<Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
          dtoTransitions={null}
          endpoint={endpointTransition.TRANSITION_SEND_TO_INCOMING_CONTROL}
          entity={entity}
          isActive={true}
          title={ETransitionsUK.commandSendToIncomingControl + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
