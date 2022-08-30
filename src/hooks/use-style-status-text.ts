import { TTitleEnToUa } from 'infrastructure/interface';
import { ViewStyle } from 'react-native';

export const useStyleStatusText = (status: string, choiceColorTextStatus: TTitleEnToUa): ViewStyle => {
  const backgroundColor = choiceColorTextStatus[status] || 'black';
  return {
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor,
    borderRadius: 5,
  };
};
