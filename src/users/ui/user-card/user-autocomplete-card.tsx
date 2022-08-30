import React from 'react';
import { View, Text, Image } from 'react-native';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { IUser } from '../../entity/user';

export const UserAutocompleteCard: TAutocompleteCard<IUser> = ({ entity: User }) => {
  if (!User) {
    return <></>;
  }

  return (
    <>
      <View key={User.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/user-card.png')} />
          </View>
          <Text style={{ color: '#ffffff', marginLeft: 10 }}>
            {' '}
            {User?.firstName} {User?.lastName}
          </Text>
        </View>
      </View>
    </>
  );
};
