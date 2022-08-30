import React from 'react';
import { Picker } from '@react-native-community/picker';

type DataPicker = {
  selectedMonth: string;
  setSelectedMonth: (day: string) => void;
};

export const DataPickerMonth: React.FC<DataPicker> = ({ selectedMonth, setSelectedMonth }) => {
  return (
    <>
      <Picker
        selectedValue={selectedMonth}
        style={{ height: 20, width: 100, color: '#ffffff' }}
        onValueChange={(itemValue): void => {
          if (typeof itemValue === 'string') {
            setSelectedMonth(itemValue);
          }
        }}
      >
        <Picker.Item label="Місяць" value="00" />
        <Picker.Item label="Січень" value="01" />
        <Picker.Item label="Лютий" value="02" />
        <Picker.Item label="Березень" value="03" />
        <Picker.Item label="Квітень" value="04" />
        <Picker.Item label="Травень" value="05" />
        <Picker.Item label="Червень" value="06" />
        <Picker.Item label="Липень" value="07" />
        <Picker.Item label="Серпень" value="08" />
        <Picker.Item label="Вересень" value="09" />
        <Picker.Item label="Жовтень" value="10" />
        <Picker.Item label="Листопад" value="11" />
        <Picker.Item label="Грудень" value="12" />
      </Picker>
    </>
  );
};
