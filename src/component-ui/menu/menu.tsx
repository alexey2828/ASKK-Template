import React from 'react';
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { PropsMenuItem, MenuItem } from '../menuItem';

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 100,
  },
});
export type PropsMenu = {
  itemsList: PropsMenuItem[];
};
const numColumns = 2;

export const Menu: React.FC<PropsMenu> = ({ itemsList }) => {
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={itemsList}
          renderItem={({ item }): JSX.Element => (
            <MenuItem
              key={item.id}
              sourceImg={item.sourceImg}
              textValue={item.textValue}
              colorBG={item.colorBG}
              id={item.id}
              route={item.route}
            />
          )}
          keyExtractor={(itemsList): string => {
            return itemsList.id;
          }}
          numColumns={numColumns}
        />
      </SafeAreaView>
    </View>
  );
};
