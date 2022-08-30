import React, { useEffect, useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { IEngineCase } from '../entity/engine-case';
import { IModalDetail } from 'infrastructure/choose-popup-detail/choose-popup-detail';
import { TArgsNavigate, useNavigate } from 'hooks/use-navigate';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ChooseBtn } from 'infrastructure/change-state/model/choose-btn';
import { styles } from 'component-ui/common-block-styles.styles';
import { chooseTransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_ENGINE_CASE } from '../const/title';
import { TITLES_BUILDING } from 'buildings/const/titles';
import moment from 'moment';
import { EngineCaseStateView } from './engine-case-state-view';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { TITLES_TZP_PRESSFORM } from 'tzp/tzp-pressform/const/titiles';
import { TITLES_MIXING } from 'mixing/const/titles';
import { TITLES_TZP_ENGINE_CASE } from '../tzp-engine-case/const/title';
import { useHttp } from 'hooks/useHttp';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import {
  API_ASSEMBLIE_SHORT_URL,
  API_CASSETS_ENGINE_PRESSFORM_SHORT_URL,
  API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL,
  API_MIDA_SENSOR_SHORT_URL,
  API_MIXING_TYPE_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
  API_TZP_ENGINE_CASE_SHORT_URL,
} from 'infrastructure/const/urls';
import { IEquipmentEnginePressform } from 'materials/equipment-engine-pressform/entity/equipment-engine-pressform';
import { IMixing } from 'mixing';
import { ITzpDetail } from 'tzp/tzp-detail/entity/tzp-detail';
import { ITzpEngineCase } from '../tzp-engine-case/entity/tzp-engine-case';
import { ICassetsEnginePressform } from 'materials/cassets-engine-pressform/entity/cassets-engine-pressform';
import { TITLES_CASSETTES_ENGINE_PRESSFORM } from 'materials/cassets-engine-pressform/const/titles';
import { IAssembly } from '../assembly/entity/assembly-entity';
import { TITLES_ASSEMBLY } from '../assembly/const/title';
import { IMidaSensor } from 'plant/mida-sensor/entity/mida-sensor';
import { TITLES_MIDA_SENSOR } from 'plant/mida-sensor/const/title';
import { TITLE_THERMAL_CHAMBERS } from 'tzp/tzp-pressform/entity/thermal-chamber/const/titles';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from 'materials/equipment-engine-pressform/const/titles';
import { TITLES_TIME_PROCESS } from 'time-process/const/titles';
import { TITLES_ENGINE_BOTTOM } from 'materials/engine-bottom/const/titles';

interface IDetailEngineCase extends IModalDetail {
  entity: IEngineCase;
}

