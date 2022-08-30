import { styles } from 'component-ui/common-block-styles.styles';
import { ETitles } from 'infrastructure/confirm-modal/const/titles';
import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

export const LockButton: React.FC = () => {
  return (
    <View>
      <TouchableHighlight onPress={(): void => {}}>
        <View style={styles.LockBtn}>
          <Text style={styles.LockBtnText}>{ETitles.ENTER}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};
