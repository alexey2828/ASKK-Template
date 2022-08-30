import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { API_MIXING_TYPE_SHORT_URL } from '../../../infrastructure/const/urls';
import { AsyncAutoComplete } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { IMixing, isMixing } from '../../../mixing';
import { MixingAutocompleteCard } from '../../../mixing/ui/mixing-card/mixing-card';
import { Input } from '@ui-kitten/components/ui';
import { isStringCommon } from '../../../infrastructure/utils/validate/validate-string-common';
import { EntityFromScanner } from '../../../infrastructure/entity-from-scanner/entity-from-scanner';
import { EState } from '../../../mixing/const/choose-ua-title-transition-state';
import { EFields } from '../const/fields';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { IUser } from '../../../users/entity/user';
import { TITLES_TZP_DETAIL } from '../../tzp-detail/const/titles';
import { TITLES_MIXING } from '../../../mixing/const/titles';
import { TITLES_AUTOCOMPLETE } from '../../../infrastructure/async-auto-complete/const/titles';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../../users/model/search-user-apparatchik';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { LockButton } from 'component-ui/buttons/lock-button';

type TApplyKMDto = {
  mixingKm1Id: string;
  detailNumber: string;
  masterUserId: string;
  apparatchikUserId: string;
};

const leughtValidParam = {
  maxLength: 255,
  minLength: 1,
};

interface ISearchParametersMixingKm1 extends TGetParameter {
  state: string;
  'mixingType.mixingTypeAbstract.workflowName': string;
}

const searchParametersMixingKm1: ISearchParametersMixingKm1 = {
  state: EState.READY_FOR_USE,
  'mixingType.mixingTypeAbstract.workflowName': 'mixing_km1',
};

export const ApplyKM = ({ route }: INavigate<ITzpPressform, TApplyKMDto>): ReactElement => {
  const { entity } = route.params;
  const [detailNumber, setDetailNumber] = useState('');
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [validDetailNumber, setValidDetailNumber] = useState(isStringCommon(detailNumber, leughtValidParam));
  const [mixingKm1, setMixingKm1] = useState<IMixing | null>(null);
  const [isValidMixingKm1, setIsValidMixingKm1] = useState(false);
  const [mixingKm1Dto, setMixingKm1Dto] = useState<TApplyKMDto | null>(null);
  const [errorScanMixing, setErrorScanMixing] = useState('');

  const onScanMixingKm1 = (entity: IMixing): void => {
    if (isMixing(entity) && searchParametersMixingKm1) {
      if (checkValidEntityFromScan(searchParametersMixingKm1, entity)) {
        setErrorScanMixing('');
        setMixingKm1(entity);
      }
    }
  };

  const resetErrorScanMixing = () => {
    setErrorScanMixing('');
  };

  const onSelectedMixingKm1 = (mixingKm1: IMixing | null): void => {
    setMixingKm1(mixingKm1);
  };
  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  useEffect(() => {
    setIsValidMixingKm1(!!mixingKm1);
  }, [mixingKm1]);

  useEffect(() => {
    setValidDetailNumber(isStringCommon(detailNumber, leughtValidParam));
  }, [detailNumber]);

  useEffect(() => {
    if (isValidMixingKm1 && apparatchikUser && masterUser && validDetailNumber.valid) {
      setMixingKm1Dto({
        detailNumber: detailNumber,
        mixingKm1Id: String(mixingKm1?.id),
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setMixingKm1Dto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidMixingKm1, apparatchikUser, masterUser, validDetailNumber]);

  if (!isTzpPressform(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanMixingKm1}
        noValidEntity={errorScanMixing}
        resetNoValidEntity={resetErrorScanMixing}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_TZP_PRESSFORM.pressformNumber}:
              <Text style={CNstyles.defaultPurple}> {entity?.pressformNumber}</Text>
            </Text>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_MIXING.title} {'(КМ-1)'}:<Text style={CNstyles.defaultPurple}> {mixingKm1?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_MIXING.title}
            pathname={API_MIXING_TYPE_SHORT_URL}
            renderCard={MixingAutocompleteCard}
            searchParameters={searchParametersMixingKm1}
            onSelectedEntities={onSelectedMixingKm1}
            isNoValid={!isValidMixingKm1}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <Input
            placeholderTextColor="#a1a1a1"
            onChangeText={(val): void => setDetailNumber(val)}
            style={CNstyles.CNtextInputc}
            placeholder={TITLES_TZP_DETAIL.detailNumber}
          />
          {!validDetailNumber.valid ? <Text style={{ color: 'red' }}>{validDetailNumber.message}</Text> : null}

          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
          <View style={CNstyles.defaultHeight} />
        </ScrollView>
        {mixingKm1Dto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
              dtoTransitions={mixingKm1Dto}
              endpoint={endpointTransition.TRANSITION_APPLY_KM1}
              entity={entity}
              title={ETransitionsUK.TRANSITION_APPLY_KM1 + '?'}
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
