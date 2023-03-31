import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  PanResponder,
  Alert,
  Dimensions,
  AsyncStorage
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {withNavigation, DrawerActions} from 'react-navigation';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';
import Location from '../Location/Location';
import axios from 'axios';
import RNRestart from 'react-native-restart';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class ChangePassword extends Component {
  state = {
    switchfeaturedValue: false,
    sendSwitchFeaturedValue: '',
    oldPassword: '',
    newPassword: '',
    isLoading: false,
  };
  change_Password = async () => {
    this.setState({
      isLoading: true,
    })
    const {oldPassword, newPassword} = this.state;
    const {params} = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem('projectUid');
    if (oldPassword == '' && newPassword == '') {
      //alert("Please enter Email address");
      this.setState({
        isLoading: false,
      })
      Alert.alert(CONSTANT.Error,CONSTANT.AddCompleteData)
      this.setState({email: 'Please Add Complete Data'});
    } else {
      // this.openProgressbar();
      axios
        .post(CONSTANT.BaseUrl + 'profile/update_password', {
          user_id: Uid,
          password: oldPassword,
          retype: newPassword,
        })
        .then(async response => {
          if (response.status === 200) {
            this.logout();
            Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
            this.setState({
              isLoading : false,
            })
            
          } else if (response.status === 203) {
            Alert.alert(CONSTANT.Oops , JSON.stringify(response.data.message));
            this.setState({
              isLoading : false,
            })
          }
        })
        .catch(error => {
 
          console.log(error);
        });
    }
  };
  logout = async () => {
    const {id, storedValue, storedType, profileImg, type} = this.state;
    const Uid = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'user/do_logout', {
        user_id: Uid,
      })
      .then(async response => {
        console.log('data', id, JSON.stringify(response));
        if (response.status == 200) {
          AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => console.log('success data deleted'));
          this.clearAsyncStorage();
          RNRestart.Restart();
        } else if (response.status == 203) {
          alert(CONSTANT.AppIncorrectDetail);
        }
      })
      .catch(error => {
      });
  };
  clearAsyncStorage = async () => {
    AsyncStorage.clear();
  };
  render() {
    const {oldPassword, newPassword ,isLoading} = this.state;
    return (
      <View style={styles.changePasswordcontainer}>
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView style={styles.changePasswordScrollArea}>
          <View style={styles.changePasswordScrollStyle}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.SecuritySettingChangePassword}
            </Text>
            <TextInput
              onChangeText={oldPassword => this.setState({oldPassword})}
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              autoCorrect={false}
              secureTextEntry={true}
              placeholder={CONSTANT.SecuritySettingLastPassword}
              style={styles.TextInputLayoutStyle}></TextInput>
            <TextInput
              onChangeText={newPassword => this.setState({newPassword})}
              underlineColorAndroid="transparent"
              autoCorrect={false}
              secureTextEntry={true}
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.SecuritySettingNewPassword}
              style={styles.TextInputLayoutStyle}></TextInput>
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={this.change_Password}
          style={styles.SecuritySettingsTouchableStyle}>
          <Text style={styles.SecuritySettingsTouchableText}>
            {CONSTANT.SecuritySettingUpdate}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(ChangePassword);
