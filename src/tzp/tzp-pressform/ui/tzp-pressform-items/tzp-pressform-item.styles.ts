import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

const cardContainer: ViewStyle = {
  marginTop: 0,
  margin: 10,
  backgroundColor: '#242424',
  borderRadius: 10,
};
const addItemMainContainer: TextStyle = {
  width: '90%',
  marginRight: 'auto',
  marginLeft: 'auto',
  height: 'auto',
};
const Ico: ImageStyle = {
  width: 35,
  height: 35,
  position: 'absolute',
  marginTop: 25,
};
const titleItem: TextStyle = {
  color: '#ffffff',
  width: 300,
  fontSize: 19,
  height: 'auto',
  margin: 20,
};
const stateItemContainer: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginLeft: -30,
};
const stateItem: TextStyle = {
  color: '#a1a1a1',
  marginLeft: 10,
  fontSize: 14,
};
const stateItemNew: TextStyle = {
  color: '#D584FB',
  marginLeft: 10,
  fontSize: 12,
};
const addItemContainer: ViewStyle = {
  width: '100%',
  height: 'auto',
  backgroundColor: '#242424',
  marginTop: 100,
  borderRadius: 10,
};
const title: TextStyle = {
  color: '#ffffff',
  fontSize: 25,
  margin: 20,
};
const itemList: ViewStyle = {
  width: '90%',
  marginRight: 'auto',
  height: 3,
  marginLeft: 'auto',
  backgroundColor: '#333334',
  borderRadius: 10,
};
const backBtn: TextStyle = {
  color: '#ffffff',
  textAlign: 'right',
  margin: 20,
  fontSize: 20,
};
const ItemListContainer: TextStyle = {
  flex: 1,
  padding: 0,
  width: '95%',
};
const listTitle: TextStyle = {
  color: '#ffffff',
  marginTop: 25,
  marginLeft: 50,
  fontSize: 20,
};
const itemInfo: TextStyle = {
  color: '#ffffff',
  fontSize: 16,
  marginTop: 5,
};
const itemInfoa1: TextStyle = {
  color: '#a1a1a1',
  fontSize: 16,
  marginTop: 5,
};
const ScreenContainer: TextStyle = {
  backgroundColor: '#121212',
  height: 800,
};

const defaultWhite16: TextStyle = {
  color: '#ffffff',
  fontSize: 16,
};
const defaultGray16: TextStyle = {
  color: '#a1a1a1',
  fontSize: 16,
};
const defaultPurple16: TextStyle = {
  color: '#BB86FC',
  fontSize: 16,
};
const pickerContainer: TextStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: 10,
};
const picker: TextStyle = {
  height: 20,
  width: 100,
  color: '#ffffff',
  fontSize: 16,
};

const border: ViewStyle = {
  alignSelf: 'center',
  width: '90%',
  height: 1,
  backgroundColor: '#333334',
};

export const styles = {
  cardContainer,
  addItemMainContainer,
  Ico,
  titleItem,
  stateItemContainer,
  stateItem,
  stateItemNew,
  addItemContainer,
  title,
  itemList,
  backBtn,
  ItemListContainer,
  listTitle,
  itemInfo,
  itemInfoa1,
  ScreenContainer,
  defaultWhite16,
  defaultGray16,
  defaultPurple16,
  pickerContainer,
  picker,
  border,
};
