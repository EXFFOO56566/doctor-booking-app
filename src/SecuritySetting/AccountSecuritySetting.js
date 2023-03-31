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
  AsyncStorage,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {withNavigation, DrawerActions} from 'react-navigation';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';
import Location from '../Location/Location';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class AccountSecuritySetting extends Component {
  state = {
    switchfeaturedValue: false,
    sendSwitchFeaturedValue: '',
    ProjectLocationKnown: [],
    isLoading: true,
    LanguageData: [],
    UserLanguageData: [],
  };
  componentDidMount() {
    this.fetchSetting();
    this.fetchLanguagesData();
    this.ProjectLocationSpinner();
  }
  fetchSetting = async () => {
    return fetch(CONSTANT.BaseUrl + 'profile/get_setting?user_id=12', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let settingData = responseJson;
        if (settingData.block_val == 'on') {
          this.setState({
            switchfeaturedValue: true,
          });
        } else if (settingData.block_val == 'off') {
          this.setState({
            switchfeaturedValue: false,
          });
        }
        this.setState({
          settingData,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  BlockAaccount = async () => {
    axios
      .post(CONSTANT.BaseUrl + 'profile/update_block_setting', {
        user_id: 12,
        block_setting: this.state.sendSwitchFeaturedValue,
      })
      .then(async response => {
        if (response.status === 200) {
          alert(response.data.message);
        } else if (response.status === 203) {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };
  togglefeaturedSwitch = value => {
    this.setState({switchfeaturedValue: value});
    if (value == true) {
      this.state.sendSwitchFeaturedValue = 'on';
    } else {
      this.state.sendSwitchFeaturedValue = 'off';
    }
  };
  fetchLanguagesData = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl + 'profile/get_user_languages?user_id=' + Uid,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({LanguageData: [], isLoading: false}); // empty data set
    } else {
      this.setState({LanguageData: json.languages, isLoading: false});
      this.setState({UserLanguageData: json.user_languages, isLoading: false});
    }
  };
  ProjectLocationSpinner = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    return fetch(
      CONSTANT.BaseUrl + 'profile/get_user_languages?user_id=' + Uid,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        let projectLocation = responseJson.languages;
        this.setState({
          projectLocation,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  UpdateLanguages = async () => {
    this.setState({
      isLoading: true,
    });
    const Uid = await AsyncStorage.getItem('projectUid');
    axios
      .post(CONSTANT.BaseUrl + 'profile/update_user_languages', {
        user_id: Uid,
        settings: this.state.ProjectLocationKnown,
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.setState({isLoading: false});
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({isLoading: false});
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.Accountsecuritycontainer}>
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView style={styles.AccountsecurityScrollArea}>
          <View style={styles.AccountsecurityScrollStyle}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.SecuritySettingAccount}
            </Text>
            <View style={styles.AccountsecurityScrollDisableArea}>
              <Text style={styles.AccountsecurityScrollDisableText}>
                {CONSTANT.SecuritySettingDisableAccount}
              </Text>
              <Switch
                style={styles.AccountsecurityScrollSwitch}
                onValueChange={this.togglefeaturedSwitch}
                value={this.state.switchfeaturedValue}
              />
            </View>
          </View>

         
        </ScrollView>
        <TouchableOpacity
          onPress={this.BlockAaccount}
          style={styles.SecuritySettingsTouchableStyle}>
          <Text style={styles.SecuritySettingsTouchableText}>
            {CONSTANT.SecuritySettingUpdate}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(AccountSecuritySetting);
