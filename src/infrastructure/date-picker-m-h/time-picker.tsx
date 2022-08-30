import React from 'react';
import { View, Text } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { styles } from '../../tzp/tzp-pressform/ui/tzp-pressform-items/tzp-pressform-item.styles';

const DEFAULT_MAX_VALUE = 59;

type TTimePicker = {
  maxValue?: number;
  value: string;
  title: string;
  onValueChange: (value: string) => void;
};

export const TimePicker: React.FC<TTimePicker> = ({ title, value, onValueChange, maxValue }) => {
  const pickerValues = new Array(maxValue || DEFAULT_MAX_VALUE);

  for (let i = 0; i < pickerValues.length; i += 1) {
    pickerValues[i] = { label: i, value: i };
  }

  return (
    <>
      <View style={styles.pickerContainer}>
        <Text style={styles.defaultWhite16}>{title}: </Text>
        <View
          style={{
            backgroundColor: '#BB86FC',
            borderRadius: 10,
            marginLeft: 220,
            position: 'absolute',
          }}
        >
          <Picker
            selectedValue={value}
            style={[styles.picker, { width: 100 }]}
            onValueChange={(itemValue): void => {
              if (typeof itemValue === 'string') {
                onValueChange(itemValue);
              }
            }}
          >
            {pickerValues.map(value => {
              return <Picker.Item key={String(value.value)} label={String(value.value)} value={String(value.value)} />;
            })}
          </Picker>
        </View>
      </View>
    </>
  );
};
