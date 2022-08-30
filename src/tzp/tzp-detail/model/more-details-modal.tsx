import React, { ReactElement, useState } from 'react';
import { Text, View, TouchableHighlight, ScrollView } from 'react-native';
import { CNstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { ETitles } from '../../../infrastructure/confirm-modal/const/titles';
import { ITzpDetail } from '../entity/tzp-detail';
import Modal from 'react-native-modal';
import { modalStyles } from '../../../infrastructure/confirm-modal/confirm.styles';
import moment from 'moment';
import { TITLES_BUILDING } from '../../../buildings/const/titles';
import { ETitlePressFormTZP } from '../../../infrastructure/const/entity/tzp-press-form-title';
import { TITLES_TIME_PROCESS } from '../../../time-process/const/titles';
import { TITLES_QUALITY_REPORT } from '../../quality-report/const/titles';
import { TITLE_THERMAL_CHAMBERS } from '../../tzp-pressform/entity/thermal-chamber/const/titles';
import { styles } from '../ui/tzp-detail-items/tzp-detail-item.styles';
import { MainTitles } from '../../../const/titles-main';

interface TMoreDetailsModal {
  entity: ITzpDetail;
}

export function MoreDetailsModal({ entity }: TMoreDetailsModal): ReactElement {
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = (): void => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <TouchableHighlight
        onPress={(): void => {
          setModalVisible(true);
        }}
      >
        <View style={CNstyles.BtnContainerDetails}>
          <Text style={CNstyles.BtnTitle}>{MainTitles.MORE_INFO}</Text>
        </View>
      </TouchableHighlight>
      <Modal animationInTiming={200} animationOutTiming={200} onBackdropPress={toggleModal} isVisible={isModalVisible}>
        <View style={modalStyles.modalBack}>
          <View style={{ margin: 10 }}>
            <ScrollView>
              <Text style={modalStyles.modalTitle}>{MainTitles.MORE_INFO}</Text>
              {entity?.polymerizationProcessAapAware ? (
                <View style={CNstyles.BtnContainerDetails}>
                  <View style={{ margin: 10 }}>
                    <Text style={styles.itemInfo}>{ETitlePressFormTZP.polymerizationAAP}</Text>
                    <Text style={styles.itemInfo}>
                      {TITLE_THERMAL_CHAMBERS.title}:{' '}
                      <Text style={styles.itemInfoa1}>{entity.polymerizationProcessAapAware?.polymerizedIn.name}</Text>
                    </Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_BUILDING.title}:{' '}
                      <Text style={styles.itemInfoa1}>
                        {entity.polymerizationProcessAapAware?.polymerizedIn.locatedAt.name}
                      </Text>
                    </Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_TIME_PROCESS.startTime}:{' '}
                      <Text style={styles.itemInfoa1}>
                        {moment(entity.polymerizationProcessAapAware?.startTime)
                          .format('DD.MM.YYYY, HH:mm:ss')
                          .toLocaleString()}
                      </Text>
                    </Text>
                    {entity.polymerizationProcessAapAware?.endTime ? (
                      <Text style={styles.itemInfo}>
                        {TITLES_TIME_PROCESS.endTime}:{' '}
                        <Text style={styles.itemInfoa1}>
                          {moment(entity.polymerizationProcessAapAware?.endTime)
                            .format('DD.MM.YYYY, HH:mm:ss')
                            .toLocaleString()}
                        </Text>
                      </Text>
                    ) : null}
                  </View>
                </View>
              ) : null}
              {entity?.polymerizationProcessKm1Aware ? (
                <View style={CNstyles.BtnContainerDetails}>
                  <View style={{ margin: 10 }}>
                    <Text style={styles.itemInfo}>{ETitlePressFormTZP.polymerizationKM1}</Text>
                    <Text style={styles.itemInfo}>
                      {TITLE_THERMAL_CHAMBERS.title}:{' '}
                      <Text style={styles.itemInfoa1}>{entity.polymerizationProcessKm1Aware?.polymerizedIn.name}</Text>
                    </Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_BUILDING.title}:{' '}
                      <Text style={styles.itemInfoa1}>
                        {entity.polymerizationProcessKm1Aware?.polymerizedIn.locatedAt.name}
                      </Text>
                    </Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_TIME_PROCESS.startTime}:{' '}
                      <Text style={styles.itemInfoa1}>
                        {moment(entity.polymerizationProcessKm1Aware?.startTime)
                          .format('DD.MM.YYYY, HH:mm:ss')
                          .toLocaleString()}
                      </Text>
                    </Text>
                    {entity.polymerizationProcessKm1Aware?.endTime ? (
                      <Text style={styles.itemInfo}>
                        {TITLES_TIME_PROCESS.endTime}:{' '}
                        <Text style={styles.itemInfoa1}>
                          {moment(entity.polymerizationProcessKm1Aware?.endTime)
                            .format('DD.MM.YYYY, HH:mm:ss')
                            .toLocaleString()}
                        </Text>
                      </Text>
                    ) : null}
                  </View>
                </View>
              ) : null}
              {entity?.startRoughingTime ? (
                <View style={CNstyles.BtnContainerDetails}>
                  <View style={{ margin: 10 }}>
                    <Text style={styles.itemInfo}>{ETitlePressFormTZP.roughing}</Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_TIME_PROCESS.startTime}:{' '}
                      <Text style={styles.itemInfoa1}>
                        {moment(entity.startRoughingTime).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
                      </Text>
                    </Text>
                    {entity.completedRoughingTime ? (
                      <Text style={styles.itemInfo}>
                        {TITLES_TIME_PROCESS.endTime}:{' '}
                        <Text style={styles.itemInfoa1}>
                          {moment(entity.completedRoughingTime).format('DD.MM.YYYY, HH:mm:ss').toLocaleString()}
                        </Text>
                      </Text>
                    ) : null}
                  </View>
                </View>
              ) : null}
              {entity?.qualityReport ? (
                <View style={CNstyles.BtnContainerDetails}>
                  <View style={{ margin: 10 }}>
                    <Text style={styles.itemInfo}>{TITLES_QUALITY_REPORT.title}</Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_QUALITY_REPORT.appearance}:{' '}
                      <Text style={styles.itemInfoa1}>{entity.qualityReport.appearance}</Text>
                    </Text>
                    <Text style={styles.itemInfo}>
                      {TITLES_QUALITY_REPORT.weight}:{' '}
                      <Text style={styles.itemInfoa1}>{entity.qualityReport.weight}</Text>
                    </Text>
                  </View>
                </View>
              ) : null}
            </ScrollView>
            <View style={[modalStyles.modalContainer, { marginLeft: 140 }]}>
              <TouchableHighlight
                onPress={(): void => {
                  setModalVisible(false);
                }}
              >
                <Text style={modalStyles.goBack}>{ETitles.BACK}</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
