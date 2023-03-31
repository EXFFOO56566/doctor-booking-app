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
import styles from "../styles/DoctreatAppStyles";
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import Dash from "react-native-dash";
import Dates from "react-native-dates";
import Moment from "moment";
import Spinner from "react-native-loading-spinner-overlay";
import CONSTANT from "../Constants/local";

class AppoinmentList extends Component {
  state = {
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    admin_setting: "",
    spinner: false,
    showAlert: false,
    AppointmentData: [],
    isDateTimePickerVisible: false,
    current_date: "",
    selected_date: "",
    TypeError: false,
    isBlinking: false,
    date: new Date()
    // isLoading: true
  };
  blinkingInterval = false;

  componentWillUnmount() {
    clearInterval(this.blinkingInterval);
    this.blinkingInterval = false;
  }
  componentDidMount() {
    this.getUser();
    this.fetchAddBookingPermission();
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
      this.fetchAppointmentsWithdate
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

  fetchAddBookingPermission = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_theme_settings");
    const json = await response.json();
    this.setState({ admin_setting: json.doctor_booking_option });
  };

  fetchAppointments = async () => {
    this.setState({
      spinner: true
    });
    const { id, date } = this.state;
    // Moment.locale("en");
    // var selected_date = Moment(date).format("YYYY-MM-DD");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "appointments/get_listing?user_id=" +
        id +
        "&appointment_date="
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
  fetchAppointmentsWithdate = async () => {
    this.setState({
      spinner: true
    });
    const { id, date } = this.state;
    Moment.locale("en");
    var selected_date = Moment(date).format("YYYY-MM-DD");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "appointments/get_listing?user_id=" +
        id +
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
    console.log("A date has been picked: ", date);
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
    const { isLoading, spinner } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.AppointmentListheaderText} />
        {spinner ? (
          <Spinner visible={this.state.spinner} color={"#fff"} />
        ) : null}
        <ScrollView>
          <View style={styles.AppointmentListCalenderArea}>
            <View
              style={{
                margin: 10,
                borderRadius: 5,
                overflow: "hidden",
                borderColor: "#dddddd"
              }}
            >
              <Dates
                textColor={"#323232"}
                mode={"date"}
                isDateBlocked={isDateBlocked}
                date={this.state.date}
                onDatesChange={date => this.onDateChange(date)}
              />
            </View>
    
            <View
              style={{
                alignItems: "center"
              }}
            >
              <View style={{backgroundColor:"#ffffff50",borderRadius:6,height:40,width:3,marginTop:-10}}>
              
              </View>
            
              <View style={{backgroundColor:"#ffffff50",borderRadius:6,marginBottom:20}}>
              <View
                style={{
                  margin: 5,
                  padding: 15,
                  backgroundColor: "#fff",
                  justifyContent: "center",
                  alignItems: "center",borderRadius:6
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    color: CONSTANT.primaryColor,
                    fontSize: 18
                  }}
                >
                   {this.state.AppointmentData.length >= 1 ? this.state.AppointmentData.length: 0}
                </Text>
                <Text style={{ fontSize: 14, color: CONSTANT.primaryColor }}>
                 {this.state.AppointmentData.length > 1  ? "Appointments" : "Appointment"}
                </Text>
              </View>
              </View>
              
            </View>
          </View>
          <View style={styles.AppointmentListHeadingandButtonArea}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.AppointmentListRecentAppointments}
            </Text>
            {this.state.admin_setting == "disbale" ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("DoctorAddBooking")
                }
                style={styles.CustomButtonRightArea}
              >
                <Text style={styles.MainButtonText}>
                  {CONSTANT.AppointmentListAddBooking}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
          <View style={styles.AppointmentListMainArea}>
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
                    <View style={styles.AppointmentListFlatListArea}>
                      <View style={styles.AppointmentListDateArea}>
                        <Text style={styles.AppointmentListDateText}>
                          {item.day}
                        </Text>
                        <Text style={styles.AppointmentListMonthText}>
                          {item.month}
                        </Text>
                      </View>
                      <View style={styles.AppointmentListDetailArea}>
                        <View style={styles.AppointmentListcircle}></View>
                        <View>
                          <Text style={styles.AppointmentListDateText}>
                            {item.name}
                          </Text>
                          <View style={styles.AppointmentDetailMainStatusArea}>
                            <View style={styles.AppointmentDetailStatusArea}>
                              <Text style={styles.AppointmentListMonthText}>
                                {CONSTANT.AppointmentListStatus}
                              </Text>
                              <Text>:</Text>
                            </View>
                            <Text style={styles.AppointmentListMonthText}>
                              {item.status}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            ) : (
              <View style={styles.NoDataArea}>
                <Image
                  resizeMode={"contain"}
                  style={styles.NoDataImage}
                  source={require("../../Assets/Images/arrow.png")}
                />
                <Text style={styles.NoDataText1}>{CONSTANT.Oops}</Text>
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
export default withNavigation(AppoinmentList);
