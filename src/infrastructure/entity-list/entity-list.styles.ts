import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

const childContainer: ViewStyle = {
  height: 800,
  alignItems: 'center',
};

const titleText: TextStyle = {
  color: '#ffffff',
  fontSize: 16,
};

const Btn16: TextStyle = {
  color: '#ffffff',
  margin: 5,
  fontSize: 16,
};

const Btn18: TextStyle = {
  color: '#ffffff',
  fontSize: 18,
};

const titleRed: TextStyle = {
  color: 'red',
};

const reloadPageContainer: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginLeft: 20,
  marginTop: 10,
};
const reloadPageContainerWrap: ViewStyle = {
  height: 20,
  marginLeft: 10,
};
const reloadImg: ImageStyle = {
  width: 40,
  height: 15,
  marginTop: 2,
};
const pageTitle: TextStyle = {
  color: '#ffffff',
  margin: 10,
  display: 'flex',
};
const timeSortFilter: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: 10,
};
const sortContainer: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 5,
  marginLeft: 10,
};

const dropDownSort: ViewStyle = {
  margin: 0,
  height: 400,
  backgroundColor: '#181818',
  borderRadius: 15,
};

const swipeBack: ViewStyle = {
  width: 200,
  height: 20,
};

const border: ViewStyle = {
  alignSelf: 'center',
  width: '90%',
  height: 1,
  backgroundColor: '#333334',
};

const swipablePlace: ViewStyle = {
  margin: -10, 
  width: '120%', 
  height: '100%', 
  position: 'absolute'
};

const listView: ViewStyle = {
  height: '70%',
  width: 320,
  margin: 0,
  marginLeft: 'auto', 
  marginRight: 'auto'
};

export const styles = {
  childContainer,
  titleText,
  sortBtn: Btn16,
  Btn18,
  titleRed,
  dropDownSort,
  reloadPageContainer,
  reloadPageContainerWrap,
  reloadImg,
  pageTitle,
  timeSortFilter,
  sortContainer,
  swipeBack,
  border,
  swipablePlace,
  listView
};
