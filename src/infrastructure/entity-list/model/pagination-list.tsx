import React from 'react';
import { THydraView } from '../../api-platform';
import { Directions, FlingGestureHandler, State } from 'react-native-gesture-handler';
import { ETitles } from '../const/titles';
import { parseUrl } from '../../custom-query-string/custom-query-string';
import { styles } from '../entity-list.styles';
import { Text, View } from 'react-native';

type TPaginationList = {
  view: THydraView;
  onClick: (str: string) => void;
  url: string;
  onReset: () => void;
};

export const PaginationList: React.FC<TPaginationList> = ({ view, onClick, url, onReset}) => {
  const onPress = (str: string): void => {
    onClick(str);
  };


  const previous = view?.['hydra:previous'];
  const next = view?.['hydra:next'];
  const last = view?.['hydra:last'] || '1';

  const renderPage = (url: string): string => {
    const page = parseUrl(url).query?.page;
    if (typeof page === 'string') {
      return page;
    }
    return '1';
  };

  return (
    <>
      {view && (
        <>
        <FlingGestureHandler
          direction={Directions.DOWN}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              onReset();
            }
          }}
        >
        <FlingGestureHandler
          direction={Directions.LEFT}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE && next) {
              onPress(next);
            }
          }}
        >
          <FlingGestureHandler
            direction={Directions.RIGHT}
            onHandlerStateChange={({ nativeEvent }) => {
              if (nativeEvent.state === State.ACTIVE && previous) {
                onPress(previous);
              }
            }}
          >
            <View style={styles.swipablePlace}>
              <Text style={styles.pageTitle}>
                {ETitles.PAGE} - {renderPage(url)} / {renderPage(last)}
              </Text>
            </View>
          </FlingGestureHandler>
        </FlingGestureHandler>
        </FlingGestureHandler>
        </>
      )}
    </>
  );
};
