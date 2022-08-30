import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from 'component-ui/common-block-styles.styles';
import { IListItem } from '../../../../infrastructure/entity-list';
import { ITzpDetailSample } from '../../entity/tzp-plate';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { DetailTzpSampleStateView } from 'tzp/tzp-plate/model/detail-tzp-sample-state-view';

export const TzpPlateItem: React.FC<IListItem<ITzpDetailSample>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../../public/images/pressFormTZPBodyIco.png')} style={styles.Ico} />
          <Pressable onPress={onPress} key={data.id}>
            <View style={{ width: '100%' }}>
              <Text style={styles.listTitle}>{data.number}</Text>
            </View>
          </Pressable>
        </Pressable>
      </View>
      <View>
        <ViewStateWrap>{DetailTzpSampleStateView(data.state, data)}</ViewStateWrap>
      </View>
    </View>
  );
};
