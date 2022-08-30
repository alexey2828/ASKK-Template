import React from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import { TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { INormativeDocument } from '../../../normative-document/entity/normative-document';
import { ILaboratoryAnalysis } from '../../../laboratory/analysis/entity/laboratory-analysis';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { API_ANALYSIS_SHORT, API_NORMATIVE_DOCUMENT_SHORT_URL } from '../../../infrastructure/const/urls';
import { TITLES_NORMATIVE_DOCUMENT } from '../../../normative-document/const/titles';
import { IModalDetail } from '../../../infrastructure/choose-popup-detail/choose-popup-detail';
import moment from 'moment';
import { IEnginePressform } from '../entity/engine-pressform';
import { chooseTransitionsUa } from '../../const/choose-ua-title-transition-state';
import { ChooseBtn } from '../../../infrastructure/change-state/model/choose-btn';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { MaterialStateView } from 'materials/model/materials-state-view';
import { TITLES_ENGINE_PRESSFORM } from '../const/titles';
import { TITLES_TZP_PRESSFORM } from 'tzp/tzp-pressform/const/titiles';

interface IDetailEnginePressform extends IModalDetail {
  entity: IEnginePressform;
}

export const DetailEnginePressform: React.FC<IDetailEnginePressform> = ({ entity }) => {
  const { goTo } = useNavigate<INormativeDocument | ILaboratoryAnalysis>();
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple18, { alignSelf: 'center' }]}>{entity.name}</Text>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <ViewStateWrap>{MaterialStateView(entity.state, entity)}</ViewStateWrap>
      </View>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_ENGINE_PRESSFORM.number}: <Text style={styles.itemInfoa1}>{entity?.name}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_ENGINE_PRESSFORM.formularNumber}: <Text style={styles.itemInfoa1}>{entity?.formularNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_ENGINE_PRESSFORM.paintNumber}: <Text style={styles.itemInfoa1}>{entity?.drawingNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_ENGINE_PRESSFORM.date}:{' '}
            <Text style={styles.itemInfoa1}>
              {moment(entity?.createdAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </Text>
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
                },
              };
              goTo(argsNavigateToAnalysis);
            }}
          >
            <View style={CNstyles.BtnContainerDetails}>
              <Text style={CNstyles.BtnTitle}>{TITLES_TZP_PRESSFORM.acts}</Text>
            </View>
          </TouchableHighlight>
        )}
        <TouchableHighlight
          onPress={(): void => {
            const argsNavigateToND: TArgsNavigate<INormativeDocument> = {
              route: API_NORMATIVE_DOCUMENT_SHORT_URL,
              params: {
                normativeDocuments: entity.normativeDocuments,
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
        <View style={CNstyles.defaultHeightLarge} />
        <View style={CNstyles.defaultHeightLarge} />
      </View>
    </>
  );
};
