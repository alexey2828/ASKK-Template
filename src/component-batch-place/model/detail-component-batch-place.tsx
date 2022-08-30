import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { ChooseBtn } from '../../infrastructure/change-state/model/choose-btn';
import { IModalDetail } from '../../infrastructure/choose-popup-detail/choose-popup-detail';
import { API_ANALYSIS_SHORT, API_NORMATIVE_DOCUMENT_SHORT_URL } from '../../infrastructure/const/urls';
import { TITLES_LABORATORY_ANALYSIS } from '../../laboratory/analysis/const/titles';
import { ILaboratoryAnalysis } from '../../laboratory/analysis/entity/laboratory-analysis';
import { styles } from '../../component-ui/common-block-styles.styles';
import { INormativeDocument } from '../../normative-document/entity/normative-document';
import { TITLES_NORMATIVE_DOCUMENT } from '../../normative-document/const/titles';
import { chooseStateUa, chooseTransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_COMPONENT_BATCH_PLACE } from '../const/titles';
import { IComponentBatchPlace } from '../entity/component-batch-place';
import { TITLES_COMPONENT_BATCH } from '../entity/component-batch/const/titles';
import { ChangeBuilding } from './change-building';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { ComponentBatchPlaceStateView } from './component-batch-place-state-view';

interface TDetaiComponentBatchPlace extends IModalDetail {
  entity: IComponentBatchPlace;
}

export const DetaiComponentBatchPlace: React.FC<TDetaiComponentBatchPlace> = ({ entity }) => {
  const { goTo } = useNavigate<INormativeDocument | ILaboratoryAnalysis>();
  const StateUkStr = chooseStateUa[entity.state] || chooseStateUa.UNKNOWN;
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple18, { alignSelf: 'center', margin: 5 }]}>
          {entity.componentBatch.componentType.name}
        </Text>
        <View style={CNstyles.BtnContainerDetails}>
          <ViewStateWrap>{ComponentBatchPlaceStateView(entity.state, entity)}</ViewStateWrap>
        </View>
      </View>
      <View style={CNstyles.defaultHeight} />
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_COMPONENT_BATCH_PLACE.name}:{' '}
            <Text style={styles.itemInfoa1}> {entity.componentBatch.componentType.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_COMPONENT_BATCH.batchNumber}:{' '}
            <Text style={styles.itemInfoa1}> {entity?.componentBatch.batchNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_COMPONENT_BATCH_PLACE.place}: <Text style={styles.itemInfoa1}> {entity?.batchPlaceNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_COMPONENT_BATCH_PLACE.state}: <Text style={styles.itemInfoa1}> {StateUkStr}</Text>
          </Text>
          <ChangeBuilding componentBatchPlace={entity} />
        </View>
      </View>
      <View style={CNstyles.BtnContainerDetailsWrapper}>
        {!!entity.laboratoryAnalyzes.length && (
          <TouchableHighlight
            onPress={(): void => {
              const argsNavigateToAnalysis: TArgsNavigate<ILaboratoryAnalysis> = {
                route: API_ANALYSIS_SHORT,
                params: {
                  laboratoryAnalyzes: entity.laboratoryAnalyzes,
                  entityMaterials: entity.componentBatch.componentType.name,
                },
              };
              goTo(argsNavigateToAnalysis);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_LABORATORY_ANALYSIS.title}</Text>
            </View>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          onPress={(): void => {
            const argsNavigateToND: TArgsNavigate<INormativeDocument> = {
              route: API_NORMATIVE_DOCUMENT_SHORT_URL,
              params: {
                shortNormativeDocuments: entity.componentBatch.componentType.normativeDocuments,
              },
            };
            goTo(argsNavigateToND);
          }}
        >
          <View style={CNstyles.BtnContainerDetails}>
            <Text style={CNstyles.BtnTitle}>{TITLES_NORMATIVE_DOCUMENT.nds}</Text>
          </View>
        </TouchableHighlight>
        <ChooseBtn transitionsTitles={chooseTransitionsUa} entity={entity} />
        <View style={CNstyles.defaultHeightLarge} />
      </View>
    </>
  );
};
