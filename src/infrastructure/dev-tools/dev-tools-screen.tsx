import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { Input } from '@ui-kitten/components/ui';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { styles } from '../../component-ui/common-block-styles.styles';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { ENavigationName } from '../const/navigation-name';
import { IpContext } from '../context/ip-context';

export const DevTools = (): ReactElement => {
  const [value, setValue] = useState('');

  const { goTo } = useNavigate();
  const { ip, setIp } = useContext(IpContext);

  const setIpToStorage = (): void => {
    setIp(value);
    const argsNavigateTo: TArgsNavigate<null> = {
      route: ENavigationName.LOGIN_SCREEN,
      params: {},
    };
    goTo(argsNavigateTo);
  };

  useEffect(() => {
    setValue(ip);
  }, [ip]);

  return (
    <View style={CNstyles.FormContainer}>
      <View style={{ margin: 20 }}>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <Input
          value={value}
          placeholderTextColor="#a1a1a1"
          onChangeText={(val): void => setValue(val)}
          style={CNstyles.CNtextInputc}
          placeholder={'Введіть IP-адрес'}
        />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />

        <TouchableHighlight onPress={setIpToStorage}>
          <View
            style={{
              backgroundColor: '#323232',
              width: '100%',
              borderRadius: 10,
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', margin: 15, fontSize: 16 }}>{ETitles.ENTER}</Text>
          </View>
        </TouchableHighlight>

        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
