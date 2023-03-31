import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  navigationOptions,
  CONST,
  TouchableOpacity,
  NativeModules,
  Alert,
  StatusBar,
  Button,
  SafeAreaView,
  ScrollView,
  Easing,
  Animated,
  Image,
  Dimensions,
  Platform,
  ImageBackground,
  Linking,
  Share,
  AsyncStorage,
} from 'react-native';
import { mapping, light as lightTheme } from '@eva-design/eva';
import { ApplicationProvider, Layout } from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerActions } from 'react-navigation-drawer';
import RNRestart from 'react-native-restart';
import Location from './src/Location/Location';
import PreLoader from './src/preLoader/PreLoader';
import DetailDoctorScreen from './src/DetailDoctor/DetailDoctorScreen';
import SearchResultScreen from './src/SearchResult/SearchResultScreen';
import MessagesMain from './src/Messages/MessagesMain';
import MessageDetailLayout from './src/Messages/MessageDetail/MessageDetailLayout';
import PersonalDetail from './src/Profile/PersonalDetail';
import ProfileTabs from './src/Profile/ProfileTabs';
import AppoinmentList from './src/Appointment/AppointmentList';
import Home from './src/Home/Home';
import LoginScreen from './src/Authentication/LoginScreen';
import SignupScreen from './src/Authentication/SignupScreen';
import VerificationAccount from './src/Authentication/VerificationAccount';
import SearchQuestions from './src/HealthForum/SearchQuestions';
import HealthForumCard from './src/HealthForum/HealthForumCard';
import SecuritySettings from './src/SecuritySetting/SecuritySettings';
import GetAnswers from './src/HealthForum/GetAnswers';
import ChangePassword from './src/SecuritySetting/ChangePassword';
import DeleteAccount from './src/SecuritySetting/DeleteAccount';
import ArticleListing from './src/BlogListing/ArticleListing';
import MyArticles from './src/BlogListing/MyArticles';
import ArticleDetailPage from './src/BlogListing/ArticleDetailPage';
import AccountSecuritySetting from './src/SecuritySetting/AccountSecuritySetting';
import ManageEmailNotification from './src/SecuritySetting/ManageEmailNotification';
import ArticleListCard from './src/BlogListing/ArticleListCard';
import TeamListing from './src/TeamManagement/TeamListing';
import PostArticle from './src/ArticlePost/PostArticle';
import AwesomeAlert from 'react-native-awesome-alerts';
import AppointmentSettings from './src/Appointment/AppointmentSettings';
import ClinicAppointmentSettings from './src/Appointment/ClinicAppointmentSettings';
import SpecialitiesAndServices from './src/Add Specialities/SpecialitiesAndServices';
import LocationDetail from './src/Appointment/LocationDetail';
import SearchResultTopCategory from './src/SearchResult/SearchResultTopCategory';
import BookAppointment from './src/Appointment/BookAppointment';
import Packages from './src/Buy Packages/Packages';
import BuyPackageWebview from './src/Buy Packages/BuyPackageWebview';
import AppointmentDetailPage from './src/Appointment/AppointmentDetailPage';
import VerifyPasswordForBooking from './src/Appointment/VerifyPasswordForBooking';
import SubmitCode from './src/Appointment/SubmitCode';
import PayAppointmentCheckout from './src/Appointment/PayAppointmentCheckout';
import FavoriteListing from './src/Favorites/FavoriteListing';
import FavDoctors from './src/Favorites/FavDoctors';
import FavHospitals from './src/Favorites/FavHospitals';
import FavArticles from './src/Favorites/FavArticles';
import BookAppointmentCall from './src/Appointment/BookAppointmentCall';
import DoctorAddBooking from './src/Appointment/DoctorAddBooking';
import AddFeedback from './src/Feedback/AddFeedback';
import AppointmentListPatient from './src/Appointment/AppointmentListPatient';
import AboutUs from './src/GeneralPages/AboutUs';
import PrivacyPolicy from './src/GeneralPages/PrivacyPolicy';
import TermsOfService from './src/GeneralPages/TermsOfService';
import FAQ from './src/GeneralPages/FAQ';
import Contact from './src/GeneralPages/Contact';
import MessageDoctor from './src/DetailDoctor/MessageDoctor';
import InviteHospitals from './src/Appointment/InviteHospitals';
import Prescription from './src/Appointment/Prescription';
import Payout from './src/PayoutSettings/Payout';
import Yourpayouts from './src/PayoutSettings/YourPayouts';
import PayoutSetting from './src/PayoutSettings/PayoutSetting';
import Dashboard from './src/Dashboard/Dashboard';
import InvoiceListing from './src/Invoices/InvoiceListing'
import axios from 'axios';
import { I18nManager } from 'react-native';
//import * as CONSTANT from './src/Constants/Constant';
import CONSTANT from './src/Constants/local';
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
} from 'react-native-popup-dialog';
console.disableYellowBox = true;
const { width } = Dimensions.get('window');

