import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  PanResponder,
  Alert,
  Dimensions,
  AsyncStorage,
  Button, Platform
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import { SwipeRow, List, Content, ListItem, Separator } from "native-base";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";
import AntIcon from "react-native-vector-icons/AntDesign";
import DocumentPicker from "react-native-document-picker";
import MapView, { Marker } from "react-native-maps";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import ImagePicker from "react-native-image-crop-picker";
import MultiSelect from "react-native-multiple-select";
import Dash from "react-native-dash";
import CONSTANT from '../Constants/local';
import axios from "axios";
import {RadioGroup} from 'react-native-btr';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class DefaultLocation extends Component {
  state={
    isLoading: true,
    storedType: "",
    id: "",
    clinicName: "",
    base64_string: "",
    name: "",
    type: "",
    image: null,
    projectLocationKnown: "",
    Address: "",
    Latitude: "",
    Longitude: "",
    clinic_avatar:'',
  }

  componentDidMount() {
    this.getUser();
    this.getThemeSettingsForDocLocation();
    this.ProjectLocationSpinner();
    this.fetchLocationData();
  }

  getUser = async () => {
    try {
      const storedType = await AsyncStorage.getItem("user_type");
      const id = await AsyncStorage.getItem("projectUid");
      if (storedType !== null) {
				this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
    }
  };

  getThemeSettingsForDocLocation = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'user/get_theme_settings',
    );
    const json = await response.json();
    this.setState({docLocation_setting: json.doctor_location });
  };

  ProjectLocationSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=locations",
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
        let projectLocation = responseJson;
        this.setState({
          projectLocation
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  fetchLocationData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(CONSTANT.BaseUrl + "profile/setting?id=" + id);
    const json = await response.json();
    console.log("This is Json" + JSON.stringify(json));
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ ProfileData: [] });
    } else {
      this.setState({ ProfileData: json, isLoading: false });
      this.setState({ clinicName: json[0].am_hospital_name });
      this.setState({ ClinicLogo: json[0].am_hospital_logo });
      this.setState({ projectLocationKnown: json[0].location });
      this.setState({ Address: json[0].address });
      this.setState({ Latitude: json[0].latitude });
      this.setState({ Longitude: json[0].longitude });
    }
  };

  pickClinicLogoBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo'
    }).then(image => {
      this.setState({
        clinic_avatar: image,
      })
      console.log(this.state.clinic_avatar);
    });
  };

  UpdateProfileData = async () => {
    this.setState({ isLoading: true });
    const {
      id,
      clinicName,
      base64_string,
      name,
      type,
      projectLocationKnown,
      Address,
      Latitude,
      Longitude,
      image
    } = this.state;
    console.log(
      id,
      clinicName,
      base64_string,
      name,
      type,
      projectLocationKnown.toString(),
      Address,
      Latitude,
      Longitude,
      image
    );
    const formData = new FormData();
    formData.append("id", id);
    formData.append("location_title", clinicName);
    { this.state.clinic_avatar.path &&
      formData.append("am_clinic_avatar", {
        uri: this.state.clinic_avatar.path,
        type: this.state.clinic_avatar.mime,
        name: Platform.OS === 'ios' ? this.state.clinic_avatar.filename : Date.now()+Math.random()+'.jpg'
      });
    }
    formData.append("location", projectLocationKnown.toString());
    formData.append("address", Address);
    formData.append("longitude", Longitude);
    formData.append("latitude", Latitude);
    
    axios
      .post(CONSTANT.BaseUrl + "profile/update_profile_location", formData, 
      )
      .then(async response => {
        if (response.status === 200) {
          this.setState({ images: [], Downloadimages: [], isLoading: false });
          Alert.alert("Success", response.data.message);
          console.log("Success", response);
          this.fetchLocationData();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert("Error", response.data.message);
          console.log("Error", response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {isLoading, storedType} = this.state;
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
        <ScrollView>
          <View style={styles.PersonalDetailSectionsStyle}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PersonalDetailLocation}
            </Text>
            { storedType == "doctor" && (this.state.docLocation_setting === 'both' || this.state.docLocation_setting === 'clinic') ?
              <View>
                { this.state.ProfileData &&
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailYourClinicName}
                    defaultValue={`${entities.decode(this.state.clinicName)}`}
                    onChangeText={clinicName => this.setState({ clinicName })}
                    style={styles.TextInputLayoutStyle}
                  />
                }
                <View
                  style={{
                    flexDirection: "row",
                    marginLeft: 10,
                    marginRight: 10,
                    overflow: "hidden"
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      borderRadius: 4,
                      borderStyle: "dashed",
                      borderColor: "#dddddd",
                      borderWidth: 0.6,
                      height: 150,
                      width: "60%",
                      marginBottom: 10
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => this.pickClinicLogoBase64(false)}
                      style={{
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center"
                      }}
                    >
                      <AntIcon
                        name="plus"
                        color={"#767676"}
                        size={27}
                      />
                      <Text style={{ color: "#767676", fontSize: 17 }}>
                        {CONSTANT.PersonalDetailAddClinicLogo}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {this.state.clinic_avatar == "" ? (
                    <Image
                      source={{
                        uri: `${"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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"} `
                      }}
                      style={{ width: "40%", height: 150, borderRadius: 4 }}
                    />
                  ) : (
                    <Image
                      source={{
                        uri: this.state.clinic_avatar.path
                      }}
                      style={{ width: "40%", height: 150, borderRadius: 4 }}
                    />
                  )}
                </View>
                {this.state.ClinicLogo != "" && (
                  <View>
                    <Text style={styles.MainHeadingTextStyle}>
                      {CONSTANT.PersonalDetailCurrentLogo}
                    </Text>
                    <Image
                      style={{
                        width: "40%",
                        height: 150,
                        borderRadius: 4,
                        marginLeft: 15,
                        marginBottom: 15
                      }}
                      source={{
                        uri: `${this.state.ClinicLogo}`
                      }}
                    />
                  </View>
                )}
              </View> : null
            }
            {this.state.ProfileData &&
            <View style={styles.MultiSelectArea}>
              <MultiSelect 
                styleListContainer={{maxHeight:150}}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ projectLocationKnown: value })
                }
                uniqueKey="slug"
                items={this.state.projectLocation}
                selectedItems={this.state.projectLocationKnown}
                borderBottomWidth={0}
                single={true}
                searchInputPlaceholderText={CONSTANT.PersonalDetailSearchProjectLocation}
                onChangeInput={text => console.log(text)}
                selectText={this.state.ProfileData[0].location != '' ? `${entities.decode(this.state.ProfileData[0].location)}` : CONSTANT.PersonalDetailSearchProjectLocation}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={
                  styles.MultiSelectstyleDropdownMenuSubsection
                }
                displayKey="name"
                submitButtonText="Submit"
                underlineColorAndroid="transparent"
              />
            </View>
            }

            {this.state.ProfileData ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailYourAddress}
                style={styles.TextInputLayoutStyle}
                onChangeText={Address => this.setState({ Address })}
              >{`${entities.decode(
                this.state.ProfileData[0].address
              )}`}</TextInput>
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailYourAddress}
                style={styles.TextInputLayoutStyle}
              />
            )}

            {this.state.ProfileData ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailEnterLongitude}
                style={styles.TextInputLayoutStyle}
                onChangeText={Longitude => this.setState({ Longitude })}
              >{`${entities.decode(
                this.state.ProfileData[0].longitude
              )}`}</TextInput>
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailEnterLongitude}
                style={styles.TextInputLayoutStyle}
              />
            )}
            {this.state.ProfileData ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailEnterLatitude}
                style={styles.TextInputLayoutStyle}
                onChangeText={Latitude => this.setState({ Latitude })}
              >{`${entities.decode(
                this.state.ProfileData[0].latitude
              )}`}</TextInput>
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailEnterLatitude}
                style={styles.TextInputLayoutStyle}
              />
            )}
          </View>
          <TouchableOpacity
            onPress={this.UpdateProfileData}
            style={styles.PersonalDetailFooterArea}
          >
            <Text style={styles.PersonalDetailFooterText}>
              {CONSTANT.PersonalDetailUpdateAllChanges}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default DefaultLocation;
