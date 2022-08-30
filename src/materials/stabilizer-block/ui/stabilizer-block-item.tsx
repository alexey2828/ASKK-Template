import { CNstyles } from 'component-ui/screen/screens-styles/screenStyle.styles';
import { ViewStateWrap } from 'infrastructure/view-state-wrap/view-state-wrap';
import { MaterialStateView } from 'materials/model/materials-state-view';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { IListItem } from '../../../infrastructure/entity-list';
import { styles } from '../../../component-ui/common-block-styles.styles';
import { IStabilizerBlock } from '../entity/stabilizer-block';

export const StabilizerBlockItem: React.FC<IListItem<IStabilizerBlock>> = ({ data, onPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={{ margin: 10, marginTop: -5 }}>
        <Pressable onPress={onPress}>
          <Image source={require('../../../../public/images/stabilizator.png')} style={styles.Ico} />
          <View>
            <Pressable onPress={onPress}>
              <Text style={styles.listTitle}>{data.name} </Text>
            </Pressable>
          </View>
          <View style={CNstyles.defaultHeight} />
          <View>
            <ViewStateWrap>{MaterialStateView(data.state, data)}</ViewStateWrap>
          </View>
        </Pressable>
      </View>
    </View>
  );
};
