import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import moment from 'moment';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { styles } from '../../../component-batch-place/ui/component-batch-place-items/component-batch-place-item.styles';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { ChooseBtn } from '../../../infrastructure/change-state/model/choose-btn';
import { IModalDetail } from '../../../infrastructure/choose-popup-detail/choose-popup-detail';
import { API_ANALYSIS_SHORT } from '../../../infrastructure/const/urls';
import { TITLES_LABORATORY_ANALYSIS } from '../../../laboratory/analysis/const/titles';
import { ILaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { INormativeDocument } from '../../../normative-document/entity/normative-document';
import { TITLES_TZP_DETAIL } from '../../tzp-detail/const/titles';
import { chooseStateUa, chooseTransitionsUa } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL_SAMPLES } from '../const/titles';
import { ITzpDetailSample } from '../entity/tzp-plate';
import { DetailTzpSampleStateView } from './detail-tzp-sample-state-view';

interface TDetailTZPDetailSample extends IModalDetail {
  entity: ITzpDetailSample;
}
export const DetailTzpPlate: React.FC<TDetailTZPDetailSample> = ({ entity }) => {
  const { goTo } = useNavigate<INormativeDocument | ILaboratoryAnalysis>();
  const StateUkStr = chooseStateUa[entity.state] || chooseStateUa.UNKNOWN;
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text
          style={{
            color: '#BB86FC',
            fontSize: 18,
            alignSelf: 'center',
          }}
        >
          {entity.number}
        </Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{DetailTzpSampleStateView(entity.state, entity)}</ViewStateWrap>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL_SAMPLES.number}: <Text style={styles.itemInfoa1}>{entity.number}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL.detailNumber}:
            <Text style={styles.itemInfoa1}>
              {entity.tzpDetails.map(tzpDetail => (
                <>
                  <Text key={entity.id}>
                    {'\n'}
                    {tzpDetail.detailNumber};
                  </Text>
                </>
              ))}
            </Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL_SAMPLES.createdAt}:{' '}
            <Text style={styles.itemInfoa1}>
              {moment(entity?.createdAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL.state}: <Text style={styles.itemInfoa1}>{StateUkStr}</Text>
          </Text>
        </View>
      </View>
      <View style={CNstyles.BtnContainerDetailsWrapper}>
        {!!entity.laboratoryAnalyzes.length && entity.state === 'STATE_ANALYSIS_DONE' && (
          <TouchableHighlight
            onPress={(): void => {
              const argsNavigateToAnalysis: TArgsNavigate<ILaboratoryAnalysis> = {
                route: API_ANALYSIS_SHORT,
                params: {
                  laboratoryAnalyzes: entity.laboratoryAnalyzes,
                  entityMaterials: entity.number,
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
        <ChooseBtn transitionsTitles={chooseTransitionsUa} entity={entity} />
      </View>
      <View style={CNstyles.defaultHeightLarge} />
      <View style={CNstyles.defaultHeightLarge} />
      <View style={CNstyles.defaultHeightLarge} />
    </>
  );
};