let CollapseExpand = (index, position) => {
  const inputRange = [index - 1, index, index + 1];
  const opacity = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  const scaleY = position.interpolate({
    inputRange,
    outputRange: [0, 1, 1],
  });
  return {
    opacity,
    transform: [{ scaleY }],
  };
};

const TransitionConfiguration = () => {
  return {
    transitionSpec: {
      duration: 750,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const width = layout.initWidth;
      const { index, route } = scene;
      const params = route.params || {}; // <- That's new
      const transition = params.transition || 'default'; // <- That's new
      return {
        collapseExpand: CollapseExpand(index, position),
        default: CollapseExpand(index, position, width),
      }[transition];
    },
  };
};

class App extends Component {
  componentDidMount = async () => {
    const Language = await AsyncStorage.getItem('Language');
    if (Language == 'en') {
      I18nManager.forceRTL(false);
      CONSTANT.setLanguage(Language);
    } else if (Language == 'ar') {
      I18nManager.forceRTL(true);
      CONSTANT.setLanguage(Language);
    } else {
      I18nManager.forceRTL(false);
      CONSTANT.setLanguage('en');
    }
  };
  render() {
    return (
      <ApplicationProvider mapping={mapping} theme={lightTheme}>
        <SafeAreaView style={{ flex: 1 }}>
          <AppContainer />
        </SafeAreaView>
      </ApplicationProvider>
    );
  }
}
export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#e8f6ff',
        }}>
        {Platform.OS === 'ios' ? (
          <StatusBar hidden />
        ) : (
          <StatusBar backgroundColor="#cc4641" barStyle="light-content" />
        )}

        {/* <Grid>
          <Row size={3}></Row>
          <Row size={1}></Row>
      </Grid> */}
        <View style={{ height: '100%' }}>
          <View style={{ height: '70%' }}>
            <ImageBackground
              resizeMode="stretch"
              source={require('./Assets/Images/wizardMain.png')}
              style={{ width: '100%', height: 416, }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  alignSelf: 'flex-end',
                  borderRadius: 25,
                  width: 80,
                  marginRight: 15,
                  marginTop: 15,
                  backgroundColor: '#3d4461',
                  borderColor: '#fff',
                  borderWidth: 1,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: CONSTANT.PoppinsRegular,
                  }}>
                  {CONSTANT.AppSkip}
                </Text>
              </TouchableOpacity>
              <Image
                style={{
                  width: 180,
                  left: '25%',
                  overflow: 'hidden',
                  resizeMode: 'contain',
                  justifyContent: 'flex-end',
                }}
                source={require('./Assets/Images/WizardLogo.png')}
              />
            </ImageBackground>
          </View>
          <View style={{ height: '30%' }}>
            <Image
              style={{
                justifyContent: 'center',
                width: 150,
                height: 100,
                alignSelf: 'center',
                resizeMode: 'center',
              }}
              source={require('./Assets/Images/SplashImage.png')}
            />
            <Text
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: 16,
                alignItems: 'center',
                fontFamily: CONSTANT.OpenSansRegular,
              }}>
              {CONSTANT.AppWizardParagraph}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

