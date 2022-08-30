import React, { useEffect } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { ITzpPressform } from '..';
import { IModalDetail } from '../../../infrastructure/choose-popup-detail/choose-popup-detail';
import { styles } from '../ui/tzp-pressform-items/tzp-pressform-item.styles';
import { ChooseBtn } from '../../../infrastructure/change-state/model/choose-btn';
import { chooseTransitionsUa } from '../const/choose-ua-title-transition-state';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import {
  API_ANALYSIS_SHORT,
  API_NORMATIVE_DOCUMENT_SHORT_URL,
  API_TZP_DETAIL_SHORT_URL,
} from '../../../infrastructure/const/urls';
import { TITLES_TZP_PRESSFORM } from '../const/titiles';
import { useNavigate, TArgsNavigate } from '../../../hooks/use-navigate';
import { INormativeDocument } from '../../../normative-document/entity/normative-document';
import { ILaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { TITLES_NORMATIVE_DOCUMENT } from '../../../normative-document/const/titles';
import { ETitleDetailTZP } from '../../../infrastructure/const/entity/detail-tzp-title';
import moment from 'moment';
import { TITLES_MIXING } from '../../../mixing/const/titles';
import { useHttp } from '../../../hooks/useHttp';
import { ENavigationName } from '../../../infrastructure/const/navigation-name';
import { TITLES_TZP_DETAIL } from '../../tzp-detail/const/titles';
import { ITzpDetail } from '../../tzp-detail/entity/tzp-detail';
import { MainTitles } from '../../../const/titles-main';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { PressformTzpStateView } from './tzp-pressform-state-view';

interface ITZPPressForm extends IModalDetail {
  entity: ITzpPressform;
}

export const DetailTzpPressform: React.FC<ITZPPressForm> = ({ entity }) => {
  const { goTo } = useNavigate<INormativeDocument | ILaboratoryAnalysis | ITzpDetail>();
  const { data, updateResponse } = useHttp<ITzpDetail>();
  const url = API_TZP_DETAIL_SHORT_URL + '/' + entity.currentTzpDetail?.id;

  useEffect(() => {
    updateResponse({ url });
  }, [url, updateResponse]);

  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple16, { alignSelf: 'center', margin: 5 }]}>{entity.pressformNumber}</Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{PressformTzpStateView(entity.state, entity)}</ViewStateWrap>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_PRESSFORM.pressformNumber}: <Text style={styles.itemInfoa1}>{entity?.pressformNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_PRESSFORM.formularNumber}: <Text style={styles.itemInfoa1}>{entity?.formularNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {ETitleDetailTZP.typeDetailTzpCreate}: <Text style={styles.itemInfoa1}>{entity?.typeTzpDetail.name}</Text>
          </Text>
          {entity?.currentTzpDetail ? (
            <Text style={styles.itemInfo}>
              {TITLES_TZP_DETAIL.detailNumber}:{' '}
              <Text style={styles.itemInfoa1}>{entity?.currentTzpDetail?.detailNumber}</Text>
            </Text>
          ) : null}
          {entity.numberUsedAap !== 0 ? (
            <Text style={styles.itemInfo}>
              {TITLES_MIXING.numberUsedAap}: <Text style={styles.itemInfoa1}>{entity.numberUsedAap}</Text>
            </Text>
          ) : null}
          {entity.currentAap ? (
            <Text style={styles.itemInfo}>
              {TITLES_MIXING.mixingAAP}: <Text style={styles.itemInfoa1}>{entity.currentAap.name}</Text>
            </Text>
          ) : null}
          {entity.polymerizationUsedKm1ClosedCap !== 0 ? (
            <Text style={styles.itemInfo}>
              {TITLES_MIXING.polymerizationUsedKm1ClosedCap}:{' '}
              <Text style={styles.itemInfoa1}>{entity.polymerizationUsedKm1ClosedCap}</Text>
            </Text>
          ) : null}
          {entity.currentKm1 ? (
            <Text style={styles.itemInfo}>
              {TITLES_MIXING.mixingKM1}: <Text style={styles.itemInfoa1}>{entity.currentKm1.name}</Text>
            </Text>
          ) : null}
          <Text style={styles.itemInfo}>
            {TITLES_TZP_PRESSFORM.createdAt}:{' '}
            <Text style={styles.itemInfoa1}>
              {moment(entity?.createAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </Text>
        </View>
      </View>
      <View style={CNstyles.BtnContainerDetailsWrapper}>
        {data ? (
          <TouchableHighlight
            onPress={(): void => {
              const argsNavigateToTzpDetail: TArgsNavigate<ITzpDetail> = {
                route: ENavigationName.DETAILS_SCREEN,
                params: {
                  entity: data,
                },
              };
              goTo(argsNavigateToTzpDetail);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_TZP_DETAIL.title}</Text>
            </View>
          </TouchableHighlight>
        ) : null}
        {!!entity.laboratoryAnalyzes.length && (
          <TouchableHighlight
            onPress={(): void => {
              const argsNavigateToAnalysis: TArgsNavigate<ILaboratoryAnalysis> = {
                route: API_ANALYSIS_SHORT,
                params: {
                  laboratoryAnalyzes: entity.laboratoryAnalyzes,
                  entityMaterials: entity.pressformNumber,
                  analyzesTitle: TITLES_TZP_PRESSFORM.analysis,
                  isAnalyzesEmpty: TITLES_TZP_PRESSFORM.acts + MainTitles.NOT_FOUND,
                },
              };
              goTo(argsNavigateToAnalysis);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_TZP_PRESSFORM.analysis}</Text>
            </View>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          onPress={(): void => {
            const argsNavigateToND: TArgsNavigate<INormativeDocument> = {
              route: API_NORMATIVE_DOCUMENT_SHORT_URL,
              params: {
                entity: entity.normativeDocuments,
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
      </View>
    </>
  );
};
