import React, { useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigate } from '../../hooks/use-navigate';
import { TMember } from '../api-platform';
import { modalStyles } from './confirm.styles';
import { ETitles } from './const/titles';

export const GoBack: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };
  const { goBack } = useNavigate<TMember>();

  return (
    <>
      <TouchableHighlight
        onPress={(): void => {
          setModalVisible(true);
        }}
      >
        <View style={modalStyles.titleWrapper}>
          <Text style={modalStyles.title}>{ETitles.TURN_BACK}</Text>
        </View>
      </TouchableHighlight>
      <Modal animationInTiming={200} animationOutTiming={200} onBackdropPress={toggleModal} isVisible={isModalVisible}>
        <View style={modalStyles.modalBack}>
          <View style={{ margin: 10 }}>
            <Text style={modalStyles.modalTitle}>{ETitles.CONFIRM_MOVE}</Text>
            <View style={modalStyles.modalContainer}>
              <TouchableHighlight
                onPress={(): void => {
                  setModalVisible(false);
                }}
              >
                <Text style={modalStyles.goBack}>{ETitles.BACK}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={(): void => {
                  goBack();
                }}
              >
                <View style={modalStyles.btnContainer}>
                  <Text style={modalStyles.btnTitle}>{ETitles.TURN_BACK}</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};
