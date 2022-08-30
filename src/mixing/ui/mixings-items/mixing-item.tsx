import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { styles } from 'component-ui/common-block-styles.styles';
import { IListItem } from '../../../infrastructure/entity-list';
import { IMixing } from '../..';
import { TITLES_MIXING_TYPE } from '../../entity/mixing-type/const/titles';
import { MixingStateView } from 'mixing/model/mixing-state-view';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';

export const MixingItem: React.FC<IListItem<IMixing>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../public/images/mixingIco.png')} style={styles.Ico} />
          <View style={{ width: '100%' }}>
            <Text style={styles.listTitle}>{data.name} </Text>
          </View>
          <View>
            <Text style={[styles.stateItem, { marginTop: 10, marginBottom: 10, fontSize: 16 }]}>
              {TITLES_MIXING_TYPE.title}: {data.mixingType.mixingTypeAbstract.name}
            </Text>
          </View>
          <View>
            <ViewStateWrap>{MixingStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
