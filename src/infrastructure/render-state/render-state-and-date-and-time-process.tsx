import { styles } from 'infrastructure/style/render-state-style';
import moment from 'moment';
import React from 'react';
import { Text, View, ViewStyle } from 'react-native';
import { TimeProcessViewStateEntity } from 'time-process/time-process-view-state-entity/time-process-view-state-entity';
import { renderState } from './render-state';

export const renderStateAndDateAndTimeProcess = (
  stateText: string,
  dateStr: string | null | undefined,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: Record<string, any>,
  style: ViewStyle,
) => {
  const date = dateStr ? moment(dateStr).format('DD/MM/YYYY, hh:mm:ss').toLocaleString() : '';
  return (
    <View>
      {renderState(stateText, style)}
      <Text style={styles.RenderStateText}>{date}</Text>
      <TimeProcessViewStateEntity data={data} />
    </View>
  );
};
