import React, { ReactElement, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import { modalStyles } from './confirm.styles';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { TEntityStateMachine } from '../change-state';
import { ETitles } from './const/titles';
import { GoBack } from './go-back';

interface IConfirmData<T> {
  dtoTransitions: T;
  routeName: string;
  endpoint: string;
  title?: string;
  titleBtn?: string;
  titleBtnBack?: string;
  entity?: TEntityStateMachine;
  currentUrl?: string;
  isActive?: boolean;
}

export function GoNext<T>({
  dtoTransitions,
  routeName: route,
  endpoint,
  entity,
  title,
  titleBtn,
  isActive,
  titleBtnBack,
  currentUrl,
}: IConfirmData<T>): ReactElement {
  const [isModalVisible, setModalVisible] = useState(isActive ? isActive : false);
  const { goTo } = useNavigate<TEntityStateMachine, T>();

  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };

  const argsNavigateTo: TArgsNavigate<TEntityStateMachine, T> = {
    route,
    params: {
      dtoTransitions,
      endpoint,
      entity,
      currentUrl,
    },
  };

  return (
    <>
      <TouchableHighlight
        onPress={(): void => {
          setModalVisible(true);
        }}
      >
        <View style={modalStyles.titleWrapperPurple}>
          <Text style={modalStyles.title}>{titleBtn ? titleBtn : ETitles.ENTER}</Text>
        </View>
      </TouchableHighlight>
      <Modal animationInTiming={200} animationOutTiming={200} onBackdropPress={toggleModal} isVisible={isModalVisible}>
        <View style={modalStyles.modalBack}>
          <View style={{ margin: 10 }}>
            <Text style={modalStyles.modalTitle}>{ETitles.CONFIRM_MOVE}</Text>
            <Text style={modalStyles.modalText}>{title ? title : ETitles.CONFIRM_DETAILS}</Text>
            <View style={modalStyles.modalContainer}>
              {isActive ? (
                <View style={{ marginLeft: -40, marginRight: 10 }}>
                  <GoBack />
                </View>
              ) : (
                <View>
                  <TouchableHighlight
                    onPress={(): void => {
                      setModalVisible(false);
                    }}
                  >
                    <Text style={modalStyles.goBack}>{titleBtnBack ? titleBtnBack : ETitles.BACK}</Text>
                  </TouchableHighlight>
                </View>
              )}
              <TouchableHighlight
                onPress={(): void => {
                  goTo(argsNavigateTo);
                  setModalVisible(false);
                }}
              >
                <View style={modalStyles.btnContainerPurple}>
                  <Text style={modalStyles.btnTitle}>{titleBtn ? titleBtn : ETitles.ENTER}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
