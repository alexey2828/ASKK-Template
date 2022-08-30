import React, { ReactElement, useContext, useEffect } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { Lstyles } from '../../../component-ui/screen/screens-styles/screenStyle.styles';
import { ServerErr } from '../../../component-ui/viewError/server-error';
import { INavigate, TArgsNavigate, useNavigate } from '../../../hooks/use-navigate';
import { IAuthenticationToken, TMember } from '../../api-platform';
import { ETitles } from '../../confirm-modal/const/titles';
import { ENavigationName } from '../../const/navigation-name';
import { AUTHENTICATION_SHORT_URL } from '../../const/urls';
import { TITLES_AUTHENTICATION } from '../const/titles';
import { useHttp } from '../../../hooks/useHttp';
import { AuthContext } from '../../context/auth-context';
import { Loader } from '../../../component-ui/loader/Loader';

export type TUserDto = {
  username: string;
  password: string;
};

export function Authorization({ route }: INavigate<TMember, TUserDto>): ReactElement {
  const dto = route.params.dtoTransitions;

  const { goTo } = useNavigate();
  const { login } = useContext(AuthContext);
  const loadRec = useHttp<IAuthenticationToken>();

  const navigateToLoginScreen = (): void => {
    const argsNavigateTo: TArgsNavigate<null> = {
      route: ENavigationName.LOGIN_SCREEN,
      params: {},
    };
    goTo(argsNavigateTo);
  };

  useEffect(() => {
    if (dto) {
      loadRec.updateResponse({
        url: AUTHENTICATION_SHORT_URL,
        method: 'post',
        body: JSON.stringify(dto),
        headers: {},
      });
    } else {
      navigateToLoginScreen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadRec.error && loadRec.data && dto) {
      login(loadRec.data.token, loadRec.data.refresh_token, dto.username);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadRec.data]);

  return (
    <View style={Lstyles.container}>
      {loadRec.isLoading && <Loader />}
      {loadRec.error && (
        <>
          <ServerErr message={TITLES_AUTHENTICATION.incorrectLoginOrPassword} />
          <TouchableHighlight onPress={navigateToLoginScreen}>
            <View style={Lstyles.btnBackContainer}>
              <Text style={Lstyles.btnBackTitle}>{ETitles.BACK}</Text>
            </View>
          </TouchableHighlight>
        </>
      )}
    </View>
  );
}
