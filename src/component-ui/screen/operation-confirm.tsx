import React from 'react';
import { View, TouchableHighlight, Text, Image } from 'react-native';
import { Lstyles } from './screens-styles/screenStyle.styles';
import { ServerErr } from '../viewError/server-error';
import { ENavigationName } from '../../infrastructure/const/navigation-name';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { TMember } from '../../infrastructure/api-platform';
import { MainTitles } from '../../const/titles-main';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';

type TError = {
  route: {
    params: {
      error: string;
    };
  };
};

export const OperationConfirm: React.FC<TError> = ({ route }) => {
  const { goTo } = useNavigate<TMember>();
  const { error } = route.params;
  return (
    <View style={Lstyles.container}>
      {error ? (
        <ServerErr message={error} />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <View style={{ display: 'flex', flexDirection: 'row' }}>
            <Image
              style={{
                width: 30,
                height: 15,
                marginTop: 10,
                margin: 5,
              }}
              source={require('../../../public/images/success.png')}
            />
            <Text style={{ color: 'white', fontSize: 18, margin: 5 }}>{MainTitles.OPERATIONSUCCESS}</Text>
          </View>
          <View style={{ height: 20 }} />
          <TouchableHighlight
            onPress={(): void => {
              const argsNavigateTo: TArgsNavigate<TMember, undefined> = {
                route: ENavigationName.HOME,
                params: {},
              };
              goTo(argsNavigateTo);
            }}
          >
            <View
              style={{
                backgroundColor: '#333334',
                width: '100%',
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  margin: 15,
                  fontSize: 16,
                }}
              >
                {ETitles.BACK_TO_HOME}
              </Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
};
