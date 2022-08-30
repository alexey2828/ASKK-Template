import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { INavigate } from '../../../hooks/use-navigate';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { TITLES_NORMATIVE_DOCUMENT } from '../../../normative-document/const/titles';
import { TITLES_LABORATORY_ANALYSIS } from '../const/titles';
import { ILaboratoryAnalysis } from '../entity/laboratory-analysis';

export const DetailAnalysis: React.FC<INavigate<ILaboratoryAnalysis>> = props => {
  const { route } = props;
  const laboratoryAnalyzes = route.params.entity;
  const analyzesTitle = route.params.analyzesTitle;
  const entityMaterials = route.params?.entityMaterials;
  return (
    <>
      <View style={{ height: 600, backgroundColor: '#121212' }}>
        <View style={[CNstyles.BtnContainerDetails, { margin: 15, marginLeft: 15 }]}>
          <Text style={[styles.defaultPurple18, { alignSelf: 'center' }]}>{laboratoryAnalyzes?.name}</Text>
        </View>
        <View style={[CNstyles.BtnContainerDetails, { marginLeft: 15 }]}>
          <View style={{ margin: 10 }}>
            <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
              {analyzesTitle ? analyzesTitle : TITLES_LABORATORY_ANALYSIS.name}: {laboratoryAnalyzes?.name}
            </Text>
            <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
              {TITLES_LABORATORY_ANALYSIS.createdAt}:{' '}
              {moment(laboratoryAnalyzes?.createdAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
            {laboratoryAnalyzes?.isPositive && (
              <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
                {TITLES_LABORATORY_ANALYSIS.conclusion}:
                {laboratoryAnalyzes?.isPositive === true ? (
                  <Text style={{ color: 'lime' }}> {TITLES_LABORATORY_ANALYSIS.positive}</Text>
                ) : (
                  <Text style={{ color: 'red' }}> {TITLES_LABORATORY_ANALYSIS.negative}</Text>
                )}
              </Text>
            )}
            {laboratoryAnalyzes?.validUntil ? (
              <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
                {TITLES_LABORATORY_ANALYSIS.validUntil}:{' '}
                {moment(laboratoryAnalyzes?.validUntil).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
              </Text>
            ) : null}
            {entityMaterials ? (
              <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
                {TITLES_LABORATORY_ANALYSIS.material}: {entityMaterials}
              </Text>
            ) : null}
            <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
              {TITLES_NORMATIVE_DOCUMENT.title}: {laboratoryAnalyzes?.normativeDocument.name}
            </Text>
            {laboratoryAnalyzes?.comment ? (
              <Text style={{ color: '#a1a1a1', fontSize: 16 }}>
                {TITLES_LABORATORY_ANALYSIS.comment}: {laboratoryAnalyzes?.comment}
              </Text>
            ) : null}
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={CNstyles.defaultHeight} />
        <View style={[CNstyles.BtnContainerDetails, { marginLeft: 15 }]}>
          <Text style={{ color: '#ffffff', fontSize: 18 }}> {TITLES_NORMATIVE_DOCUMENT.fields} </Text>
          <View style={{ marginTop: 10 }}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View
                style={{
                  borderColor: '#333334',
                  borderStyle: 'solid',
                  borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '33%',
                }}
              >
                <Text style={{ color: '#a1a1a1', fontSize: 16 }}>{TITLES_NORMATIVE_DOCUMENT.fieldName}</Text>
              </View>
              <View
                style={{
                  borderColor: '#333334',
                  borderStyle: 'solid',
                  borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '34%',
                }}
              >
                <Text style={{ color: '#a1a1a1', fontSize: 16 }}>{TITLES_NORMATIVE_DOCUMENT.value}</Text>
              </View>
              <View
                style={{
                  borderColor: '#333334',
                  borderStyle: 'solid',
                  borderWidth: 2,
                  display: 'flex',
                  flexDirection: 'row',
                  width: '33%',
                }}
              >
                <Text style={{ color: '#a1a1a1', fontSize: 16 }}>{TITLES_NORMATIVE_DOCUMENT.fieldNorm}</Text>
              </View>
            </View>
            {laboratoryAnalyzes?.inputs.map(ndField => {
              return (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                  key={ndField.id}
                >
                  <View
                    style={{
                      borderColor: '#333334',
                      borderStyle: 'solid',
                      borderWidth: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      width: '33%',
                    }}
                  >
                    <Text
                      style={{
                        color: '#a1a1a1',
                        fontSize: 16,
                      }}
                    >
                      {' '}
                      {ndField.normativeDocumentField.name}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: '#333334',
                      borderStyle: 'solid',
                      borderWidth: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      width: '34%',
                    }}
                  >
                    <Text
                      style={{
                        color: '#a1a1a1',
                        fontSize: 16,
                      }}
                    >
                      {' '}
                      {ndField.value ? ndField.value : <Text>{TITLES_NORMATIVE_DOCUMENT.noData}</Text>}
                    </Text>
                  </View>
                  <View
                    style={{
                      borderColor: '#333334',
                      borderStyle: 'solid',
                      borderWidth: 2,
                      display: 'flex',
                      flexDirection: 'row',
                      width: '33%',
                    }}
                  >
                    <Text
                      style={{
                        color: '#a1a1a1',
                        fontSize: 16,
                      }}
                    >
                      {' '}
                      {ndField.normativeDocumentField.norm}
                    </Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </>
  );
};
