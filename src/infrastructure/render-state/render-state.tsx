import React from 'react';
import { Text, View, ViewStyle } from 'react-native';

export const renderState = (stateText: string, style: ViewStyle) => {
  return (
    <View style={style}>
      <Text>{stateText}</Text>
    </View>
  );
};
