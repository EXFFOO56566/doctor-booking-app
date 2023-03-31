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

class ClinicAddSetting extends Component {
  //To store data within component
  constructor(props) {
    super(props);

    this.state = {
      ServiceRefresh: false,
      fee: "",
      service: [],
      isLoading: true,
      UniqueArray: [],
      projectServices: [],
      doctorSlot: [],
      projectSpecialityServices: [],
      projectSelectedServiceKnown: [],
      desc: '',
      sp: [],
      availableLocationData: [],
      availableLocationHospital:'',
    };
  }

  //calls when component load
  componentDidMount() {
    this.ProjectServicesSpinner();
    this.fetchAvailablelocations();
  }

  ProjectServicesSpinner = async () => {
		const id = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "taxonomies/get_list?list=services&profile_id=" + id
    );
    const json = await response.json();
    console.log("Data", JSON.stringify(json));
    console.log(json);
    if (Array.isArray(json) && json && json.type && json.type === "error") {
      this.setState({ projectServices: [], isLoading: false }, this.ProjectDaysSpinner); // empty data set
    } else {
      this.setState({ projectServices: json, isLoading: false }, this.ProjectDaysSpinner);
    }
  };

  fetchAvailablelocations = async () => {
    const id = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "appointments/get_bookings_hospitals?profile_id=" + id
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ availableLocationData: [], isLoading: false }); // empty data set
    } else {
      this.setState({ availableLocationData: json, isLoading: false });
      this.setState({ availableLocationHospital: json[0].team_id, isLoading: false });
    }
  };

  selectedServiceData = (item, ID) => {
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

  createRequiredArray = index => {
    this.state.service[index] = this.state.projectSelectedServiceKnown;
    var array = this.state.service;

    var filtered = array.filter(function(el) {
      return el != null;
    });
  };
  PostLocationData = async () => {
    this.setState({ isLoading: true });
    const Uid = await AsyncStorage.getItem("projectProfileId");

    const {
      fee,
      sp,
      availableLocationHospital,
    } = this.state;

    console.log(
      sp 
    );
    axios
      .post(CONSTANT.BaseUrl + "appointments/appointment_settings", {
        hospital_id: availableLocationHospital,
        doctor_id: Uid,
        service: sp,
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

  render() {
    const { isLoading } = this.state;

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
          {this.state.projectServices && (
            <View>
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.AddSettingAvailableServices}
              </Text>
              <FlatList
                style={styles.AddSettingFlatlist}
                data={this.state.projectServices}
                extraData={this.state.ServiceRefresh}
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
                          renderItem={({item}) => (
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
                    renderItem={({item, index}) => (
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
          <View>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.AddSettingConsultancyFee}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.AddSettingConsultancyFee}
              style={styles.TextInputLayoutStyle}
              onChangeText={fee => this.setState({ fee })}
            />
          </View>
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
export default withNavigation(ClinicAddSetting);
