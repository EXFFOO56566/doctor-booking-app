import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  ActivityIndicator,
  StatusBar,
  Alert,
  AsyncStorage
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import BouncingPreloader from 'react-native-bouncing-preloader';
import AntIcon from "react-native-vector-icons/AntDesign";
import * as CONSTANT from "../Constants/Constant";
import {I18nManager} from 'react-native';
I18nManager.forceRTL(false);
class PreLoader extends Component {
  state = {
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    showAlert: false,
    checkrtl:''
  };

  componentDidMount() { 
    this.checkRTL();
    setTimeout(() => {
      this._checkUserLoginStatus();
    }, 1000);
  }
  checkRTL = async()=> {
    const response = await fetch(
      CONSTANT.BaseUrl + 'user/get_access',
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({checkrtl: '', isLoading: false});
    } else {
      this.setState({checkrtl: json.rtl, isLoading: false});
    }
  }
  _checkUserLoginStatus = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      console.log(storedValue, storedType, profileImg, type);
      if (storedValue != null) {
        this.props.navigation.navigate("Home");
      } else {
        this.props.navigation.navigate("Welcome");
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
      }
      if (type !== null){
        this.setState({ type });
      } else {
      }
    } catch (error) {
      console.log(error);
      this.props.navigation.navigate("LoginScreen");
    }
  };
  render() {
    return (
      <View style={styles.PreLoadercontainer}>
        <StatusBar backgroundColor="#cc4641" barStyle="light-content" />
        <View style={styles.PreLoadersplashBackground}>
        <Image style={styles.PreLoadersplashImageStyle}
          source={require('../../Assets/Images/SplashImage.png')}
        />
         <ActivityIndicator style={styles.PreLoaderindicatorStyle} color="#fe736e" />
        </View>
      </View>
    );
  }
}
export default PreLoader;
