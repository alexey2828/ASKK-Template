import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import moment from 'moment';
import React from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { ETitlesTZPPlate } from '../../../component-ui/screen/home-screen/const/titles';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { ChooseBtn } from '../../../infrastructure/change-state/model/choose-btn';
import { IModalDetail } from '../../../infrastructure/choose-popup-detail/choose-popup-detail';
import { API_ANALYSIS_SHORT } from '../../../infrastructure/const/urls';
import { TITLES_LABORATORY_ANALYSIS } from '../../../laboratory/analysis/const/titles';
import { ILaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { INormativeDocument } from '../../../normative-document/entity/normative-document';
import { TITLES_TYPE_TZP_DETAIL } from '../../type-tzp-detail/const/titles';
import { TITLES_TZP_PRESSFORM } from '../../tzp-pressform/const/titiles';
import { chooseTransitionsUa, EState } from '../const/choose-ua-title-transition-state';
import { TITLES_TZP_DETAIL } from '../const/titles';
import { ITzpDetail } from '../entity/tzp-detail';
import { styles } from '../ui/tzp-detail-items/tzp-detail-item.styles';
import { DetailTzpStateView } from './detail-tzp-state-view';
import { MoreDetailsModal } from './more-details-modal';

interface TDetailTZPDetail extends IModalDetail {
  entity: ITzpDetail;
}

export const DetailTZPDetail: React.FC<TDetailTZPDetail> = ({ entity }) => {
  const { goTo } = useNavigate<INormativeDocument | ILaboratoryAnalysis>();
  const showAnalysis = entity?.tzpDetailSamples?.map(tzpDetailSample => {
    return tzpDetailSample.laboratoryAnalyzes.map(laboratoryAnalysis => {
      return laboratoryAnalysis;
    });
  });

  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple18, { alignSelf: 'center', margin: 5 }]}>{entity.detailNumber}</Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{DetailTzpStateView(entity.state, entity)}</ViewStateWrap>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_PRESSFORM.pressformNumber}:{' '}
            <Text style={styles.itemInfoa1}>{entity.tzpPressform?.pressformNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL.detailNumber}: <Text style={styles.itemInfoa1}>{entity.detailNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TYPE_TZP_DETAIL.title}:{' '}
            <Text style={styles.itemInfoa1}>{entity.tzpPressform?.typeTzpDetail.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL.mixingAap}: <Text style={styles.itemInfoa1}>{entity.mixingAap.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_DETAIL.mixingKm1}: <Text style={styles.itemInfoa1}>{entity.mixingKm1.name}</Text>
          </Text>
          {entity.state === EState.STATE_REJECTED_FOR_USE || entity.state === EState.STATE_DEFECT_FOUND ? (
            <Text style={styles.itemInfo}>
              {TITLES_TZP_DETAIL.comment}: <Text style={styles.itemInfoa1}>{entity.defectDescription}</Text>
            </Text>
          ) : null}
          {entity.state === EState.STATE_READY_FOR_USE ? (
            <>
              <Text style={styles.itemInfo}>
                {TITLES_TZP_DETAIL.comment}: <Text style={styles.itemInfoa1}>{entity.qualityReport?.appearance}</Text>
              </Text>
              <Text style={styles.itemInfo}>
                <Text style={styles.itemInfoa1}>
                  {moment(entity?.createdAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
                </Text>
              </Text>
            </>
          ) : null}
          <Text style={styles.itemInfo}>
            {ETitlesTZPPlate.TZP_PLATE}:{' '}
            <Text style={styles.itemInfoa1}>
              {entity.tzpDetailSamples?.map(tzpDetailSample => {
                return (
                  <>
                    <Text key={entity.id}>
                      {'\n'}· {tzpDetailSample.number}
                    </Text>
                  </>
                );
              })}
            </Text>
          </Text>
        </View>
      </View>
      <View style={CNstyles.BtnContainerDetailsWrapper}>
        <MoreDetailsModal entity={entity} />
        {showAnalysis ? (
          <TouchableHighlight
            onPress={(): void => {
              const argsNavigateToAnalysis: TArgsNavigate<ILaboratoryAnalysis> = {
                route: API_ANALYSIS_SHORT,
                params: {
                  laboratoryAnalyzes: showAnalysis.flat(),
                },
              };
              goTo(argsNavigateToAnalysis);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_LABORATORY_ANALYSIS.titleSingle}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        <ChooseBtn transitionsTitles={chooseTransitionsUa} entity={entity} />
      </View>
      <View style={CNstyles.defaultHeightLarge} />
    </>
  );
};
