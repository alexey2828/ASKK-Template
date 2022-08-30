import React from 'react';
import { Text, View } from 'react-native';
import { IModalDetail } from 'infrastructure/choose-popup-detail/choose-popup-detail';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from 'component-ui/common-block-styles.styles';
import moment from 'moment';
import { IMidaSensor } from 'plant/mida-sensor/entity/mida-sensor';
import { TITLES_MIDA_SENSOR } from 'plant/mida-sensor/const/title';

interface IDetailMidaSensor extends IModalDetail {
  entity: IMidaSensor;
}

export const DetailMidaSensor: React.FC<IDetailMidaSensor> = ({ entity }) => {
  return (
    <>
      <View style={CNstyles.BtnContainerDetails}>
        <Text style={[styles.defaultPurple18, { alignSelf: 'center', margin: 5 }]}>{entity.factoryNumber}</Text>
      </View>

      <View style={CNstyles.BtnContainerDetails}>
        <View style={{ margin: 10 }}>
          <Text style={styles.itemInfo}>
            {TITLES_MIDA_SENSOR.factoryNumber}: <Text style={styles.itemInfoa1}>{entity?.factoryNumber}</Text>
          </Text>
          <Text style={styles.itemInfo}>
            {TITLES_MIDA_SENSOR.serialNumber}: <Text style={styles.itemInfoa1}>{entity?.serialNumber}</Text>
          </Text>
          <Text style={styles.itemInfoa1}>
            {entity.sensorCalibrations?.map(sensorCalibration => {
              return (
                <>
                  <Text key={entity.id} style={styles.itemInfo}>
                    {TITLES_MIDA_SENSOR.result}:{' '}
                    <Text style={styles.itemInfoa1}>
                      {sensorCalibration.result ? TITLES_MIDA_SENSOR.resultWork : TITLES_MIDA_SENSOR.resultNotWork}
                    </Text>
                  </Text>
                  {'\n'}
                  <Text key={entity.id} style={styles.itemInfo}>
                    {TITLES_MIDA_SENSOR.sensorReading}:{' '}
                    <Text style={styles.itemInfoa1}>{sensorCalibration.sensorReading}</Text>
                  </Text>
                  {'\n'}
                  <Text key={entity.id} style={styles.itemInfo}>
                    {TITLES_MIDA_SENSOR.comment}: <Text style={styles.itemInfoa1}>{sensorCalibration.comment}</Text>
                  </Text>
                  {'\n'}
                </>
              );
            })}
            {moment(entity?.createAt).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
          </Text>
        </View>
      </View>
    </>
  );
};
