import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { IListItem } from '../../../infrastructure/entity-list';
import { IComponentBatchPlace } from '../../entity/component-batch-place';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { ComponentBatchPlaceStateView } from 'component-batch-place/model/component-batch-place-state-view';
import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { styles } from 'component-ui/common-block-styles.styles';

export const ComponentBatchPlaceItem: React.FC<IListItem<IComponentBatchPlace>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../public/images/componentsIco.png')} style={styles.Ico} />

          <Pressable onPress={onPress}>
            <View style={{ width: '100%' }}>
              <Text style={styles.listTitle}>{data?.componentBatch?.componentType?.name}</Text>
            </View>
          </Pressable>
          <View style={CNstyles.defaultHeight} />
          <View>
            <ViewStateWrap>{ComponentBatchPlaceStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
