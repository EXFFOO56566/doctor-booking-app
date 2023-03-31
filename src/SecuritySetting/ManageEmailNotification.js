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
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from '../styles/DoctreatAppStyles';
import {withNavigation, DrawerActions} from 'react-navigation';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';
import Location from '../Location/Location';
import axios from 'axios';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class ManageEmailNotification extends Component {
  state = {
    switchfeaturedValue: false,
    sendSwitchFeaturedValue: '',
    isLoading: true,
  };
  componentDidMount() {
    this.fetchEmail();
  }
  fetchEmail = async () => {
    const Uid = await AsyncStorage.getItem('projectUid');
    return fetch(CONSTANT.BaseUrl + 'profile/get_user_email?user_id=' + Uid, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let EmailData = responseJson;
        this.setState({
          EmailData,
          isLoading: false,
        });
      })
      .catch(error => {
      });
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.emailcontainer}>
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView style={styles.emailScrollArea}>
          <View style={styles.emailScrollStyle}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.SecuritySettingEmailNotification}
            </Text>
            {this.state.EmailData && (
              <View style={styles.emailTextArea}>
                <Text
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  style={styles.emailTextStyle}>
                  {this.state.EmailData.email}
                </Text>
              </View>
              
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(ManageEmailNotification);
