import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { IMixing } from '..';
import { IModalDetail } from '../../infrastructure/choose-popup-detail/choose-popup-detail';
import { styles } from '../../component-ui/common-block-styles.styles';
import { ChooseBtn } from '../../infrastructure/change-state/model/choose-btn';
import { chooseTransitionsUa } from '../const/choose-ua-title-transition-state';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { API_ANALYSIS_SHORT, API_NORMATIVE_DOCUMENT_SHORT_URL } from '../../infrastructure/const/urls';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import moment from 'moment';
import { ILaboratoryAnalysis } from '../../laboratory/analysis/entity/laboratory-analysis';
import { TITLES_MIXING_TYPE } from '../entity/mixing-type/const/titles';
import { TITLES_MIXING, TITLES_MIXING_COMPONENTS } from '../const/titles';
import { TITLES_MIXER } from '../entity/mixer/const/titles';
import { TITLES_LABORATORY_ANALYSIS } from '../../laboratory/analysis/const/titles';
import { TITLES_NORMATIVE_DOCUMENT } from '../../normative-document/const/titles';
import { INormativeDocument } from '../../normative-document/entity/normative-document';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { MixingStateView } from './mixing-state-view';

interface IDetailMixing extends IModalDetail {
  entity: IMixing;
}

export const DetailMixing: React.FC<IDetailMixing> = ({ entity }) => {
  const { goTo } = useNavigate<INormativeDocument | ILaboratoryAnalysis>();
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple18, { alignSelf: 'center', margin: 5 }]}>{entity.name}</Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{MixingStateView(entity.state, entity)}</ViewStateWrap>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_MIXING.name}: <Text style={styles.itemInfoa1}>{entity?.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_MIXER.title}: <Text style={styles.itemInfoa1}>{entity?.mixingProcess?.mixer.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_MIXING_TYPE.title}:{' '}
            <Text style={styles.itemInfoa1}>{entity?.mixingType.mixingTypeAbstract.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_MIXING.creationDate}:{' '}
            <Text style={styles.itemInfoa1}>
              {moment(entity?.createAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </Text>
          {!!entity.mixingComponents.length && (
            <Text style={styles.itemInfo}>
              {TITLES_MIXING_COMPONENTS.title}:
              <Text style={styles.itemInfoa1}>
                {entity?.mixingComponents.map(component => {
                  return (
                    <Text style={styles.itemInfoa1} key={component.id}>
                      {' '}
                      {'\n'}· {component.componentBatchPlace.componentBatch.componentType.name} - {component.weight} кг
                    </Text>
                  );
                })}
              </Text>
            </Text>
          )}
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
                  entityMaterials: entity.name,
                },
              };
              goTo(argsNavigateToAnalysis);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_LABORATORY_ANALYSIS.titleSingle}</Text>
            </View>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          onPress={(): void => {
            const argsNavigateToND: TArgsNavigate<INormativeDocument> = {
              route: API_NORMATIVE_DOCUMENT_SHORT_URL,
              params: {
                normativeDocuments: entity.mixingType.normativeDocuments,
              },
            };
            goTo(argsNavigateToND);
          }}
        >
          <View style={CNstyles.BtnContainerDetails}>
            <Text style={CNstyles.BtnTitle}>{TITLES_NORMATIVE_DOCUMENT.title}</Text>
          </View>
        </TouchableHighlight>
        <ChooseBtn transitionsTitles={chooseTransitionsUa} entity={entity} />
      </View>
    </>
  );
};
