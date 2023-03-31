import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
  AsyncStorage
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import { SwipeRow, List, Content } from "native-base";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import Dash from "react-native-dash";
import Moment from "moment";
import axios from "axios";
import CONSTANT from '../Constants/local';
import Spinner from 'react-native-loading-spinner-overlay';

class VerifyPasswordForBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      RetypePassword: "",
      isProgress: false,
      spinner: false,
    };
  }
  SubmitPasswords = async () => {
    this.setState({
      spinner: true
    })
    const { password, RetypePassword } = this.state;
    const Uid = await AsyncStorage.getItem("projectUid");
    if (password != null && RetypePassword != null) {
      if (password === RetypePassword) {
        axios
          .post(CONSTANT.BaseUrl + "appointments/booking_step2", {
            user_id: Uid,
            password: password,
            retype_password: RetypePassword
          })
          .then(async response => {
            if (response.status === 200) {
              this.setState({ isUpdatingLoader: false ,spinner: false });
              this.props.navigation.navigate("SubmitCode");
              
            } else if (response.status === 203) {
              this.setState({ isUpdatingLoader: false ,spinner: false });
             Alert.alert(CONSTANT.Error , response.data.message)
            }
          })
          .catch(error => {
            Alert.alert(error);
            console.log(error);
          });
      } else {
        this.setState({
          spinner: false
        })
        Alert.alert(CONSTANT.Error, CONSTANT.VerifyPasswordAlertNotMatched);
      }
    } else {
      this.setState({
        spinner: false
      })
      Alert.alert(CONSTANT.Error, CONSTANT.VerifyPasswordAlertNotBeEmpty);
    }
  };
  render() {
    const isDateBlocked = date => date.isBefore(Moment(), "day");
    Moment.locale("en");
    var dt = "2016-05-02T00:00:00";
    const { spinner } =this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.VerifyPasswordheaderText} />
        {spinner ? 
         <Spinner
          visible={this.state.spinner}
          textContent={CONSTANT.VerifyPasswordPleaseWait}
          color={'#fff'}
          textStyle={styles.SpinnerTextStyle}
        />
      : null} 
        <View
          style={styles.VerifyPasswordMainArea}
        >
          <Text style={styles.VerifyPasswordHeadingText}>
            {CONSTANT.VerifyPasswordPleaseVerify}
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            placeholder={CONSTANT.VerifyPasswordPassword}
            onChangeText={password => this.setState({ password })}
            style={styles.TextInputLayoutStyle}
          />

          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            placeholder={CONSTANT.VerifyPasswordRetypePassword}
            onChangeText={RetypePassword => this.setState({ RetypePassword })}
            style={styles.TextInputLayoutStyle}
          />
          <TouchableOpacity
            onPress={this.SubmitPasswords}
            style={styles.MainButtonArea}
          >
            <Text
              style={styles.MainButtonText}
            >
              {CONSTANT.Submit}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default withNavigation(VerifyPasswordForBooking);
