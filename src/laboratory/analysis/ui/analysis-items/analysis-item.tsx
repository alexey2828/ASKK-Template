/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { TArgsNavigate, useNavigate } from '../../../../hooks/use-navigate';
import { TMember } from '../../../../infrastructure/api-platform';
import { ENavigationName } from '../../../../infrastructure/const/navigation-name';
import { TITLES_LABORATORY_ANALYSIS } from '../../const/titles';
import { ILaboratoryAnalysis } from '../../entity/laboratory-analysis';
import { styles } from './analysis-item.styles';

type TAnalysisItem = {
  laboratoryAnalyzes: ILaboratoryAnalysis;
  entityMaterials: any;
  analyzesTitle?: string;
};

export const AnalysisItem: React.FC<TAnalysisItem> = ({
  laboratoryAnalyzes: laboratoryAnalyzes,
  entityMaterials,
  analyzesTitle,
}) => {
  const { goTo } = useNavigate<TMember>();
  return (
    <View style={styles.BtnContainerDetails} key={laboratoryAnalyzes.id}>
      <View style={{ margin: 20, marginTop: -15, width: 340 }}>
        <Pressable
          onPress={(): void => {
            const argsNavigateTo: TArgsNavigate<TMember> = {
              route: ENavigationName.LA_DETAILS,
              params: {
                entity: laboratoryAnalyzes,
                entityMaterials,
                analyzesTitle,
              },
            };
            goTo(argsNavigateTo);
          }}
        >
          <Image source={require('../../../../../public/images/analysis.png')} style={styles.Ico} />
          <View>
            <Text style={styles.listTitle}>{laboratoryAnalyzes.name}</Text>
          </View>
          <View>
            <Text style={styles.itemInfoa1}>
              {TITLES_LABORATORY_ANALYSIS.createdAt}:{' '}
              {moment(laboratoryAnalyzes.createdAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </View>
          {laboratoryAnalyzes.validUntil && (
            <View>
              <Text style={styles.itemInfoa1}>
                {TITLES_LABORATORY_ANALYSIS.validUntil}:{' '}
                {moment(laboratoryAnalyzes.validUntil).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
              </Text>
            </View>
          )}
          <View style={{ marginTop: 20 }}>
            <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
              {TITLES_LABORATORY_ANALYSIS.conclusion}:{' '}
              {laboratoryAnalyzes.isPositive === true ? (
                <Text style={{ color: 'lime' }}>Позитивний</Text>
              ) : (
                <Text style={{ color: 'red' }}>Негативний</Text>
              )}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
