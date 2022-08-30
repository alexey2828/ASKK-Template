import React, { useContext, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { INavigate } from '../../hooks/use-navigate';
import { styles } from '../../component-ui/common-block-styles.styles';
import { TMember } from '../api-platform';
import { choicePopupDetail } from '../choose-popup-detail/choose-popup-detail';
import { MainTitles } from '../../const/titles-main';
import { useHttp } from '../../hooks/useHttp';
import { Loader } from '../../component-ui/loader/Loader';
import { ServerErr } from '../../component-ui/viewError/server-error';
import { AuthContext } from '../context/auth-context';
import { CustomScrollView } from '../custom-scroll-view/custom-scroll-view';

export const DetailsScreen: React.FC<INavigate<TMember>> = ({ route }) => {
  const url = route.params.entity?.['@id'];

  const [entity, setEntity] = useState<TMember | null>(null);

  const { data, error, isLoading, updateResponse, resetError } = useHttp<TMember>();
  const { token } = useContext(AuthContext);

  const onReset = (): void => {
    resetError();
  };

  const onScrollToTop = () => {
    if (!isLoading && url) {
      updateResponse({ url });
    }
  };

  useEffect(() => {
    setEntity(null);
  }, [route]);

  useEffect(() => {
    if (url && !entity) {
      updateResponse({ url });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, url, entity]);

  useEffect(() => {
    if (data && !error) {
      setEntity(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <View style={styles.ScreenContainer}>
        <View style={{ margin: 15, height: 480 }}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && <ServerErr message={MainTitles.SERVER_FAILED} onReset={onReset} />}
              <CustomScrollView onScrollToTop={onScrollToTop}>
                {(entity && !Array.isArray(entity) && choicePopupDetail(entity)) || (
                  <Text style={{ color: '#ffffff' }}>{MainTitles.NO_DATA}</Text>
                )}
              </CustomScrollView>
            </>
          )}
        </View>
      </View>
    </>
  );
};
