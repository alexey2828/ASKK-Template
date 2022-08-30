import { EFields } from 'buildings/const/fields';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { MainTitles } from 'const/titles-main';
import { INavigate } from 'hooks/use-navigate';
import { AsyncAutoComplete } from 'infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_AUTOCOMPLETE } from 'infrastructure/async-auto-complete/const/titles';
import { ETitles } from 'infrastructure/confirm-modal/const/titles';
import { GoBack } from 'infrastructure/confirm-modal/go-back';
import { GoNext } from 'infrastructure/confirm-modal/go-next';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import {
  API_ENGINE_BOTTOM_SHORT_URL,
  API_ENGINE_CASE_SHORT_URL,
  API_NOZZLE_BLOCK_SHORT_URL,
  API_STABILIZER_BLOCK_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
} from 'infrastructure/const/urls';
import { EntityFromScanner } from 'infrastructure/entity-from-scanner/entity-from-scanner';
import { checkValidEntityFromScan } from 'infrastructure/utils/check-valid-entity-from-scan';
import { TITLES_ENGINE_BOTTOM } from 'materials/engine-bottom/const/titles';
import { IEngineBottom, isEngineBottom } from 'materials/engine-bottom/entity/engine-bottom';
import { EngineBottomAutocompleteCard } from 'materials/engine-bottom/ui/engine-bottom-card';
import { TITLES_NOZZLE_BLOCK } from 'materials/nozzle-block/const/titles';
import { INozzleBlock, isNozzleBlock } from 'materials/nozzle-block/entity/nozzle-block';
import { NozzleBlockAutocompleteCard } from 'materials/nozzle-block/ui/nozzle-block-card';
import { TITLES_STABILIZER_BLOCK } from 'materials/stabilizer-block/const/titles';
import { isStabilizerBlock, IStabilizerBlock } from 'materials/stabilizer-block/entity/stabilizer-block';
import { StabilizerBlockAutocompleteCard } from 'materials/stabilizer-block/ui/stabilizer-block-card';
import { styles } from 'component-ui/common-block-styles.styles';
import React, { ReactElement, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableHighlight, View } from 'react-native';
import { EEngineCaseStates } from 'rocket-engine/engine-case/const/engine-case-states';
import { TITLES_ENGINE_CASE } from 'rocket-engine/engine-case/const/title';
import { IEngineCase, isEngineCase } from 'rocket-engine/engine-case/entity/engine-case';
import { EngineCaseAutocompleteCard } from 'rocket-engine/engine-case/ui/stabilizer-block-card';
import { EState } from 'tzp/tzp-detail/const/choose-ua-title-transition-state';
import { ETitleFields } from 'tzp/tzp-detail/const/fields';
import { TITLES_TZP_DETAIL } from 'tzp/tzp-detail/const/titles';
import { isTzpDetail, ITzpDetail } from 'tzp/tzp-detail/entity/tzp-detail';
import { TZPDetailAutocompleteCard } from 'tzp/tzp-detail/ui/tzp-detail-items/tzp-detail-autocomplete-card/tzp-detail-card';
import { IUser } from 'users/entity/user';
import { SearchUserApparatchik } from 'users/model/search-user-apparatchik';
import { SearchUserMaster } from 'users/model/search-user-master';
import { chooseStateUa } from '../const/choose-ua-title-transition-state';
import { TITLES_ROCKET_ENGINE } from '../const/title';
import { IRocketEngine, isRocketEngine } from '../entity/rocket-engine';
import { endpointTransition } from './const/endpoint-transition';

const searchParametersMaterial = {
  state: 'STATE_IN_WAREHOUSE',
};

const searchParametersTzpDetail = {
  state: EState.STATE_SURFACE_IS_DEGREASED,
};

const searchParamEngineCase = {
  state: EEngineCaseStates.PRESSFORM_WITH_TZP_ON_MEASUREMENT,
};