class CustomDrawerComponent extends Component {
  state = {
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    idProfile: '',
    showAlert: false,
    docLocation_setting: '',
    ProfileImg: '',
    dialoigeVisible: false,
    english: false,
    arabic: false,
  };
  // componentWillMount() {
  //   this.getUser();
  // }
  componentDidMount = async () => {
    this.getUser();
    this.getThemeSettingsForDocLocation();
    this.fetchProfileImg();
    const Language = await AsyncStorage.getItem('Language');
    if (Language == 'en') {
      this.setState({ arabic: false, english: true });
    } else if (Language == 'ar') {
      this.setState({ english: false, arabic: true });
    } else {
      this.setState({ arabic: false, english: true });
    }
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
      const idProfile = await AsyncStorage.getItem('projectProfileId');
      global.Lang = await AsyncStorage.getItem('Language');
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        //  alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      if (idProfile !== null) {
        this.setState({ idProfile });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
  logoutAlert = () => {
    Alert.alert(CONSTANT.AppConfirm, CONSTANT.AppWantToLogout, [
      { text: CONSTANT.AppYes, onPress: () => this.logout() },
      { text: CONSTANT.AppCancel, onPress: () => this.canceledLogout },
    ]);
  };
  EmailResend = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'user/account_verification', {
        user_id: Uid,
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({
            fetching_from_server: false,
          });
          Alert.alert(CONSTANT.Success, response.data.message);
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Error, response.data.message);
        }
      });
  };
  logout = async () => {
    AsyncStorage.getAllKeys()
      .then(keys => AsyncStorage.multiRemove(keys))
      .then(() => console.log('success data deleted'));
    this.clearAsyncStorage();
    I18nManager.forceRTL(false);
    RNRestart.Restart();

    // const {id, storedValue, storedType, profileImg, type} = this.state;
    // const Uid = await AsyncStorage.getItem('projectUid');
    // axios
    //   .post(CONSTANT.BaseUrl + 'user/do_logout', {
    //     user_id: Uid,
    //   })
    //   .then(async response => {
    //     console.log('data', id, JSON.stringify(response));
    //     if (response.status == 200) {
    //       AsyncStorage.getAllKeys()
    //         .then(keys => AsyncStorage.multiRemove(keys))
    //         .then(() => console.log('success data deleted'));
    //       this.clearAsyncStorage();
    //       I18nManager.forceRTL(false);
    //       RNRestart.Restart();
    //     } else if (response.status == 203) {
    //       alert(CONSTANT.AppIncorrectDetail);
    //     }
    //   })
    //   .catch(error => {
    //     alert(CONSTANT.AppIncorrectDetail);
    //   });
  };
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  updateAppNotice = () => {
    Alert.alert(
      CONSTANT.AppRateThisApp,
      CONSTANT.AppPleasegiveusFiveStar +
      (Platform.OS == 'ios' ? CONSTANT.Appappstore : CONSTANT.Appplaystore) +
      '.',
      [
        {
          text: CONSTANT.AppRateNow,
          onPress: () => {
            if (Platform.OS == 'ios') {
              Linking.openURL(CONSTANT.APP_STORE_LINK).catch(err =>
                console.error('An error occurred', err),
              );
            } else {
              Linking.openURL(CONSTANT.PLAY_STORE_LINK).catch(err =>
                console.error('An error occurred', err),
              );
            }
          },
        },
      ],
    );
  };
  onClickShare = () => {
    Share.share(
      {
        message: CONSTANT.PLAY_STORE_LINK,
        url: CONSTANT.PLAY_STORE_LINK,
        title: CONSTANT.AppWowdidyouseethat,
      },
      {
        // Android only:
        dialogTitle: CONSTANT.AppShareAppLink,
        // iOS only:
        excludedActivityTypes: ['com.apple.UIKit.activity.PostToTwitter'],
      },
    );
  };

  getThemeSettingsForDocLocation = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    this.setState({ docLocation_setting: json.doctor_location });
  };
  fetchProfileImg = async () => {
    //this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem('projectUid');
    console.log('id' + id);
    const response = await fetch(CONSTANT.BaseUrl + 'profile/setting?id=' + id);
    const json = await response.json();
    console.log('This is Json' + JSON.stringify(json));
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({ ProfileData: [] });
    } else {
      this.setState({ ProfileImg: json[0].profile_image_url });
      console.log('ProfileImg' + this.state.ProfileImg);
    }
  };
  updateLanguage = () => {
    this.setState({ dialoigeVisible: true });
  };
  changeLanguage = val => {
    AsyncStorage.setItem('Language', val);
    if (val == 'ar') {
      I18nManager.forceRTL(true);
      this.setState({ arabic: true, english: false });
    } else {
      I18nManager.forceRTL(false);
      this.setState({ english: true, arabic: false });
    }

    RNRestart.Restart();
  };
  render() {
    const { storedValue, storedType, profileImg } = this.state;
    return (
      <SafeAreaView style={{ backgroundColor: '#fff', height: '100%' }}>
        <Dialog
          dialogStyle={{
            marginHorizontal: 20,
            backgroundColor: '#fff',
            width: '80%',
          }}
          visible={this.state.dialoigeVisible}
          onTouchOutside={() => {
            this.setState({ dialoigeVisible: false });
          }}
          footer={
            <DialogFooter>
              <DialogButton
                textStyle={{ fontSize: 15, fontWeight: '700', color: '#000' }}
                text={CONSTANT.NoThanks}
                onPress={() => this.setState({ dialoigeVisible: false })}
              />
            </DialogFooter>
          }>
          <DialogContent>
            <Text
              style={{
                fontSize: 20,
                fontWeight: '700',
                marginVertical: 10,
                color: '#000',
                textAlign: 'left',
              }}>
              {CONSTANT.ChangeLanguage}
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginVertical: 10,
                color: '#000',
                textAlign: 'left',
              }}>
              {CONSTANT.ChangLangTitle}
            </Text>
            <TouchableOpacity
              onPress={() => this.changeLanguage('en')}
              style={styles.checkBoxStyle}>
              <Text style={{ fontSize: 17, color: '#000', fontWeight: '700' }}>
                English
              </Text>
              <View
                style={[
                  styles.checkBoxSelectorStyle,
                  {
                    backgroundColor: this.state.english ? '#000' : '#fff',
                  },
                ]}>
                <AntIcon
                  name="check"
                  size={17}
                  color={this.state.english ? '#fff' : '#000'}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.changeLanguage('ar')}
              style={styles.checkBoxStyle}>
              <Text style={{ fontSize: 17, color: '#000', fontWeight: '700' }}>
                عربى
              </Text>
              <View
                style={[
                  styles.checkBoxSelectorStyle,
                  {
                    backgroundColor: this.state.arabic ? '#000' : '#fff',
                  },
                ]}>
                <AntIcon
                  name="check"
                  size={17}
                  color={this.state.arabic ? '#fff' : '#000'}
                />
              </View>
            </TouchableOpacity>
          </DialogContent>
        </Dialog>

        <View>
          <Image
            style={{
              justifyContent: 'center',
              width: 130,
              height: 80,
              alignSelf: 'center',
              resizeMode: 'contain',
            }}
            source={require('./Assets/Images/SplashImage.png')}
          />
          <View
            style={{
              height: 120,
              width: '100%',
              backgroundColor: '#e8f6ff',
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('DetailDoctorScreen', {
                  itemId: this.state.idProfile,
                });
              }}
              style={{ flexDirection: 'row', width: '85%', overflow: 'hidden' }}>
              {this.state.ProfileImg != '' ? (
                <Image
                  source={{ uri: this.state.ProfileImg }}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                  }}
                />
              ) : (
                <Image
                  source={{
                    uri: 'data:image/png;base64,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',
                  }}
                  style={{
                    height: 70,
                    width: 70,
                    borderRadius: 35,
                  }}
                />
              )}

              {storedValue != '' ? (
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    width: '70%',
                    justifyContent: 'center',
                  }}>
                  {
                    <Text
                      numberOfLines={1}
                      style={{
                        color: '#55acee',
                        fontSize: 10,
                        marginLeft: 10,
                        fontFamily: CONSTANT.PoppinsRegular,
                      }}>
                      {storedType == 'hospital' ? CONSTANT.Hospital : storedType == 'doctor' ? CONSTANT.Doctor : CONSTANT.AppGuest}
                    </Text>
                  }
                  <Text
                    numberOfLines={1}
                    style={{
                      color: CONSTANT.primaryColor,
                      fontSize: 13,
                      marginLeft: 10,
                      fontFamily: CONSTANT.PoppinsMedium,
                    }}>
                    {storedValue}
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: 'column', marginTop: 20 }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#55acee',
                      fontSize: 10,
                      marginLeft: 10,
                      fontFamily: CONSTANT.PoppinsRegular,
                    }}>
                    {CONSTANT.AppGuest}
                  </Text>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#55acee',
                      fontSize: 13,
                      marginLeft: 10,
                      fontFamily: CONSTANT.PoppinsMedium,
                    }}>
                    {CONSTANT.AppGreetings}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <View style={{ width: '15%' }}>
              <TouchableOpacity
                onPress={() => this.updateLanguage()}
                style={{
                  borderRadius: 15,
                  height: 30,
                  width: 30,
                  backgroundColor: '#fe736e',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <AntIcon
                  name={I18nManager.isRTL ? 'earth' : 'earth'}
                  color={'#fff'}
                  size={15}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginTop: 20 }}>
          {storedType != '' && (
            <View style={{ marginLeft: 25, flexDirection: 'row', marginTop: 20 }}>
              <AntIcon name="user" color={'#3d4461'} size={20} />
              <Text
                style={{
                  marginLeft: 10,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 17,
                }}>
                {CONSTANT.AppDashboard}
              </Text>
            </View>
          )}
          {storedType != '' && (
            <View
              style={{
                marginTop: 20,
                borderBottomColor: '#dddddd',
                borderBottomWidth: 0.6,
              }}
            />
          )}
          {storedType != '' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('Dashboard')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.DrawerDashboard}
              </Text>
            </View>
          )}
          {storedType == 'doctor' && (
            <>
              {this.state.docLocation_setting == 'hospitals' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.props.navigation.navigate('AppointmentSettings')
                  }
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 55,
                      color: '#3d4461',
                      fontFamily: CONSTANT.PoppinsMedium,
                      fontSize: 15,
                    }}>
                    {CONSTANT.AppAppointmentSettingsHospital}
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.docLocation_setting == 'clinic' && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() =>
                    this.props.navigation.navigate('ClinicAppointmentSettings')
                  }
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Text
                    style={{
                      marginLeft: 55,
                      color: '#3d4461',
                      fontFamily: CONSTANT.PoppinsMedium,
                      fontSize: 15,
                    }}>
                    {CONSTANT.AppAppointmentSettingsClinic}
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.docLocation_setting == 'both' && (
                <>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      this.props.navigation.navigate('AppointmentSettings')
                    }
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        marginLeft: 55,
                        color: '#3d4461',
                        fontFamily: CONSTANT.PoppinsMedium,
                        fontSize: 15,
                      }}>
                      {CONSTANT.AppAppointmentSettingsHospital}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() =>
                      this.props.navigation.navigate(
                        'ClinicAppointmentSettings',
                      )
                    }
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      marginBottom: 10,
                    }}>
                    <Text
                      style={{
                        marginLeft: 55,
                        color: '#3d4461',
                        fontFamily: CONSTANT.PoppinsMedium,
                        fontSize: 15,
                      }}>
                      {CONSTANT.AppAppointmentSettingsClinic}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
          {storedType == 'doctor' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('AppoinmentList')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppAppointmentListing}
              </Text>
            </View>
          )}

          {storedType == 'doctor' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('InvoiceListing')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.invoices}
              </Text>
            </View>
          )}

          {storedType == 'regular_user' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('AppointmentListPatient')
                }
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppAppointmentListing}
              </Text>
            </View>
          )}

          {(storedType == 'doctor' || storedType == 'hospital') && (
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 10,
                }}>
                <Text
                  onPress={() =>
                    this.props.navigation.navigate('SpecialitiesAndServices')
                  }
                  style={{
                    marginLeft: 55,
                    color: '#3d4461',
                    fontFamily: CONSTANT.PoppinsMedium,
                    fontSize: 15,
                  }}>
                  {CONSTANT.AppSpecialitiesServices}
                </Text>
              </View>
            )}
          {storedType == 'doctor' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('PayoutSetting')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppPayoutSetting}
              </Text>
            </View>
          )}

          {storedType == 'doctor' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('Packages')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppPackages}
              </Text>
            </View>
          )}

          {storedType != '' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('FavoriteListing')
                }
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppFavorites}
              </Text>
            </View>
          )}

          {storedType != '' && storedType != 'hospital' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('MessagesMain')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppInbox}
              </Text>
            </View>
          )}

          {storedType == 'hospital' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('TeamListing')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppManageTeam}
              </Text>
            </View>
          )}

          {storedType == '' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('LoginScreen')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppLogin}
              </Text>
            </View>
          )}

          {
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() =>
                  this.props.navigation.navigate('SearchQuestions')
                }
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppHealthForum}
              </Text>
            </View>
          }

          {
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('ArticleListing')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppBlogList}
              </Text>
            </View>
          }
          {storedType == 'doctor' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('MyArticles')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppMyArticles}
              </Text>
            </View>
          )}
          {storedType == 'doctor' && (
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                onPress={() => this.props.navigation.navigate('PostArticle')}
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.AppPostArticle}
              </Text>
            </View>
          )}
          <View style={{ marginLeft: 25, marginTop: 20, flexDirection: 'row' }}>
            <AntIcon name="notification" color={'#3d4461'} size={20} />
            <Text
              style={{
                marginLeft: 10,
                color: '#3d4461',
                fontFamily: CONSTANT.PoppinsMedium,
                fontSize: 17,
              }}>
              {CONSTANT.AppGeneral}
            </Text>
          </View>
          <View
            style={{
              marginTop: 20,
              borderBottomColor: '#dddddd',
              borderBottomWidth: 0.6,
            }}
          />

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('AboutUs')}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.DrawerAboutus}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.updateAppNotice()}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.DrawerRateApp}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onClickShare()}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.DrawerInviteFriends}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Contact')}>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                }}>
                {CONSTANT.DrawerContact}
              </Text>
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => this.props.navigation.navigate('PrivacyPolicy')}>
            <View
              style={{
                flexDirection: 'row',
                //marginTop: 10,
                // marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                  marginTop: 20,
                }}>
                {CONSTANT.DrawerPrivacyPolicy}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('TermsOfService')}>
            <View
              style={{
                flexDirection: 'row',
                // marginTop: 10,
                // marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                  marginTop: 20,
                }}>
                {CONSTANT.DrawerTermsOfService}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('FAQ')}>
            <View
              style={{
                flexDirection: 'row',
                // marginTop: 10,
                // marginBottom: 10,
              }}>
              <Text
                style={{
                  marginLeft: 55,
                  color: '#3d4461',
                  fontFamily: CONSTANT.PoppinsMedium,
                  fontSize: 15,
                  marginTop: 20,
                }}>
                {CONSTANT.DrawerFAQ}
              </Text>
            </View>
          </TouchableOpacity> */}
        </ScrollView>
        <View style={{ height: 70, backgroundColor: '#e8f6ff' }}>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 15,
              marginLeft: 25,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              {storedType != '' ? (
                <TouchableOpacity onPress={this.logoutAlert}>
                  <AntIcon name="poweroff" color={'#fe736e'} size={20} />
                </TouchableOpacity>
              ) : null}

              {storedType != '' ? (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SecuritySettings')
                  }>
                  <AntIcon
                    name="setting"
                    color={'#3d4461'}
                    size={20}
                    style={{
                      marginLeft: 25,
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <View style={{ marginRight: 10 }}>
              {storedType != '' ? (
                <TouchableOpacity
                  onPress={() => this.EmailResend()}
                  style={{
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    borderWidth: 0.6,
                    borderColor: CONSTANT.primaryColor,
                  }}>
                  <Text>{CONSTANT.ResendEmail}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {/* <Text
            style={{
              alignSelf: 'flex-end',
              textAlign: 'center',
              color: '#3d4461',
              marginRight: 10,
              marginTop: -10,
            }}>
            ver 1.0.0
          </Text> */}
        </View>
      </SafeAreaView>
    );
  }
}

class CustomBottomSheetComponent extends Component {
  state = {
    storedValue: '',
    storedType: '',
    profileImg: '',
    type: '',
    id: '',
    showAlert: false,
    ProfileImg: '',
  };
  componentWillMount() {
    this.getUser();
    this.fetchProfileImg();
  }
  fetchProfileImg = async () => {
    //this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem('projectUid');
    console.log('id' + id);
    const response = await fetch(CONSTANT.BaseUrl + 'profile/setting?id=' + id);
    const json = await response.json();
    console.log('This is Json' + JSON.stringify(json));
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({ ProfileData: [] });
    } else {
      this.setState({ ProfileImg: json[0].profile_image_url });
      console.log('ProfileImg' + this.state.ProfileImg);
    }
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem('full_name');
      const storedType = await AsyncStorage.getItem('user_type');
      const profileImg = await AsyncStorage.getItem('profile_img');
      const type = await AsyncStorage.getItem('profileType');
      const id = await AsyncStorage.getItem('projectUid');
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        //  alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
  toggleDrawer = () => {
    this.props.navigation.dispatch(DrawerActions.toggleDrawer());
  };
  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  MoveProfileSetting = () => {
    const { storedValue, storedType, profileImg } = this.state;
    if (storedType != '') {
      this.props.navigation.navigate('ProfileTabs');
    } else {
      Alert.alert(CONSTANT.Sorry, CONSTANT.PleaseLoginFirst);
    }
  };
  MoveSecuritySetting = () => {
    const { storedValue, storedType, profileImg } = this.state;
    if (storedType != '') {
      this.props.navigation.navigate('SecuritySettings');
    } else {
      Alert.alert(CONSTANT.Sorry, CONSTANT.PleaseLoginFirst);
    }
  };
  MoveMessageScreen = () => {
    const { storedValue, storedType, profileImg } = this.state;
    if (storedType != '') {
      this.props.navigation.navigate('MessagesMain');
    } else {
      Alert.alert(CONSTANT.Sorry, CONSTANT.PleaseLoginFirst);
    }
  };
  render() {
    const { showAlert } = this.state;
    // const { storedValue, storedType, profileImg } = this.state;
    return (
      <SafeAreaView
        ref={c => {
          this.scroll = c;
        }}>
        <View style={{ borderBottomColor: '#dddddd', borderBottomWidth: 0.6 }} />
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: '#fff',
            flexDirection: 'row',
            overflow: 'visible',
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.toggleDrawer}
            style={{
              width: '17.5%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            <View>
              <AntIcon
                name="menufold"
                color={'#3d4461'}
                size={17}
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  marginLeft: 2,
                  marginRight: 1,
                }}
              />
            </View>
          </TouchableOpacity>

          <View style={{ borderLeftColor: '#dddddd', borderLeftWidth: 0.6 }} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.MoveMessageScreen}
            style={{
              width: '17.5%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            <View>
              <AntIcon
                name="message1"
                color={'#323232'}
                size={17}
                style={{
                  alignSelf: 'center',
                  textAlign: 'center',
                  marginTop: 2,
                  marginLeft: 2,
                  marginRight: 1,
                }}
              />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              width: '30%',
              height: 70,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              backgroundColor: '#3fabf3',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              elevation: 3,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.2,
              shadowColor: '#000',
            }}>
            <View>
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('SearchResultScreen', {
                    title: '',
                    selectedItem: '',
                    location: '',
                    Speciality: '',
                  })
                }
                style={{ flexDirection: 'column' }}>
                <AntIcon
                  name="search1"
                  color={'#ffffff'}
                  size={17}
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    marginLeft: 2,
                    marginRight: 1,
                  }}
                />
                <Text
                  style={{
                    color: '#ffffff',
                    fontFamily: CONSTANT.PoppinsMedium,
                  }}>
                  {CONSTANT.AppBottomSheetSearch}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>

          <View
            style={{
              width: '17.5%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              textAlign: 'center',
            }}>
            <AntIcon
              name="setting"
              color={'#323232'}
              onPress={this.MoveSecuritySetting}
              size={17}
              style={{
                alignSelf: 'center',
                textAlign: 'center',
                marginTop: 2,
                marginLeft: 2,
                marginRight: 1,
              }}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={this.MoveProfileSetting}
            style={{
              width: '17.5%',
              backgroundColor: '#fe736e',
              borderTopLeftRadius: 50,
              borderBottomLeftRadius: 50,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  top: 10,
                }}>
                {this.state.ProfileImg != '' ? (
                  <Image
                    source={{ uri: this.state.ProfileImg }}
                    resizeMode={'cover'}
                    style={{
                      borderRadius: 15,
                      height: 30,
                      width: 30,
                      borderWidth: 1,
                      borderColor: '#fff',
                      marginRight: 5,
                    }}
                  />
                ) : (
                  <Image
                    resizeMode={'cover'}
                    style={{
                      borderRadius: 15,
                      height: 30,
                      width: 30,
                      borderWidth: 1,
                      borderColor: '#fff',
                      marginRight: 5,
                    }}
                    source={{
                      uri: 'data:image/png;base64,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',
                    }}
                  />
                )}

                <AntIcon
                  name={I18nManager.isRTL ? 'doubleleft' : 'doubleright'}
                  color={'#fff'}
                  size={13}
                  style={{
                    alignSelf: 'center',
                    textAlign: 'center',
                    marginTop: 2,
                    marginLeft: 2,
                    marginRight: 1,
                  }}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const DashboardTabNavigator = createBottomTabNavigator(
  {
    // MainNavigator: MainDrawer},{
    Home: {
      screen: Home,
    },
    // SearchResultScreen:{
    //   screen:SearchResultScreen
    // },
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
      };
    },
    tabBarComponent: CustomBottomSheetComponent,
    tabBarOptions: {
      activeTintColor: '#ff5851',
    },
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    // transitionConfig: TransitionConfiguration
  },
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator,
    CustomBottomSheetComponent: CustomBottomSheetComponent,
    PreLoader: PreLoader,
    Location: Location,
    SearchResultScreen: SearchResultScreen,
    DetailDoctorScreen: DetailDoctorScreen,
    CustomDrawerComponent: CustomDrawerComponent,
    MessagesMain: MessagesMain,
    MessageDetailLayout: MessageDetailLayout,
    PersonalDetail: PersonalDetail,
    AppoinmentList: AppoinmentList,
    LoginScreen: LoginScreen,
    SignupScreen: SignupScreen,
    VerificationAccount: VerificationAccount,
    SearchQuestions: SearchQuestions,
    HealthForumCard: HealthForumCard,
    SecuritySettings: SecuritySettings,
    GetAnswers: GetAnswers,
    ManageEmailNotification: ManageEmailNotification,
    AccountSecuritySetting: AccountSecuritySetting,
    DeleteAccount: DeleteAccount,
    ChangePassword: ChangePassword,
    ArticleListing: ArticleListing,
    MyArticles: MyArticles,
    ArticleListCard: ArticleListCard,
    ArticleDetailPage: ArticleDetailPage,
    TeamListing: TeamListing,
    PostArticle: PostArticle,
    SpecialitiesAndServices: SpecialitiesAndServices,
    AppointmentSettings: AppointmentSettings,
    ClinicAppointmentSettings: ClinicAppointmentSettings,
    LocationDetail: LocationDetail,
    SearchResultTopCategory: SearchResultTopCategory,
    BookAppointment: BookAppointment,
    Packages: Packages,
    BuyPackageWebview: BuyPackageWebview,
    AppointmentDetailPage: AppointmentDetailPage,
    VerifyPasswordForBooking: VerifyPasswordForBooking,
    SubmitCode: SubmitCode,
    PayAppointmentCheckout: PayAppointmentCheckout,
    FavoriteListing: FavoriteListing,
    FavDoctors: FavDoctors,
    FavHospitals: FavHospitals,
    FavArticles: FavArticles,
    BookAppointmentCall: BookAppointmentCall,
    AddFeedback: AddFeedback,
    AppointmentListPatient: AppointmentListPatient,
    AboutUs: AboutUs,
    PrivacyPolicy: PrivacyPolicy,
    TermsOfService: TermsOfService,
    FAQ: FAQ,
    Contact: Contact,
    MessageDoctor: MessageDoctor,
    DoctorAddBooking: DoctorAddBooking,
    InviteHospitals: InviteHospitals,
    Prescription: Prescription,
    Payout: Payout,
    Yourpayouts: Yourpayouts,
    PayoutSetting: PayoutSetting,
    Dashboard: Dashboard,
    InvoiceListing:InvoiceListing,
    ProfileTabs: ProfileTabs,
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    // transitionConfig: TransitionConfiguration
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dash: { screen: DashboardStackNavigator },
  },
  {
    headerMode: 'none',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    drawerPosition: I18nManager.isRTL ? 'right' : 'left',
    //  transitionConfig: TransitionConfiguration,
    overlayColor: 'rgba(0, 0, 0, 0.7)',
    contentComponent: CustomDrawerComponent,
    contentOptions: {
      activeTintColor: '#ff5851',
    },
  },
);

const AppSwitchNavigator = createSwitchNavigator(
  {
    PreLoader: { screen: PreLoader },
    Welcome: { screen: WelcomeScreen },
    Dashboard: { screen: AppDrawerNavigator },
  },
  {
    headerMode: 'none',
    initialRouteName: 'PreLoader',
    mode: Platform.OS === 'ios' ? 'modal' : 'card',
    navigationOptions: {
      cardStack: {
        gesturesEnabled: false,
      },
      gesturesEnabled: false,
    },
    gesturesEnabled: false,
    transitionConfig: TransitionConfiguration,
  },
);

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBoxStyle: {
    marginTop: 5,
    marginBottom: 10,
    //height: width / 15,
    borderColor: '#b3adad',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  checkBoxSelectorStyle: {
    height: 25,
    width: 25,
    borderColor: '#b3adad',
    borderWidth: 1,
    borderRadius: 25 / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
