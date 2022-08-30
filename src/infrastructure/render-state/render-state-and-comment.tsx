import { styles } from 'infrastructure/style/render-state-style';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { renderState } from './render-state';

export const renderStateAndComment = (stateText: string, comment: string | null | undefined, style: ViewStyle) => {
  const charComment = comment ? ':' : '';
  return (
    <View>
      {renderState(`${stateText}${charComment}`, style)}
      {typeof comment === 'string' && <Text style={styles.RenderStateText}>{`${comment}`}</Text>}
      {Array.isArray(comment) &&
        comment.map(item => {
          return (
            <Text style={styles.RenderStateText} key={item}>
              {item}
            </Text>
          );
        })}
    </View>
  );
};
