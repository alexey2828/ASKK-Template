import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableHighlight } from 'react-native';
import { Lstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { ENavigationName } from '../const/navigation-name';
import { Input } from '@ui-kitten/components/ui';
import { isStringCommon } from '../utils/validate/validate-string-common';
import { ETitles } from '../confirm-modal/const/titles';
import { TMember } from '../api-platform';
import { TArgsNavigate, useNavigate } from '../../hooks/use-navigate';
import { TouchableWithoutFeedback } from '@ui-kitten/components/devsupport';
import { TUserDto } from './model/authorization';
import { IpContext } from '../context/ip-context';
import NetInfo from '@react-native-community/netinfo';
import { LockButton } from 'component-ui/buttons/lock-button';

const titleName = 'Введіть номер телефона...';
const titlePassword = 'Введіть пароль...';

export const LoginScreen: React.FC = () => {
  const [isInternetConnect, setIsInternetConnect] = useState<boolean | null>(true);
  const [username, setUsername] = useState('380931234567'); //tmp 380931234567
  const [password, setPassword] = useState('sOwj45LqnMfDY'); //tmp sOwj45LqnMfDY
  const [showDevToolsBtn, setShowDevToolsBtn] = useState(false);
  const [validUserName, setValidUserName] = useState(isStringCommon(username));
  const [validUserPassword, setValidUserPassword] = useState(isStringCommon(password));
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const navigateDev = useNavigate();
  const navigateAuth = useNavigate<TMember, TUserDto>();
  const { ip } = useContext(IpContext);

  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const onClickDevToolsBtn = (): void => {
    const argsNavigateTo: TArgsNavigate<null> = {
      route: ENavigationName.DEV,
      params: {},
    };
    navigateDev.goTo(argsNavigateTo);
  };

  const onClickLoginSubmit = (): void => {
    const dtoTransitions: TUserDto = {
      username,
      password,
    };
    const argsNavigateTo: TArgsNavigate<TMember, TUserDto> = {
      route: ENavigationName.AUTHORIZATION,
      params: {
        dtoTransitions,
      },
    };
    navigateAuth.goTo(argsNavigateTo);
  };

  useEffect(() => {
    let cleanupFunction = false;
    // TODO add logic for state update check
    const fetchNetInfo = async () => {
      const state = await NetInfo.fetch();

      if (!cleanupFunction) {
        setIsInternetConnect(state.isConnected);
      }
    };

    fetchNetInfo();

    return () => {
      cleanupFunction = true;
    };
  }, []);

  useEffect(() => {
    if (ip) {
      setShowDevToolsBtn(true);
    }
  }, [ip]);

  useEffect(() => {
    setValidUserName(isStringCommon(username));
  }, [username]);

  useEffect(() => {
    setValidUserPassword(isStringCommon(password));
  }, [password]);

  const renderIcon = (): ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Image style={{ width: 30, height: 30 }} source={require('../../../public/images/hide.png')} />
    </TouchableWithoutFeedback>
  );

  return (
    <View style={Lstyles.container}>
      <View style={Lstyles.logoContainer}>
        <Image
          source={{
            uri: 'https://cdn.discordapp.com/attachments/466314747281801228/826045575220559913/unknown.png',
          }}
          style={Lstyles.logoImg}
        />
        <View style={{ alignItems: 'center' }}>
          <Text style={Lstyles.logoText}>AC KK</Text>
        </View>
      </View>
      <View style={Lstyles.textInputContainer}>
        <Input
          placeholderTextColor="#a1a1a1"
          value={username}
          onChangeText={(val): void => setUsername(val)}
          style={Lstyles.LoginTextInputc}
          placeholder={titleName}
          keyboardType="numeric"
        />
      </View>
      {!validUserName.valid ? <Text style={{ color: 'red' }}>{validUserName.message}</Text> : null}

      <View style={Lstyles.textInputContainer}>
        <Input
          value={password}
          placeholderTextColor="#a1a1a1"
          placeholder={titlePassword}
          accessoryRight={renderIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(val): void => setPassword(val)}
          style={Lstyles.LoginTextInputc}
        />
      </View>
      {!validUserPassword.valid ? <Text style={{ color: 'red' }}>{validUserPassword.message}</Text> : null}

      <View style={{ width: '85%', marginTop: 20 }}>
        {!isInternetConnect && (
          <View
            style={{
              backgroundColor: '#202020',
              height: 40,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              margin: 8,
              marginTop: 0,
              borderBottomEndRadius: 10,
              borderBottomStartRadius: 10,
            }}
          >
            <Image
              source={require('../../../public/images/connecting.gif')}
              style={{
                height: 40,
                width: 60,
              }}
            />
            <Text style={{ color: '#ffffff', fontSize: 14 }}>{"Інтернет з'єднання відсутне"}</Text>
          </View>
        )}
        {validUserName && validUserPassword && isInternetConnect ? (
          <>
            <TouchableHighlight onPress={onClickLoginSubmit}>
              <View style={Lstyles.LoginBtn}>
                <Text style={Lstyles.LoginBtnText}>{ETitles.ENTER}</Text>
              </View>
            </TouchableHighlight>
          </>
        ) : (
          <LockButton />
        )}
      </View>
      <View style={{ marginTop: 10 }}>
        <Text>
          {!showDevToolsBtn && (
            <TouchableHighlight style={{ width: '100%', marginTop: 20 }} onPress={onClickDevToolsBtn}>
              <Text style={{ color: '#ffffff' }}>Dev tools</Text>
            </TouchableHighlight>
          )}
        </Text>
      </View>
    </View>
  );
};
