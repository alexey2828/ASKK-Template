import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { TITLES_ENGINE_CASE } from '../const/title';
import { MainTitles } from 'const/titles-main';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IUser } from 'users/entity/user';
import { isStringCommon } from 'infrastructure/utils/validate/validate-string-common';
import { Input } from '@ui-kitten/components/ui';
import { isPositiveStringNumber } from 'infrastructure/utils/validate/validate-positive-string-number';
import { IMixing, isMixing } from 'mixing';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { EState } from 'mixing/const/choose-ua-title-transition-state';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_MIXING } from 'mixing/const/titles';
import { API_MIXING_TYPE_SHORT_URL } from 'infrastructure/const/urls';
import { MixingAutocompleteCard } from 'mixing/ui/mixing-card/mixing-card';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { EFields } from 'buildings/const/fields';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { LockButton } from 'component-ui/buttons/lock-button';

const searchParamForMixingKc = {
  state: EState.READY_FOR_USE,
  'mixingProcess.mixer.locatedAt.name': '516-1',
  'mixingType.mixingTypeAbstract.workflowName': 'mixing_kc',
};

type TDegreaseSurfaceOfTzpAndApplyKcDto = {
  mixingKcId: string;
  weightKc: number;
  masterUserId: string;
  apparatchikUserId: string;
  comment: string;
};

const lengthValidParam = {
  maxLength: 9,
  minLength: 1,
};

export const DegreaseSurfaceOfTzpAndApplyKc = ({
  route,
}: INavigate<IEngineCase, TDegreaseSurfaceOfTzpAndApplyKcDto>): ReactElement => {
  const { entity } = route.params;
  const [mixing, setMixing] = useState<IMixing | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [comment, setComment] = useState('');
  const [validComment, setValidComment] = useState(isStringCommon(comment));
  const [weight, setWeight] = useState('');
  const [errorScanMixing, setErrorScanMixing] = useState('');
  const [validWeight, setValidWeight] = useState(isPositiveStringNumber(weight, lengthValidParam));
  const [degreaseSurfaceOfTzpAndApplyKcDto, setDegreaseSurfaceOfTzpAndApplyKcDto] =
    useState<TDegreaseSurfaceOfTzpAndApplyKcDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  const onScanMixing = (entity: IMixing): void => {
    if (isMixing(entity) && searchParamForMixingKc) {
      if (checkValidEntityFromScan(searchParamForMixingKc, entity)) {
        setErrorScanMixing('');
        setMixing(entity);
      }
    }
  };

  const resetErrorScanMixing = () => {
    setErrorScanMixing('');
  };

  const onSelectedMixing = (Mixing: IMixing | null): void => {
    setMixing(Mixing);
  };

  useEffect(() => {
    setValidComment(isStringCommon(comment));
  }, [comment]);

  useEffect(() => {
    setValidWeight(isPositiveStringNumber(weight));
  }, [weight]);

  useEffect(() => {
    if (masterUser && apparatchikUser && mixing && validWeight.valid && comment) {
      setDegreaseSurfaceOfTzpAndApplyKcDto({
        mixingKcId: mixing?.id,
        comment: comment,
        weightKc: Number(weight),
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setDegreaseSurfaceOfTzpAndApplyKcDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterUser, apparatchikUser, validWeight, validWeight, mixing]);

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
        onScanEntity={onScanMixing}
        noValidEntity={errorScanMixing}
        resetNoValidEntity={resetErrorScanMixing}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ENGINE_CASE.name}:<Text style={CNstyles.defaultPurple}>{entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <ScrollView>
          <Input
            maxLength={9}
            keyboardType="numeric"
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => {
              setWeight(val.replace(',', '.'));
            }}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_ENGINE_CASE.weight}
          />
          {!validWeight.valid && <Text style={{ color: 'red' }}>{validWeight.message}</Text>}
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setComment(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_ENGINE_CASE.comment}
          />
          {!validComment.valid ? <Text style={{ color: 'red' }}>{validComment.message}</Text> : null}
          <AsyncAutoComplete
            title={TITLES_MIXING.title}
            pathname={API_MIXING_TYPE_SHORT_URL}
            renderCard={MixingAutocompleteCard}
            onSelectedEntities={onSelectedMixing}
            isNoValid={!mixing}
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
        <View style={CNstyles.defaultHeight} />
        {degreaseSurfaceOfTzpAndApplyKcDto ? (
          <GoNext
            routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
            dtoTransitions={degreaseSurfaceOfTzpAndApplyKcDto}
            endpoint={endpointTransition.DEGREASE_SURFACE_OF_TZP_AND_APPLY_KC}
            entity={entity}
            title={ETransitionsUK.commandDegreaseSurfaceOfTzpAndApplyKc + '?'}
          />
        ) : (
          <LockButton />
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
