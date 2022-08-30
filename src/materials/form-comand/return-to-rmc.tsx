import { ENavigationName } from 'infrastructure/const/navigation-name';
import { ETransitionsUK } from 'materials/const/choose-ua-title-transition-state';
import React, { ReactElement } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from '../../const/titles-main';
import { INavigate } from '../../hooks/use-navigate';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { IEnginePressform, isEnginePressform } from '../engine-pressform/entity/engine-pressform';
import { ChooseCurrentUrlTransition } from '../model/choose-current-url-transition';
import { endpointTransition } from './const/endpoint-transition';

export const MaterialsReturnToRMC = ({ route }: INavigate<IEnginePressform, null>): ReactElement => {
  const { entity } = route.params;

  if (!isEnginePressform(entity)) {
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
              Матеріал:
              <Text style={CNstyles.defaultPurple}> {entity?.formularNumber}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <GoNext
          routeName={ENavigationName.CHANGE_STATE_MATERIALS}
          dtoTransitions={null}
          endpoint={endpointTransition.RETURN_TO_RMC}
          entity={entity}
          currentUrl={ChooseCurrentUrlTransition(entity)?.toString()}
          isActive={true}
          title={ETransitionsUK.commandReturnToRmc + '?'}
        />
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
