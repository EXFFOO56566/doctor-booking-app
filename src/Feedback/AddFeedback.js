import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
  Slider,
  AsyncStorage
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import { RadioGroup } from "react-native-btr";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import MultiSelect from "react-native-multiple-select";
import axios from "axios";
import StarRating from "react-native-star-rating";
import Dash from "react-native-dash";
import CONSTANT from "../Constants/local";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class AddFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioButtonsforStartAs: [
        {
          label: "Yes",
          value: "yes",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 7
        },
        {
          label: "No",
          value: "no",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 7
        }
      ],
      ratingArray: [],
      ratings: {},
      New_ratingArray: [],
      ServiceRating: [],
      new_ServiceRating: [],
      waitingList: [],
      refresh_ServiceRating: false,
      isLoading: true,
      disable: false,
      experienceCheck: "",
      experience: "",
      sliderValue: 1,
      recommended : "yes",
    };
  }
  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    try {
      const id = await AsyncStorage.getItem("projectUid");
      const idProfile = await AsyncStorage.getItem("projectProfileId");
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      if (idProfile !== null) {
        this.setState({ idProfile });
      } else {
        //  alert('something wrong')
      }
      this.fetchFeedbackData();
    } catch (error) {
      // alert(error)
    }
  };
  changeWorkingTime = (item) => {
    this.setState({ sliderValue: item.key });
    this.setState({ refresh_ServiceRating: !this.state.refresh_ServiceRating });
  };
  onStarRatingPress(rating, index, key_value,item) {
    this.setState({
      ratings: {
        ...this.state.ratings,
        [index]: { key_value, rating }
      }
    });
    this.state.ratingArray[index]= {[key_value]: rating}
    
  }
  fetchFeedbackData = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        "user/patient_feedback?doctor_id=" +
        params.id +
        "&patient_id=" +
        this.state.id
    );
    const json = await response.json();
    this.setState({
      ServiceRating: json.rating_data,
      isLoading: false,
      experienceCheck: json.experience_string,
      waitingList:json.waiting_time,
    });
    for (const [key, value] of Object.entries(this.state.ServiceRating)) {
      // console.log(`${key}: ${value}`);
      this.state.new_ServiceRating.push({
        value: `${value}`,
        key: `${key}`
      });
      this.state.ratingArray.push({
        [`${key}`] : 1
      })
    }
    console.log("arrady",this.state.ratingArray)
    this.setState({ refresh_ServiceRating: !this.state.refresh_ServiceRating });
  
  };

  submitFeedback = () => {
    const { params } = this.props.navigation.state;
    if(this.state.experience != "")
     {
        this.setState({
      isLoading: true,
    });
   // const id = await AsyncStorage.getItem("projectProfileId");
    axios
      .post(CONSTANT.BaseUrl + "user/patient_feedback", {
        doctor_id: params.id,
        patient_id: this.state.id,
        feedback_description:this.state.experience,
        feedback_recommend:this.state.recommended,
         feedbackpublicly:this.state.disable == true ? "yes": "no",
         waiting_time:this.state.sliderValue,
         feedback:this.state.ratingArray
      })
      .then(async (response) => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
         // this.setState({ TopRatedData: [], isLoading: false });
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        Alert.alert(error);
        console.log(error);
      });
     }
     else
     {
      Alert.alert(CONSTANT.Oops, "Must fill the form");
     }
  }

  render() {
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    return (
      <View style={styles.addFeedbackContainer}>
        <CustomHeader headerText={CONSTANT.AddFeedback} />
        {this.state.isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView>
          <View>
            <Text style={styles.addFeedbackText}>
              {CONSTANT.AddFeedbackIRecommendThisDoctor}
            </Text>
            <View style={styles.AddFeedbackRadioArea}>
              <RadioGroup
                color={CONSTANT.primaryColor}
                labelStyle={styles.RadioLabelStyle}
                radioButtons={this.state.radioButtonsforStartAs}
                onPress={radioButtons =>{ this.setState({ radioButtons })
                let selectedItem = radioButtons.find(
                  e => e.checked == true
                );
                selectedItem = selectedItem
                  ? selectedItem.value
                  : radioButtons[0].value;
              this.setState({recommended:selectedItem})
              }}
                style={styles.RadioButtonStyle}
              />
            </View>
            <View
              style={{
                width: "100%",
                paddingHorizontal: 10,
                marginVertical: 10
              }}
            >
              <Text style={styles.addFeedbackText}>
              {CONSTANT.AddFeedbackIHowlongwait}
            </Text>
              <Slider
                style={{ width: "100%", height: 40 }}
                minimumValue={1}
                disabled={true}
                value={this.state.sliderValue}
                maximumValue={4}
                thumbTintColor={CONSTANT.primaryColor}
                minimumTrackTintColor={CONSTANT.primaryColor}
                maximumTrackTintColor={CONSTANT.primaryColor}
              />
              <View
                style={{ width: "100%", justifyContent: "space-between",marginBottom:5}}
              ></View>
              <FlatList
              style={{width:"100%"}}
                data={this.state.waitingList}
                numColumns={4}
                extraData={this.state.refresh_ServiceRating}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                  onPress={()=> this.changeWorkingTime(item)}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width:"25%",
                      justifyContent: "center"
                    }}
                  >
                    <Text
                      style={[
                        styles.SectionHeadingTextStyle,
                        { color: CONSTANT.TextColorLight }
                      ]}
                    >
                      { entities.decode(item.time)}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
            <FlatList
              data={this.state.new_ServiceRating}
              extraData={this.state.refresh_ServiceRating}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item, index }) => (
                <View style={{ marginHorizontal: 10 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      width: "100%",
                      backgroundColor: "#f7f7f7",
                      paddingHorizontal: 10,
                      paddingVertical: 20,
                      marginVertical: 5,
                      borderRadius: 5,
                      justifyContent: "space-between"
                    }}
                  >
                    <Text
                      style={[
                        styles.SectionHeadingTextStyle,
                        { color: CONSTANT.TextColorLight }
                      ]}
                    >
                      {item.value}
                    </Text>

                    <StarRating
                      disabled={false}
                      maxStars={5}
                      starSize={22}
                      fullStarColor={"#fecb02"}
                      emptyStarColor={"#fecb02"}
                      rating={
                        this.state.ratings[index] != null
                          ? this.state.ratings[index].rating
                          : 1
                      }
                      selectedStar={rating =>
                        this.onStarRatingPress(rating, index, item.key,item)
                      }
                    />
                  </View>
                </View>
              )}
            />
            <TextInput
              multiline={true}
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={"Share your experience"}
              onChangeText={experience => this.setState({ experience })}
              style={styles.TextInputLayoutStyleForDetail}
            />
            <TouchableOpacity
              onPress={() => this.setState({ disable: !this.state.disable })}
              style={{
                marginVertical: 10,
                padding: 10,
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              {this.state.disable == true ? (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#22C55E",
                    borderRadius: 4,
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <FontAwesome
                    name="check"
                    type="check"
                    color={"#fff"}
                    size={14}
                  />
                </View>
              ) : (
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderColor: "#DDDDDD",
                    borderWidth: 1,
                    borderRadius: 4
                  }}
                ></View>
              )}
              <Text
                style={{
                  fontSize: 14,
                  marginLeft: 10,
                  color: "#0A0F26"
                }}
              >
                {this.state.experienceCheck}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => this.submitFeedback()}
              style={{
                paddingHorizontal: 10,
                backgroundColor: CONSTANT.primaryColor,
                marginHorizontal: 10,
                width: "30%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "700",
                  marginVertical: 10
                }}
              >
                {CONSTANT.Submit}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AddFeedback);
