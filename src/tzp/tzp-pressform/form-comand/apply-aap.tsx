import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../../const/titles-main';
import { GoNext } from '../../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../../hooks/use-navigate';
import { API_MIXING_TYPE_SHORT_URL } from '../../../infrastructure/const/urls';
import { endpointTransition } from './const/endpoint-transition';
import { AsyncAutoComplete } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { TGetParameter } from '../../../infrastructure/custom-query-string/custom-query-string';
import { MixingAutocompleteCard } from '../../../mixing/ui/mixing-card/mixing-card';
import { IMixing, isMixing } from '../../../mixing';
import { EState } from '../../../mixing/const/choose-ua-title-transition-state';
import { EntityFromScanner } from '../../../infrastructure/entity-from-scanner/entity-from-scanner';
import { isTzpPressform, ITzpPressform } from '../entity/tzp-pressform/tzp-pressform';
import { EFields } from '../const/fields';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { TITLES_AUTOCOMPLETE } from '../../../infrastructure/async-auto-complete/const/titles';
import { TITLES_MIXING } from '../../../mixing/const/titles';
import { ScrollView } from 'react-native-gesture-handler';
import { IUser } from '../../../users/entity/user';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { SearchUserMaster } from '../../../users/model/search-user-master';
import { SearchUserApparatchik } from '../../../users/model/search-user-apparatchik';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { LockButton } from 'component-ui/buttons/lock-button';

type TApplyAAPDto = {
  mixingAapId: string;
  masterUserId: string;
  apparatchikUserId: string;
};

interface ISearchParametersMixingAap extends TGetParameter {
  state: string;
  'mixingType.mixingTypeAbstract.workflowName': string;
}

const searchParametersMixingAap: ISearchParametersMixingAap = {
  state: EState.READY_FOR_USE,
  'mixingType.mixingTypeAbstract.workflowName': 'mixing_aap',
};

export const ApplyAAP = ({ route }: INavigate<ITzpPressform, TApplyAAPDto>): ReactElement => {
  const { entity } = route.params;

  const [mixingAap, setMixingAap] = useState<IMixing | null>(null);
  const [isValidMixingAap, setIsValidMixingAap] = useState(false);
  const [mixingAapDto, setMixingAapDto] = useState<TApplyAAPDto | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [errorScanMixing, setErrorScanMixing] = useState('');

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  const onScanMixingAap = (entity: IMixing): void => {
    if (isMixing(entity) && searchParametersMixingAap) {
      if (checkValidEntityFromScan(searchParametersMixingAap, entity)) {
        setErrorScanMixing('');
        setMixingAap(entity);
      }
    }
  };

  const resetErrorScanMixing = () => {
    setErrorScanMixing('');
  };

  const onSelectedMixingAap = (mixingAap: IMixing | null): void => {
    setMixingAap(mixingAap);
  };

  useEffect(() => {
    setIsValidMixingAap(!!mixingAap);
  }, [mixingAap]);

  useEffect(() => {
    if (isValidMixingAap && apparatchikUser && masterUser) {
      setMixingAapDto({
        mixingAapId: String(mixingAap?.id),
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setMixingAapDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidMixingAap, apparatchikUser, masterUser]);

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
        onScanEntity={onScanMixingAap}
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
              {TITLES_MIXING.title}:<Text style={CNstyles.defaultPurple}> {mixingAap?.name}</Text>
            </Text>
          </View>
        </View>
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_MIXING.title}
            pathname={API_MIXING_TYPE_SHORT_URL}
            renderCard={MixingAutocompleteCard}
            searchParameters={searchParametersMixingAap}
            onSelectedEntities={onSelectedMixingAap}
            isNoValid={!mixingAap}
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
        {mixingAapDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_TZP_PRESSFORM}
              dtoTransitions={mixingAapDto}
              endpoint={endpointTransition.TRANSITION_APPLY_AAP}
              entity={entity}
              title={ETransitionsUK.TRANSITION_APPLY_AAP + '?'}
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
