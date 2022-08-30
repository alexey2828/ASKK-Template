import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { TEntityStateMachine } from '..';
import { TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';

interface ChooseBtn {
  transitionsTitles: {
    [key: string]: string;
  };
  entity: TEntityStateMachine;
}

export function ChooseBtn({ transitionsTitles: transitions, entity }: ChooseBtn): JSX.Element | null {
  const { goTo } = useNavigate<TEntityStateMachine>();

  if (!Array.isArray(entity.enabledTransitions)) {
    return null;
  }

  return (
    <>
      <Text style={{ color: 'white' }} key={entity.id}>
        {entity.enabledTransitions
          .filter(enabledTransition => Object.prototype.hasOwnProperty.call(transitions, enabledTransition.name))
          .map(enabledTransition => {
            const argsNavigateTo: TArgsNavigate<TEntityStateMachine> = {
              route: enabledTransition.name + entity['@type'],
              params: {
                entity,
              },
            };
            return (
              <TouchableHighlight
                key={`btn${enabledTransition.name}`}
                onPress={(): void => {
                  goTo(argsNavigateTo);
                }}
              >
                <View style={CNstyles.BtnContainerDetails} key={enabledTransition.name}>
                  <Text style={CNstyles.BtnTitleLime}>{transitions[enabledTransition.name]}</Text>
                </View>
              </TouchableHighlight>
            );
          })}
      </Text>
    </>
  );
}
