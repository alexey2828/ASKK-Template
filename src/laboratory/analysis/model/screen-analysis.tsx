import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { ServerErr } from '../../../component-ui/viewError/server-error';
import { MainTitles } from '../../../const/titles-main';
import { INavigate } from '../../../hooks/use-navigate';
import { EMessagesLA } from '../const/messages';
import { ILaboratoryAnalysis, isLaboratoryAnalysis } from '../entity/laboratory-analysis';
import { AnalysisItem } from '../ui/analysis-items/analysis-item';
import { styles } from '../ui/analysis-items/analysis-item.styles';

export const ScreenAnalysis: React.FC<INavigate<ILaboratoryAnalysis>> = props => {
  const { route } = props;
  const laboratoryAnalyzes = route.params.laboratoryAnalyzes;
  const analyzesTitle = route.params.analyzesTitle;
  const message = EMessagesLA.NO_DATA;
  const isAnalyzesEmpty = route.params.isAnalyzesEmpty;

  if (!Array.isArray(laboratoryAnalyzes)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  const notLaboratoryAnalyzes = laboratoryAnalyzes.find(laboratoryAnalyze => {
    return !isLaboratoryAnalysis(laboratoryAnalyze);
  });

  if (notLaboratoryAnalyzes) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={styles.ScreenContainer}>
      <View style={{ height: 500, marginTop: 10 }}>
        <ScrollView>
          {laboratoryAnalyzes[0] == null ? <ServerErr message={isAnalyzesEmpty ? isAnalyzesEmpty : message} /> : null}
          <Text style={{ color: '#ffffff' }}>
            {laboratoryAnalyzes.map(laboratoryAnalyzes => {
              return (
                <>
                  <View style={{ margin: 10 }} key={laboratoryAnalyzes.id}>
                    <AnalysisItem
                      laboratoryAnalyzes={laboratoryAnalyzes}
                      analyzesTitle={analyzesTitle}
                      entityMaterials={props.route.params?.entityMaterials}
                    />
                  </View>
                </>
              );
            })}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};
