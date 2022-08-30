import React from 'react';
import { View, Text, Image } from 'react-native';
import { TITLES_BUILDING } from '../../../buildings/const/titles';
import { TAutocompleteCard } from '../../../infrastructure/async-auto-complete/asyncAutoComplete';
import { TITLES_MIXER } from '../../entity/mixer/const/titles';
import { IMixer } from '../../entity/mixer/mixer';

export const MixerAutocompleteCard: TAutocompleteCard<IMixer> = ({ entity: Mixing }) => {
  if (!Mixing) {
    return <></>;
  }

  return (
    <>
      <View key={Mixing.id}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={{ width: 20, height: 20 }}>
            <Image style={{ width: 20, height: 20 }} source={require('../../../../public/images/mixingIco.png')} />
          </View>
          {Mixing?.available ? (
            <Text style={{ color: '#ffffff', marginLeft: 10 }}>
              {' '}
              {Mixing?.name} ·{' '}
              <Text style={{ color: '#a1a1a1', marginLeft: 10 }}>
                {TITLES_BUILDING.title}: {Mixing?.locatedAt.name}{' '}
              </Text>
            </Text>
          ) : (
            <Text style={{ color: '#a1a1a1', marginLeft: 10 }}>
              {' '}
              {Mixing?.name} · {TITLES_BUILDING.title}: {Mixing?.locatedAt.name} {'\n'} {'('}
              {TITLES_MIXER.using}
              {')'}{' '}
            </Text>
          )}
        </View>
      </View>
    </>
  );
};
