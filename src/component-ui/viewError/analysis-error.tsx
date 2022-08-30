import React from 'react';
import { Image, Text, View } from 'react-native';
import { Cstyles } from '../screen/screens-styles/screenStyle.styles';

export const AnalysisErr: React.FC = () => {
  return (
    <View
      style={[
        Cstyles.SectionStyle,
        {
          marginTop: 10,
          display: 'flex',
          flexDirection: 'row',
          width: 340,
        },
      ]}
    >
      <Image style={{ width: 30, height: 30 }} source={require('../../../public/images/error.png')} />
      <Text style={{ color: '#ffffff', fontSize: 16 }}> Аналізи не знайдено</Text>
    </View>
  );
};
