import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

//Profile Screen

const container: ViewStyle = {
  flex: 1,
  backgroundColor: '#121212',
  alignItems: 'center',
  justifyContent: 'center',
};

const defaultFlex: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 10,
};

const buildigIco: ImageStyle = {
  width: 20,
  height: 23,
};

const defaultText: TextStyle = {
  color: 'white',
  marginLeft: 5,
  fontSize: 18,
};

const timeIco: ImageStyle = {
  width: 23,
  height: 23,
  marginLeft: 10,
};

const contentContainer: ImageStyle = {
  height: '110%',
};

export const styles = {
  container,
  defaultFlex,
  buildigIco,
  defaultText,
  timeIco,
  contentContainer,
};
