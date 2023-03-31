import React, { Component } from "react";
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
  Dimensions
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import { withNavigation, DrawerActions } from "react-navigation";
import ScrollableTabView from "react-native-scrollable-tab-view";
import CustomHeader from "../Header/CustomHeader";
import CONSTANT from '../Constants/local';
import AddSetting from "./AddSetting";
import AvailableLocation from "./AvailableLocation";
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class AppointmentSettings extends Component {
  state = {};

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.AppointmentSettingsHospitalheaderText} />

        <ScrollableTabView
          tabBarTextStyle={styles.AppointmentSettingsTabBarTextStyle}
          tabBarUnderlineStyl={{ color: "#3fabf3" }}
          tabBarActiveTextColor={CONSTANT.primaryColor}
          style={styles.AppointmentSettingsScrollableTabBar}
          showsHorizontalScrollIndicator={false}
        >
          <AddSetting tabLabel={CONSTANT.AppointmentSettingsSett} />
          <AvailableLocation tabLabel={CONSTANT.AppointmentSettingsLocations} location={"hospital"} />
        </ScrollableTabView>
      </View>
    );
  }
}
export default withNavigation(AppointmentSettings);
