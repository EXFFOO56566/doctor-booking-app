import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  FlatList,
  TextInput,
  Text,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  Switch,
  AsyncStorage
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import DatePicker from "react-native-date-picker";
import StarRating from "react-native-star-rating";
import AntIcon from "react-native-vector-icons/AntDesign";
import CustomHeader from "../Header/CustomHeader";
import { withNavigation, DrawerActions } from "react-navigation";
import axios from "axios";
import MultiSelect from "react-native-multiple-select";
import { RadioGroup } from "react-native-btr";
import Dates from "react-native-dates";
import Moment from "moment";
import HTML from "react-native-render-html";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import CONSTANT from "../Constants/local";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class DoctorAddBooking extends Component {
  constructor(props) {
    super(props);
    this.arraySpeciality = [];
    this.arrayServices = [];
    (this.arraySelectedServices = []),
      (this.state = {
        arrayHolder_SelectedServices: [],
        projectHospitalKnown: "",
        RelationDataKnown: "",
        selectedSlotbackgroundColor: "#fff",
        spinner: false,
        sday: "",
        sdate: "",
        stime: "",
        Selected_time: "",
        totalCharges: "",
        email_setting: "",
        first_name: "",
        last_name: "",
        isRegistered_id: "",
        phone: "",
        UniqueArray: [],
        appointment: [],
        arrayHolder_Speciality: [],
        arrayHolder_Services: [],
        projectServices: [],
        projectServicesHosPrice: "",
        doctorSlot: [],
        projectSpecialityServices: [],
        isChecked: [],
        selectedServices: [],
        projectSelectedServiceKnown: [],
        service: [],
        date: new Date(),
        ifRegistered: false,
        ServiceRefresh: false,
        othername: "",
        Email: "",
        desc: "",
        focus: "startDate",
        isLoading: true,
        new_array: [],
        sp: [],
        index_v: "",
        switchfeaturedValue: true,
        sendSwitchFeaturedValue: "",
        radioButtonsforStartAs: [
          {
            label: CONSTANT.DoctorAddBookingPatientOnly,
            value: "myself",
            checked: true,
            color: "#323232",
            disabled: false,
            width: "33.33%",
            size: 6
          },
          {
            label: CONSTANT.DoctorAddBookingSomeoneElse,
            value: "someone",
            checked: false,
            color: "#323232",
            disabled: false,
            width: "33.33%",
            size: 6
          }
        ],
        RelationData: [
          {
            name: CONSTANT.DoctorAddBookingBrother,
            value: "brother"
          },
          {
            name: CONSTANT.DoctorAddBookingWife,
            value: "wife"
          },
          {
            name: CONSTANT.DoctorAddBookingMother,
            value: "mother"
          },
          {
            name: CONSTANT.DoctorAddBookingSister,
            value: "sister"
          }
        ]
      });
  }
  componentDidMount() {
    this.setState({ arrayHolder_Speciality: [...this.arraySpeciality] });
    this.setState({ arrayHolder_Services: [...this.arrayServices] });
    this.ProjectHospitalSpinner();
  }
  selectedServiceData = (item, ID) => {
    //this.state.projectSelectedServiceKnown.push({ id : item.service_id})
    if (typeof this.state.sp[ID] == "undefined") {
      this.state.sp[ID] = new Array();
      this.state.sp[ID][item.service_id] = item.service_id;
    } else {
      this.state.sp[ID][item.service_id] = item.service_id;
    }
    this.state.projectSelectedServiceKnown.push(this.state.sp);
    this.state.UniqueArray.push({
      price: item.price,
      service_title: item.service_title
    });
    var items = this.state.UniqueArray;
    var a = items.reduce((accumulator, current) => {
      if (checkIfAlreadyExist(current)) {
        return accumulator;
      } else {
        return [...accumulator, current];
      }
      function checkIfAlreadyExist(currentVal) {
        return accumulator.some(item => {
          return item.service_title === currentVal.service_title;
        });
      }
    }, []);
    this.setState({
      ServiceRefresh: true,
      UniqueArray: a
    });
    var total = 0;
    for (let i = 0; i < a.length; i++) {
      total += parseFloat(a[i].price);
      this.getTotalCharges(total);
    }
  };
  getTotalCharges = total => {
    var FianlTotal =
      parseFloat(total) +
      parseFloat(this.state.projectServicesHosPrice.consultant_fee);
    this.setState({
      totalCharges: FianlTotal
    });
  };
  onSelectionsChange = selectedServices => {
    this.setState({ selectedServices });
  };
  onDateChange(date) {
    this.setState({ stime: "" });
    this.setState(
      {
        date: date.date
      },
      this.DoctorSlots
    );
  }
  joinDataForSpecialities = item => {
    this.arraySpeciality.push({
      speciality: item.speciality_id,
      services: [...this.arrayServices]
    });
    this.setState({ arrayHolder_Speciality: [...this.arraySpeciality] });
  };
  joinDataForServices = item => {
    this.arrayServices.push({
      id: item.service_id,
      title: item.service_title,
      price: item.service_price
    });
    this.setState({ arrayHolder_Services: [...this.arrayServices] });
  };
  ProjectHospitalSpinner = async () => {
    this.arraySelectedServices = [];
    const { params } = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem("projectProfileId");
    return fetch(
      CONSTANT.BaseUrl +
        "appointments/get_bookings_hospitals?profile_id=" +
        Uid,
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
        this.setState({
          projectHospital,
          isLoading: false
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectServicesSpinner = async () => {
    const {
      projectHospitalKnown,
      projectServices,
      projectSpecialityServices
    } = this.state;
    const Uid = await AsyncStorage.getItem("projectProfileId");
    if (projectHospitalKnown != "") {
      const response = await fetch(
        CONSTANT.BaseUrl +
          "appointments/get_bookings?team_id=" +
          projectHospitalKnown +
          "&profile_id=" +
          Uid
      );
      const json = await response.json();
      if (Array.isArray(json) && json && json.type && json.type === "error") {
        this.setState({ projectServices: [], isLoading: false }); // empty data set
      } else {
        this.setState(
          {
            projectServices: json.specilities,
            isLoading: false,
            projectServicesHosPrice: json,
            isLoading: false
          },
          this.setState({
            projectSpecialityServices: json.services,
            isLoading: false
          })
        );
      }
      this.DoctorSlots();
    }
  };
  DoctorSlots = async () => {
    this.setState({
      spinner: true
    });
    this.setState({
      doctorSlot: []
    });
    const {
      projectHospitalKnown,
      projectServices,
      projectSpecialityServices,
      date
    } = this.state;
    const { params } = this.props.navigation.state;
    if (projectHospitalKnown.length != 0) {
      Moment.locale("en");
      var str = Moment(date).format("ddd");
      var day = str.toLowerCase();
      var selected_date = Moment(date).format("YYYY-MM-DD");
      const response = await fetch(
        CONSTANT.BaseUrl +
          "appointments/get_slots?team_id=" +
          projectHospitalKnown.toString() +
          "&date=" +
          selected_date
      );
      const json = await response.json();
      if (
        Array.isArray(json) &&
        json[0] &&
        json.type &&
        json.type === "error"
      ) {
        this.setState({ doctorSlot: [], isLoading: false, spinner: false }); // empty data set
      } else {
        this.setState({ doctorSlot: json, isLoading: false, spinner: false });
      }
    } else {
      this.setState({
        spinner: false
      });
      Alert.alert(CONSTANT.Oops, CONSTANT.BookAppointmentSelectLocation);
    }
  };
  selectedSlotData = (item, index) => {
    const { date } = this.state;
    Moment.locale("en");
    var str = Moment(date).format("ddd");
    var day = str.toLowerCase();
    var selected_date = Moment(date).format("YYYY-MM-DD");
    const { sdate, sday, stime } = this.state;
    this.setState({
      stime: item.start_time,
      Selected_time: item.key,
      selectedSlotbackgroundColor: "#000"
    });
    this.setState({ index_v: index });
  };
  createRequiredArray = index => {
    this.state.service[index] = this.state.projectSelectedServiceKnown;
    var array = this.state.service;
    var filtered = array.filter(function(el) {
      return el != null;
    });
    console.log("My Filtered Array", array);
  };
  BookAppointment = async () => {
    this.setState({
      spinner: true,
    });
    const {
      arrayHolder_Speciality,
      day,
      date,
      time,
      appointment,
      projectSelectedServiceKnown,
      service,
      projectHospitalKnown,
      RelationDataKnown,
      desc,
      sdate,
      sday,
      othername,
      stime,
      Selected_time,
      first_name,
      last_name,
      Email,
      sendSwitchFeaturedValue,
      isRegistered_id,
      phone
    } = this.state;
    const { params } = this.props.navigation.state;
    var array = this.state.service;
    this.setState({
      new_array: array
    });
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    const Docid = await AsyncStorage.getItem("projectUid");
    var selected_date = Moment(date).format("YYYY-MM-DD");
    axios.post(CONSTANT.BaseUrl + "appointments/add_appointment", {
        myself: selectedItemforStartAs,
        other_name: othername,
        relation: RelationDataKnown.toString(),
        booking_hospitals: projectHospitalKnown.toString(),
        user_id: isRegistered_id,
        id: Docid,
        service: this.state.sp,
        booking_content: desc,
        appointment_date: selected_date,
        booking_slot: Selected_time,
        first_name: first_name,
        last_name: last_name,
        create_user: sendSwitchFeaturedValue,
        email: Email,
        phone:phone,
        total_price:this.state.totalCharges,

      })
      .then(async (response) => {
        if (response.status == 200) {
          // if (response.data.type == "demo") {
          //   this.setState({
          //     isUpdatingLoader: false,
          //     spinner: false,
          //   });
          // } else {
            this.setState({ isUpdatingLoader: false, spinner: false });
            Alert.alert(CONSTANT.Success, response.data.message);
            this.props.navigation.navigate("Home")
          // }
        } else if (response.status == 203) {
          this.setState({ isUpdatingLoader: false, spinner: false });
          Alert.alert(CONSTANT.Sorry, response.data.message);
        }
      })
      .catch((error) => {
        Alert.alert(error);
      });
  };
  HanldeSelectedServiceDelete = (item, index) => {
    var FianlTotal =
      parseFloat(this.state.totalCharges) - parseFloat(item.price);
    this.setState({
      totalCharges: FianlTotal,
      ServiceRefresh: true
    });
    this.state.UniqueArray.splice(index, 1);
  };
  togglefeaturedSwitch = value => {
    this.setState({ switchfeaturedValue: value });
    if (value == true) {
      this.state.sendSwitchFeaturedValue = "on";
    } else {
      this.state.sendSwitchFeaturedValue = "off";
    }
  };
  checkemail = () => {
    const { Email } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    setTimeout(() => {
      if (reg.test(Email) != false) {
        this.fetchEmailSetting();
      }
    }, 500);
  };
  fetchEmailSetting = async () => {
    const { Email } = this.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "appointments/check_user?email=" + Email
    );
    const json = await response.json();
    this.setState({ email_setting: json }, this.makeEmailchecks(json));
  };
  makeEmailchecks = json => {
    if (json.success_type == "registered") {
      this.setState({
        ifRegistered: true,
        first_name: json.first_name,
        last_name: json.last_name,
        isRegistered_id: json.user_id
      });
    } else if (json.success_type == "new") {
      this.state.sendSwitchFeaturedValue = "on";
    } else {
      Alert.alert(CONSTANT.Sorry, JSON.stringify(json.message));
    }
  };
  render() {
    const isDateBlocked = date => date.isBefore(Moment(), "day");
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    const { spinner, isLoading } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.DoctorAddBookingheaderText} />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {spinner ? (
          <Spinner
            visible={this.state.spinner}
            textContent={CONSTANT.DoctorAddBookingPleaseWait}
            color={"#fff"}
            textStyle={styles.SpinnerTextStyle}
          />
        ) : null}
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.BookAppointmentMainArea}
        >
          <View
          >
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.DoctorAddBookingAddPatientDetails}
            </Text>
            <Text style={styles.DoctorAddBookingNoteText}>
              {CONSTANT.DoctorAddBookingNote}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              autoCorrect={false}
              placeholder={CONSTANT.DoctorAddBookingEmail}
              onChangeText={Email =>
                this.setState({ Email }, this.checkemail())
              }
              style={styles.TextInputLayoutStyle}
            />
            {this.state.ifRegistered == true ? (
              <TextInput
                defaultValue={`${entities.decode(this.state.first_name)}`}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.DoctorAddBookingFirstName}
                editable={false}
                onChangeText={first_name => this.setState({ first_name })}
                style={styles.TextInputLayoutStyle}
              />
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.DoctorAddBookingFirstName}
                autoCorrect={false}
                onChangeText={first_name => this.setState({ first_name })}
                style={styles.TextInputLayoutStyle}
              />
            )}
            {this.state.ifRegistered == true ? (
              <TextInput
                defaultValue={`${entities.decode(this.state.last_name)}`}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.DoctorAddBookingLastName}
                editable={false}
                onChangeText={last_name => this.setState({ last_name })}
                style={styles.TextInputLayoutStyle}
              />
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                autoCorrect={false}
                placeholder={CONSTANT.DoctorAddBookingLastName}
                onChangeText={last_name => this.setState({ last_name })}
                style={styles.TextInputLayoutStyle}
              />
            )}
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder="Add Phone Number"
              keyboardType="numeric"
              onChangeText={phone => this.setState({ phone })}
              style={styles.TextInputLayoutStyle}
            />
            {this.state.ifRegistered == false && (
              <View style={styles.DoctorAddBookingsecurityScrollDisableArea}>
                <Text style={styles.DoctorAddBookingsecurityScrollDisableText}>
                  {CONSTANT.DoctorAddBookingCreateNewUser}
                </Text>
                <Switch
                  style={styles.DoctorAddBookingsecurityScrollSwitch}
                  onValueChange={this.togglefeaturedSwitch}
                  value={this.state.switchfeaturedValue}
                />
              </View>
            )}

            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.DoctorAddBookingWhoisvisitingtoDoctor}
            </Text>
            <RadioGroup
              color={CONSTANT.primaryColor}
              labelStyle={styles.RadioLabelStyle}
              radioButtons={this.state.radioButtonsforStartAs}
              onPress={radioButtons => this.setState({ radioButtons })}
              style={styles.RadioButtonStyle}
            />
            {selectedItemforStartAs == "someone" && (
              <View>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.DoctorAddBookingSearch}
                  onChangeText={othername => this.setState({ othername })}
                  style={styles.TextInputLayoutStyle}
                />
                <View style={styles.MultiSelectArea}>
                  <MultiSelect
                    styleListContainer={{ maxHeight: 150 }}
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({
                        RelationDataKnown: value
                      })
                    }
                    uniqueKey="value"
                    items={this.state.RelationData}
                    selectedItems={this.state.RelationDataKnown}
                    borderBottomWidth={0}
                    single={true}
                    searchInputPlaceholderText={
                      CONSTANT.DoctorAddBookingPickRelation
                    }
                    selectText="Pick Relation"
                    styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                    styleDropdownMenuSubsection={
                      styles.MultiSelectstyleDropdownMenuSubsection
                    }
                    displayKey="name"
                    submitButtonText={CONSTANT.Submit}
                  />
                </View>
              </View>
            )}

            <View style={styles.MultiSelectArea}>
              <MultiSelect
                styleListContainer={{ maxHeight: 150 }}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState(
                    {
                      projectHospitalKnown: value,
                      spinner: true
                    },
                    this.ProjectServicesSpinner
                  )
                }
                uniqueKey="team_id"
                items={this.state.projectHospital}
                selectedItems={this.state.projectHospitalKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={
                  CONSTANT.DoctorAddBookingPickHospital
                }
                selectText={CONSTANT.DoctorAddBookingPickHospital}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="hospital_name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
            {this.state.projectServices && (
              <View style={{ paddingBottom: 10 }}>
                <FlatList
                  style={{ paddingLeft: 5, paddingBottom: 5, marginBottom: 5 }}
                  data={this.state.projectServices}
                  extraData={this.state.ServiceRefresh}
                  renderItem={({ item, index }) => (
                    <Collapse>
                      <CollapseHeader>
                        <View style={styles.CollapseHeaderStyle}>
                          <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => this.joinDataForSpecialities(item)}
                          >
                            <View
                              style={styles.BookAppointmentmainLayoutServices}
                            >
                              <Image
                                resizeMode="cover"
                                style={styles.BookAppointmentImageStyle}
                                source={{ uri: item.logo }}
                              />
                              <View style={styles.BookAppointmentLeftBorder} />
                            
                              <HTML
                                containerStyle={
                                  styles.BookAppointmentmainServiceName
                                }
                                lineHeight={20}
                                html={item.title}
                                imagesMaxWidth={Dimensions.get("window").width}
                              />
                            </View>
                          </TouchableOpacity>

                          <AntIcon
                            name="down"
                            color={"#484848"}
                            size={17}
                            style={styles.BookAppointmentCollapseBodyIconStyle}
                          />
                        </View>
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
                                    this.state.projectServices[index].ID
                                  )
                                }
                                style={styles.BookAppointmentCollapseBodyArea}
                              >
                                <Text
                                  style={
                                    styles.BookAppointmentCollapseBodyTitleText
                                  }
                                >
                                  {item.service_title}
                                </Text>
                                <Text
                                  style={
                                    styles.BookAppointmentCollapseBodyPriceText
                                  }
                                >
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

                {this.state.UniqueArray.length >= 1 && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DoctorAddBookingSelectedServices}
                  </Text>
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <FlatList
                    data={this.state.UniqueArray}
                    keyExtractor={(a, b) => b.toString()}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity
                        style={styles.BookAppointmentSelectedServicesArea}
                      >
                        <View
                          style={
                            styles.BookAppointmentSelectedServicesWithIconArea
                          }
                        >
                          <Text
                            style={styles.BookAppointmentSelectedServicesText}
                          >
                            {item.service_title}
                          </Text>
                          <Text
                            style={styles.BookAppointmentSelectedServicesText}
                          >
                            $ {item.price}
                          </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() =>
                            this.HanldeSelectedServiceDelete(item, index)
                          }
                          style={styles.BookAppointmentSelectedServicesIconArea}
                        >
                          <AntIcon name="delete" color={"#fff"} size={20} />
                        </TouchableOpacity>
                      </TouchableOpacity>
                    )}
                  />
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <TouchableOpacity
                    style={styles.BookAppointmentSelectedServicesFeeArea}
                  >
                    <Text style={styles.BookAppointmentSelectedServicesText}>
                      {CONSTANT.DoctorAddBookingConsultationFee}
                    </Text>
                    <Text style={styles.BookAppointmentSelectedServicesText}>
                      $
                      {entities.decode(
                        this.state.projectServicesHosPrice.consultant_fee
                      )}
                    </Text>
                  </TouchableOpacity>
                )}
                {this.state.UniqueArray.length >= 1 && (
                  <TouchableOpacity
                    style={styles.BookAppointmentSelectedServicesFeeArea}
                  >
                    <Text style={styles.BookAppointmentSelectedServicesText}>
                      {CONSTANT.DoctorAddBookingTotalCharges}
                    </Text>
                    <Text style={styles.BookAppointmentSelectedServicesText}>
                      ${this.state.totalCharges}
                    </Text>
                  </TouchableOpacity>
                )}
                <TextInput
                  multiline={true}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.Description}
                  onChangeText={desc => this.setState({ desc })}
                  style={styles.TextInputLayoutStyleForDetail}
                />
                <Text style={styles.MainHeadingTextStyle}>
                  {CONSTANT.DoctorAddBookingSelectDateTime}
                </Text>
                <View style={styles.BookAppointmentDateArea}>
                  <Dates
                    textColor={"#323232"}
                    mode={"date"}
                    isDateBlocked={isDateBlocked}
                    date={this.state.date}
                    onDatesChange={date => this.onDateChange(date)}
                  />
                </View>
              </View>
            )}
            {this.state.doctorSlot.length >= 1 && (
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.DoctorAddBookingAvailableSlots}
              </Text>
            )}
            {this.state.doctorSlot != [] ? (
              <View>
                <FlatList
                  style={styles.BookAppointmentSlotFlatListArea}
                  data={this.state.doctorSlot}
                  extraData={this.state}
                  renderItem={({ item, index }) => (
                    <View style={styles.BookAppointmentSlotMainArea}>
                      {item.spaces <= 0 ? (
                        <View style={styles.BookAppointmentSlotArea}>
                          <Text style={styles.BookAppointmentSlotText}>
                            {item.start_time}
                          </Text>
                          <Text style={styles.BookAppointmentSlotOccupiedText}>
                            {CONSTANT.DoctorAddBookingOccupied}
                          </Text>
                        </View>
                      ) : (
                        <TouchableOpacity
                          onPress={() => this.selectedSlotData(item, index)}
                        >
                          {this.state.index_v === index ? (
                            <View style={styles.BookAppointmentSlotAreaClicked}>
                              <Text
                                style={styles.BookAppointmentSlotTextClicked}
                              >
                                {item.start_time}
                              </Text>
                              <Text
                                style={styles.BookAppointmentSpaceTextClicked}
                              >
                                {CONSTANT.BookAppointmentSpace} {item.spaces}
                              </Text>
                            </View>
                          ) : (
                            <View style={styles.BookAppointmentSlotArea}>
                              <Text style={styles.BookAppointmentSlotText}>
                                {item.start_time}
                              </Text>
                              <Text style={styles.BookAppointmentSpaceText}>
                                {CONSTANT.BookAppointmentSpace} {item.spaces}
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                  numColumns={3}
                />
              </View>
            ) : (
              <Text style={{ fontFamily: CONSTANT.PoppinsMedium }}>
                {CONSTANT.DoctorAddBookingNoSlotAvailable}
              </Text>
            )}
            
            <TouchableOpacity
              onPress={
                () => this.BookAppointment()
              }
              style={styles.MainButtonArea}
            >
              <Text style={styles.MainButtonText}>
                {CONSTANT.DoctorAddBookingBookAppointment}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(DoctorAddBooking);
