import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Spinner } from '@ui-kitten/components';

const styles = StyleSheet.create({
  loading: {
    margin: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export const Loader: React.FC = () => {
  return (
    <View style={styles.loading}>
      <Spinner size="giant" />
    </View>
  );
};
