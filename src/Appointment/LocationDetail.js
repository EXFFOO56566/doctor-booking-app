import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Text,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { RadioGroup } from "react-native-btr";
import CustomHeader from "../Header/CustomHeader";
import CONSTANT from "../Constants/local";
import axios from "axios";
import MultiSelect from "react-native-multiple-select";
import { withNavigation, DrawerActions } from "react-navigation";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";

class LocationDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchLocation: [],
      fetchLocationMondaySlots: [],
      fetchLocationTuesdaySlots: [],
      fetchLocationWednesdaySlots: [],
      fetchLocationThursdaySlots: [],
      fetchLocationFridaySlots: [],
      fetchLocationSaturdaySlots: [],
      fetchLocationSundaySlots: [],
      projectHospitalKnown: "",
      projectIntervalKnown: "",
      projectDurationKnown: "",
      projectSlotsKnown: "",
      projectDaysKnown: "",
      projectSelectedServiceKnown: "",
      projectprojectEndTimeKnown: "",
      projectprojectStartTimeKnown: "",
      selectedHours: 0,
      selectedMinutes: 0,
      fee: "",
      customSpaces: "",
      Monday: "mon",
      service: [],
      isLoading: true,
      radioButtonsforStartAsMon: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],

      radioButtonsforStartAsTue: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],

      radioButtonsforStartAsWed: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],

      radioButtonsforStartAsThur: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],

      radioButtonsforStartAsFri: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],

      radioButtonsforStartAsSat: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],

      radioButtonsforStartAsSun: [
        {
          label: "1",
          value: "1",
          checked: true,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: "2",
          value: "2",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        },
        {
          label: CONSTANT.LocationDetailOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ]
    };
  }
  componentDidMount() {
    this.fetchLocationDetail();
    this.ProjectIntervalSpinner();
  }

  fetchLocationDetail = async () => {
    const { params } = this.props.navigation.state;
    const id = await AsyncStorage.getItem("projectUid");

    const response = await fetch(
      CONSTANT.BaseUrl +
        "team/get_team_details?team_id=" +
        JSON.stringify(params.id) +
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
      this.setState({ fetchLocation: [], isLoading: false }); // empty data set
    } else {
      this.setState({ fetchLocation: json[0] });
      this.setState({ fetchLocationMondaySlots: json[0].slots.mon });
      this.setState({ fetchLocationTuesdaySlots: json[0].slots.tue });
      this.setState({ fetchLocationWednesdaySlots: json[0].slots.wed });
      this.setState({ fetchLocationThursdaySlots: json[0].slots.thu });
      this.setState({ fetchLocationFridaySlots: json[0].slots.fri });
      this.setState({ fetchLocationSaturdaySlots: json[0].slots.sat });
      this.setState({
        fetchLocationSundaySlots: json[0].slots.sun,
        isLoading: false
      });
    }
  };

  // To get all Intervals
  ProjectIntervalSpinner = async () => {
    const { params } = this.props.navigation.state;
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=intervals", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectInterval = responseJson;
        this.setState({ projectInterval }, this.ProjectDurationSpinner);
      })
      .catch(error => {
        console.error(error);
      });
  };

  // To get duration list
  ProjectDurationSpinner = async () => {
    const { params } = this.props.navigation.state;
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=durations", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectDuration = responseJson;
        this.setState(
          {
            projectDuration
          },
          this.ProjectStartTimeSpinner
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  // To get all slots list
  ProjectStartTimeSpinner = async () => {
    const { params } = this.props.navigation.state;
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=time", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectStartTime = responseJson;
        this.setState(
          {
            projectStartTime
          },
          this.ProjectEndTimeSpinner
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  // To get all slots list
  ProjectEndTimeSpinner = async () => {
    const { params } = this.props.navigation.state;
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=time", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectEndTime = responseJson;
        this.setState(
          {
            projectEndTime
          },
          this.ProjectServicesSpinner
        );
      })
      .catch(error => {
        console.error(error);
      });
  };

  AddSlots = async val => {
    let selectedItemforStartAsMon = this.state.radioButtonsforStartAsMon.find(
      e => e.checked == true
    );
    selectedItemforStartAsMon = selectedItemforStartAsMon
      ? selectedItemforStartAsMon.value
      : this.state.radioButtonsforStartAsMon[0].value;
    const Uid = await AsyncStorage.getItem("projectUid");

    const {
      title,
      desc,
      base64_string,
      articleCategoryKnown,
      name,
      type,
      path,
      customSpaces,
      fee,
      service
    } = this.state;
    const { params } = this.props.navigation.state;
    axios
      .post(CONSTANT.BaseUrl + "team/update_slot", {
        start_time: this.state.projectprojectStartTimeKnown.toString(),
        end_time: this.state.projectprojectEndTimeKnown.toString(),
        intervals: this.state.projectIntervalKnown.toString(),
        durations: this.state.projectDurationKnown.toString(),
        spaces: selectedItemforStartAsMon,
        week_day: val,
        custom_spaces: customSpaces,
        user_id: Uid,
        post_id: params.id
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isUpdatingLoader: false });
          Alert.alert(CONSTANT.UpdatedSuccessfully, response.data.message);
          this.fetchLocationDetail();
          console.log(response);
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Error, response.data.message);
          console.log(response);
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };

  DeleteAllSlots = async val => {
    const Uid = await AsyncStorage.getItem("projectUid");

    const {
      title,
      desc,
      base64_string,
      articleCategoryKnown,
      name,
      type,
      path,
      customSpaces,
      fee,
      service
    } = this.state;
    const { params } = this.props.navigation.state;
    axios
      .post(CONSTANT.BaseUrl + "team/remove_slot", {
        day: val,
        user_id: Uid,
        id: params.id
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isUpdatingLoader: false });
          Alert.alert(CONSTANT.UpdatedSuccessfully, response.data.message);
          this.fetchLocationDetail();
          console.log(response);
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Error, response.data.message);
          console.log(response);
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };

  render() {
    let selectedItemforStartAsMon = this.state.radioButtonsforStartAsMon.find(
      e => e.checked == true
    );
    selectedItemforStartAsMon = selectedItemforStartAsMon
      ? selectedItemforStartAsMon.value
      : this.state.radioButtonsforStartAsMon[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    let selectedItemforStartAsTue = this.state.radioButtonsforStartAsTue.find(
      e => e.checked == true
    );
    selectedItemforStartAsTue = selectedItemforStartAsTue
      ? selectedItemforStartAsTue.value
      : this.state.radioButtonsforStartAsTue[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    let selectedItemforStartAsWed = this.state.radioButtonsforStartAsWed.find(
      e => e.checked == true
    );
    selectedItemforStartAsWed = selectedItemforStartAsWed
      ? selectedItemforStartAsWed.value
      : this.state.radioButtonsforStartAsWed[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    let selectedItemforStartAsThur = this.state.radioButtonsforStartAsThur.find(
      e => e.checked == true
    );
    selectedItemforStartAsThur = selectedItemforStartAsThur
      ? selectedItemforStartAsThur.value
      : this.state.radioButtonsforStartAsThur[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    let selectedItemforStartAsFri = this.state.radioButtonsforStartAsFri.find(
      e => e.checked == true
    );
    selectedItemforStartAsFri = selectedItemforStartAsFri
      ? selectedItemforStartAsFri.value
      : this.state.radioButtonsforStartAsFri[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    let selectedItemforStartAsSat = this.state.radioButtonsforStartAsSat.find(
      e => e.checked == true
    );
    selectedItemforStartAsSat = selectedItemforStartAsSat
      ? selectedItemforStartAsSat.value
      : this.state.radioButtonsforStartAsSat[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    let selectedItemforStartAsSun = this.state.radioButtonsforStartAsSun.find(
      e => e.checked == true
    );
    selectedItemforStartAsSun = selectedItemforStartAsSun
      ? selectedItemforStartAsSun.value
      : this.state.radioButtonsforStartAsSun[0].value;
    // const {selectedHours, selectedMinutes} = this.state;

    const {
      fetchLocation,
      fetchLocationMondaySlots,
      fetchLocationTuesdaySlots,
      fetchLocationThursdaySlots,
      fetchLocationWednesdaySlots,
      fetchLocationFridaySlots,
      fetchLocationSaturdaySlots,
      fetchLocationSundaySlots,
      isLoading
    } = this.state;
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.LocationDetailheaderText} />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {this.state.fetchLocation && (
          <ScrollView>
            <View style={styles.LocationDetailMainArea}>
              <View>
                <Image
                  style={styles.LocationDetailImageStyle}
                  source={{ uri: fetchLocation.hospital_img }}
                />
              </View>
              <View style={styles.LocationDetailTextArea}>
                <Text style={styles.LocationDetailStatusText}>
                  {fetchLocation.hospital_status}
                </Text>
                <Text style={styles.LocationDetailNameText}>
                  {fetchLocation.hospital_name}
                </Text>
                <FlatList
                  data={this.state.fetchLocation.week_days}
                  ListEmptyComponent={this._listEmptyComponent}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({ item }) => (
                    <View>
                      <Text style={styles.LocationDetailDaysText}>{item}</Text>
                    </View>
                  )}
                  horizontal={true}
                />
              </View>
            </View>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.LocationDetailDaysIOfferMyServices}
            </Text>
            <View style={{ paddingBottom: 10 }}>
              {fetchLocationMondaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailMonday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationMondaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("mon")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationMondaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>

                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsMon}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsMon == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("mon")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}

              {fetchLocationTuesdaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailTuesday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationTuesdaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("tue")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}

                        <View style={styles.LocationDetailBorderStyle}></View>
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationTuesdaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>
                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsTue}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsTue == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("tue")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}

              {fetchLocationWednesdaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailWednesday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationWednesdaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("wed")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationWednesdaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                          //  onPress={() => this.selectedSlotData(item)}
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>
                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsWed}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsWed == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("wed")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}

              {fetchLocationThursdaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailThursday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationThursdaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("thu")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationThursdaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                         //   onPress={() => this.selectedSlotData(item)}
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>
                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsThur}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsThur == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("thu")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}

              {fetchLocationFridaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailFriday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationFridaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("fri")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationFridaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                           // onPress={() => this.selectedSlotData(item)}
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>
                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsFri}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsFri == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("fri")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}

              {fetchLocationSaturdaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailSaturday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationSaturdaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("sat")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationSaturdaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                            //onPress={() => this.selectedSlotData(item)}
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>
                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsSat}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsSat == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("sat")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}

              {fetchLocationSundaySlots && (
                <Collapse>
                  <CollapseHeader style={styles.CollapseHeaderStyle}>
                    <TouchableOpacity>
                      <View style={styles.LocationDetailmainLayoutServices}>
                        <Text
                          numberOfLines={1}
                          style={styles.LocationDetailmainServiceName}
                        >
                          {CONSTANT.LocationDetailSunday}
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <AntIcon
                      name="edit"
                      color={"#2FBC9C"}
                      size={17}
                      style={styles.LocationDetailIconStyle}
                    />
                  </CollapseHeader>
                  <CollapseBody style={styles.LocationDetailCollapseBodyStyle}>
                    <View>
                      <View style={styles.LocationDetailTimeSlotsArea}>
                        {fetchLocationSundaySlots.length != 0 && (
                          <TouchableOpacity
                            onPress={() => this.DeleteAllSlots("sun")}
                            style={styles.LocationDetailDeleteBTNArea}
                          >
                            <Text style={styles.LocationDetailBTNStyle}>
                              {CONSTANT.LocationDetailDeleteAll}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </View>

                      <FlatList
                        style={styles.LocationDetailFlatListArea}
                        data={this.state.fetchLocationSundaySlots}
                        extraData={this.state}
                        renderItem={({ item, index }) => (
                          <TouchableOpacity
                          //  onPress={() => this.selectedSlotData(item)}
                            style={styles.LocationDetailTimeSlotStyle}
                          >
                            <Text style={styles.LocationDetailTimeSlotText}>
                              {item.start_time} - {item.end_time}
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                fontFamily: CONSTANT.PoppinsMedium
                              }}
                            >
                              {CONSTANT.LocationDetailSpace} {item.spaces}
                            </Text>
                          </TouchableOpacity>
                        )}
                        numColumns={2}
                      />
                    </View>
                    <View style={styles.LocationDetailInfoArea}>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAddNewSlot}
                      </Text>
                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectIntervalKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectInterval}
                          selectedItems={this.state.projectIntervalKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickInterval
                          }
                          selectText={CONSTANT.LocationDetailPickInterval}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectDurationKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectDuration}
                          selectedItems={this.state.projectDurationKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickDuration
                          }
                          selectText={CONSTANT.LocationDetailPickDuration}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectStartTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectStartTime}
                          selectedItems={
                            this.state.projectprojectStartTimeKnown
                          }
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickStartTime
                          }
                          selectText={CONSTANT.LocationDetailPickStartTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>

                      <View style={styles.MultiSelectArea}>
                        <MultiSelect
                          styleListContainer={{ maxHeight: 150 }}
                          ref={component => {
                            this.multiSelect = component;
                          }}
                          onSelectedItemsChange={value =>
                            this.setState({
                              projectprojectEndTimeKnown: value
                            })
                          }
                          uniqueKey="key"
                          items={this.state.projectEndTime}
                          selectedItems={this.state.projectprojectEndTimeKnown}
                          borderBottomWidth={0}
                          single={true}
                          searchInputPlaceholderText={
                            CONSTANT.LocationDetailPickEndTime
                          }
                          selectText={CONSTANT.LocationDetailPickEndTime}
                          styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                          styleDropdownMenuSubsection={
                            styles.MultiSelectstyleDropdownMenuSubsection
                          }
                          displayKey="val"
                          submitButtonText={CONSTANT.Submit}
                        />
                      </View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.LocationDetailAssignAppointmentSpaces}
                      </Text>
                      <RadioGroup
                        color={CONSTANT.primaryColor}
                        labelStyle={styles.RadioLabelStyle}
                        radioButtons={this.state.radioButtonsforStartAsSun}
                        onPress={radioButtons =>
                          this.setState({ radioButtons })
                        }
                        style={styles.RadioButtonStyle}
                      />
                      {selectedItemforStartAsSun == "other" && (
                        <TextInput
                          underlineColorAndroid="transparent"
                          placeholderTextColor="#7F7F7F"
                          placeholder={CONSTANT.LocationDetailOtherValue}
                          style={styles.TextInputLayoutStyle}
                          onChangeText={customSpaces =>
                            this.setState({ customSpaces })
                          }
                        />
                      )}
                      <TouchableOpacity
                        onPress={() => this.AddSlots("sun")}
                        style={styles.LocationDetailAddMoreBTNArea}
                      >
                        <Text style={styles.LocationDetailBTNStyle}>
                          {CONSTANT.LocationDetailAddMore}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CollapseBody>
                </Collapse>
              )}
            </View>
          </ScrollView>
        )}
      </View>
    );
  }
}
export default withNavigation(LocationDetail);
