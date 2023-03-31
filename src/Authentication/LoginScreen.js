import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  AsyncStorage,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  KeyboardAvoidingView,
  Modal,
  ActivityIndicator
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import Entypo from "react-native-vector-icons/Entypo";
import RNRestart from "react-native-restart";
import CustomHeader from '../Header/CustomHeader';
import axios from "axios";
import CONSTANT from '../Constants/local';
import { Button } from "native-base";
class LoginScreen extends Component {
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      isProgress: false,
      fetching_from_server:false,
      showPass: true,
    };
  }
  login = () => {
    const { username, password } = this.state;
    //let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username == "") {
      //alert("Please enter Email address");
      this.setState({ email: "Please enter Email address" });
    // } else if (reg.test(username) === false) {
    //   //alert("Email is Not Correct");
    //   this.setState({ email: "Email is Not Correct" });
    //   return false;
    } else if (password == "") {
      this.setState({ email: "Please enter password" });
    } else {
      //   this.openProgressbar();
      this.setState({fetching_from_server : true})
      axios
        .post(CONSTANT.BaseUrl + "user/do_login", {
          username: username,
          password: password
        })
        .then(async response => {
          if (response.data.type == "success") {
            await AsyncStorage.setItem(
              "full_name",
              response.data.profile.pmeta.am_first_name +
                " " +
                response.data.profile.pmeta.am_last_name
            );
            await AsyncStorage.setItem(
              "user_type",
              response.data.profile.pmeta.user_type
            );
            await AsyncStorage.setItem(
              "user_onCall_booking",
              response.data.profile.pmeta.booking_oncall
            );
            await AsyncStorage.setItem(
              "listing_type",
              response.data.profile.pmeta.listing_type
            );
            await AsyncStorage.setItem(
              "profile_img",
              response.data.profile.pmeta.profile_img
            );
            await AsyncStorage.setItem(
              "profileType",
              response.data.type
            );
            await AsyncStorage.setItem(
              "projectUid",
              response.data.profile.umeta.id
            );
            await AsyncStorage.setItem(
              "projectEmail",
              response.data.profile.umeta.user_email
            );
            await AsyncStorage.setItem(
              "location_type",
              response.data.profile.location_type
            );
            await AsyncStorage.setItem(
              "projectProfileId",
              JSON.stringify(response.data.profile.umeta.profile_id)
            );
            await AsyncStorage.setItem(
              "shipping_address1",
              response.data.profile.shipping.address_1
            );
            await AsyncStorage.setItem(
              "shipping_city",
              response.data.profile.shipping.city
            );
            await AsyncStorage.setItem(
              "shipping_company",
              response.data.profile.shipping.company
            );
            await AsyncStorage.setItem(
              "shipping_country",
              response.data.profile.shipping.country
            );
            await AsyncStorage.setItem(
              "shipping_first_name",
              response.data.profile.shipping.first_name
            );
            await AsyncStorage.setItem(
              "shipping_last_name",
              response.data.profile.shipping.last_name
            );
            await AsyncStorage.setItem(
              "shipping_state",
              response.data.profile.shipping.state
            );
            await AsyncStorage.setItem(
              "billing_address_1",
              response.data.profile.billing.address_1
            );
            await AsyncStorage.setItem(
              "billing_city",
              response.data.profile.billing.city
            );
            await AsyncStorage.setItem(
              "billing_company",
              response.data.profile.billing.company
            );
            await AsyncStorage.setItem(
              "billing_country",
              response.data.profile.billing.country
            );
            await AsyncStorage.setItem(
              "billing_first_name",
              response.data.profile.billing.first_name
            );
            await AsyncStorage.setItem(
              "billing_last_name",
              response.data.profile.billing.last_name
            );
            await AsyncStorage.setItem(
              "billing_email",
              response.data.profile.billing.email
            );
            await AsyncStorage.setItem(
              "billing_phone",
              response.data.profile.billing.phone
            );
            await AsyncStorage.setItem(
              "billing_state",
              response.data.profile.billing.state
            );
            this.setState({ isProgress: false });
            RNRestart.Restart();
          } else if (response.data.type == "error") {
            this.setState({ isProgress: false , fetching_from_server : false });
            alert(CONSTANT.LoginCheckEmailPasswordorNetwork);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
  onButtonPress = () => {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
    // then navigate
    navigate("NewScreen");
  };
  handleBackButton = () => {
    Alert.alert(
      "Exit App",
      "Exiting the application?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => BackHandler.exitApp()
        }
      ],
      {
        cancelable: false
      }
    );
    return true;
  };

  render() {
    return this.state.isProgress ? (
      <CustomProgressBar />
    ) : (
      <KeyboardAvoidingView style={styles.LoginKeyboardAvoidViewStyle} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <CustomHeader headerText={CONSTANT.LoginHeader} />
        <View style={styles.LoginContainer}>
          <Text style={styles.LoginAlertText}>
            {this.state.email}
          </Text>
          <Image
            style={styles.LoginImageStyle}
            source={require("../../Assets/Images/SplashImage.png")}
            resizeMode={'contain'}
          />
          <Text
            style={styles.LoginParagraphText}
          >
            {CONSTANT.Loginmain}
          </Text>
          <View
            style={styles.LoginTextInputArea}
          >
            <TextInput
              style={styles.LoginTextInput}
              underlineColorAndroid="transparent"
              name={CONSTANT.LoginUsername}
              placeholder={CONSTANT.LoginEmail}
              placeholderTextColor="#807f7f"
              onChangeText={username => this.setState({ username })}
            />
            <View
              style={styles.LoginTextInputBorder}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextInput
                style={[styles.LoginTextInput,{width:'90%'}]}
                underlineColorAndroid="transparent"
                editable={true}
                secureTextEntry={true}
                name={CONSTANT.Loginpassword}
                placeholder={CONSTANT.LoginPassword}
                placeholderTextColor="#807f7f"
                onChangeText={password => this.setState({ password })}
                secureTextEntry={this.state.showPass}
              />
              <TouchableOpacity 
                onPress={() => this.setState({showPass:!this.state.showPass})}
                style={{alignItems: 'center', justifyContent: 'space-between', width: '10%', height: 40}}
              >
                <Entypo name={this.state.showPass == true ? "eye-with-line":"eye"} size={18} color={"#999999"} style={{padding :10}} />
              </TouchableOpacity>
            </View>
          </View>
        
          <TouchableOpacity
          onPress={this.login}
          //On Click of button calling loadMoreData function to load more data
          style={styles.LoginLoadMoreBtn}>
          <Text style={styles.LoginBTNText}>{CONSTANT.LoginButton}</Text>
          {this.state.fetching_from_server == true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
          
        </View>
        <View
          style={styles.LoginFooterArea}
        >
          <Text
            onPress={() => this.props.navigation.navigate("SignupScreen")}
            style={styles.LoginFooterText}
          >
            {CONSTANT.LoginMoveSignup}
          </Text>
        </View>
        
      </KeyboardAvoidingView>
    );
  }
}
const CustomProgressBar = ({ visible }) => (
  <Modal onRequestClose={() => null} visible={visible}>
    <View
      style={styles.LoginLoadingMainArea}
    >
      <View
        style={styles.LoginLoadingArea}
      >
        <Text style={styles.LoginLoadingText}>{CONSTANT.LoginLoading}</Text>
        <ActivityIndicator size="large" color={CONSTANT.primaryColor} />
      </View>
    </View>
  </Modal>
);
export default LoginScreen;
