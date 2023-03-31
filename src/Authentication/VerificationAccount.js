import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import AntIcon from "react-native-vector-icons/AntDesign";
import axios from "axios";
import CONSTANT from '../Constants/local';
class VerificationAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: ""
    };
  }
  VerifyAccount = async () => {
    const { code } = this.state;
    const { params } = this.props.navigation.state;
    if (code == "") {
      //alert("Please enter Email address");
      this.setState({ email: "Please enter code" });
    } else {
      // this.openProgressbar();
      axios
        .post(CONSTANT.BaseUrl + "user/account-verification", {
          user_id: params.user_id,
          code: code
        })
        .then(async response => {
          if (response.status === 200) {
            alert(response.data.message);
            this.props.navigation.navigate("LoginScreen");
          } else if (response.status === 203) {
            alert(response.data.message);
          }
        })
        .catch(error => {
          alert(error);
          console.log(error);
        });
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={styles.HeaderArea}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={styles.HeaderBackBTN}
          >
            <AntIcon name="back" size={25} color={"#fff"} />
          </TouchableOpacity>
          <View
            style={styles.HeaderHeadingArea}
          >
            <Text
              numberOfLines={1}
              style={styles.HeaderHeadingText}
            >
              {CONSTANT.VerifyAccountHeader}
            </Text>
          </View>
        </View>
        <View style={styles.VerifyAccountContainer}>
          <Text style={styles.VerifyAccountAlerText}></Text>
          <Image
            style={styles.VerifyAccountImageStyle}
            source={require("../../Assets/Images/SplashImage.png")}
          />
          <Text
            style={styles.VerifyAccountParagraphText}
          >
            {CONSTANT.VerifyAccountmain}
          </Text>
          <View
            style={styles.VerifyAccountTextInputArea}
          >
            <TextInput
              style={styles.VerifyAccountTextInput}
              underlineColorAndroid="transparent"
              name="code"
              placeholder={CONSTANT.VerifyAccountCode}
              placeholderTextColor="#807f7f"
              onChangeText={code => this.setState({ code })}
            />
          </View>
          <TouchableOpacity
            onPress={this.VerifyAccount}
            style={styles.MainButtonArea}
          >
            <Text
              style={styles.MainButtonText}
            >
              {CONSTANT.VerifyAccountButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default VerificationAccount;
