import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from 'component-ui/common-block-styles.styles';
import { IListItem } from '../../../../infrastructure/entity-list';
import { ITzpDetail } from '../../entity/tzp-detail';
import { DetailTzpStateView } from 'tzp/tzp-detail/model/detail-tzp-state-view';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';

export const TzpDetailItem: React.FC<IListItem<ITzpDetail>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../../public/images/TZPDetailIco.png')} style={styles.Ico} />
          <View style={{ width: '100%' }}>
            <Text style={styles.listTitle}>{data.detailNumber}</Text>
          </View>
          <View style={CNstyles.defaultHeight} />
          <View>
            <ViewStateWrap>{DetailTzpStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
