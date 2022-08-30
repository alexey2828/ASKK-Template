import { styles } from 'infrastructure/style/render-state-style';
import moment from 'moment';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { renderState } from './render-state';

export const renderStateAndDate = (stateText: string, dateStr: string | null | undefined, style: ViewStyle) => {
  const date = dateStr ? moment(dateStr).format('DD/MM/YYYY, hh:mm:ss').toLocaleString() : '';
  return (
    <View>
      {renderState(stateText, style)}
      <Text style={styles.RenderStateText}>{date}</Text>
    </View>
  );
};