type TAssembleUnloadedEngineDto = {
  frontEngineCaseId: string;
  backEngineCaseId: string;
  engineBottomId: string;
  nozzleBlockId: string;
  stabilizerBlockId: string;
  vstavkaTzpDetailId: string;
  masterUserId: string;
  apparatchikUserId: string;
};

export const RocketEngineAssembleUnloadedEngine = ({
  route,
}: INavigate<IRocketEngine, TAssembleUnloadedEngineDto>): ReactElement => {
  const { entity } = route.params;
  const [errorFrontEngineCase, setErrorScanFrontEngineCase] = useState('');
  const [frontEngineCase, setFrontEngineCase] = useState<IEngineCase | null>(null);
  const [errorBackEngineCase, setErrorScanBackEngineCase] = useState('');
  const [backEngineCase, setBackEngineCase] = useState<IEngineCase | null>(null);
  const [errorScanEngineBottom, setErrorScanEngineBottom] = useState('');
  const [engineBottom, setEngineBottom] = useState<IEngineBottom | null>(null);
  const [errorScanNozzleBlock, setErrorScanNozzleBlock] = useState('');
  const [nozzleBlock, setNozzleBlock] = useState<INozzleBlock | null>(null);
  const [errorScanStabilizerBlock, setErrorScanStabilizerBlock] = useState('');
  const [stabilizerBlock, setStabilizerBlock] = useState<IStabilizerBlock | null>(null);
  const [errorScanTzpDetail, setErrorScanTzpDetail] = useState('');
  const [tzpDetail, setTzpDetail] = useState<ITzpDetail | null>(null);
  const [masterUser, setMasterUser] = useState<IUser | null>(null);
  const [apparatchikUser, setApparatchikUser] = useState<IUser | null>(null);
  const [assembleUnloadedEngineDto, setAssembleUnloadedEngineDto] = useState<TAssembleUnloadedEngineDto | null>(null);

  const onSelectedMasterUser = (masterUser: IUser | null): void => {
    setMasterUser(masterUser);
  };

  const onSelectedApparatchikUser = (apparatchikUser: IUser | null): void => {
    setApparatchikUser(apparatchikUser);
  };

  const onScanFrontEngineCase = (entity: IEngineCase): void => {
    if (isEngineCase(entity) && searchParamEngineCase) {
      if (checkValidEntityFromScan(searchParamEngineCase, entity)) {
        setErrorScanFrontEngineCase('');
        setFrontEngineCase(entity);
      }
    }
  };

  const resetErrorScanFrontEngineCase = () => {
    setErrorScanFrontEngineCase('');
  };

  const onSelectedFrontEngineCase = (engineCase: IEngineCase | null): void => {
    setFrontEngineCase(engineCase);
  };

  const onScanBackEngineCase = (entity: IEngineCase): void => {
    if (isEngineCase(entity) && searchParamEngineCase) {
      if (checkValidEntityFromScan(searchParamEngineCase, entity)) {
        setErrorScanBackEngineCase('');
        setBackEngineCase(entity);
      }
    }
  };

  const resetErrorScanBackEngineCase = () => {
    setErrorScanBackEngineCase('');
  };

  const onSelectedBackEngineCase = (engineCase: IEngineCase | null): void => {
    setBackEngineCase(engineCase);
  };

  const onScanEngineBottom = (entity: IEngineBottom): void => {
    if (isEngineBottom(entity) && searchParametersMaterial) {
      if (checkValidEntityFromScan(searchParametersMaterial, entity)) {
        setErrorScanEngineBottom('');
        setEngineBottom(entity);
      }
    }
  };

  const resetErrorScanEngineBottom = () => {
    setErrorScanEngineBottom('');
  };

  const onSelectedEngineBottom = (engineBottom: IEngineBottom | null): void => {
    setEngineBottom(engineBottom);
  };

  const onScanNozzleBlock = (entity: INozzleBlock): void => {
    if (isNozzleBlock(entity) && searchParametersMaterial) {
      if (checkValidEntityFromScan(searchParametersMaterial, entity)) {
        setErrorScanNozzleBlock('');
        setNozzleBlock(entity);
      }
    }
  };

  const resetErrorScanNozzleBlock = () => {
    setErrorScanNozzleBlock('');
  };

  const onSelectedNozzleBlock = (nozzleBlock: INozzleBlock | null): void => {
    setNozzleBlock(nozzleBlock);
  };

  const onScanStabilizerBlock = (entity: IStabilizerBlock): void => {
    if (isStabilizerBlock(entity) && searchParametersMaterial) {
      if (checkValidEntityFromScan(searchParametersMaterial, entity)) {
        setErrorScanStabilizerBlock('');
        setStabilizerBlock(entity);
      }
    }
  };

  const resetErrorScanStabilizerBlock = () => {
    setErrorScanStabilizerBlock('');
  };

  const onSelectedStabilizerBlock = (stabilizerBlock: IStabilizerBlock | null): void => {
    setStabilizerBlock(stabilizerBlock);
  };

  const onScanvstaVkaTzpDetail = (entity: ITzpDetail): void => {
    if (isTzpDetail(entity) && searchParametersTzpDetail) {
      if (checkValidEntityFromScan(searchParametersTzpDetail, entity)) {
        setErrorScanTzpDetail('');
        setTzpDetail(entity);
      }
    }
  };

  const resetErrorScanTzpDetail = () => {
    setErrorScanTzpDetail('');
  };

  const onSelectedTzpDetail = (tzpDetail: ITzpDetail | null): void => {
    setTzpDetail(tzpDetail);
  };

  useEffect(() => {
    if (
      apparatchikUser &&
      masterUser &&
      tzpDetail &&
      stabilizerBlock &&
      engineBottom &&
      nozzleBlock &&
      frontEngineCase &&
      backEngineCase
    ) {
      setAssembleUnloadedEngineDto({
        frontEngineCaseId: frontEngineCase.id,
        backEngineCaseId: backEngineCase.id,
        engineBottomId: engineBottom.id,
        nozzleBlockId: nozzleBlock.id,
        stabilizerBlockId: stabilizerBlock.id,
        vstavkaTzpDetailId: tzpDetail.id,
        masterUserId: masterUser?.id,
        apparatchikUserId: apparatchikUser?.id,
      });
    } else {
      setAssembleUnloadedEngineDto(null);
    }
  }, [
    apparatchikUser,
    masterUser,
    tzpDetail,
    stabilizerBlock,
    engineBottom,
    nozzleBlock,
    frontEngineCase,
    backEngineCase,
  ]);

  if (!isRocketEngine(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  //console.log(EStateMaterials)

  return (
    <View style={CNstyles.FormContainer}>
      <EntityFromScanner
        onScanEntity={onScanvstaVkaTzpDetail}
        noValidEntity={errorScanTzpDetail}
        resetNoValidEntity={resetErrorScanTzpDetail}
      />
      <EntityFromScanner
        onScanEntity={onScanStabilizerBlock}
        noValidEntity={errorScanStabilizerBlock}
        resetNoValidEntity={resetErrorScanStabilizerBlock}
      />
      <EntityFromScanner
        onScanEntity={onScanNozzleBlock}
        noValidEntity={errorScanNozzleBlock}
        resetNoValidEntity={resetErrorScanNozzleBlock}
      />
      <EntityFromScanner
        onScanEntity={onScanEngineBottom}
        noValidEntity={errorScanEngineBottom}
        resetNoValidEntity={resetErrorScanEngineBottom}
      />
      <EntityFromScanner
        onScanEntity={onScanFrontEngineCase}
        noValidEntity={errorFrontEngineCase}
        resetNoValidEntity={resetErrorScanFrontEngineCase}
      />
      <EntityFromScanner
        onScanEntity={onScanBackEngineCase}
        noValidEntity={errorBackEngineCase}
        resetNoValidEntity={resetErrorScanBackEngineCase}
      />
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_ROCKET_ENGINE.title}:<Text style={CNstyles.defaultPurple}> {entity.number}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <ScrollView>
          <AsyncAutoComplete
            title={TITLES_TZP_DETAIL.title}
            pathname={API_TZP_DETAIL_SHORT_URL}
            renderCard={TZPDetailAutocompleteCard}
            searchParameters={searchParametersTzpDetail}
            onSelectedEntities={onSelectedTzpDetail}
            isNoValid={!tzpDetail}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={ETitleFields.detailNumber}
          />
          <AsyncAutoComplete
            title={TITLES_STABILIZER_BLOCK.title}
            pathname={API_STABILIZER_BLOCK_SHORT_URL}
            renderCard={StabilizerBlockAutocompleteCard}
            searchParameters={searchParametersMaterial}
            onSelectedEntities={onSelectedStabilizerBlock}
            isNoValid={!stabilizerBlock}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_NOZZLE_BLOCK.title}
            pathname={API_NOZZLE_BLOCK_SHORT_URL}
            renderCard={NozzleBlockAutocompleteCard}
            searchParameters={searchParametersMaterial}
            onSelectedEntities={onSelectedNozzleBlock}
            isNoValid={!nozzleBlock}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_ENGINE_BOTTOM.title}
            pathname={API_ENGINE_BOTTOM_SHORT_URL}
            renderCard={EngineBottomAutocompleteCard}
            searchParameters={searchParametersMaterial}
            onSelectedEntities={onSelectedEngineBottom}
            isNoValid={!engineBottom}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_ENGINE_CASE.titleFrontEngineCase}
            pathname={API_ENGINE_CASE_SHORT_URL}
            renderCard={EngineCaseAutocompleteCard}
            searchParameters={searchParamEngineCase}
            onSelectedEntities={onSelectedFrontEngineCase}
            isNoValid={!frontEngineCase}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <AsyncAutoComplete
            title={TITLES_ENGINE_CASE.titleBackEngineCase}
            pathname={API_ENGINE_CASE_SHORT_URL}
            renderCard={EngineCaseAutocompleteCard}
            searchParameters={searchParamEngineCase}
            onSelectedEntities={onSelectedBackEngineCase}
            isNoValid={!backEngineCase}
            helperText={TITLES_AUTOCOMPLETE.noDataInput}
            fieldName={EFields.NAME}
          />
          <View style={CNstyles.defaultHeight} />
          <SearchUserMaster masterUser={masterUser} onSelected={onSelectedMasterUser} isNoValid={!masterUser} />
          <SearchUserApparatchik
            apparatchikUser={apparatchikUser}
            onSelected={onSelectedApparatchikUser}
            isNoValid={!apparatchikUser}
          />
          <View style={CNstyles.defaultHeight} />
          <View style={styles.border} />
          <View style={CNstyles.defaultHeight} />
          {assembleUnloadedEngineDto ? (
            <>
              <GoNext
                routeName={ENavigationName.CHANGE_STATE_ROCKET_ENGINE}
                dtoTransitions={assembleUnloadedEngineDto}
                endpoint={endpointTransition.ASSEMBLE_UNLOADED_ENGINE}
                entity={entity}
                title={chooseStateUa.stateUnloadedEngineAssemblyFinished + '?'}
              />
            </>
          ) : (
            <TouchableHighlight onPress={(): void => {}}>
              <View
                style={{
                  backgroundColor: '#323232',
                  width: '100%',
                  borderRadius: 10,
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    margin: 15,
                    fontSize: 16,
                  }}
                >
                  {ETitles.ENTER}
                </Text>
              </View>
            </TouchableHighlight>
          )}
          <View style={CNstyles.defaultHeight} />
          <View style={CNstyles.defaultHeight} />
          <View style={CNstyles.defaultHeight} />
          <View style={CNstyles.defaultHeight} />
        </ScrollView>
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
