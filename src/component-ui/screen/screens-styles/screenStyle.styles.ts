import { TextStyle, ViewStyle, ImageStyle } from 'react-native';

//Profile Screen

const containerP: ViewStyle = {
  flex: 1,
  backgroundColor: '#121212',
  alignItems: 'center',
  justifyContent: 'center',
};

const firstContainer: ViewStyle = {
  width: 340,
  height: 215,
  backgroundColor: '#242424',
  borderRadius: 10,
  marginTop: 10,
};

const secondContainer: ViewStyle = {
  borderTopColor: '#333334',
  borderWidth: 2,
  width: '100%',
};

const row: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  margin: 15,
};

const listIten: ViewStyle = {
  margin: 0,
  marginLeft: 10,
};

const listItenTextFs14: TextStyle = {
  color: '#a1a1a1',
  fontSize: 14,
};

const listItenTextFs16: TextStyle = {
  color: '#ffffff',
  fontSize: 16,
};

const listItenTextFs16Dark: TextStyle = {
  color: '#a1a1a1',
  fontSize: 16,
};

const ListIco: ImageStyle = {
  width: 12,
  height: 12,
  margin: 2,
};

const PhoneIco: ImageStyle = {
  width: 20,
  height: 20,
  margin: 2,
};

const UserAvatar: ImageStyle = {
  width: 78,
  height: 80,
  margin: 2,
};

const UserNameBlock: ViewStyle = {
  marginTop: 30,
  marginLeft: 10,
};

const PasswordIco: ImageStyle = {
  width: 12,
  height: 12,
  margin: 2,
};

const logOutContainer: ViewStyle = {
  backgroundColor: '#242424',
  borderWidth: 2,
  height: 90,
};

export const styles = {
  firstContainer,
  secondContainer,
  row,
  listIten,
  listItenTextFs14,
  listItenTextFs16,
  ListIco,
  PhoneIco,
  UserAvatar,
  UserNameBlock,
  listItenTextFs16Dark,
  PasswordIco,
  containerP,
  logOutContainer,
};

//Login Screen

const container: ViewStyle = {
  flex: 1,
  backgroundColor: '#121212',
  alignItems: 'center',
  justifyContent: 'center',
};

const logoContainer: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginTop: -50,
  marginLeft: -20,
  marginBottom: 10,
};

const logoImg: ImageStyle = {
  width: 30,
  height: 50,
};

const logoText: TextStyle = {
  color: '#ffffff',
  fontSize: 35,
  marginLeft: 10,
  fontWeight: 'bold',
};

const textInputContainer: ViewStyle = {
  alignItems: 'center',
  marginTop: 10,
};

const textInput: TextStyle = {
  backgroundColor: '#323232',
  color: '#ffffff',
  borderRadius: 10,
  width: '100%',
};

const LoginBtn: ViewStyle = {
  backgroundColor: '#BB86FC',
  marginTop: 10,
  width: '100%',
  height: 50,
  borderRadius: 10,
};

const LoginBtnText: TextStyle = {
  textAlign: 'center',
  marginTop: 10,
  fontSize: 20,
  color: '#ffffff',
};

const successScreenContainer: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
};

const successImage: ImageStyle = {
  width: 30,
  height: 15,
  marginTop: 10,
  margin: 5,
};

const title: TextStyle = {
  color: 'white',
  fontSize: 18,
  margin: 5,
};

const btnBackContainer: TextStyle = {
  backgroundColor: '#333334',
  width: '100%',
  borderRadius: 10,
  alignItems: 'center',
};

const btnBackTitle: TextStyle = {
  color: 'white',
  margin: 15,
  fontSize: 14,
};

const LoginTextInputc: TextStyle = {
  backgroundColor: '#323232',
  color: '#ffffff',
  marginTop: 10,
  borderRadius: 10,
  width: '85%',
  height: 30,
};

const captionContainer: ViewStyle = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
};

const captionIcon: ViewStyle = {
  width: 10,
  height: 10,
  marginRight: 5,
};

const captionText: TextStyle = {
  fontSize: 12,
  fontWeight: '400',
  fontFamily: 'opensans-regular',
  color: '#8F9BB3',
};

const loader: ViewStyle = {
  marginLeft: -150,
};
export const Lstyles = {
  container,
  logoContainer,
  logoImg,
  logoText,
  textInputContainer,
  textInput,
  LoginBtn,
  LoginBtnText,
  successScreenContainer,
  successImage,
  title,
  btnBackContainer,
  btnBackTitle,
  LoginTextInputc,
  captionText,
  captionIcon,
  captionContainer,
  loader,
};

//componentsScreen

