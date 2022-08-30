import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { IUser } from 'users/entity/user';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { MainTitles } from 'const/titles-main';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ScrollView, Text, View } from 'react-native';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_ENGINE_CASE } from '../const/title';
import { API_PREMISES_SHORT_URL, API_TZP_VISUAL_DEFECTS_SHORT_URL } from 'infrastructure/const/urls';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { EFields } from 'buildings/const/fields';
import { styles } from 'component-ui/common-block-styles.styles';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { TITLES_PREMISES } from 'plant/premises/const/title';
import { IPremises } from 'plant/premises/entity/premises';
import { ITzpVisualDefect } from '../tzp-visual-defect.ts/entity/tzp-visual-defect';
import { TITLES_TZP_VISUAL_DEFECT } from '../tzp-visual-defect.ts/const/title';
import { Input } from '@ui-kitten/components/ui';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { PremisesAutocompleteCard } from 'plant/premises/premises-card/premises-card';
import { LockButton } from 'component-ui/buttons/lock-button';

type TFixTzpVisualDefectDto = {
  premisesOfTheBuildingId: string;
  masterUserId: string;
  apparatchikUserId: string;
  tzpVisualDefectId: string;
  typeOfCorrectiveWork: string;
};

export const FixTzpVisualDefect = ({ route }: INavigate<IEngineCase, TFixTzpVisualDefectDto>): ReactElement => {
  const { entity } = route.params;
  const [tzpVisualDefect, setTzpVisualDefect] = useState<ITzpVisualDefect | null>(null);
  const [typeOfCorrectiveWork, setTypeOfCorrectiveWork] = useState('');
  const [validTypeOfCorrectiveWork, setValidTypeOfCorrectiveWork] = useState(isStringCommon(typeOfCorrectiveWork));
  const [premises, setPremises] = useState<IPremises | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [fixTzpVisualDefectDto, setTFixTzpVisualDefectDto] = useState<TFixTzpVisualDefectDto | null>(null);
  const [errorScantTzpVisualDefect, setErrorScanTzpVisualDefect] = useState('');
  const [errorScanPremises, setErrorScanPremises] = useState('');

  const onScanTzpVisualDefect = (entity: ITzpVisualDefect): void => {
    setErrorScanTzpVisualDefect('');
    setTzpVisualDefect(entity);
  };

  const resetErrorScanTzpVisualDefect = () => {
    setErrorScanTzpVisualDefect('');
  };

  const onSelectedTzpVisualDefect = (TzpVisualDefect: ITzpVisualDefect | null): void => {
    setTzpVisualDefect(TzpVisualDefect);
  };

  const onScanPremises = (entity: IPremises): void => {
    setErrorScanPremises('');
    setPremises(entity);
  };

  const resetErrorScanPremises = () => {
    setErrorScanPremises('');
  };

  const onSelectedPremises = (Premises: IPremises | null): void => {
    setPremises(Premises);
  };

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setValidTypeOfCorrectiveWork(isStringCommon(typeOfCorrectiveWork));
  }, [typeOfCorrectiveWork]);

  useEffect(() => {
    if (premises && validTypeOfCorrectiveWork.valid && apparatchikUser && masterUser && tzpVisualDefect) {
      setTFixTzpVisualDefectDto({
        premisesOfTheBuildingId: premises.id,
        masterUserId: masterUser.id,
        apparatchikUserId: apparatchikUser.id,
        tzpVisualDefectId: tzpVisualDefect.id,
        typeOfCorrectiveWork: typeOfCorrectiveWork,
      });
    } else {
      setTFixTzpVisualDefectDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validTypeOfCorrectiveWork, apparatchikUser, masterUser, tzpVisualDefect, premises]);

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
        onScanEntity={onScanPremises}
        noValidEntity={errorScanPremises}
        resetNoValidEntity={resetErrorScanPremises}
      />
      <EntityFromScanner
        onScanEntity={onScanTzpVisualDefect}
        noValidEntity={errorScantTzpVisualDefect}
        resetNoValidEntity={resetErrorScanTzpVisualDefect}
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
            title={TITLES_TZP_VISUAL_DEFECT.title}
            pathname={API_TZP_VISUAL_DEFECTS_SHORT_URL}
            onSelectedEntities={onSelectedTzpVisualDefect}
            isNoValid={!tzpVisualDefect}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setTypeOfCorrectiveWork(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_VISUAL_DEFECT.typeOfCorrectiveWork}
          />
          {!validTypeOfCorrectiveWork.valid ? (
            <Text style={{ color: 'red' }}>{validTypeOfCorrectiveWork.message}</Text>
          ) : null}
          <AsyncAutoComplete
            title={TITLES_PREMISES.title}
            pathname={API_PREMISES_SHORT_URL}
            renderCard={PremisesAutocompleteCard}
            onSelectedEntities={onSelectedPremises}
            isNoValid={!premises}
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
        {fixTzpVisualDefectDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={fixTzpVisualDefectDto}
              endpoint={endpointTransition.FIX_TZP_VISUAL_DEFECT}
              entity={entity}
              title={ETransitionsUK.commandFixTzpVisualDefect + '?'}
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
