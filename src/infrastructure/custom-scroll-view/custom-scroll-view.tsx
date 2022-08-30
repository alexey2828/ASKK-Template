import React from 'react';
import { NativeScrollEvent, ScrollView, View } from 'react-native';

const startContentOffset = JSON.stringify({
  y: 0,
  x: 0,
});

type TCustomScrollView = {
  onScrollToTop?: () => void;
};

export const CustomScrollView: React.FC<TCustomScrollView> = ({ children, onScrollToTop }) => {
  let refContentOffset: string = startContentOffset;

  const updateForScroll = (event: NativeScrollEvent) => {
    const contentOffset = JSON.stringify(event.contentOffset);
    if (refContentOffset === startContentOffset && contentOffset === startContentOffset && onScrollToTop) {
      onScrollToTop();
    }
  };

  const startScroll = (event: NativeScrollEvent) => {
    refContentOffset = JSON.stringify(event.contentOffset);
  };

  return (
    <View style={{ minHeight: 500 }}>
      <ScrollView
        overScrollMode="always"
        onMomentumScrollEnd={synthEvent => updateForScroll(synthEvent.nativeEvent)}
        onScrollBeginDrag={synthEvent => startScroll(synthEvent.nativeEvent)}
      >
        {children}
      </ScrollView>
    </View>
  );
};
