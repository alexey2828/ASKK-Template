import { styles } from 'infrastructure/style/render-state-style';
import moment from 'moment';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { renderState } from './render-state';

export const renderStateAndCommentAndDate = (
  stateText: string,
  comment: string | null | undefined,
  dateStr: string | null | undefined,
  style: ViewStyle,
) => {
  const date = dateStr ? moment(dateStr).format('DD/MM/YYYY, hh:mm:ss').toLocaleString() : '';
  const charComment = comment ? ':' : '';
  return (
    <View>
      {renderState(`${stateText}${charComment}`, style)}
      <Text style={styles.RenderStateText}>{date}</Text>
      {comment && <Text style={styles.RenderStateText}>{`${comment}`}</Text>}
    </View>
  );
};
