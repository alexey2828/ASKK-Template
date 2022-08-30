import { EFields } from 'buildings/const/fields';
import { LockButton } from 'component-ui/buttons/lock-button';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { INavigate } from 'hooks/use-navigate';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { API_MIXING_TYPE_SHORT_URL } from 'infrastructure/const/urls';
import { TGetParameter } from 'infrastructure/custom-query-string/custom-query-string';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { TITLES_MIXING } from 'mixing/const/titles';
import { IMixing, isMixing } from 'mixing/entity/mixing/mixing';
import { MixingAutocompleteCard } from 'mixing/ui/mixing-card/mixing-card';
import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { IUser } from 'users/entity/user';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { EState, ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { IEquipmentEnginePressform, isEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { endpointTransition } from './const/endpoint-transition';

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

export const EquipmentEnginePressformAddToWarehouseApplyAAP = ({
  route,
}: INavigate<IEquipmentEnginePressform, TApplyAAPDto>): ReactElement => {
  const { entity } = route.params;

  const [mixingAap, setMixingAap] = useState<IMixing | null>(null);
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
    if (mixingAap && apparatchikUser && masterUser) {
      setMixingAapDto({
        mixingAapId: mixingAap?.id,
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
              routeName={ENavigationName.CHANGE_STATE_EQUIPMENT_ENGINE_PRESSFORM}
              dtoTransitions={mixingAapDto}
              endpoint={endpointTransition.TRANSITION_APPLY_AAP}
              entity={entity}
              title={ETransitionsUK.commandApplyAap + '?'}
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