const textInputc: TextStyle = {
  backgroundColor: '#323232',
  color: '#ffffff',
  marginTop: 30,
  borderRadius: 10,
  width: '100%',
};

const containerc: ViewStyle = {
  flex: 1,
  backgroundColor: '#121212',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Cmodal: ViewStyle = {
  margin: 0,
  marginTop: 40,
  position: 'absolute',
};

export const SectionStyle: ViewStyle = {
  flexDirection: 'row',
  width: 300,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#242424',
  borderWidth: 0.5,
  borderColor: '#333334',
  height: 55,
  borderRadius: 10,
  marginTop: 5,
  margin: 10,
};
export const ImageStyles: ImageStyle = {
  backgroundColor: '#242424',
  margin: 10,
  height: 25,
  marginTop: 13,
  marginLeft: 10,
  width: 25,
  resizeMode: 'stretch',
  alignItems: 'center',
};
export const inputSort: TextStyle = {
  flex: 1,
  color: '#ffffff',
  fontSize: 16,
  borderColor: '#333334',
  borderRadius: 10,
  backgroundColor: '#242424',
  marginLeft: 10,
  width: '100%',
};
export const searchContainer: TextStyle = {
  height: 50,
  width: '100%',
  margin: 10,
  marginTop: 25,
  marginLeft: -5,
};
export const filterBtn: TextStyle = {
  height: 50,
  width: 50,
  backgroundColor: '#242424',
  margin: 10,
  marginTop: 25,
  borderRadius: 50,
};

export const Cstyles = {
  textInputc,
  containerc,
  Cmodal,
  inputSort,
  SectionStyle,
  ImageStyles,
  searchContainer,
  filterBtn,
};

//Create new comp

const mainCNcontainerc: ViewStyle = {
  flex: 1,
  backgroundColor: '#121212',
  alignItems: 'center',
  justifyContent: 'center',
};

const CNcontainerc: ViewStyle = {
  height: '80%',
  width: '90%',
};

const CNtextInputc: TextStyle = {
  backgroundColor: '#323232',
  color: '#ffffff',
  marginTop: 10,
  borderRadius: 10,
  width: '100%',
};

const FormContainer: ViewStyle = {
  backgroundColor: '#121212',
  height: '100%',
};

const textWhiteDefault: TextStyle = {
  color: 'white',
  fontSize: 16,
};

const textGrayDefault: TextStyle = {
  color: '#a1a1a1',
  margin: 10,
};

const dropDawnList: TextStyle = {
  height: 200,
  width: 320,
  backgroundColor: '#323232',
  borderRadius: 10,
};

const dropDawnInfoTitle: TextStyle = {
  color: '#ffffff',
  margin: 10,
  fontSize: 16,
};

const dropDawnInfoDetails: TextStyle = {
  color: '#a1a1a1',
  marginLeft: 10,
  fontSize: 12,
};

const BtnContainer: ViewStyle = {
  backgroundColor: '#BB86FC',
  borderRadius: 10,
  marginTop: 10,
  alignItems: 'center',
};

const BtnTitle: TextStyle = {
  color: 'white',
  margin: 15,
  fontSize: 16,
};

const BtnTitlepPurple: TextStyle = {
  color: '#BB86FC',
  margin: 15,
  fontSize: 16,
};

const dropDawnCreate: TextStyle = {
  height: 'auto',
  width: 325,
  backgroundColor: '#323232',
  position: 'absolute',
};

const BtnContainerDetails: ViewStyle = {
  height: 'auto',
  width: 325,
  backgroundColor: '#292929',
  borderColor: '#333334',
  borderWidth: 2,
  borderRadius: 10,
  marginLeft: -1,
};

const BtnContainerDetailsWrapper: ViewStyle = {
  marginTop: 20,
};

const defaultPurple: TextStyle = {
  color: '#BB86FC',
};
const defaultLime: TextStyle = {
  color: 'lime',
};
const defaultRed: TextStyle = {
  color: 'red',
};
const defaultGray: TextStyle = {
  color: '#a1a1a1',
};
const defaultHeight: ViewStyle = {
  height: 10,
};
const defaultHeightLarge: ViewStyle = {
  height: 70,
};

export const CNstyles = {
  CNcontainerc,
  CNtextInputc,
  mainCNcontainerc,
  FormContainer,
  textWhiteDefault,
  dropDawnList,
  dropDawnInfoTitle,
  dropDawnInfoDetails,
  dropDawnCreate,
  textGrayDefault,
  BtnContainerDetails,
  BtnContainerDetailsWrapper,
  BtnTitleLime: BtnTitlepPurple,
  defaultPurple,
  BtnContainer,
  BtnTitle,
  defaultLime,
  defaultHeight,
  defaultRed,
  defaultGray,
  defaultHeightLarge,
};
