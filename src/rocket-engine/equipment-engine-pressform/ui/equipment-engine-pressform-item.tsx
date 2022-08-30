import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { IListItem } from '../../../infrastructure/entity-list';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { IEquipmentEnginePressform } from '../entity/equipment-engine-pressform';
import { styles } from 'component-ui/common-block-styles.styles';
import { TITLES_EQUIPMENT_ENGINE_PRESSFORM } from '../const/titles';
import { EquipmentEnginePressformStateView } from '../model/equipment-engine-pressform-state-view';

export const EquipmentEnginePressformItem: React.FC<IListItem<IEquipmentEnginePressform>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../public/images/equipment.png')} style={styles.Ico} />
          <View style={{ width: '100%' }}>
            <Text style={styles.listTitle}>{data.name} </Text>
          </View>
          <View>
            <Text style={[styles.stateItem, { marginTop: 10, marginBottom: 10, fontSize: 16 }]}>
              {TITLES_EQUIPMENT_ENGINE_PRESSFORM.title}: {data.name}
            </Text>
          </View>
          <View>
            <ViewStateWrap>{EquipmentEnginePressformStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
