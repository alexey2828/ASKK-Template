import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { IListItem } from '../../../infrastructure/entity-list';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { styles } from 'component-ui/common-block-styles.styles';
import { TITLES_ROCKET_ENGINE } from '../const/title';
import { IRocketEngine } from '../entity/rocket-engine';
import { RocketEngineStateView } from '../model/rocket-engine-state-view';

export const RocketEngineItem: React.FC<IListItem<IRocketEngine>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../public/images/RocketEngineColor.png')} style={styles.Ico} />
          <View style={{ width: '100%' }}>
            <Text style={styles.listTitle}>{data.number} </Text>
          </View>
          <View>
            <Text style={[styles.stateItem, { marginTop: 10, marginBottom: 10, fontSize: 16 }]}>
              {TITLES_ROCKET_ENGINE.title}: {data.number}
            </Text>
          </View>
          <View>
            <ViewStateWrap>{RocketEngineStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
