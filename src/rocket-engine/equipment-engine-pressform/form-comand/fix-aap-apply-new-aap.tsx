import React, { ReactElement, useEffect, useState } from 'react';

import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { INavigate } from 'hooks/use-navigate';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { API_MIXING_TYPE_SHORT_URL } from 'infrastructure/const/urls';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { EFields } from 'buildings/const/fields';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { MixingAutocompleteCard } from 'mixing/ui/mixing-card/mixing-card';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { EState, ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IMixing, isMixing } from 'mixing/entity/mixing/mixing';
import { IUser } from 'users/entity/user';
import { TITLES_MIXING } from 'mixing/const/titles';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { LockButton } from 'component-ui/buttons/lock-button';

type TFixAapApplyNewAap = {
  masterUserId: string;
  apparatchikUserId: string;
  fixedAapId: string;
};

const searchParametersFixAap = {
  'mixingProcess.mixer.locatedAt.name': '516-1',
  'mixingType.mixingTypeAbstract.workflowName': 'mixing_aap',
  state: EState.READY_FOR_USE,
};

export const EquipmentEnginePressformFixAapApplyNewAap = ({
  route,
}: INavigate<IEquipmentEnginePressform, TFixAapApplyNewAap>): ReactElement => {
  const { entity } = route.params;

  const [mixingAap, setMixingAap] = useState<IMixing | null>(null);
  const [mixingAapDto, setMixingAapDto] = useState<TFixAapApplyNewAap | null>(null);
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
    if (isMixing(entity) && searchParametersFixAap) {
      if (checkValidEntityFromScan(searchParametersFixAap, entity)) {
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
    if (mixingAap && apparatchikUser && masterUser) {
      setMixingAapDto({
        fixedAapId: String(mixingAap?.id),
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setMixingAapDto(null);
    }
  }, [mixingAap, apparatchikUser, masterUser]);

  if (!isEquipmentEnginePressform(entity)) {
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
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: <Text style={CNstyles.defaultPurple}> {entity?.name}</Text>
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
            searchParameters={searchParametersFixAap}
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
              routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
              dtoTransitions={mixingAapDto}
              endpoint={endpointTransition.FIX_AAP_APPLY_NEW_AAP}
              entity={entity}
              title={ETransitionsUK.commandFixAapApplyNewAap + '?'}
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
