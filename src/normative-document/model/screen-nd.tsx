import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { ServerErr } from '../../component-ui/viewError/server-error';
import { MainTitles } from '../../const/titles-main';
import { INavigate } from '../../hooks/use-navigate';
import { EMessagesND } from '../const/messages';
import { INormativeDocument, isNormativeDocument } from '../entity/normative-document';
import { NDItem } from '../ui/nd-items/nd-item';
import { styles } from '../ui/nd-items/nd-item.styles';

export const ScreenND: React.FC<INavigate<INormativeDocument>> = props => {
  const { route } = props;
  const normativeDocuments =
    route.params.normativeDocuments || route.params.entity || route.params.shortNormativeDocuments;

  if (!Array.isArray(normativeDocuments)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  const notNormativeDocuments = normativeDocuments.find(NDItem => {
    return !isNormativeDocument(NDItem);
  });

  if (notNormativeDocuments) {
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
          {normativeDocuments[0] == null ? <ServerErr message={EMessagesND.NO_DATA} /> : null}
          <Text style={{ color: '#ffffff' }}>
            {normativeDocuments.map(normativeDocuments => {
              return (
                <>
                  <View style={{ margin: 10 }} key={normativeDocuments.id}>
                    <NDItem normativeDocument={normativeDocuments} />
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
