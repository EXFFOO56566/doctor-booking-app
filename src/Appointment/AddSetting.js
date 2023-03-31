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
  Dimensions,
  AsyncStorage
} from "react-native";
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from "../styles/DoctreatAppStyles";
import { withNavigation, DrawerActions } from "react-navigation";
import { ScrollableTabView } from "react-native-scrollable-tab-view";
import CustomHeader from "../Header/CustomHeader";
import AntIcon from "react-native-vector-icons/AntDesign";
import MultiSelect from "react-native-multiple-select";
import { RadioGroup } from "react-native-btr";
import CONSTANT from '../Constants/local';
import axios from "axios";
import Moment from "moment";
import RBSheet from "react-native-raw-bottom-sheet";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import HTML from "react-native-render-html";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class AddSetting extends Component {
  //To store data within component
  constructor(props) {
    super(props);

    this.state = {
      projectHospitalKnown: "",
      projectIntervalKnown: "",
      projectDurationKnown: "",
      projectSlotsKnown: "",
      projectDaysKnown: "",
      //projectSelectedServiceKnown: "",
      projectprojectEndTimeKnown: "",
      projectprojectStartTimeKnown: "",
      selectedHours: 0,
      selectedMinutes: 0,
      fee: "",
      customSpaces: "",
      service: [],
      isLoading: true,
      radioButtonsforStartAs: [
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
          label: CONSTANT.AddSettingOther,
          value: "other",
          checked: false,
          color: "#323232",
          disabled: false,
          width: "33.33%",
          size: 6
        }
      ],
      UniqueArray: [],
      projectServices: [],
      doctorSlot: [],
      projectSpecialityServices: [],
      projectSelectedServiceKnown: [],
      desc: '',
      sp: [],
      availableLocationData: [],
      availableLocationHospital: '',
    };
  }

  //calls when component load
  componentDidMount() {
    this.ProjectHospitalSpinner();
  }

  // To get hospital list
  ProjectHospitalSpinner = async () => {
    // old api
    // "taxonomies/get_posts_by_post_type?post_type=hospitals&profile_id="
    const { params } = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem("projectUid");
    return fetch(
      CONSTANT.BaseUrl +
      "team/find_location?user_id=" + Uid + '&term=hospit',
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let projectHospital = responseJson;
        this.setState(
          {
            projectHospital
          },
          this.ProjectIntervalSpinner
        );
      })
      .catch(error => {
        console.error(error);
      });
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
            projectEndTime,
            isLoading: false
          },
          this.ProjectServicesSpinner
        );
      })
      .catch(error => {
        console.error(error);
        this.setState({
          isLoading: false
        });
      });
  };

  ProjectServicesSpinner = async () => {
    const id = await AsyncStorage.getItem("projectProfileId");
    const {
      projectHospitalKnown,
      projectServices,
      projectSpecialityServices
    } = this.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=services&profile_id=" + id
    );
    const json = await response.json();
    console.log("Data", JSON.stringify(json));
    console.log(json);
    if (Array.isArray(json) && json && json.type && json.type === "error") {
      this.setState({ projectServices: [] }, this.ProjectDaysSpinner); // empty data set
    } else {
      this.setState({ projectServices: json }, this.ProjectDaysSpinner);
    }
  };

  // To get all days list
  ProjectDaysSpinner = async () => {
    const { params } = this.props.navigation.state;
    return fetch(CONSTANT.BaseUrl + "taxonomies/get_list?list=week_days", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        let projectDays = responseJson;
        this.setState({
          projectDays
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  // createRequiredArray = index => {
  //   this.state.service[index] = this.state.projectSelectedServiceKnown;
  //   var array = this.state.service;

  //   var filtered = array.filter(function(el) {
  //     return el != null;
  //   });
  // };
  selectedServiceData = (item, ID) => {
    //this.state.projectSelectedServiceKnown.push({ id : item.service_id})
    if (typeof this.state.sp[ID] == 'undefined') {
      this.state.sp[ID] = new Array();
      this.state.sp[ID][item.service_id] = item.service_id;
    } else {
      this.state.sp[ID][item.service_id] = item.service_id;
    }
    this.state.projectSelectedServiceKnown.push(this.state.sp);
    console.log('new Arrey sp', this.state.projectSelectedServiceKnown)
    this.state.UniqueArray.push({
      price: item.price,
      title: item.title,
    });
    console.log('new Arrey', this.state.UniqueArray)
    var items = this.state.UniqueArray;
    var a = items.reduce((accumulator, current) => {
      if (checkIfAlreadyExist(current)) {
        return accumulator;
      } else {
        return [...accumulator, current];
      }
      function checkIfAlreadyExist(currentVal) {
        return accumulator.some(item => {
          return item.title === currentVal.title;
        });
      }
    }, []);
    this.setState({
      ServiceRefresh: true,
      UniqueArray: a,
    });
  };
  HanldeSelectedServiceDelete = (item, index) => {
    this.state.UniqueArray.splice(index, 1);
    this.setState({
      ServiceRefresh: true,
    });
  };
  PostLocationData = async () => {
    this.setState({ isLoading: true });
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
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
      service,
      sp
    } = this.state;
    //var array = this.state.service;

    console.log(
      this.state.sp
    );
    axios
      .post(CONSTANT.BaseUrl + "appointments/appointment_settings", {
        hospital_id: this.state.projectHospitalKnown.toString(),
        start_time: this.state.projectprojectStartTimeKnown.toString(),
        end_time: this.state.projectprojectEndTimeKnown.toString(),
        intervals: this.state.projectIntervalKnown.toString(),
        durations: this.state.projectDurationKnown.toString(),
        service: sp,
        spaces: selectedItemforStartAs,
        week_days: this.state.projectDaysKnown,
        custom_spaces: customSpaces,
        doctor_id: Uid,
        consultant_fee: fee
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isUpdatingLoader: false });
          Alert.alert(CONSTANT.UpdatedSuccessfully, response.data.message);
          console.log(response);
          this.setState({
            isLoading: false
          });
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Error, response.data.message);
          console.log(response);
          this.setState({
            isLoading: false
          });
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };
  AddLocation = () => {
    const {
      projectHospitalKnown,
      projectIntervalKnown,
      projectDurationKnown,
      projectSlotsKnown,
      projectDaysKnown
    } = this.state;
  };

  render() {
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    const { selectedHours, selectedMinutes, isLoading } = this.state;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.AddSettingScrollViewStyle}
        >
          <View style={styles.MainHeadingRow}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.AddSettingNewLocation}
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("InviteHospitals")}
              style={styles.MainHeadingInviteHospital}
            >
              <Text style={styles.MainHeadingInviteHospitalText}>
                {CONSTANT.AddSettingInviteHospital}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.MultiSelectArea}>
            <MultiSelect
              styleListContainer={{ maxHeight: 150 }}
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({
                  projectHospitalKnown: value
                })
              }
              uniqueKey="id"
              items={this.state.projectHospital}
              selectedItems={this.state.projectHospitalKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText={CONSTANT.AddSettingPickHospital}
              selectText={CONSTANT.AddSettingPickHospital}
              //styleTextDropdown={{textAlign:"left"}}
              //styleTextDropdownSelected={{textAlign:"left"}}
              styleMainWrapper={styles.MultiSelectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.MultiSelectstyleDropdownMenuSubsection
              }
              displayKey="label"
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
                  projectIntervalKnown: value
                })
              }
              uniqueKey="key"
              items={this.state.projectInterval}
              selectedItems={this.state.projectIntervalKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText={CONSTANT.AddSettingPickInterval}
              selectText={CONSTANT.AddSettingPickInterval}
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
              searchInputPlaceholderText={CONSTANT.AddSettingPickDuration}
              selectText={CONSTANT.AddSettingPickDuration}
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
              selectedItems={this.state.projectprojectStartTimeKnown}
              borderBottomWidth={0}
              single={true}
              searchInputPlaceholderText={CONSTANT.AddSettingPickStartTime}
              selectText={CONSTANT.AddSettingPickStartTime}
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
              searchInputPlaceholderText={CONSTANT.AddSettingEndTime}
              selectText={CONSTANT.AddSettingEndTime}
              styleMainWrapper={styles.MultiSelectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.MultiSelectstyleDropdownMenuSubsection
              }
              displayKey="val"
              submitButtonText={CONSTANT.Submit}
            />
          </View>
          {this.state.projectServices && (
            <View>
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.AddSettingAvailableServices}
              </Text>
              <FlatList
                style={styles.AddSettingFlatlist}
                data={this.state.projectServices}
                extraData={this.state}
                renderItem={({ item, index }) => (
                  <Collapse>
                    <CollapseHeader style={styles.CollapseHeaderStyle}>
                      <TouchableOpacity activeOpacity={0.9}>
                        <View style={styles.AddSettingmainLayoutServices}>
                          <Image
                            resizeMode="cover"
                            style={styles.AddSettingImageStyle}
                            source={{ uri: item.logo }}
                          />
                          <View style={styles.AddSettingBorder} />
                          <HTML
                            numberOfLines={1}
                            html={item.title}
                            containerStyle={styles.AddSettingmainServiceName}
                            imagesMaxWidth={Dimensions.get("window").width}
                          />
                        </View>
                      </TouchableOpacity>

                      <AntIcon
                        name="down"
                        color={"#484848"}
                        size={17}
                        style={styles.AddSettingIconStyle}
                      />
                    </CollapseHeader>
                    <CollapseBody>
                      <View>
                        <FlatList
                          data={this.state.projectServices[index].services}
                          extraData={this.state.ServiceRefresh}
                          keyExtractor={(a, b) => b.toString()}
                          renderItem={({ item }) => (
                            <TouchableOpacity
                              onPress={() =>
                                this.selectedServiceData(
                                  item,
                                  this.state.projectServices[index].id,
                                )
                              }
                              style={styles.BookAppointmentCollapseBodyArea}>
                              <Text
                                style={
                                  styles.BookAppointmentCollapseBodyTitleText
                                }>
                                {item.title}
                              </Text>
                              <Text
                                style={
                                  styles.BookAppointmentCollapseBodyPriceText
                                }>
                                $ {item.price}
                              </Text>
                            </TouchableOpacity>
                          )}
                        />
                      </View>
                    </CollapseBody>
                  </Collapse>
                )}
              />
              <View>
                {this.state.UniqueArray.length >= 1 && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.BookAppointmentSelectedServices}
                  </Text>
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <FlatList
                    data={this.state.UniqueArray}
                    keyExtractor={(a, b) => b.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={styles.BookAppointmentSelectedServicesArea}>
                        <View
                          style={
                            styles.BookAppointmentSelectedServicesWithIconArea
                          }>
                          <Text
                            style={styles.BookAppointmentSelectedServicesText}>
                            {item.title}
                          </Text>
                          <Text
                            style={styles.BookAppointmentSelectedServicesText}>
                            $ {item.price}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            this.HanldeSelectedServiceDelete(item, index)
                          }
                          style={
                            styles.BookAppointmentSelectedServicesIconArea
                          }>
                          <AntIcon name="delete" color={'#fff'} size={20} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                  />
                )}
              </View>
            </View>
          )}
          <Text style={styles.MainHeadingTextStyle}>
            {CONSTANT.AddSettingAssignAppointmentSpaces}
          </Text>
          <RadioGroup
            color={CONSTANT.primaryColor}
            labelStyle={styles.RadioLabelStyle}
            radioButtons={this.state.radioButtonsforStartAs}
            onPress={radioButtons => this.setState({ radioButtons })}
            style={styles.RadioButtonStyle}
          />
          {selectedItemforStartAs == "other" && (
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.AddSettingOtherValue}
              style={styles.TextInputLayoutStyle}
              onChangeText={customSpaces => this.setState({ customSpaces })}
            />
          )}
          <Text style={styles.MainHeadingTextStyle}>
            {CONSTANT.AddSettingDaysIOfferMyServices}
          </Text>
          <View style={styles.MultiSelectArea}>
            <MultiSelect
              styleListContainer={{ maxHeight: 150 }}
              ref={component => {
                this.multiSelect = component;
              }}
              onSelectedItemsChange={value =>
                this.setState({
                  projectDaysKnown: value
                })
              }
              uniqueKey="key"
              items={this.state.projectDays}
              selectedItems={this.state.projectDaysKnown}
              borderBottomWidth={0}
              searchInputPlaceholderText={CONSTANT.AddSettingPickDays}
              selectText={CONSTANT.AddSettingPickDays}
              styleMainWrapper={styles.MultiSelectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.MultiSelectstyleDropdownMenuSubsection
              }
              displayKey="val"
              submitButtonText={CONSTANT.Submit}
            />
          </View>

          <TextInput
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            placeholder={CONSTANT.AddSettingConsultancyFee}
            style={styles.TextInputLayoutStyle}
            onChangeText={fee => this.setState({ fee })}
          />
          <TouchableOpacity
            onPress={this.PostLocationData}
            style={styles.MainButtonArea}
          >
            <Text style={styles.MainButtonText}>{CONSTANT.SaveUpdate}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AddSetting);
