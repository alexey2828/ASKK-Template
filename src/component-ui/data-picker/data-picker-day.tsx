import React from 'react';
import { Picker } from '@react-native-community/picker';

type DataPicker = {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
};

export const DataPickerDay: React.FC<DataPicker> = ({ selectedDay, setSelectedDay }) => {
  return (
    <>
      <Picker
        selectedValue={selectedDay}
        style={{ height: 20, width: 100, color: '#ffffff' }}
        onValueChange={(itemValue): void => {
          if (typeof itemValue === 'string') {
            setSelectedDay(itemValue);
          }
        }}
      >
        <Picker.Item label="00" value="00" />
        <Picker.Item label="01" value="01" />
        <Picker.Item label="02" value="02" />
        <Picker.Item label="03" value="03" />
        <Picker.Item label="04" value="04" />
        <Picker.Item label="05" value="05" />
        <Picker.Item label="06" value="06" />
        <Picker.Item label="07" value="07" />
        <Picker.Item label="08" value="08" />
        <Picker.Item label="09" value="09" />
        <Picker.Item label="10" value="10" />
        <Picker.Item label="11" value="11" />
        <Picker.Item label="12" value="12" />
        <Picker.Item label="13" value="13" />
        <Picker.Item label="14" value="14" />
        <Picker.Item label="15" value="15" />
        <Picker.Item label="16" value="16" />
        <Picker.Item label="17" value="17" />
        <Picker.Item label="18" value="18" />
        <Picker.Item label="19" value="19" />
        <Picker.Item label="20" value="20" />
        <Picker.Item label="21" value="21" />
        <Picker.Item label="22" value="22" />
        <Picker.Item label="23" value="23" />
        <Picker.Item label="24" value="24" />
        <Picker.Item label="25" value="25" />
        <Picker.Item label="26" value="26" />
        <Picker.Item label="27" value="27" />
        <Picker.Item label="28" value="28" />
        <Picker.Item label="29" value="29" />
        <Picker.Item label="30" value="30" />
        <Picker.Item label="31" value="31" />
      </Picker>
    </>
  );
};
