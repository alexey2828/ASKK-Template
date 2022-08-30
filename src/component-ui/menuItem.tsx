import React from 'react';
import { StyleSheet, Text, View, Image, TouchableHighlight } from 'react-native';
import { TArgsNavigate, useNavigate } from '../hooks/use-navigate';
import { TMember } from '../infrastructure/api-platform';
import { btnText, cardIco } from './menu/menu-item/menu-item.styles';

const styles = StyleSheet.create({
  container: {
    width: '94%',
    height: 160,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 20,
  },
});

export type PropsMenuItem = {
  sourceImg: string;
  textValue: string;
  colorBG: string;
  id: string;
  route: string;
};

export const MenuItem: React.FC<PropsMenuItem> = props => {
  const { goTo } = useNavigate<TMember>();
  const { sourceImg, textValue, colorBG, route } = props;
  const color = StyleSheet.create({
    container: {
      backgroundColor: colorBG,
    },
  });
  return (
    <View>
      <TouchableHighlight
        onPress={(): void => {
          const argsNavigateTo: TArgsNavigate<TMember> = {
            route: route,
            params: {},
          };
          goTo(argsNavigateTo);
        }}
      >
        <View>
          <Image
            source={{
              uri: 'https://cdn.discordapp.com/attachments/466314747281801228/826351008786415616/unknown.png',
            }}
            style={{
              width: 25,
              height: 25,
              position: 'absolute',
              margin: 20,
              marginLeft: 120,
              zIndex: 2,
            }}
          />
          <View style={[styles.container, color.container]}>
            <Image source={{ uri: sourceImg }} style={cardIco} />
            <Text style={btnText}>{textValue}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </View>
  );
};
