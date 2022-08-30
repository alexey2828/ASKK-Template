import React from 'react';
import { View, ViewStyle } from 'react-native';
import { TimeProcessViewStateEntity } from 'time-process/time-process-view-state-entity/time-process-view-state-entity';
import { renderState } from './render-state';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderStateAndTimeProcess = (stateText: string, data: Record<string, any>, style: ViewStyle) => {
  return (
    <View>
      {renderState(stateText, style)}
      <TimeProcessViewStateEntity data={data} />
    </View>
  );
};
