import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView,AsyncStorage, Text, TouchableOpacity, TextInput, Image, FlatList,ActivityIndicator, PanResponder, Alert, Dimensions } from "react-native";
import { withNavigation, DrawerActions } from 'react-navigation';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';

import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';
import AccountSecuritySetting from './AccountSecuritySetting';
import ManageEmailNotification from './ManageEmailNotification';
import axios from "axios";
import styles from '../styles/DoctreatAppStyles';
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class SecuritySettings extends Component {
    state={
      switchfeaturedValue: false,
      sendSwitchFeaturedValue: "",
      storedType:''
    }
    componentDidMount = async () => {
      this.getUser();
    };

    getUser = async () => {
      try {
        const storedType = await AsyncStorage.getItem('user_type');
        if (storedType !== null) {
          this.setState({storedType});
         
        } else {
          //  Alert.alert('something wrong')
        }
      } catch (error) {
        // alert(error)
      }
    };
    
  render() {

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.SecuritySettingHeaderText} />
        <ScrollableTabView 
          tabBarTextStyle={styles.tabBarTextStyle} 
          tabBarUnderlineStyl={styles.tabBarUnderlineStyl} 
          tabBarActiveTextColor={CONSTANT.primaryColor}
          style={styles.tabBarStyle} 
          showsHorizontalScrollIndicator={false}
        >
          <ChangePassword  tabLabel={CONSTANT.SecuritySettingTabPassword} />
          <DeleteAccount tabLabel={CONSTANT.SecuritySettingTabAccount} />
          {this.state.storedType != "regular_user" &&
          <AccountSecuritySetting tabLabel={CONSTANT.SecuritySettingTabSecurity} />}
          <ManageEmailNotification tabLabel={CONSTANT.SecuritySettingTabEmail} />
        </ScrollableTabView>
      </View>
    );
  }
}
export default withNavigation(SecuritySettings);
