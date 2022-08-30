import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { TArgsNavigate, useNavigate } from 'hooks/use-navigate';
import { useHttp } from 'hooks/useHttp';
import { ChooseBtn } from 'infrastructure/change-state/model/choose-btn';
import { IModalDetail } from 'infrastructure/choose-popup-detail/choose-popup-detail';
import { ENavigationName } from 'infrastructure/const/navigation-name';
import {
  API_ENGINE_BOTTOM_SHORT_URL,
  API_NOZZLE_BLOCK_SHORT_URL,
  API_STABILIZER_BLOCK_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
} from 'infrastructure/const/urls';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { TITLES_CASSETTES_ENGINE_PRESSFORM } from 'materials/cassets-engine-pressform/const/titles';
import { TITLES_ENGINE_BOTTOM } from 'materials/engine-bottom/const/titles';
import { IEngineBottom } from 'materials/engine-bottom/entity/engine-bottom';
import { TITLES_NOZZLE_BLOCK } from 'materials/nozzle-block/const/titles';
import { INozzleBlock } from 'materials/nozzle-block/entity/nozzle-block';
import { TITLES_STABILIZER_BLOCK } from 'materials/stabilizer-block/const/titles';
import { IStabilizerBlock } from 'materials/stabilizer-block/entity/stabilizer-block';
import { styles } from 'component-ui/common-block-styles.styles';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { TITLES_ENGINE_CASE } from 'rocket-engine/engine-case/const/title';
import { IEngineCase } from 'rocket-engine/engine-case/entity/engine-case';
import { TITLES_TZP_DETAIL } from 'tzp/tzp-detail/const/titles';
import { ITzpDetail } from 'tzp/tzp-detail/entity/tzp-detail';
import { chooseTransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_ROCKET_ENGINE } from '../const/title';
import { IRocketEngine } from '../entity/rocket-engine';
import { RocketEngineStateView } from './rocket-engine-state-view';

interface IDetailRocketEngine extends IModalDetail {
  entity: IRocketEngine;
}

export const DetailRocketEngine: React.FC<IDetailRocketEngine> = ({ entity }) => {
  const { goTo } = useNavigate<INozzleBlock | IEngineBottom | IEngineCase | IStabilizerBlock | ITzpDetail>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, updateResponse } = useHttp<any>();
  const [currentEntity, setent] = useState<any>();

  const urlStabilizerBlock = API_STABILIZER_BLOCK_SHORT_URL + '/' + entity.stabilizerBlock?.id;
  const urlEngineBottom = API_ENGINE_BOTTOM_SHORT_URL + '/' + entity.engineBottom?.id;
  const urlNozzleBlock = API_NOZZLE_BLOCK_SHORT_URL + '/' + entity.nozzleBlock?.id;
  const urlDetailTzp = API_TZP_DETAIL_SHORT_URL + '/' + entity.tzpDetail?.id;
  const urlBackEngineCase = API_TZP_DETAIL_SHORT_URL + '/' + entity.backEngineCase?.id;
  const urlFrontEngineCase = API_TZP_DETAIL_SHORT_URL + '/' + entity.frontEngineCase?.id;

  useEffect(() => {
    updateResponse({ url: currentEntity });
    if (currentEntity && data) {
      const argsNavigateToNozzleBlock: TArgsNavigate<
        INozzleBlock | IEngineBottom | IEngineCase | IStabilizerBlock | ITzpDetail
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
        <Text style={[styles.defaultPurple18, { alignSelf: 'center', margin: 5 }]}>{entity.number}</Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{RocketEngineStateView(entity.state, entity)}</ViewStateWrap>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_ROCKET_ENGINE.title}: <Text style={styles.itemInfoa1}>{entity?.number}</Text>
          </Text>
          {entity?.weightUnloadedEngine ? (
            <Text style={styles.itemInfo}>
              {TITLES_CASSETTES_ENGINE_PRESSFORM.title}:
              <Text style={styles.itemInfoa1}>{entity?.weightUnloadedEngine}</Text>
            </Text>
          ) : null}
          {entity?.tzpDetail?.detailNumber ? (
            <Text style={styles.itemInfo}>
              {TITLES_TZP_DETAIL.title}: <Text style={styles.itemInfoa1}>{entity?.tzpDetail?.detailNumber}</Text>
            </Text>
          ) : null}
          {entity?.centerOfGravityUnloadedEngine ? (
            <Text style={styles.itemInfo}>
              {TITLES_ROCKET_ENGINE.centerOfGravityUnloadedEngine}:{' '}
              <Text style={styles.itemInfoa1}>{entity?.centerOfGravityUnloadedEngine}</Text>
            </Text>
          ) : null}
          <Text style={styles.itemInfo}>
            {TITLES_ROCKET_ENGINE.createAt}:{' '}
            <Text style={styles.itemInfoa1}>
              {moment(entity?.createAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </Text>
          {entity?.backEngineCase?.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_ENGINE_CASE.titleFrontEngineCase}:{' '}
              <Text style={styles.itemInfoa1}>{entity?.backEngineCase?.name}</Text>
            </Text>
          ) : null}
          {entity?.frontEngineCase?.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_ENGINE_CASE.choiceFrontEngineCase}:{' '}
              <Text style={styles.itemInfoa1}>{entity?.frontEngineCase?.name}</Text>
            </Text>
          ) : null}
          {entity?.frontEngineCase?.name ? (
            <Text style={styles.itemInfo}>
              {TITLES_CASSETTES_ENGINE_PRESSFORM.title}:
              <Text style={styles.itemInfoa1}>{entity?.engineBottom?.name}</Text>
            </Text>
          ) : null}
        </View>
      </View>
      <View style={CNstyles.BtnContainerDetailsWrapper}>
        {entity.stabilizerBlock?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setent(urlStabilizerBlock);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_STABILIZER_BLOCK.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.nozzleBlock?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setent(urlNozzleBlock);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_NOZZLE_BLOCK.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.engineBottom?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setent(urlEngineBottom);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_ENGINE_BOTTOM.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.tzpDetail?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setent(urlDetailTzp);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_TZP_DETAIL.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}

        {entity.backEngineCase?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setent(urlBackEngineCase);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_ENGINE_CASE.titleBackEngineCase}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {entity.frontEngineCase?.id ? (
          <TouchableHighlight
            onPress={(): void => {
              setent(urlFrontEngineCase);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_ENGINE_CASE.titleFrontEngineCase}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        <ChooseBtn transitionsTitles={chooseTransitionsUa} entity={entity} />
      </View>
    </>
  );
};
