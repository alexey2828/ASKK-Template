import React, { ReactElement, useEffect } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { IMixing } from '..';
import { Loader } from '../../component-ui/loader/Loader';
import { Lstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { ServerErr } from '../../component-ui/viewError/server-error';
import { MainTitles } from '../../const/titles-main';
import { INavigate, useNavigate } from '../../hooks/use-navigate';
import { useHttp } from '../../hooks/useHttp';
import { TMember } from '../../infrastructure/api-platform';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { API_MIXING_TYPE_SHORT_URL } from '../../infrastructure/const/urls';

export function ChangeStateMixing({ route }: INavigate<TMember>): ReactElement {
  const dto = route.params.dtoTransitions || {};
  const entity = route.params.entity;
  const urlTransitions = route.params.endpoint;
  const { error, isLoading, updateResponse, resetError } = useHttp<IMixing>();
  const { goBack } = useNavigate<TMember>();

  useEffect(() => {
    if (entity && urlTransitions) {
      const url = API_MIXING_TYPE_SHORT_URL + '/' + entity.id + urlTransitions;
      updateResponse({
        url,
        method: 'PUT',
        body: JSON.stringify(dto),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entity, urlTransitions]);

  return (
    <View style={Lstyles.container}>
      {error != null ? (
        <ServerErr
          message={MainTitles.SERVER_FAILED}
          onReset={() => {
            goBack(entity);
            resetError();
          }}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <View style={Lstyles.successScreenContainer}>
            <Image style={Lstyles.successImage} source={require('../../../public/images/success.png')} />
            <Text style={Lstyles.title}>{MainTitles.OPERATIONSUCCESS}</Text>
          </View>
          <View style={{ height: 20 }} />
          <TouchableHighlight
            onPress={(): void => {
              goBack(entity);
            }}
          >
            <View style={Lstyles.btnBackContainer}>
              <Text style={Lstyles.btnBackTitle}>{ETitles.BACK}</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}
