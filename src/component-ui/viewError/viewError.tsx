import React from 'react';
import { Text, View } from 'react-native';
import { styles } from './view-error-styles.styles';

interface IViewError {
  message: string;
}

export const ViewError: React.FC<IViewError> = ({ message }) => {
  return (
    <View>
      <Text style={styles.itemInfo}>
        Error message: <Text style={styles.itemInfo}>{message}</Text>
      </Text>
    </View>
  );
};
