import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { View, TextInput } from 'react-native';
import { PaginationList } from './pagination-list';
import { IHydraGet, TMember } from '../../api-platform';
import { Loader } from '../../../component-ui/loader/Loader';
import { CNstyles, Cstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { IListItem } from '..';
import { styles } from '../entity-list.styles';
import { INavigate, TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { ENavigationName } from '../../const/navigation-name';
import { useHttp } from '../../../hooks/useHttp';
import { getQueryString, TGetParameter } from '../../custom-query-string/custom-query-string';
import { AuthContext } from '../../context/auth-context';
import { ServerErr } from '../../../component-ui/viewError/server-error';
import { INPUT_LAG } from 'infrastructure/const/input';
import { CustomScrollView } from 'infrastructure/custom-scroll-view/custom-scroll-view';
import { MainTitles } from 'const/titles-main';

interface IEntityList<T> extends INavigate<null> {
  children: React.FC<IListItem<T>>;
  getParameters: TGetParameter;
  searchFieldName: string;
}

export function EntityList<T>({
  children: ListItem,
  route,
  getParameters,
  searchFieldName,
}: IEntityList<T>): ReactElement {
  const [name, setName] = useState('');
  const [url, setUrl] = useState(getQueryString(route.name, getParameters));
  const [unmount, setUnmount] = useState(false);

  const { goTo } = useNavigate<TMember>();
  const { data, isLoading, updateResponse, error, resetError } = useHttp<IHydraGet<T>>();
  const { token } = useContext(AuthContext);
  const refName = useRef<string>('');

  const openDetail = (member: TMember): void => {
    const argsNavigateTo: TArgsNavigate<TMember, undefined> = {
      route: ENavigationName.DETAILS_SCREEN,
      params: {
        entity: member,
      },
    };
    goTo(argsNavigateTo);
  };

  const onChangeName = (name: string): void => {
    setName(name);
  };

  const onChangePage = (url: string): void => {
    setUrl(url);
  };

  const onReset = (): void => {
    resetError();
  };

  const onScrollToTop = () => {
    if (!isLoading && url) {
      updateResponse({ url });
    }
  };

  useEffect(() => {
    return () => {
      setUnmount(true);
    };
  }, []);

  useEffect(() => {
    if (refName.current !== '') {
      const timer = setTimeout(() => {
        const searchByName: Record<string, string> = {
          [searchFieldName]: name,
        };
        const url = getQueryString(route.name, {
          ...getParameters,
          ...searchByName,
        });
        setUrl(url);
      }, INPUT_LAG);

      return (): void => {
        clearInterval(timer);
      };
    }
    refName.current = name;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    updateResponse({ url });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, url]);

  if (unmount) {
    return <></>;
  }

  return (
    <View style={Cstyles.containerc}>
      <View style={styles.childContainer}>
        <View style={{ marginTop: -20 }}>
          <View style={{ width: 350 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={Cstyles.searchContainer}>
                <TextInput
                  placeholder="Знайти"
                  placeholderTextColor="#a1a1a1"
                  maxLength={100}
                  value={name}
                  onChangeText={(text): void => onChangeName(text)}
                  style={Cstyles.inputSort}
                />
              </View>
            </View>
          </View>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {error && <ServerErr message={MainTitles.SERVER_FAILED} onReset={onReset} />}
              <View style={styles.listView}>
                {data?.['hydra:view'] && (
                  <PaginationList
                    onClick={onChangePage}
                    onReset={() => {
                      updateResponse({ url });
                    }}
                    view={data['hydra:view']}
                    url={url}
                  />
                )}
                <View style={CNstyles.defaultHeight} />
                <View style={CNstyles.defaultHeight} />
                <CustomScrollView onScrollToTop={onScrollToTop}>
                  {data?.['hydra:member'].map(member => {
                    return (
                      <ListItem
                        key={member.id}
                        data={member}
                        onPress={(): void => {
                          openDetail(member);
                        }}
                      />
                    );
                  })}
                  <View style={{ height: 50 }} />
                </CustomScrollView>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
}
