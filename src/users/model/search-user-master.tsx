import React, { useContext, useEffect, useState } from 'react';
import { BuildingContext } from '../../infrastructure/context/building-context';
import { TGetParameter } from '../../infrastructure/custom-query-string/custom-query-string';
import { AsyncAutoComplete } from '../../infrastructure/async-auto-complete/asyncAutoComplete';
import { UserAutocompleteCard } from '../ui/user-card/user-autocomplete-card';
import { ETitlesUser } from '../const/titles';
import { EFieldsUser } from '../const/fields';
import { API_USERS_SHORT_URL } from '../../infrastructure/const/urls';
import { TITLES_AUTOCOMPLETE } from '../../infrastructure/async-auto-complete/const/titles';
import { IUser } from '../entity/user';

type TSearchUserMaster = {
  masterUser: IUser | null;
  isNoValid: boolean;
  onSelected: (masterUser: IUser | null) => void;
};

export const SearchUserMaster: React.FC<TSearchUserMaster> = ({ masterUser, onSelected, isNoValid }) => {
  const [searchParameters, setSearchParameters] = useState<TGetParameter | null>(null);

  const { buildingName } = useContext(BuildingContext);

  useEffect(() => {
    if (buildingName) {
      setSearchParameters({
        'position.name': 'Майстер',
        'locatedAt.name': buildingName,
        items: '100',
      });
    }
  }, [buildingName]);

  return (
    <>
      {!!searchParameters && (
        <AsyncAutoComplete
          title={ETitlesUser.CHOOSE_MASTER}
          value={masterUser?.lastName}
          pathname={API_USERS_SHORT_URL}
          renderCard={UserAutocompleteCard}
          searchParameters={searchParameters}
          onSelectedEntities={onSelected}
          isNoValid={isNoValid}
          helperText={TITLES_AUTOCOMPLETE.noDataInput}
          fieldName={EFieldsUser.LAST_NAME}
        />
      )}
    </>
  );
};
