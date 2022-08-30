import React, { ReactElement, useEffect } from 'react';
import { Text, View, TouchableHighlight, Image } from 'react-native';
import { IComponentBatchPlace } from '../entity/component-batch-place';
import { Loader } from '../../component-ui/loader/Loader';
import { Lstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { ServerErr } from '../../component-ui/viewError/server-error';
import { MainTitles } from '../../const/titles-main';
import { INavigate, useNavigate } from '../../hooks/use-navigate';
import { useHttp } from '../../hooks/useHttp';
import { TMember } from '../../infrastructure/api-platform';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { API_COMPONENT_BATCH_PLACE_SHORT_URL } from '../../infrastructure/const/urls';

export function ChangeBuildingPut({ route }: INavigate<TMember>): ReactElement {
  const dto = route.params.dtoTransitions || {};
  const entityComponentBatchPlace = route?.params?.entity;
  const { error, isLoading, updateResponse } = useHttp<IComponentBatchPlace>();
  const message = MainTitles.SERVER_FAILED;
  const { goBack } = useNavigate<TMember>();

  useEffect(() => {
    if (entityComponentBatchPlace) {
      const url = API_COMPONENT_BATCH_PLACE_SHORT_URL + '/' + entityComponentBatchPlace?.id;
      updateResponse({
        url,
        method: 'PUT',
        body: JSON.stringify(dto),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityComponentBatchPlace]);

  return (
    <View style={Lstyles.container}>
      {error != null ? (
        <ServerErr message={message} />
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
              goBack();
            }}
          >
            <View style={Lstyles.btnBackContainer}>
              <Text style={Lstyles.btnBackTitle}>{ETitles.BACK_TO_HOME}</Text>
            </View>
          </TouchableHighlight>
        </View>
      )}
    </View>
  );
}
