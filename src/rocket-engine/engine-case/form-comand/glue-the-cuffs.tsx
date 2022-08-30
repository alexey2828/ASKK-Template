import React, { ReactElement, useEffect, useState } from 'react';
import { INavigate } from 'hooks/use-navigate';
import { IEngineCase, isEngineCase } from '../entity/engine-case';
import { IUser } from 'users/entity/user';
import { IMixing, isMixing } from 'mixing';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { EState } from 'mixing/const/choose-ua-title-transition-state';
import { isTzpDetail, ITzpDetail } from 'tzp/tzp-detail/entity/tzp-detail';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { MainTitles } from 'const/titles-main';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ScrollView, Text, View } from 'react-native';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_ENGINE_CASE } from '../const/title';
import { TITLES_TZP_DETAIL } from 'tzp/tzp-detail/const/titles';
import { API_MIXING_TYPE_SHORT_URL, API_PREMISES_SHORT_URL, API_TZP_DETAIL_SHORT_URL } from 'infrastructure/const/urls';
import { TZPDetailAutocompleteCard } from 'tzp/tzp-detail/ui/tzp-detail-items/tzp-detail-autocomplete-card/tzp-detail-card';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { EFields } from 'buildings/const/fields';
import { TITLES_MIXING } from 'mixing/const/titles';
import { MixingAutocompleteCard } from 'mixing/ui/mixing-card/mixing-card';
import { styles } from 'component-ui/common-block-styles.styles';
import { SearchUserMaster } from 'users/model/search-user-master';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import { endpointTransition } from './const/endpoint-transition';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { IPremises } from 'plant/premises/entity/premises';
import { PremisesAutocompleteCard } from 'plant/premises/premises-card/premises-card';
import { TITLES_PREMISES } from 'plant/premises/const/title';
import { LockButton } from 'component-ui/buttons/lock-button';

const searchParamForMixingKmk1Id = {
  state: EState.READY_FOR_USE,
  'mixingProcess.mixer.locatedAt.name': '516-1',
  'mixingType.mixingTypeAbstract.workflowName': 'mixing_kmk1',
};

const searchParamForTzpDetail = {
  state: 'STATE_SURFACE_IS_DEGREASED',
  'tzpPressform.typeTzpDetail.name': 'манжет',
};

type TGlueTheCuffsDto = {
  mixingKmk1Id: string;
  forwardTzpDetailId: string;
  backTzpDetailId: string;
  premisesOfTheBuildingId: string;
  masterUserId: string;
  apparatchikUserId: string;
};

export const GlueTheCuffs = ({ route }: INavigate<IEngineCase, TGlueTheCuffsDto>): ReactElement => {
  const { entity } = route.params;
  const [forwardTzpDetail, setForwardTzpDetail] = useState<ITzpDetail | null>(null);
  const [backTzpDetail, setBackTzpDetail] = useState<ITzpDetail | null>(null);
  const [mixing, setMixing] = useState<IMixing | null>(null);
  const [premises, setPremises] = useState<IPremises | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [glueTheCuffsDto, setGlueTheCuffsDto] = useState<TGlueTheCuffsDto | null>(null);
  const [errorScanForwardTzpDetail, setErrorScanForwardTzpDetail] = useState('');
  const [errorScanBackTzpDetail, setErrorScanBackTzpDetail] = useState('');
  const [errorScanMixing, setErrorScanMixing] = useState('');
  const [errorScanPremises, setErrorScanPremises] = useState('');

  const onScanMixing = (entity: IMixing): void => {
    if (isMixing(entity) && searchParamForMixingKmk1Id) {
      if (checkValidEntityFromScan(searchParamForMixingKmk1Id, entity)) {
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

  const onScanForwardTzpDetail = (entity: ITzpDetail): void => {
    if (isTzpDetail(entity) && searchParamForTzpDetail) {
      if (checkValidEntityFromScan(searchParamForTzpDetail, entity)) {
        setErrorScanForwardTzpDetail('');
        setForwardTzpDetail(entity);
      }
    }
  };

  const resetErrorScanForwardTzpDetail = () => {
    setErrorScanForwardTzpDetail('');
  };

  const onSelectedForwardTzpDetail = (ForwardTzpDetail: ITzpDetail | null): void => {
    setForwardTzpDetail(ForwardTzpDetail);
  };

  const onScanBackTzpDetail = (entity: ITzpDetail): void => {
    if (isTzpDetail(entity) && searchParamForTzpDetail) {
      if (checkValidEntityFromScan(searchParamForTzpDetail, entity)) {
        setErrorScanBackTzpDetail('');
        setBackTzpDetail(entity);
      }
    }
  };

  const resetErrorScanBackTzpDetail = () => {
    setErrorScanBackTzpDetail('');
  };

  const onSelectedBackTzpDetail = (ForwardTzpDetail: ITzpDetail | null): void => {
    setBackTzpDetail(ForwardTzpDetail);
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
    if (premises && backTzpDetail && forwardTzpDetail && apparatchikUser && masterUser && mixing) {
      setGlueTheCuffsDto({
        premisesOfTheBuildingId: premises.id,
        masterUserId: masterUser.id,
        apparatchikUserId: apparatchikUser.id,
        backTzpDetailId: backTzpDetail.id,
        forwardTzpDetailId: forwardTzpDetail.id,
        mixingKmk1Id: mixing.id,
      });
    } else {
      setGlueTheCuffsDto(null);
    }
  }, [forwardTzpDetail, apparatchikUser, masterUser, mixing, backTzpDetail, premises]);

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
        onScanEntity={onScanForwardTzpDetail}
        noValidEntity={errorScanForwardTzpDetail}
        resetNoValidEntity={resetErrorScanForwardTzpDetail}
      />
      <EntityFromScanner
        onScanEntity={onScanBackTzpDetail}
        noValidEntity={errorScanBackTzpDetail}
        resetNoValidEntity={resetErrorScanBackTzpDetail}
      />
      <EntityFromScanner
        onScanEntity={onScanPremises}
        noValidEntity={errorScanPremises}
        resetNoValidEntity={resetErrorScanPremises}
      />
      <EntityFromScanner
        onScanEntity={onScanMixing}
        noValidEntity={errorScanMixing}
        resetNoValidEntity={resetErrorScanMixing}
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
            title={TITLES_TZP_DETAIL.title}
            pathname={API_TZP_DETAIL_SHORT_URL}
            renderCard={TZPDetailAutocompleteCard}
            searchParameters={searchParamForTzpDetail}
            onSelectedEntities={onSelectedForwardTzpDetail}
            isNoValid={!forwardTzpDetail}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_TZP_DETAIL.title}
            pathname={API_TZP_DETAIL_SHORT_URL}
            renderCard={TZPDetailAutocompleteCard}
            searchParameters={searchParamForTzpDetail}
            onSelectedEntities={onSelectedBackTzpDetail}
            isNoValid={!backTzpDetail}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_MIXING.choice}
            pathname={API_MIXING_TYPE_SHORT_URL}
            renderCard={MixingAutocompleteCard}
            searchParameters={searchParamForMixingKmk1Id}
            onSelectedEntities={onSelectedMixing}
            isNoValid={!mixing}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
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
        {glueTheCuffsDto ? (
          <>
            <GoNext
              routeName={ENavigationName.CHANGE_STATE_ENGINE_CASES}
              dtoTransitions={glueTheCuffsDto}
              endpoint={endpointTransition.GLUE_THE_CUFFS}
              entity={entity}
              title={ETransitionsUK.commandGlueTheCuffs + '?'}
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
