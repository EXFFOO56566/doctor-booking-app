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
  ActivityIndicator,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
  AsyncStorage
} from "react-native";
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from '../styles/DoctreatAppStyles';
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import Dash from "react-native-dash";
import Dates from "react-native-dates";
import Spinner from 'react-native-loading-spinner-overlay';
import Moment from "moment";
import CONSTANT from '../Constants/local';

class AppointmentListPatient extends Component {
  state = {
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    spinner:false,
    id: "",
    showAlert: false,
    AppointmentData: [],
    isDateTimePickerVisible: false,
    current_date: "",
    selected_date: "",
    TypeError: false,
    isBlinking: false,
    date: new Date(),
    isLoading: true
  };
  blinkingInterval = false;

  componentWillUnmount() {
    clearInterval(this.blinkingInterval);
    this.blinkingInterval = false;
  }

  componentDidMount() {
    this.getUser();
    this.ShowCurrentDate();
    if (!this.blinkingInterval) {
      this.blinkingInterval = setInterval(() => {
        this.setState({
          isBlinking: !this.state.isBlinking
        });
      }, 800);
    }
  }
  onDateChange(date) {
    this.setState(
      {
        date: date.date
      },

      this.fetchAppointments
    );
  }
  ShowCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    this.setState({
      current_date: date + "-" + month + "-" + year
    });
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (storedValue !== null) {
        this.setState({ storedValue });
      } else {
        // alert('something wrong')
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
      this.fetchAppointments();
    } catch (error) {
      // alert(error)
    }
  };
  fetchAppointments = async () => {
    this.setState({
      spinner: true,
    });
    const { id, date } = this.state;
    Moment.locale("en");
    var selected_date = Moment(date).format("YYYY-MM-DD");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "appointments/get_listing?user_id=" +
        id +
        "&user_type=regular_users" +
        "&appointment_date=" +
        selected_date
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ AppointmentData: [], spinner: false }); // empty data set
    } else {
      this.setState({ AppointmentData: json, spinner: false });
      if (AppointmentData[0].hasOwnProperty("type")) {
        this.setState({
          TypeError: true
        });
      }
    }
  };
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
  handleDatePicked = date => {
    Moment.locale("en");
    var dt = "2016-05-02";
    this.setState({
      current_date: Moment(date).format("DD-MM-YYYY")
    });
    this.hideDateTimePicker();
  };

  render() {
    const isDateBlocked = date => date.isBefore(Moment(), "day");
    Moment.locale("en");
    var dt = "2016-05-02T00:00:00";
    const { isLoading , spinner } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.AppListPatientheaderText} />
        {spinner ? 
         <Spinner
          visible={this.state.spinner}
          color={'#fff'}
          />
        : null} 
        <ScrollView>
          <View style={styles.AppointmentListCalenderArea}>
            <Dates
              textColor={"#323232"}
              mode={"date"}
              isDateBlocked={isDateBlocked}
              date={this.state.date}
              onDatesChange={date => this.onDateChange(date)}
            />
          </View>
          <View
            style={styles.AppointmentListPatientHeadingArea}
          >
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.AppListPatientRecentAppointments}
            </Text>
            {this.state.AppointmentData.length >= 1 ? (
              <FlatList
                data={this.state.AppointmentData}
                ListEmptyComponent={this._listEmptyComponent}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() =>
                      this.props.navigation.navigate("AppointmentDetailPage", {
                        id: item.ID
                      })
                    }
                  >
                    <View
                      style={styles.AppointmentListFlatListArea}
                    >
                      <View style={styles.AppointmentListDateArea}>
                        <Text
                          style={styles.AppointmentListDateText}
                        >
                          {item.day}
                        </Text>
                        <Text style={styles.AppointmentListMonthText}>
                          {item.month}
                        </Text>
                      </View>
                      <View
                        style={styles.AppointmentListDetailArea}
                      >
                      <View style={styles.AppointmentListcircle}></View>
                     
                      <View style={{ alignSelf: "center" }}>
                        <Text style={styles.AppointmentListDateText}>
                          {item.name}
                        </Text>
                        <Text style={styles.AppointmentListMonthText}>
                          {CONSTANT.AppListPatientStatus} {item.status}
                        </Text>
                      </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View
                style={styles.NoDataArea}
              >
                <Image
                  resizeMode={"contain"}
                  style={styles.NoDataImage}
                  source={require("../../Assets/Images/arrow.png")}
                />
                <Text
                  style={styles.NoDataText1}
                >
                  {CONSTANT.Oops}
                </Text>
                <Text style={styles.NoDataText2}>
                  {CONSTANT.NoDataAvailable}
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AppointmentListPatient);