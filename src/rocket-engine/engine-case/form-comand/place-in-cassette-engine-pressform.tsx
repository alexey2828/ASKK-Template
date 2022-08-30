import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ScrollView, Text, View } from 'react-native';
import { MainTitles } from 'const/titles-main';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { IUser } from 'users/entity/user';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { EFields } from 'buildings/const/fields';
import { styles } from 'component-ui/common-block-styles.styles';
import { API_CASSETS_ENGINE_PRESSFORM_SHORT_URL } from 'infrastructure/const/urls';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { TITLES_ENGINE_CASE } from '../const/title';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';

import {
  ICassetsEnginePressform,
  isCassetsEnginePressform,
} from 'materials/cassets-engine-pressform/entity/cassets-engine-pressform';
import { TITLES_CASSETTES_ENGINE_PRESSFORM } from 'materials/cassets-engine-pressform/const/titles';
import { CassetteEnginePressformAutocompleteCard } from 'materials/cassets-engine-pressform/ui/cassets-card/cassets-engine-pressform-card';
import { LockButton } from 'component-ui/buttons/lock-button';

const serchParametersCassetteEnginePressform = {
  state: 'STATE_IN_WAREHOUSE',
};

type TPlaceInCassetteEnginePressformDto = {
  masterUserId: string;
  apparatchikUserId: string;
  cassetteEnginePressformsId: string;
};

export const PlaceInCassetteEnginePressform = ({
  route,
}: INavigate<IEngineCase, TPlaceInCassetteEnginePressformDto>): ReactElement => {
  const { entity } = route.params;
  const [cassetteEnginePressform, setCassetteEnginePressform] = useState<ICassetsEnginePressform | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [placeInCassetteEnginePressformDto, setPlaceInCassetteEnginePressformDto] =
    useState<TPlaceInCassetteEnginePressformDto | null>(null);
  const [errorScanCassetteEnginePressform, setErrorScanCassetteEnginePressform] = useState('');

  const onScanCassetteEnginePressform = (entity: ICassetsEnginePressform): void => {
    if (isCassetsEnginePressform(entity) && serchParametersCassetteEnginePressform) {
      if (checkValidEntityFromScan(serchParametersCassetteEnginePressform, entity)) {
        setErrorScanCassetteEnginePressform('');
        setCassetteEnginePressform(entity);
      }
    }
  };

  const resetErrorScanCassetteEnginePressform = () => {
    setErrorScanCassetteEnginePressform('');
  };

  const onSelectedCassetteEnginePressform = (CassetteEnginePressform: ICassetsEnginePressform | null): void => {
    setCassetteEnginePressform(CassetteEnginePressform);
  };

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    if (apparatchikUser && masterUser && cassetteEnginePressform) {
      setPlaceInCassetteEnginePressformDto({
        masterUserId: masterUser.id,
        apparatchikUserId: apparatchikUser.id,
        cassetteEnginePressformsId: cassetteEnginePressform.id,
      });
    } else {
      setPlaceInCassetteEnginePressformDto(null);
    }
  }, [apparatchikUser, masterUser, cassetteEnginePressform]);

  if (!isEngineCase(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanCassetteEnginePressform}
        noValidEntity={errorScanCassetteEnginePressform}
        resetNoValidEntity={resetErrorScanCassetteEnginePressform}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.title}:<Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_CASSETTES_ENGINE_PRESSFORM.title}
            pathname={API_CASSETS_ENGINE_PRESSFORM_SHORT_URL}
            renderCard={CassetteEnginePressformAutocompleteCard}
            searchParameters={serchParametersCassetteEnginePressform}
            onSelectedEntities={onSelectedCassetteEnginePressform}
            isNoValid={!cassetteEnginePressform}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {placeInCassetteEnginePressformDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={placeInCassetteEnginePressformDto}
              endpoint={endpointTransition.PLACE_IN_CASSETTE_ENGINE_PRESSFORMS}
              entity={entity}
              title={ETransitionsUK.commandPlaceInCassetteEnginePressform + '?'}
            />
          </>
        ) : (
          <LockButton />
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
