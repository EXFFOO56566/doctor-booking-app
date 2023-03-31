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

class BookAppointment extends Component {
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
        ServiceRefresh: false,
        othername: "",
        desc: "",
        patientName: "",
        focus: "startDate",
        isLoading: true,
        new_array: [],
        sp: [],
        CheckSettingData: "",
        index_v: "",
        Email: "",
        Name: "",
        Phone: "",
        full_name: "",
        projectEmail: "",
        radioButtonsforStartAs: [
          {
            label: CONSTANT.BookAppointmentMySelf,
            value: "myself",
            checked: true,
            color: "#323232",
            disabled: false,
            width: "33.33%",
            size: 6
          },
          {
            label: CONSTANT.BookAppointmentSomeoneElse,
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
            name: CONSTANT.BookAppointmentBrother,
            value: "brother"
          },
          {
            name: CONSTANT.BookAppointmentWife,
            value: "wife"
          },
          {
            name: CONSTANT.BookAppointmentMother,
            value: "mother"
          },
          {
            name: CONSTANT.BookAppointmentSister,
            value: "sister"
          }
        ]
      });
  }
  componentDidMount() {
    this.setState({ arrayHolder_Speciality: [...this.arraySpeciality] });
    this.setState({ arrayHolder_Services: [...this.arrayServices] });
    this.CheckChecoutPage();
    this.ProjectHospitalSpinner();
    this.getUser();
    this.ProjectServicesSpinner();
  }
  getUser = async () => {
    try {
      const full_name = await AsyncStorage.getItem("full_name");
      const projectEmail = await AsyncStorage.getItem("projectEmail");
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (full_name !== null) {
        this.setState({ full_name });
      } else {
        // alert('something wrong')
      }
      if (projectEmail !== null) {
        this.setState({ Email: projectEmail });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
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
    return fetch(
      CONSTANT.BaseUrl +
        "appointments/get_bookings_hospitals?profile_id=" +
        params.id,
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
  CheckChecoutPage = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_theme_settings");
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ CheckSettingData: "", isLoading: false }); // empty data set
    } else {
      this.setState({ CheckSettingData: json, isLoading: false });
    }
  };
  ProjectServicesSpinner = async () => {
    const {
      projectHospitalKnown,
      projectServices,
      projectSpecialityServices
    } = this.state;
    const { params } = this.props.navigation.state;
    if (projectHospitalKnown != "") {
      const response = await fetch(
        CONSTANT.BaseUrl +
          "appointments/get_bookings?team_id=" +
          projectHospitalKnown +
          "&profile_id=" +
          params.id
      );
      const json = await response.json();
      if (Array.isArray(json) && json && json.type && json.type === "error") {
        this.setState({ projectServices: [], isLoading: false }); // empty data set
      } else {
        this.setState(
          {
            projectServices: json.specilities,
            isLoading: false,
            projectServicesHosPrice: json
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
      spinner: true
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
      patientName,
      Selected_time,
      Email,
      Phone
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
    const Uid = await AsyncStorage.getItem("projectUid");
    var selected_date = Moment(date).format("YYYY-MM-DD");
    axios
      .post(CONSTANT.BaseUrl + "appointments/booking_step1", {
        patient: selectedItemforStartAs,
        other_name: patientName,
        bk_phone: Phone,
        bk_email: Email,
        relation: RelationDataKnown.toString(),
        booking_hospitals: projectHospitalKnown.toString(),
        user_id: Uid,
        id: params.id,
        service: this.state.sp,
        booking_content: desc,
        appointment_date: selected_date,
        booking_slot: Selected_time
      })
      .then(async response => {
        if (response.status === 200) {
          if (response.data.type == "demo") {
            this.setState({
              isUpdatingLoader: false,
              spinner: false
            });
          } else {
            this.setState({ spinner: false });
            this.setState({ isUpdatingLoader: false });
            if (
              this.state.CheckSettingData.booking_verification == "no" &&
              this.state.CheckSettingData.enable_checkout_page == "no" &&
              this.state.CheckSettingData.payment_type == "offline"
            ) {
              Alert.alert(CONSTANT.Success, JSON.stringify(response));
            } else if (
              this.state.CheckSettingData.booking_verification == "no" &&
              this.state.CheckSettingData.enable_checkout_page == "yes" &&
              this.state.CheckSettingData.payment_type == "online"
            ) {
              Alert.alert(CONSTANT.Success, JSON.stringify(response));
              this.createCheckOutPage();
            } else if (
              this.state.CheckSettingData.booking_verification == "yes" &&
              this.state.CheckSettingData.enable_checkout_page == "yes" &&
              this.state.CheckSettingData.payment_type == "online"
            ) {
              this.props.navigation.navigate("VerifyPasswordForBooking");
            } else {
              this.props.navigation.navigate("VerifyPasswordForBooking");
            }
          }
        } else if (response.status === 203) {
          this.setState({ spinner: false });
          this.setState({ isUpdatingLoader: false });
          Alert.alert(CONSTANT.Sorry, JSON.stringify(response));
        }
      })
      .catch(error => {
        this.setState({
          isUpdatingLoader: false,
          spinner: false
        });
        Alert.alert(error);
      });
  };
  createCheckOutPage = async () => {
    this.setState({
      spinner: true
    });
    const {
      Uid,
      Notes,
      Customerid,
      S_address1,
      S_city,
      S_company,
      S_country,
      S_first_name,
      S_last_name,
      S_state,
      B_address1,
      B_city,
      B_conpany,
      B_country,
      B_email,
      B_first_name,
      B_last_name,
      B_phone,
      B_state
    } = this.state;

    var billing_info_map = {};
    billing_info_map["address_1"] = B_address1;
    billing_info_map["city"] = B_city;
    billing_info_map["company"] = B_conpany;
    billing_info_map["country"] = B_country;
    billing_info_map["email"] = B_email;
    billing_info_map["first_name"] = B_first_name;
    billing_info_map["last_name"] = B_last_name;
    billing_info_map["phone"] = B_phone;
    billing_info_map["state"] = B_state;
    var shipping_info_map = {};
    shipping_info_map["address_1"] = S_address1;
    shipping_info_map["city"] = S_city;
    shipping_info_map["company"] = S_company;
    shipping_info_map["country"] = S_country;
    shipping_info_map["first_name"] = S_first_name;
    shipping_info_map["last_name"] = S_last_name;
    shipping_info_map["state"] = S_state;
    var payment_data_map_array = {};
    payment_data_map_array["order_type"] = "booking";
    payment_data_map_array["customer_id"] = Customerid;
    payment_data_map_array["customer_note"] = Notes;
    payment_data_map_array["shipping_methods"] = "stripe";
    payment_data_map_array["sameAddress"] = "1";
    payment_data_map_array["billing_info"] = billing_info_map;
    payment_data_map_array["shipping_info"] = shipping_info_map;
    var payment_data = JSON.stringify(payment_data_map_array);

    axios
      .post(CONSTANT.BaseUrl + "user/create_checkout_page", {
        payment_data: payment_data
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isUpdatingLoader: false, spinner: false });
          this.props.navigation.navigate("PayAppointmentCheckout", {
            url: response.data.url
          });
        } else if (response.status === 203) {
          this.setState({ isUpdatingLoader: false, spinner: false });
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };

  HanldeSelectedServiceDelete = (item, index) => {
    var FianlTotal = parseFloat(this.state.totalCharges) - parseFloat(item.price);
    this.setState({
      totalCharges: FianlTotal,
      ServiceRefresh: true
    });
    this.state.UniqueArray.splice(index, 1);
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
        <CustomHeader headerText={CONSTANT.BookAppointmentBookAppointment} />
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
            textContent={CONSTANT.BookAppointmentPleaseWait}
            color={"#fff"}
            textStyle={styles.SpinnerTextStyle}
          />
        ) : null}
        <ScrollView
          style={styles.BookAppointmentMainArea}
          showsVerticalScrollIndicator={false}
        >
          <View style={{}}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.BookAppointmentWhoisvisitingtoDoctor}
            </Text>
            <RadioGroup
              color={CONSTANT.primaryColor}
              labelStyle={styles.RadioLabelStyle}
              radioButtons={this.state.radioButtonsforStartAs}
              onPress={radioButtons => this.setState({ radioButtons })}
              style={styles.RadioButtonStyle}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              value={this.state.Email}
              autoCorrect={false}
              placeholder={CONSTANT.BookAppointmentUserEmail}
              onChangeText={Email => this.setState({ Email })}
              style={styles.TextInputLayoutStyle}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.BookAppointmentUserPhoneNumber}
              keyboardType="numeric"
              onChangeText={Phone => this.setState({ Phone })}
              style={styles.TextInputLayoutStyle}
            />
            {selectedItemforStartAs == "someone" && (
              <View>
                {/* <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.BookAppointmentSearch}
                  onChangeText={othername => this.setState({othername})}
                  style={styles.TextInputLayoutStyle}
                /> */}
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
                    //onChangeInput={this.ProjectServicesSpinner}
                    //onChangeInput={ this.ProjectServicesSpinner()}
                    searchInputPlaceholderText={
                      CONSTANT.BookAppointmentPickRelation
                    }
                    selectText={CONSTANT.BookAppointmentPickRelation}
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

            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.BookAppointmentPatientName}
              autoCorrect={false}
              onChangeText={patientName => this.setState({ patientName })}
              style={styles.TextInputLayoutStyle}
            />

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
                //onChangeInput={this.ProjectServicesSpinner}
                //onChangeInput={ this.ProjectServicesSpinner()}
                searchInputPlaceholderText={
                  CONSTANT.BookAppointmentPickHospital
                }
                selectText={CONSTANT.BookAppointmentPickHospital}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="hospital_name"
                submitButtonText={CONSTANT.BookAppointmentBASubmit}
              />
            </View>
            {this.state.projectServices && (
              <View style={{ paddingBottom: 10 }}>
                <FlatList
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
                              {/* <Text
                                numberOfLines={1}
                                style={styles.mainServiceName}>
                                {item.title}
                              </Text> */}
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
                    {CONSTANT.BookAppointmentSelectedServices}
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
                      {CONSTANT.BookAppointmentConsultationFee}
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
                      {CONSTANT.BookAppointmentTotalCharges}
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
                  {CONSTANT.BookAppointmentSelectDateTime}
                </Text>
                <View style={styles.BookAppointmentDateArea}>
                  <Dates
                    textColor={"#323232"}
                    mode={"date"}
                    isDateBlocked={isDateBlocked}
                    date={this.state.date}
                    focusedInput={this.state.focus}
                    onDatesChange={date => this.onDateChange(date)}
                  />
                </View>
              </View>
            )}
            {this.state.doctorSlot.length >= 1 && (
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.BookAppointmentAvailableSlots}
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
                            {CONSTANT.BookAppointmentOccupied}
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
                {CONSTANT.BookAppointmentNoSlotAvailable}
              </Text>
            )}
            
            <TouchableOpacity
              onPress={
                () => this.BookAppointment()
              }
              style={styles.MainButtonArea}
            >
              <Text style={styles.MainButtonText}>
                {CONSTANT.BookAppointmentBookAppointment}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(BookAppointment);
