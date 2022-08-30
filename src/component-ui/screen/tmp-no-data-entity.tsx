import React from 'react';
import { View } from 'react-native';
import { Warning } from '../viewError/warning';
import { Lstyles } from './screens-styles/screenStyle.styles';

export const NoDataEntity: React.FC = () => {
  const message = 'У розробці';
  return (
    <View style={Lstyles.container}>
      <Warning message={message} />
    </View>
  );
};
