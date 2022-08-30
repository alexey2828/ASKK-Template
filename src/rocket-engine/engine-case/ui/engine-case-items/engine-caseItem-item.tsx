import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { IEngineCase } from 'rocket-engine/engine-case/entity/engine-case';
import { IListItem } from 'infrastructure/entity-list';
import { TITLES_ENGINE_CASE } from 'rocket-engine/engine-case/const/title';
import { styles } from 'component-ui/common-block-styles.styles';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { EngineCaseStateView } from 'rocket-engine/engine-case/model/engine-case-state-view';

export const EngineCaseItem: React.FC<IListItem<IEngineCase>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer} key={data.id}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../../public/images/EngineCase.png')} style={styles.Ico} />
          <View style={{ width: '100%' }}>
            <Text style={styles.listTitle}>{data.name} </Text>
          </View>
          <View>
            <Text style={[styles.stateItem, { marginTop: 10, marginBottom: 10, fontSize: 16 }]}>
              {TITLES_ENGINE_CASE.title}: {data.name}
            </Text>
          </View>
          <View>
            <ViewStateWrap>{EngineCaseStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
