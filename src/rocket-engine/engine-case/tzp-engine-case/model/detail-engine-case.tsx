import React from 'react';
import { Text, View } from 'react-native';
import { IModalDetail } from 'infrastructure/choose-popup-detail/choose-popup-detail';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from 'component-ui/common-block-styles.styles';
import moment from 'moment';
import { TITLES_TZP_ENGINE_CASE } from '../const/title';
import { ITzpEngineCase } from '../entity/tzp-engine-case';

interface IDetailTzpEngineCase extends IModalDetail {
  entity: ITzpEngineCase;
}

export const DetailTzpEngineCase: React.FC<IDetailTzpEngineCase> = ({ entity }) => {
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_TZP_ENGINE_CASE.dateRoughing}:{' '}
            <Text style={styles.itemInfoa1}>
              {moment(entity?.dateRoughing).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
            </Text>
          </Text>
          {entity.tzpVisualDefects?.map(commentOnCorrectedDefect => {
            return (
              <>
                <Text key={entity.id} style={styles.itemInfo}>
                  {TITLES_TZP_ENGINE_CASE.visualControl}:{' '}
                  <Text style={styles.itemInfoa1}>{commentOnCorrectedDefect.premises?.name}</Text>
                </Text>
                {'\n'}
                <Text key={entity.id} style={styles.itemInfo}>
                  {TITLES_TZP_ENGINE_CASE.appearanceRoughing}:{' '}
                  <Text style={styles.itemInfoa1}>{commentOnCorrectedDefect.name}</Text>
                </Text>
                {'\n'}
              </>
            );
          })}
          <Text style={styles.itemInfoa1}>
            {moment(entity?.createAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  );
};
