import React from 'react';
import { ScrollView, Text, View, TextStyle, ViewStyle } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from '../../component-ui/common-block-styles.styles';
import { INavigate } from '../../hooks/use-navigate';
import { INormativeDocument } from '../entity/normative-document';
import { TITLES_NORMATIVE_DOCUMENT } from '../const/titles';

const viewFields: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
};
const viewFieldsItem: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  borderColor: '#333334',
  borderStyle: 'solid',
  borderWidth: 2,
  width: '49.5%',
};
const textFieldsItem: TextStyle = {
  color: '#a1a1a1',
  fontSize: 18,
};

export const DetailNormativeDocument: React.FC<INavigate<INormativeDocument>> = props => {
  const { route } = props;
  const normativeDocuments = route.params.entity;

  return (
    <>
      <View style={{ height: 600, backgroundColor: '#121212' }}>
        <View style={[CNstyles.BtnContainerDetails, { margin: 15, marginLeft: 15 }]}>
          <Text style={[styles.defaultPurple18, { alignSelf: 'center' }]}>{normativeDocuments?.name}</Text>
        </View>
        <View style={[CNstyles.BtnContainerDetails, { marginLeft: 15 }]}>
          <View style={{ margin: 10 }}>
            <Text style={{ color: '#a1a1a1', fontSize: 18 }}>
              {TITLES_NORMATIVE_DOCUMENT.title}: {normativeDocuments?.name}{' '}
            </Text>
          </View>
        </View>
        <ScrollView>
          <View style={{ height: 600 }}>
            <View style={[CNstyles.BtnContainerDetails, { margin: 15, marginLeft: 15 }]}>
              <View style={{ margin: 10 }}>
                <Text style={{ color: '#ffffff', fontSize: 20 }}> {TITLES_NORMATIVE_DOCUMENT.fields} </Text>
                <View style={{ marginTop: 10 }}>
                  {!!normativeDocuments?.fields.length && (
                    <>
                      <View style={viewFields}>
                        <View style={viewFieldsItem}>
                          <Text style={textFieldsItem}> {TITLES_NORMATIVE_DOCUMENT.fieldName}</Text>
                        </View>
                        <View style={viewFieldsItem}>
                          <Text style={textFieldsItem}> {TITLES_NORMATIVE_DOCUMENT.fieldNorm}</Text>
                        </View>
                      </View>
                    </>
                  )}
                  {normativeDocuments?.fields.map(ndField => {
                    return (
                      <View style={viewFields} key={ndField.id}>
                        <View style={viewFieldsItem}>
                          <Text style={textFieldsItem}> {ndField.name}</Text>
                        </View>
                        <View style={viewFieldsItem}>
                          <Text style={textFieldsItem}> {ndField.norm}</Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </>
  );
};
