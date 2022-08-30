import React, { ReactElement, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { endpointTransition } from './const/endpoint-transition';
import { MainTitles } from '../../const/titles-main';
import { styles } from '../../component-ui/common-block-styles.styles';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { routes } from './const/route';
import { ETypeTimePickerSecond, TimePickerSeconds } from '../../infrastructure/date-picker-m-h/time-picker-seconds';
import { TITLES_MIXING } from '../const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { IMixing, isMixing } from '../entity/mixing/mixing';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';
import { LockButton } from 'component-ui/buttons/lock-button';

type TMixingTimerDto = { settingTime: number };

const timePickerSettings = {
  type: ETypeTimePickerSecond.hhmm,
  maxHours: 24,
  maxMinutes: 60,
};

export const MixingTimer = ({ route }: INavigate<IMixing, TMixingTimerDto>): ReactElement => {
  const routeName = routes.CHANGE_STATE_MIXING;
  const endpoint = endpointTransition.ADD_MIXER_TIME;
  const { entity } = route.params;
  const [mixingTimerDto, setMixingTimerDto] = useState<TMixingTimerDto | null>(null);

  const onChangeSettingTime = (time: number): void => {
    if (time) {
      setMixingTimerDto({
        settingTime: Number(time),
      });
    } else {
      setMixingTimerDto(null);
    }
  };

  if (!isMixing(entity)) {
    return (
      <View style={CNstyles.FormContainer}>
        <Text style={CNstyles.textWhiteDefault}>{MainTitles.NO_DATA}</Text>
      </View>
    );
  }

  return (
    <View style={CNstyles.FormContainer}>
      <View style={{ margin: 20 }}>
        <View style={CNstyles.BtnContainerDetails}>
          <View style={{ margin: 10 }}>
            <Text style={CNstyles.textWhiteDefault}>
              {TITLES_MIXING.title}:<Text style={styles.defaultPurple16}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <TimePickerSeconds
          titleFormat={ETypeTimePickerSecond.hhmm}
          onChange={onChangeSettingTime}
          settings={timePickerSettings}
        />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {mixingTimerDto ? (
          <>
            <GoNext
              routeName={routeName}
              dtoTransitions={mixingTimerDto}
              endpoint={endpoint}
              entity={entity}
              title={ETransitionsUK.ADD_MIXER_TIME + '?'}
            />
          </>
        ) : (
          <LockButton />
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