export const DetailEngineCase: React.FC<IDetailEngineCase> = ({ entity }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { goTo } = useNavigate<any>();
  const { data, updateResponse } = useHttp<
    | IEquipmentEnginePressform
    | IMixing
    | ITzpDetail
    | ITzpEngineCase
    | ICassetsEnginePressform
    | IAssembly
    | IMidaSensor
  >();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [currentEntity, setCurrentEntity] = useState<any>();
  const urlEquipmentEnginePressform =
    API_EQUIPMENT_ENGINE_PRESSFORM_SHORT_URL + '/' + entity.equipmentEnginePressform?.id;
  const urlAppliedKc = API_MIXING_TYPE_SHORT_URL + '/' + entity.appliedKc?.mixing.id;
  const urlFrontTzpDetail = API_TZP_DETAIL_SHORT_URL + '/' + entity.frontCapCuffs?.id;
  const urlBackTzpDetail = API_TZP_DETAIL_SHORT_URL + '/' + entity.backCapCuffs?.id;
  const urlTzpEngineCase = API_TZP_ENGINE_CASE_SHORT_URL + '/' + entity?.tzpEngineCase?.id;
  const urlCassettesEnginePressform =
    API_CASSETS_ENGINE_PRESSFORM_SHORT_URL + '/' + entity?.cassettesEnginePressform?.id;
  const urlAssemblies = API_ASSEMBLIE_SHORT_URL + '/' + entity?.assembly?.id;
  const urlMidaSensor = API_MIDA_SENSOR_SHORT_URL + '/' + entity?.midaSensor?.id;

  useEffect(() => {
    updateResponse({ url: currentEntity });
    if (currentEntity && data) {
      const argsNavigateToNozzleBlock: TArgsNavigate<
        | IEquipmentEnginePressform
        | IMixing
        | ITzpDetail
        | ITzpEngineCase
        | ICassetsEnginePressform
        | IAssembly
        | IMidaSensor
      > = {
        route: ENavigationName.DETAILS_SCREEN,
        params: {
          entity: data,
        },
      };
      goTo(argsNavigateToNozzleBlock);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentEntity, updateResponse, data]);
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple18, { alignSelf: 'center', margin: 5 }]}>{entity.name}</Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{EngineCaseStateView(entity.state, entity)}</ViewStateWrap>
      </View>

      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_ENGINE_CASE.name}: <Text style={styles.itemInfoa1}>{entity?.name}</Text>
          </Text>
          {entity?.pressform?.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_ENGINE_BOTTOM.number}: <Text style={styles.itemInfoa1}>{entity?.pressform?.name}</Text>
            </Text>
          ) : null}
          {entity?.locatedAt.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_BUILDING.title}: <Text style={styles.itemInfoa1}>{entity?.locatedAt.name}</Text>
            </Text>
          ) : null}
          {entity?.pressform?.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_TZP_PRESSFORM.pressformNumber}: <Text style={styles.itemInfoa1}>{entity?.pressform?.name}</Text>
            </Text>
          ) : null}
          {entity.frontCapCuffs?.detailNumber ? (
            <Text style={styles.itemInfo}>
              {TITLES_ENGINE_CASE.titleFrontEngineCase}:{' '}
              <Text style={styles.itemInfoa1}>{entity.frontCapCuffs?.detailNumber}</Text>
            </Text>
          ) : null}
          {entity?.backCapCuffs?.detailNumber ? (
            <Text style={styles.itemInfo}>
              {TITLES_ENGINE_CASE.titleBackEngineCase}:{' '}
              <Text style={styles.itemInfoa1}>{entity?.backCapCuffs?.detailNumber}</Text>
            </Text>
          ) : null}
          {entity?.appliedKc?.mixing.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_MIXING.mixing}: <Text style={styles.itemInfoa1}>{entity?.appliedKc?.mixing.name}</Text>
            </Text>
          ) : null}

          <Text style={styles.itemInfoa1}>
            {moment(entity?.createAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
          </Text>
        </View>
      </View>
      {entity?.polymerizationProcess ? (
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={styles.itemInfo}>{TITLES_ENGINE_CASE.processDrying}</Text>
            <Text style={styles.itemInfo}>
              {TITLE_THERMAL_CHAMBERS.title}:{' '}
              <Text style={styles.itemInfoa1}>{entity?.polymerizationProcess?.polymerizedIn.name}</Text>
            </Text>
            <Text style={styles.itemInfo}>
              {TITLES_BUILDING.title}: <Text style={styles.itemInfoa1}>{entity?.locatedAt.name}</Text>
            </Text>
            <Text style={styles.itemInfo}>
              {TITLES_TIME_PROCESS.startTime}:{' '}
              <Text style={styles.itemInfoa1}>
                {moment(entity?.polymerizationProcess?.startTime).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
              </Text>
            </Text>
            <Text style={styles.itemInfo}>
              {TITLES_TIME_PROCESS.endTime}:{' '}
              <Text style={styles.itemInfoa1}>
                {moment(entity?.polymerizationProcess?.endTime).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
              </Text>
            </Text>
          </View>
        </View>
      ) : null}
      <View style={CNstyles.BtnContainerDetailsWrapper}>
        {entity.equipmentEnginePressform?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlEquipmentEnginePressform);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.appliedKc?.mixing.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlAppliedKc);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_MIXING.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.frontCapCuffs?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlFrontTzpDetail);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_ENGINE_CASE.titleFrontEngineCase}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.backCapCuffs?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlBackTzpDetail);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_ENGINE_CASE.titleBackEngineCase}</Text>
            </View>
          </TouchableHighlight>
        ) : null}

        {entity?.tzpEngineCase?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlTzpEngineCase);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_TZP_ENGINE_CASE.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}

        {entity?.cassettesEnginePressform?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlCassettesEnginePressform);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_CASSETTES_ENGINE_PRESSFORM.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}

        {entity?.assembly?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlAssemblies);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_ASSEMBLY.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}

        {entity?.midaSensor?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setCurrentEntity(urlMidaSensor);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_MIDA_SENSOR.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        <ChooseBtn transitionsTitles={chooseTransitionsUa} entity={entity} />
      </View>
    </>
  );
};
