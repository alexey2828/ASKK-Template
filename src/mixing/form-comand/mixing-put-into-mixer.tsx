import React, { ReactElement, useEffect, useState } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import { CNstyles } from '../../component-ui/screen/screens-styles/screenStyle.styles';
import { GoBack } from '../../infrastructure/confirm-modal/go-back';
import { MainTitles } from '../../const/titles-main';
import { endpointTransition } from './const/endpoint-transition';
import { styles } from '../../component-ui/common-block-styles.styles';
import { GoNext } from '../../infrastructure/confirm-modal/go-next';
import { INavigate } from '../../hooks/use-navigate';
import { routes } from './const/route';
import { ETypeTimePickerSecond, TimePickerSeconds } from '../../infrastructure/date-picker-m-h/time-picker-seconds';
import { IMixing, isMixing } from '../entity/mixing/mixing';
import { TITLES_MIXING } from '../const/titles';
import { ETitles } from '../../infrastructure/confirm-modal/const/titles';
import { ETransitionsUK } from '../const/choose-ua-title-transition-state';

type TMixingPutIntoMixerDto = { settingTime: number };

const timePickerSettings = {
  type: ETypeTimePickerSecond.hhmm,
  maxHours: 24,
  maxMinutes: 60,
  maxDay: 2,
};

export const MixingPutIntoMixer = ({ route }: INavigate<IMixing, TMixingPutIntoMixerDto>): ReactElement => {
  const endpoint = endpointTransition.PUT_INTO_MIXER;
  const routeName = routes.CHANGE_STATE_MIXING;
  const { entity } = route.params;
  const [isValidSettingTime, setIsValidSettingTime] = useState(false);
  const [settingTime, setSettingTime] = useState<number | null>(null);
  const [mixingPutIntoMixerDto, setMixingPutIntoMixerDto] = useState<TMixingPutIntoMixerDto | null>(null);

  useEffect(() => {
    setIsValidSettingTime(!!settingTime);
  }, [settingTime]);

  useEffect(() => {
    if (isValidSettingTime) {
      setMixingPutIntoMixerDto({
        settingTime: Number(settingTime),
      });
    } else {
      setMixingPutIntoMixerDto(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidSettingTime]);

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
            <Text style={styles.defaultWhite16}>
              {TITLES_MIXING.title}:<Text style={styles.defaultPurple16}> {entity?.name}</Text>
            </Text>
          </View>
        </View>
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <TimePickerSeconds
          titleFormat={ETypeTimePickerSecond.hhmm}
          onChange={setSettingTime}
          settings={timePickerSettings}
        />
        <View style={CNstyles.defaultHeight} />
        <View style={styles.border} />
        <View style={CNstyles.defaultHeight} />
        {mixingPutIntoMixerDto ? (
          <>
            <GoNext
              routeName={routeName}
              dtoTransitions={mixingPutIntoMixerDto}
              endpoint={endpoint}
              entity={entity}
              title={ETransitionsUK.PUT_INTO_MIXER + '?'}
            />
          </>
        ) : (
          <TouchableHighlight onPress={(): void => {}}>
            <View
              style={{
                backgroundColor: '#323232',
                width: '100%',
                borderRadius: 10,
                alignItems: 'center',
              }}
            >
              <Text
                style={{
                  color: 'white',
                  margin: 15,
                  fontSize: 16,
                }}
              >
                {ETitles.ENTER}
              </Text>
            </View>
          </TouchableHighlight>
        )}
        <View style={CNstyles.defaultHeight} />
        <GoBack />
      </View>
    </View>
  );
};
