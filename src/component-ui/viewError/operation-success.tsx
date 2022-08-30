import React, { ReactElement } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Cstyles } from '../screen/screens-styles/screenStyle.styles';

type TWarning = {
  message: string;
  onReset?: () => void;
};

export const Success = ({ message, onReset }: TWarning): ReactElement => {
  return (
    <View
      style={[
        Cstyles.SectionStyle,
        {
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          width: 330,
        },
      ]}
    >
      <TouchableOpacity onPress={onReset}>
        <Image style={{ width: 30, height: 30 }} source={require('../../../public/images/succesbox.png')} />
      </TouchableOpacity>
      <Text style={{ color: '#ffffff', fontSize: 16 }}>{message}</Text>
    </View>
  );
};
