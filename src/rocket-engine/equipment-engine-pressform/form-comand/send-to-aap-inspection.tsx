import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';

export const EquipmentEnginePressformSendToAAPInspection = ({
  route,
}: INavigate<IEquipmentEnginePressform, null>): ReactElement => {
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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: <Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
          dtoTransitions={null}
          endpoint={endpointTransition.TRANSITION_SEND_TO_AAP_INSPECTION}
          entity={entity}
          isActive={true}
          title={ETransitionsUK.commandSendToAapInspection + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
