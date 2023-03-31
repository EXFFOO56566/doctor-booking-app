import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Linking,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
  AsyncStorage
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import TopRatedCard from "../Home/TopRatedCard";
import CustomHeader from "../Header/CustomHeader";
import CONSTANT from '../Constants/local';
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class BookAppointmentCall extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  state = {
    data: [],
    Toataldata: [],
    page: 1,
    isLoading: true,
    fetchbookingCallSetting: [],
  };
  componentDidMount() {
    this.fetchDoctorDetail();
  }
  fetchDoctorDetail = async () => {
    const { params } = this.props.navigation.state;
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_doctor?profile_id=" +
        params.id +
        "&user_id=" +
        id
    );

    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ fetchbookingCallSetting: [], isLoading: false }); // empty data set
    } else {
      this.setState({ fetchbookingCallSetting: json[0].booking_setting.phone_numbers, isLoading: false });
    }
  };

  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.BookAppcontainer}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.BookAppCallheaderText} />
        {isLoading ? (
          <View style={styles.SearchResultScreenMainArea}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.SearchResultScreenMainStyle}
            />
          </View>
        ) : null}
        <View style={styles.BookAppMainArea}>
          <Image
            style={styles.BookAppImageStyle}
            source={require("../../Assets/Images/SplashImage.png")}
          />
          <Text
            style={styles.BookAppBookingText}
          >
            {CONSTANT.BookAppCallCallForBooking}
          </Text>
          <Text style={styles.BookAppCallText}>
            {CONSTANT.BookAppCallPleaseCallOn}
          </Text>
          <View style={styles.TopRatedCardManagment}>
            {
              this.state.fetchbookingCallSetting.length >= 1 &&
              <FlatList
                data={this.state.fetchbookingCallSetting}
                ListEmptyComponent={this._listEmptyComponent}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.openURL("tel:" + item.number);
                    }}
                    style={styles.BookAppFlatListArea}
                  >
                    <Text
                      style={styles.BookAppNumberText}
                    >
                      {item.number}
                    </Text>
                    <AntIcon
                      name="phone"
                      color={"#1abc9c"}
                      size={17}
                    />
                  </TouchableOpacity>
                )}
              />
            }
            
          </View>
        </View>
      </View>
    );
  }
}
export default BookAppointmentCall;
