import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from 'component-ui/common-block-styles.styles';
import { IListItem } from '../../../../infrastructure/entity-list';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { PressformTzpStateView } from 'tzp/tzp-pressform/model/tzp-pressform-state-view';
import { ITzpPressform } from 'tzp/tzp-pressform/entity/tzp-pressform/tzp-pressform';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';

export const TzpPressformItem: React.FC<IListItem<ITzpPressform>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../../public/images/pressFormTZPIco.png')} style={styles.Ico} />
          <View style={{ width: '100%' }}>
            <Text style={styles.listTitle}>{data.pressformNumber}</Text>
          </View>
          <View style={CNstyles.defaultHeight} />
          <View>
            <ViewStateWrap>{PressformTzpStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
