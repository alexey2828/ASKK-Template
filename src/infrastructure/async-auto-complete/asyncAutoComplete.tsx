import React, { ReactElement, useContext, useEffect, useRef, useState } from 'react';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { Loader } from '../../component-ui/loader/Loader';
import { IHydraGet, TMember } from '../api-platform';
import { Text } from 'react-native';
import { ETitleMessage } from '../const/message';
import { getQueryString, TGetParameter } from '../custom-query-string/custom-query-string';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { Image } from 'react-native';
import { findStringValueInObj } from '../utils/find-string-value-in-obj';
import { useHttp } from '../../hooks/useHttp';
import { TITLES_AUTOCOMPLETE } from './const/titles';
import { AuthContext } from '../context/auth-context';
import { INPUT_LAG } from '../const/input';

type TProp<T> = {
  entity: T | null;
};

export interface TAutocompleteCard<T> {
  (prop: TProp<T>): JSX.Element;
}
type TAsyncAutoComplete<T> = {
  title: string;
  pathname: string;
  value?: string;
  fieldName: string;
  searchParameters?: TGetParameter;
  renderCard?: TAutocompleteCard<T>;
  isNoValid?: boolean;
  helperText?: string;
  onSelectedEntities: (entities: T | null) => void;
  isEmptyData?: string;
};

export function AsyncAutoComplete<T extends TMember>({
  pathname,
  searchParameters,
  fieldName,
  title,
  value = '',
  onSelectedEntities,
  renderCard,
  isNoValid = false,
  helperText = '',
  isEmptyData = '',
}: TAsyncAutoComplete<T>): ReactElement {
  const [url, setUrl] = useState(getQueryString(pathname, searchParameters || {}));
  const [searchValue, setSearchValue] = useState<string>(value);
  const [list, setList] = useState<T[]>([]);
  const [focus, setFocus] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState(!!value);

  const { token } = useContext(AuthContext);
  const { data, updateResponse, isLoading, error } = useHttp<IHydraGet<T>>();
  const refSearchValue = useRef<string>('');

  const onSelect = (index: number): void => {
    setSearchValue(findStringValueInObj(fieldName, list[index]));
    if (list[index]) {
      onSelectedEntities(list[index]);
      setIsSelected(true);
    }
  };

  const onNotSelect = () => {
    setIsSelected(false);
    onSelectedEntities(null);
  };

  const onChangeSearchValue = (searchValue: string): void => {
    setSearchValue(searchValue);
    onNotSelect();
  };

  const resetChoice = (): void => {
    setSearchValue('');
    onNotSelect();
  };

  useEffect(() => {
    if (refSearchValue.current !== '' && !isSelected) {
      const timer = setTimeout(() => {
        const newSearchParameters = {
          ...searchParameters,
          [fieldName]: searchValue,
        };
        const url = getQueryString(pathname, newSearchParameters);
        setUrl(url);
      }, INPUT_LAG);

      return (): void => {
        clearInterval(timer);
      };
    }
    setIsSelected(value === searchValue);
    refSearchValue.current = searchValue;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  useEffect(() => {
    if (url && focus) {
      setList([]);
      updateResponse({ url });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, token, focus]);

  useEffect(() => {
    if (data && !error) {
      setList(data['hydra:member']);
    }
  }, [data, error]);

  useEffect(() => {
    if (value) {
      setSearchValue(value);
    }
  }, [value]);

  return (
    <>
      <Autocomplete
        placeholder={title}
        onFocus={(): void => {
          setFocus(true);
        }}
        placeholderTextColor="#a1a1a1"
        onChangeText={onChangeSearchValue}
        accessoryRight={renderCloseIcon(resetChoice)}
        value={searchValue}
        style={{
          backgroundColor: '#323232',
          color: '#ffffff',
          marginTop: 10,
          borderRadius: 10,
          width: '100%',
        }}
        onSelect={onSelect}
      >
        {renderList({ isLoading, list, fieldName, renderCard })}
      </Autocomplete>
      {error && renderError()}
      {!list.length && !isSelected ? (
        <Text style={{ color: '#a1a1a1' }}>{isEmptyData || TITLES_AUTOCOMPLETE.DataNotFound}</Text>
      ) : (
        isNoValid && <Text style={{ color: '#ff2400' }}>{helperText}</Text>
      )}
    </>
  );
}

type TRenderList<T> = {
  isLoading: boolean;
  list: T[];
  fieldName?: string;
  renderCard?: TAutocompleteCard<T>;
};

function renderError(): JSX.Element {
  return <Text style={{ color: 'red' }}>{ETitleMessage.noDataSearch}</Text>;
}

function renderLoader(): JSX.Element {
  return <Loader />;
}

function renderList<T extends TMember>({ isLoading, list, fieldName, renderCard }: TRenderList<T>): JSX.Element[] {
  return (isLoading ? [{} as T] : list).map((entity, index) => {
    const title = !isLoading && fieldName && !renderCard ? findStringValueInObj(fieldName, entity) : undefined;
    const accessoryLeft = isLoading ? renderLoader() : renderCard && renderCard({ entity });
    return (
      <AutocompleteItem
        style={{ backgroundColor: '#292929' }}
        key={index}
        title={title}
        accessoryLeft={accessoryLeft}
        disabled={isLoading}
      />
    );
  });
}

function renderCloseIcon(resetChoice: () => void): JSX.Element {
  return (
    <TouchableWithoutFeedback onPress={resetChoice}>
      <Image style={{ width: 25, height: 25 }} source={require('../../../public/images/delete.png')} />
    </TouchableWithoutFeedback>
  );
}
