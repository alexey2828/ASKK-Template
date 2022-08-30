import { styles } from 'infrastructure/style/render-state-style';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { TimeProcessViewStateEntity } from 'time-process/time-process-view-state-entity/time-process-view-state-entity';
import { renderState } from './render-state';

export const renderStateAndCommentAndTimeProcess = (
  stateText: string,
  comment: string | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  style: ViewStyle,
) => {
  const charComment = comment ? ':' : '';
  return (
    <View>
      {renderState(`${stateText}${charComment}`, style)}
      {comment ? <Text style={styles.RenderStateText}>{`${comment}`}</Text> : null}
      <TimeProcessViewStateEntity data={data} />
    </View>
  );
};
