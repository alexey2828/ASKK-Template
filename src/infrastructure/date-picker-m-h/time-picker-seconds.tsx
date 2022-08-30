import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { styles } from '../../component-ui/common-block-styles.styles';
import { ETitlesTimePicker } from './const/titles';
import { TimePicker } from './time-picker';

export enum ETypeTimePickerSecond {
  hhmm = 'hhmm',
  ddhhmm = 'ddhhmm',
}

type TSetting = {
  type: ETypeTimePickerSecond;
  maxHours?: number;
  maxMinutes?: number;
  maxDay?: number;
};

type TTimePickerSeconds = {
  onChange: (value: number) => void;
  settings: TSetting;
  titleFormat?: string;
};

export const TimePickerSeconds: React.FC<TTimePickerSeconds> = ({ onChange, settings, titleFormat }) => {
  const [selectedh, setSelectedh] = useState('00');
  const [selectedm, setSelectedm] = useState('00');
  const [selectedd, setSelectedd] = useState('00');

  useEffect(() => {
    const settingTime = Number(selectedd) * 86400 + Number(selectedh) * 3600 + Number(selectedm) * 60;
    onChange(settingTime);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedd, selectedh, selectedm]);

  return (
    <>
      <Text style={styles.defaultWhite16}>
        Задати:
        <Text style={styles.defaultGray16}>
          <Text>
            {' '}
            {titleFormat === ETypeTimePickerSecond.ddhhmm ? <Text> {selectedd} д. </Text> : null} {selectedh} год.{' '}
            {selectedm} хв.
          </Text>
        </Text>
      </Text>
      {settings.type === ETypeTimePickerSecond.ddhhmm && (
        <>
          <TimePicker
            maxValue={settings.maxDay}
            title={ETitlesTimePicker.ADD_DAY}
            value={selectedd}
            onValueChange={setSelectedd}
          />
          <TimePicker
            maxValue={settings.maxHours}
            title={ETitlesTimePicker.ADD_HOURSE}
            value={selectedh}
            onValueChange={setSelectedh}
          />
          <TimePicker
            maxValue={settings.maxMinutes}
            title={ETitlesTimePicker.ADD_MINUTES}
            value={selectedm}
            onValueChange={setSelectedm}
          />
        </>
      )}
      {settings.type === ETypeTimePickerSecond.hhmm && (
        <>
          <TimePicker
            maxValue={settings.maxHours}
            title={ETitlesTimePicker.ADD_HOURSE}
            value={selectedh}
            onValueChange={setSelectedh}
          />
          <TimePicker
            maxValue={settings.maxMinutes}
            title={ETitlesTimePicker.ADD_MINUTES}
            value={selectedm}
            onValueChange={setSelectedm}
          />
        </>
      )}
    </>
  );
};
