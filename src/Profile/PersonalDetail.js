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
  KeyboardAvoidingView,
  ActivityIndicator,
  PanResponder,
  Alert,
  Dimensions,
  AsyncStorage,
  Button,
  Platform
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import {
  SwipeRow,
  List,
  Content,
  ListItem,
  Separator,
  CardItem
} from "native-base";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
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
import CONSTANT from "../Constants/local";
import axios from "axios";
import { RadioGroup } from "react-native-btr";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import FontAwesome from "react-native-vector-icons/FontAwesome";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class PersonalDetail extends Component {
  state = {
    image: null,
    images: null,
    Downloadimages: null,
    FirstName: "",
    LastName: "",
    DisplayName: "",
    BaseName: "",
    SubHeading: "",
    ShortDescription: "",
    Description: "",
    MobileNummber: "",
    StratingPrice: "",
    Weburl: "",
    ProfileImage: "",
    Description: "",
    arrayHolder: [],
    itemHolder: [],
    items: [],
    docContactInfo: "",
    avatar_img: "",
    MembershipData: [],
    MembershipDataNew: [],
    Memberfresh: false,
    MembershipName: "",
    editMembershipName: "",
    MembershipRefresh: false,
    NumberData: [],
    NumberDataNew: [],
    Languages: [],
    selectedLanguages: [],
    selectedLanguagesID: [],
    projectLocationKnown: "",
    textInput_Holder: "",
    touchableOpacityHeight: 55,
    Memberdata: "",
    refreshing: true,
    isLoading: true,
    storedValue: "",
    storedType: "",
    profileImg: "",
    profileCallSetting: "",
    login_type: "",
    id: "",
    base64_string: "",
    name: "",
    type: "",
    Mynumber: "",
    value: "",
    mode: "date",
    displayFormat: "DD/MM/YYYY",
    label: "Starting Date",
    selectedDays: [],
    refreshData: false,
    availability: "",
    availabilityText: "",
    DaysData: [
      {
        day: "mon",
        active: 0
      },
      {
        day: "tue",
        active: 0
      },
      {
        day: "wed",
        active: 0
      },
      {
        day: "thu",
        active: 0
      },
      {
        day: "fri",
        active: 0
      },
      {
        day: "sat",
        active: 0
      },
      {
        day: "sun",
        active: 0
      }
    ],
    personalInformationRadioButtons: [
      {
        label: "Male",
        value: "male",
        checked: true,
        color: "#323232",
        disabled: false,
        size: 7
      },
      {
        label: "Female",
        value: "female",
        checked: false,
        color: "#323232",
        disabled: false,
        size: 7
      }
    ]
  };

  componentWillMount() {
    this.getUser();
    this.getLanguages();
    this.getThemeSettingsForDocLocation();
  }
  getThemeSettingsForDocLocation = async () => {
    const response = await fetch(CONSTANT.BaseUrl + "user/get_theme_settings");
    const json = await response.json();
    this.setState({ docContactInfo: json.doctors_contactinfo });
    //Alert.alert('doc contact info', JSON.stringify(this.state.docContactInfo))
  };
  getLanguages = async () => {
    return fetch(
      CONSTANT.BaseUrl  + "taxonomies/get_taxonomy?taxonomy=languages",
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
        let lan = responseJson;
        this.setState({
          Languages:lan
        });
        
      })
      .catch(error => {
        console.error(error);
      });
  };
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const locationType = await AsyncStorage.getItem("location_type");
      const profileCallSetting = await AsyncStorage.getItem(
        "user_onCall_booking"
      );
      const login_type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
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
      if (profileCallSetting !== null) {
        this.setState({ profileCallSetting });
      } else {
        //  alert('something wrong')
      }
      if (login_type !== null) {
        this.setState({ login_type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      if (locationType !== null) {
        this.setState({ locationType });
      } else {
        //  alert('something wrong')
      }
      this.fetchProfileData();
      this.ProjectLocationSpinner();
    } catch (error) {
      // alert(error)
    }
  };

  fetchProfileData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(CONSTANT.BaseUrl + "profile/setting?id=" + id);
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ ProfileData: [] });
    } else {
      this.setState({ ProfileData: json });
      this.setState({ NumberData: json[0].am_phone_numbers });
      this.setState({ FirstName: json[0].am_first_name });
      this.setState({ LastName: json[0].am_last_name });
      this.setState({ DisplayName: json[0].display_name });
      this.setState({ MobileNummber: json[0].am_mobile_number });
      this.setState({ BaseName: json[0].am_name_base });
      this.setState({ ShortDescription: json[0].am_short_description });
      this.setState({ SubHeading: json[0].am_sub_heading });
      this.setState({ Description: json[0].content });
      this.setState({ ProfileImage: json[0].profile_image_url });
      this.setState({ StratingPrice: json[0].am_starting_price });
      this.setState({ MembershipData: json[0].am_memberships });
      this.setState({ Weburl: json[0].am_web_url });
      this.setState({ MembershipDataNew: [] });
      this.setState({ NumberDataNew: [] });
      this.setState({selectedLanguages: json[0].am_languages})
      this.setState({ availability: json[0].am_availability });
      this.setState({ availabilityText: json[0].am_other_time });
      for (var i = 0; i < this.state.MembershipData.length; i++) {
        for (var value of Object.values(this.state.MembershipData[i])) {
          this.state.MembershipDataNew.push(`${value}`);
        }
      }
      for (var i = 0; i < this.state.selectedLanguages.length; i++) {
        this.state.selectedLanguagesID[i] = this.state.selectedLanguages[i].id;
      }
      for (var i = 0; i < json[0].am_week_days.length; i++) {
        for (var j = 0; j < 7; j++) {
          if (json[0].am_week_days[i] == this.state.DaysData[j].day) {
            this.state.DaysData[j].active = 1;
          }
        }
      }
      this.setState({ refreshData: !this.state.refreshData, isLoading: false });
      console.log("MembershipData Array", this.state.MembershipData);
      console.log("MembershipDataNew Array", this.state.MembershipDataNew);
      for (var n = 0; n < this.state.NumberData.length; n++) {
        for (var value of Object.values(this.state.NumberData[n])) {
          this.state.NumberDataNew.push(`${value}`);
        }
      }
      console.log("NumberData Array", this.state.NumberData);
      console.log("NumberDataNew Array", this.state.NumberDataNew);
      console.log("cskjdvhsdbvsndvs", this.state.availabilityText);
    }
  };

  UpdateProfileData = async () => {
    this.setState({ isLoading: true });
    const {
      FirstName,
      LastName,
      DisplayName,
      BaseName,
      SubHeading,
      Description,
      ShortDescription,
      NumberDataNew,
      MembershipDataNew,
      MobileNummber,
      StratingPrice,
      base64_string,
      name,
      type,
      id,
      selectedDays,
      avatar_img
    } = this.state;
    for (var i = 0; i < 7; i++) {
      if (this.state.DaysData[i].active == 1) {
        selectedDays.push(this.state.DaysData[i].day);
      }
    }
  
    const formData = new FormData();
    formData.append("id", id);
    formData.append("am_sub_heading", SubHeading);
    formData.append("am_first_name", FirstName);
    formData.append("am_last_name", LastName);
    formData.append("display_name", DisplayName);
    formData.append("am_mobile_number", MobileNummber);
    formData.append("am_starting_price", StratingPrice);
    formData.append("content", Description);
    formData.append("am_availability", this.state.availability);
    formData.append("am_week_days", JSON.stringify(selectedDays));
    formData.append("am_web_url", this.state.Weburl);
    formData.append("am_other_time", this.state.availabilityText);
    {
      this.state.avatar_img.path &&
        formData.append("am_avatar", {
          uri: this.state.avatar_img.path,
          type: this.state.avatar_img.mime,
          name:
            Platform.OS === "ios"
              ? this.state.avatar_img.filename
              : Date.now() + Math.random() + ".jpg"
        });
    }
    formData.append("am_phone_numbers", JSON.stringify(this.state.NumberData));
    formData.append("am_languages", JSON.stringify(this.state.selectedLanguagesID));
    formData.append("am_memberships_name", JSON.stringify(MembershipDataNew));
   
    axios
      .post(CONSTANT.BaseUrl + "profile/update-basic",formData)
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isLoading: false, selectedDays: []});
          Alert.alert("Success", response.data.message);
          console.log("Success", response);
          this.fetchProfileData();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert("Error", response.data.message);
          console.log("Error", response);
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };

  pickSingleArticleImageBase64 = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: "photo"
    }).then(image => {
      this.setState({
        avatar_img: image
      });
      console.log(this.state.avatar_img);
    });
  };

  fetchNumberData = () => {
    if (this.state.Mynumber == "") {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      const { Mynumber } = this.state;
      this.state.NumberData.push(this.state.Mynumber
      );
      this.setState({
        Mynumber: "",
        Numberfresh: true
      });
      this.state.NumberDataNew.push(this.state.Mynumber);
      console.log("New NumberData Array", this.state.NumberDataNew);
    }
  };

  HandleNumberDeleteForm = index => {
    this.state.NumberData.splice(index, 1);
    this.state.NumberDataNew.splice(index, 1);
    this.setState({
      Numberfresh: true
    });
  };

  fetchProfileMembershipData = () => {
    if (this.state.MembershipName == "") {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      this.state.MembershipData.push({ name: this.state.MembershipName });
      this.setState({
        MembershipRefresh: true,
        MembershipName: ""
      });
      console.log("membership", this.state.MembershipData);
      this.state.MembershipDataNew.push(this.state.MembershipName);
      console.log("MembershipDataNew Array", this.state.MembershipDataNew);
    }
  };

  MembershipEditData = (index, item) => {
    this.state.MembershipData[index] = {
      name:
        this.state.editMembershipName != ""
          ? this.state.editMembershipName
          : item.name
    };
    console.log(this.state.MembershipData[index]);
    this.state.MembershipDataNew[index] =
      this.state.editMembershipName != ""
        ? this.state.editMembershipName
        : item.name;
    console.log(this.state.MembershipDataNew[index]);
    this.setState({
      MembershipRefresh: true,
      MembershipName: "",
      editMembershipName: ""
    });
  };

  HandleMembershipDeleteForm = index => {
    this.state.MembershipData.splice(index, 1);
    this.state.MembershipDataNew.splice(index, 1);
    this.setState({
      MembershipRefresh: true
    });
  };

  render() {
    const {
      FirstName,
      LastName,
      DisplayName,
      BaseName,
      SubHeading,
      ShortDescription,
      isLoading,
      label,
      value,
      show,
      mode,
      displayFormat
    } = this.state;
    const {
      storedValue,
      storedType,
      docContactInfo,
      profileCallSetting,
      profileImg
    } = this.state;
    let genderItem = this.state.personalInformationRadioButtons.find(
      e => e.checked == true
    );
    genderItem = genderItem
      ? genderItem.value
      : this.state.personalInformationRadioButtons[0].value;

    const PushInArray = (item, index) => {
      if (item.active == 1) {
        this.state.DaysData[index].active = 0;
      } else {
        this.state.DaysData[index].active = 1;
      }
      console.log("measurement Array", this.state.DaysData);
      this.setState({ refreshData: !this.state.refreshData });
    };
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
              {CONSTANT.PersonalDetailUser}
            </Text>
            {(this.state.ProfileData && storedType == "doctor") ||
            storedType == "hospital" ||
            storedType == "regular_user" ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailSubHeading}
                style={styles.TextInputLayoutStyle}
                onChangeText={SubHeading => this.setState({ SubHeading })}
              >{`${entities.decode(this.state.SubHeading)}`}</TextInput>
            ) : storedType == "doctor" || storedType == "hospital" ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailSubHeading}
                style={styles.TextInputLayoutStyle}
              />
            ) : null}
            {this.state.ProfileData ? (
              <TextInput
                defaultValue={`${entities.decode(
                  this.state.ProfileData[0].am_first_name
                )}`}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailFirstName}
                style={styles.TextInputLayoutStyle}
                onChangeText={FirstName => this.setState({ FirstName })}
              ></TextInput>
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailFirstName}
                style={styles.TextInputLayoutStyle}
              ></TextInput>
            )}
            {this.state.ProfileData ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailLastName}
                style={styles.TextInputLayoutStyle}
                onChangeText={LastName => this.setState({ LastName })}
              >
                {`${entities.decode(this.state.ProfileData[0].am_last_name)}`}
              </TextInput>
            ) : (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailLastName}
                style={styles.TextInputLayoutStyle}
              />
            )}
            {this.state.ProfileData ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailUsername}
                style={styles.TextInputLayoutStyle}
                onChangeText={DisplayName => this.setState({ DisplayName })}
              >{`${entities.decode(this.state.DisplayName)}`}</TextInput>
            ) : storedType == "doctor" || storedType == "hospital" ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailUsername}
                style={styles.TextInputLayoutStyle}
              />
            ) : null}
            {this.state.ProfileData ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailMobileNum}
                style={styles.TextInputLayoutStyle}
                onChangeText={MobileNummber => this.setState({ MobileNummber })}
              >{`${entities.decode(this.state.MobileNummber)}`}</TextInput>
            ) : storedType == "doctor" ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailMobileNum}
                style={styles.TextInputLayoutStyle}
              />
            ) : null}
            {this.state.ProfileData && storedType == "doctor" ? (
              <TextInput
                //multiline={true}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailStartingPrice}
                style={styles.TextInputLayoutStyle}
                onChangeText={StratingPrice => this.setState({ StratingPrice })}
              >{`${entities.decode(this.state.StratingPrice)}`}</TextInput>
            ) : storedType == "doctor" ? (
              <TextInput
                multiline={true}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailStartingPrice}
                style={styles.TextInputLayoutStyle}
              />
            ) : null}
            {this.state.ProfileData ? (
              <TextInput
                multiline={true}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailDescription}
                style={styles.TextInputLayoutStyleForDetail}
                onChangeText={Description => this.setState({ Description })}
              >{`${entities.decode(
                this.state.ProfileData[0].content
              )}`}</TextInput>
            ) : (
              <TextInput
                multiline={true}
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailDescription}
                style={styles.TextInputLayoutStyleForDetail}
              />
            )}
            {this.state.ProfileData && storedType == "hospital" ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailWebUrl}
                style={styles.TextInputLayoutStyle}
                onChangeText={Weburl => this.setState({ Weburl })}
              >{`${entities.decode(this.state.Weburl)}`}</TextInput>
            ) : storedType == "hospital" ? (
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.PersonalDetailWebUrl}
                style={styles.TextInputLayoutStyle}
              />
            ) : null}
          </View>
          <View style={styles.PersonalDetailSectionsStyle}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PersonalDetailPhoto}
            </Text>
            <View
              res
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
                  onPress={() => this.pickSingleArticleImageBase64(false)}
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <AntIcon
                    //onPress={this.joinData}
                    name="plus"
                    color={"#767676"}
                    size={27}
                  />
                  <Text style={{ color: "#767676", fontSize: 17 }}>
                    {CONSTANT.PersonalDetailAddPhoto}
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.avatar_img == "" ? (
                <Image
                  source={{
                    uri: `${"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+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"} `
                  }}
                  style={{ width: "40%", height: 150, borderRadius: 4 }}
                />
              ) : (
                <Image
                  source={{
                    uri: this.state.avatar_img.path
                  }}
                  style={{ width: "40%", height: 150, borderRadius: 4 }}
                />
              )}
            </View>
            {this.state.ProfileImage != "" && (
              <View>
                <Text style={styles.MainHeadingTextStyle}>
                  {CONSTANT.PersonalDetailCurrentPhoto}
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
                    uri: `${this.state.ProfileImage}`
                  }}
                />
              </View>
            )}
          </View>
          {(storedType == "doctor" && docContactInfo == "yes") ||
          storedType == "hospital" ? (
            <View style={styles.PersonalDetailSectionsStyle}>
              <Text style={styles.MainHeadingTextStyle}>
                {storedType == "doctor"
                  ? CONSTANT.PersonalDetailPhoneNo
                  : CONSTANT.PersonalDetailYourContactPhNum}
              </Text>
              <View style={styles.PersonalDetailCustomTextInputArea}>
                <TextInput
                  onChangeText={Mynumber => this.setState({ Mynumber })}
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.PersonalDetailEnterNumberHere}
                  keyboardType={"numeric"}
                  style={styles.PersonalDetailCustomTextInputStyle}
                  value={this.state.Mynumber}
                />
                <TouchableOpacity
                  onPress={() => this.fetchNumberData()}
                  style={styles.PersonalDetailCustomTextInputIconArea}
                >
                  <AntIcon name="plus" color={"#fff"} size={20} />
                </TouchableOpacity>
              </View>

              {this.state.NumberData ? (
                <FlatList
                  style={{ paddingLeft: 5 }}
                  data={this.state.NumberData}
                  extraData={this.state.Numberfresh}
                  renderItem={({ item, index }) => (
                    <View style={styles.PersonalDetailCollapseHeaderArea}>
                      <Text style={styles.PersonalDetailPhoneNumbersText}>
                        {item}
                      </Text>

                      <TouchableOpacity
                        onPress={() => this.HandleNumberDeleteForm(index)}
                        style={styles.PersonalDetailDeleteBTN}
                      >
                        <AntIcon name="delete" color={"#fff"} size={20} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : null}
            </View>
          ) : null}
           <View style={styles.PersonalDetailSectionsStyle}>
           <Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailSelectedLanguages}</Text>
                <View style={styles.MultiSelectArea}>
              <MultiSelect 
styleListContainer={{maxHeight:150}}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>{
                  this.setState({selectedLanguagesID: value})
                    console.log("arrr",this.state.selectedLanguagesID);}
                }
                selectedItems={this.state.selectedLanguagesID}
                items={this.state.Languages}
                uniqueKey="id"
                borderBottomWidth={0}
                searchInputPlaceholderText={CONSTANT.PersonalDetailSelectedLanguages}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.PersonalDetailSelectedLanguages}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
                underlineColorAndroid="transparent"
              />
            </View>
              </View>
          
          {storedType == "doctor" && (
            <View style={styles.PersonalDetailSectionsStyle}>
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.PersonalDetailMemberships}
              </Text>
              <View style={styles.PersonalDetailSectionArea}>
                <View>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailYourMemberships}
                    onChangeText={MembershipName =>
                      this.setState({ MembershipName })
                    }
                    style={styles.TextInputLayoutStyle}
                    value={this.state.MembershipName}
                  />
                  <TouchableOpacity
                    onPress={this.fetchProfileMembershipData}
                    style={styles.PersonalDetailbuttonHover}
                  >
                    <Text style={styles.PersonalDetailbuttonText}>
                      {CONSTANT.PersonalDetailAddNow}
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={this.state.MembershipData}
                  extraData={this.state.MembershipRefresh}
                  renderItem={({ item, index }) => (
                    <Collapse>
                      <CollapseHeader>
                        <View style={styles.PersonalDetailCollapseHeaderArea}>
                          <TouchableOpacity
                            activeOpacity={1}
                            style={styles.PersonalDetailCoollapseHeaderTextArea}
                          >
                            <Text
                              style={styles.PersonalDetailCoollapseHeaderText}
                            >
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.PersonalDetailEditBTN}>
                            <AntIcon name="edit" color={"#fff"} size={20} />
                          </View>
                          <TouchableOpacity
                            onPress={() =>
                              this.HandleMembershipDeleteForm(index)
                            }
                            style={styles.PersonalDetailDeleteBTN}
                          >
                            <AntIcon name="delete" color={"#fff"} size={20} />
                          </TouchableOpacity>
                        </View>
                      </CollapseHeader>

                      <CollapseBody>
                        <View style={{ marginTop: 10 }}>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#7F7F7F"
                            placeholder={CONSTANT.PersonalDetailYourMemberships}
                            onChangeText={editMembershipName =>
                              this.setState({ editMembershipName })
                            }
                            style={styles.TextInputLayoutStyle}
                          >
                            {item.name}
                          </TextInput>

                          <TouchableOpacity
                            onPress={() => this.MembershipEditData(index, item)}
                            style={styles.PersonalDetailbuttonHover}
                          >
                            <Text style={styles.PersonalDetailbuttonText}>
                              {CONSTANT.PersonalDetailAddNow}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </CollapseBody>
                    </Collapse>
                  )}
                />
              </View>
            </View>
          )}

          {storedType == "hospital" && (
            <>
              <View style={styles.PersonalDetailSectionsStyle}>
                <Text style={styles.MainHeadingTextStyle}>Working time</Text>
                <TouchableOpacity
                  onPress={() => this.setState({ availability: "yes" })}
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row"
                  }}
                >
                  {this.state.availability == "yes" ? (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#22C55E",
                        borderRadius: 10,
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
                        height: 20,
                        width: 20,
                        borderColor: "#DDDDDD",
                        borderWidth: 1,
                        borderRadius: 10
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
                    24/7 working time
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ availability: "others" })}
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 10,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row"
                  }}
                >
                  {this.state.availability == "others" ? (
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#22C55E",
                        borderRadius: 10,
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
                        height: 20,
                        width: 20,
                        borderColor: "#DDDDDD",
                        borderWidth: 1,
                        borderRadius: 10
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
                    Others
                  </Text>
                </TouchableOpacity>
                {this.state.availability == "others" ? (
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    value={this.state.availabilityText}
                    placeholder={"Availability Text"}
                    onChangeText={availabilityText =>
                      this.setState({ availabilityText })
                    }
                    style={styles.TextInputLayoutStyleAvailability}
                  />
                ) : null}
              </View>

              <View style={styles.PersonalDetailSectionsStyle}>
                <Text style={styles.MainHeadingTextStyle}>
                  Days, I offer my services
                </Text>
                <FlatList
                  numColumns={4}
                  data={this.state.DaysData}
                  extraData={this.state.refreshData}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      onPress={() => PushInArray(item, index)}
                      style={{
                        marginVertical: 10,
                        marginHorizontal: 10,
                        width: "20%",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "row"
                      }}
                    >
                      {item.active == 1 ? (
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
                        {item.day}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </>
          )}

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
export default withNavigation(PersonalDetail);
