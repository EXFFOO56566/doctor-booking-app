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
  Button
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

class ExpEduProfile extends Component {
  state={
    isLoading: true,
    ExperienceData: [],
    EducationData: [],
    ExpCompanyName: "",
    ExpDescription: "",
    ExpEndDate: CONSTANT.EducationAndExperienceLayoutEndDate,
    ExpStartingDate: CONSTANT.EducationAndExperienceLayoutStartingDate,
    ExpJobTitle: "",
    EduDescription: "",
    EduEndDate: CONSTANT.EducationAndExperienceLayoutEndDate,
    EduInstituteName: "",
    EduInstituteTitle: "",
    EduStartingDate: CONSTANT.EducationAndExperienceLayoutStartingDate,
    ExpRefresh: false,
    EduRefresh: false,
    DatePickerVisibleExpStartingDate: false,
    DatePickerVisibleExpEndDate: false,
    DatePickerVisibleEduStartingDate: false,
    DatePickerVisibleEduEndDate: false,
    EditExpDesc:'',
    EditExpEnd:CONSTANT.EducationAndExperienceLayoutEndDate,
    EditExpStart:CONSTANT.EducationAndExperienceLayoutStartingDate,
    EditExpTitle:'',
    EditExpCompany:'',
    EditDatePickerVisibleExpStartingDate: false,
    EditDatePickerVisibleExpEndDate: false,
    EditDatePickerVisibleEduStartingDate: false,
    EditDatePickerVisibleEduEndDate: false,
    EditEduDesc:'',
    EditEduEnd:CONSTANT.EducationAndExperienceLayoutEndDate,
    EditEduStart:CONSTANT.EducationAndExperienceLayoutStartingDate,
    EditEduTitle:'',
    EditEduInstitute:'',
    ExpAddNew: false,
    EduAddNew: false,
  }

  componentWillMount() {
    this.fetchEduExpData();
  }

  fetchEduExpData = async () => {
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
      this.setState({ ExperienceData: json[0].am_experiences });
      this.setState({ EducationData: json[0].am_education });
    }
  };

  fetchExperienceFormData = () => {
    if (
      this.state.ExpCompanyName == "" &&
      this.state.ExpJobTitle == "" &&
      this.state.ExpDescription == ""
    ) {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      const {
        ExpCompanyName,
        ExpDescription,
        ExpEndDate,
        ExpStartingDate,
        ExpJobTitle
      } = this.state;

      this.state.ExperienceData.push({
        company_name: this.state.ExpCompanyName,
        start_date: this.state.ExpStartingDate,
        ending_date: this.state.ExpEndDate,
        job_title: this.state.ExpJobTitle,
        job_description: this.state.ExpDescription
      });
      this.setState({
        ExpRefresh: true,
        ExpAddNew: false,
        ExpEndDate: CONSTANT.EducationAndExperienceLayoutEndDate,
        ExpStartingDate: CONSTANT.EducationAndExperienceLayoutStartingDate,
      });
    }
  };

  fetchEducationFormData = () => {
    if (
      this.state.EduInstituteName == "" &&
      this.state.EduInstituteTitle == "" &&
      this.state.EduDescription == ""
    ) {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      const {
        EduDescription,
        EduEndDate,
        EduInstituteName,
        EduInstituteTitle,
        EduStartingDate
      } = this.state; 
      this.state.EducationData.push({
        institute_name: this.state.EduInstituteName,
        start_date: this.state.EduStartingDate,
        ending_date: this.state.EduEndDate,
        degree_title: this.state.EduInstituteTitle,
        degree_description: this.state.EduDescription
      });
      this.setState({
        EduRefresh: true,
        EduAddNew: false,
        EduEndDate: CONSTANT.EducationAndExperienceLayoutEndDate,
        EduStartingDate: CONSTANT.EducationAndExperienceLayoutStartingDate,
      });
    }
  };

  ExpEditData = (index, item) => {
    console.log(this.state.EditExpTitle, this.state.EditExpCompany, this.state.EditExpStart, this.state.EditExpEnd, this.state.EditExpDesc)
    this.state.ExperienceData[index] = {
      job_title:this.state.EditExpTitle != '' ? this.state.EditExpTitle : item.job_title,
      company_name:this.state.EditExpCompany != '' ? this.state.EditExpCompany : item.company_name,
      start_date:this.state.EditExpStart != CONSTANT.EducationAndExperienceLayoutStartingDate ? this.state.EditExpStart : item.start_date,
      ending_date:this.state.EditExpEnd != CONSTANT.EducationAndExperienceLayoutEndDate ? this.state.EditExpEnd : item.ending_date,
      job_description:this.state.EditExpDesc != '' ? this.state.EditExpDesc : item.job_description
    }
    this.setState({EditExpCompany: ""})
    console.log(this.state.ExperienceData[index])
    this.setState({ExpRefresh: true});
  };
  EduEditData = (index, item) => {
    this.state.EducationData[index] = {
      degree_title:this.state.EditEduTitle != '' ? this.state.EditEduTitle : item.degree_title,
      institute_name:this.state.EditEduInstitute != '' ? this.state.EditEduInstitute : item.institute_name,
      start_date:this.state.EditEduStart != CONSTANT.EducationAndExperienceLayoutStartingDate ? this.state.EditEduStart : item.start_date,
      ending_date:this.state.EditEduEnd != CONSTANT.EducationAndExperienceLayoutEndDate ? this.state.EditEduEnd : item.ending_date,
      degree_description:this.state.EditEduDesc != '' ? this.state.EditEduDesc : item.job_description
    }
    this.setState({EduRefresh: true});
  };

  HandleExpDeleteForm = index => {
    this.state.ExperienceData.splice(index, 1);
    this.setState({
      ExpRefresh: true
    });
  };

  HandleEduDeleteForm = index => {
    this.state.EducationData.splice(index, 1);
    this.setState({
      EduRefresh: true
    });
  };

  showDatePickerExpStartingDate = () => {
    this.setState({
      DatePickerVisibleExpStartingDate: true
    });
  };
  showDatePickerExpEndDate = () => {
    this.setState({
      DatePickerVisibleExpEndDate: true
    });
  };
  showDatePickerEduStartingDate = () => {
    this.setState({
      DatePickerVisibleEduStartingDate: true
    });
  };
  showDatePickerEduEndDate = () => {
    this.setState({
      DatePickerVisibleEduEndDate: true
    });
  };
  hideDatePickerExpStartingDate = () => {
    this.setState({
      DatePickerVisibleExpStartingDate: false
    });
  };
  hideDatePickerExpEndDate = () => {
    this.setState({
      DatePickerVisibleExpEndDate: false
    });
  };
  hideDatePickerEduStartingDate = () => {
    this.setState({
      DatePickerVisibleEduStartingDate: false
    });
  };
  hideDatePickerEduEndDate = () => {
    this.setState({
      DatePickerVisibleEduEndDate: false
    });
  };
  handleConfirmExpStartingDate = date => {
    const dateS = date.toUTCString();
    this.setState({ ExpStartingDate: moment(dateS).format("YYYY-MM-DD") });
    this.hideDatePickerExpStartingDate();
  };
  handleConfirmExpEndDate = date => {
    const dateS = date.toUTCString();
    this.setState({ ExpEndDate: moment(dateS).format("YYYY-MM-DD") });
    this.hideDatePickerExpEndDate();
  };
  handleConfirmEduStartingDate = date => {
    const dateS = date.toUTCString();
    this.setState({ EduStartingDate: moment(dateS).format("YYYY-MM-DD") });
    this.hideDatePickerEduStartingDate();
  };
  handleConfirmEduEndDate = date => {
    const dateS = date.toUTCString();
    this.setState({ EduEndDate: moment(dateS).format("YYYY-MM-DD") });
    this.hideDatePickerEduEndDate();
  };
  EditshowDatePickerExpStartingDate = () => {
    this.setState({
      EditDatePickerVisibleExpStartingDate: true
    });
  };
  EditshowDatePickerExpEndDate = () => {
    this.setState({
      EditDatePickerVisibleExpEndDate: true
    });
  };
  EditshowDatePickerEduStartingDate = () => {
    this.setState({
      EditDatePickerVisibleEduStartingDate: true
    });
  };
  EditshowDatePickerEduEndDate = () => {
    this.setState({
      EditDatePickerVisibleEduEndDate: true
    });
  };
  EdithideDatePickerExpStartingDate = () => {
    this.setState({
      EditDatePickerVisibleExpStartingDate: false
    });
  };
  EdithideDatePickerExpEndDate = () => {
    this.setState({
      EditDatePickerVisibleExpEndDate: false
    });
  };
  EdithideDatePickerEduStartingDate = () => {
    this.setState({
      EditDatePickerVisibleEduStartingDate: false
    });
  };
  EdithideDatePickerEduEndDate = () => {
    this.setState({
      EditDatePickerVisibleEduEndDate: false
    });
  };
  EdithandleConfirmExpStartingDate = date => {
    const dateS = date.toUTCString();
    this.setState({ EditExpStart: moment(dateS).format("YYYY-MM-DD") });
    this.EdithideDatePickerExpStartingDate();
  };
  EdithandleConfirmExpEndDate = date => {
    const dateS = date.toUTCString();
    this.setState({ EditExpEnd: moment(dateS).format("YYYY-MM-DD") });
    this.EdithideDatePickerExpEndDate();
  };
  EdithandleConfirmEduStartingDate = date => {
    const dateS = date.toUTCString();
    this.setState({ EditEduStart: moment(dateS).format("YYYY-MM-DD") });
    this.EdithideDatePickerEduStartingDate();
  };
  EdithandleConfirmEduEndDate = date => {
    const dateS = date.toUTCString();
    this.setState({ EditEduEnd: moment(dateS).format("YYYY-MM-DD") });
    this.EdithideDatePickerEduEndDate();
  };

  on_ExpAddNew = () => {
    this.setState({ExpAddNew: true})
  }
  on_EduAddNew = () => {
    this.setState({EduAddNew: true})
  }

  UpdateProfileData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const {
      ExperienceData,
      EducationData,
    } = this.state;
    console.log(
      id,
      ExperienceData,
      EducationData,
    );
    axios
    .post(CONSTANT.BaseUrl + "profile/update_profile_education_experience",{
        id: id,
        am_education: EducationData,
        am_experiences: ExperienceData,
      })
      .then(async response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Success, response.data.message);
          console.log("Success", response.data.message)
          this.fetchEduExpData();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Error, response.data.message);
          console.log("Error", response.data.message)
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };
  render() {
    const {isLoading} = this.state;
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
          <View>
            <View style={styles.PersonalDetailSectionsStyle}>
              <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center',}}>
                <Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailExperience}</Text>
                <TouchableOpacity 
                  onPress={() => this.on_ExpAddNew()}
                >
                  <Text style={{marginRight:10, color:'#3fabf3'}}>{CONSTANT.PersonalDetailAddNew}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.PersonalDetailSectionArea}>
                { this.state.ExpAddNew === true &&
                <View>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailCompanyName}
                    onChangeText={ExpCompanyName =>
                      this.setState({ ExpCompanyName })
                    }
                    style={styles.TextInputLayoutStyle}
                  />
                  <View>
                    <DateTimePickerModal
                      cancelTextIOS={"CANCEL"}
                      confirmTextIOS={"OK"}
                      cancelTextStyle={{ color: CONSTANT.primaryColor, fontSize: 20 }}
                      confirmTextStyle={{ color: CONSTANT.primaryColor, fontSize: 20 }}
                      isVisible={this.state.DatePickerVisibleExpStartingDate}
                      mode="date"
                      onConfirm={this.handleConfirmExpStartingDate}
                      onCancel={this.hideDatePickerExpStartingDate}
                    />
                  </View>
                  <View
                    style={[
                      styles.TextInputLayoutStyle,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }
                    ]}
                  >
                    {this.state.ExpStartingDate == CONSTANT.EducationAndExperienceLayoutStartingDate ?
                      <Text style={{ color: "#7f7f7f" }}>
                        {this.state.ExpStartingDate}
                      </Text>
                      :
                      <Text style={{ color: "#323232" }}>
                        {this.state.ExpStartingDate}
                      </Text>
                    }
                    <TouchableOpacity
                      onPress={() => this.showDatePickerExpStartingDate()}
                      style={{ padding: 5 }}
                    >
                      <AntIcon
                        name="calendar"
                        color={CONSTANT.primaryColor}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <DateTimePickerModal
                      isVisible={this.state.DatePickerVisibleExpEndDate}
                      mode="date"
                      onConfirm={this.handleConfirmExpEndDate}
                      onCancel={this.hideDatePickerExpEndDate}
                    />
                  </View>
                  <View
                    style={[
                      styles.TextInputLayoutStyle,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }
                    ]}
                  >
                    {/* <Text style={{ color: "#7f7f7f" }}>
                      {this.state.ExpEndDate}
                    </Text> */}
                    {this.state.ExpEndDate == CONSTANT.EducationAndExperienceLayoutEndDate ?
                      <Text style={{ color: "#7f7f7f" }}>
                        {this.state.ExpEndDate}
                      </Text>
                      :
                      <Text style={{ color: "#323232" }}>
                        {this.state.ExpEndDate}
                      </Text>
                    }
                    <TouchableOpacity
                      onPress={() => this.showDatePickerExpEndDate()}
                      style={{ padding: 5 }}
                    >
                      <AntIcon
                        name="calendar"
                        color={CONSTANT.primaryColor}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>

                  <TextInput
                    placeholderTextColor="#7F7F7F"
                    underlineColorAndroid="transparent"
                    placeholder={CONSTANT.PersonalDetailJobTitle}
                    onChangeText={ExpJobTitle =>
                      this.setState({ ExpJobTitle })
                    }
                    style={styles.TextInputLayoutStyle}
                  />
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailDescription}
                    onChangeText={ExpDescription =>
                      this.setState({ ExpDescription })
                    }
                    style={styles.TextInputLayoutStyleForDetail}
                  />
                  <TouchableOpacity
                    onPress={this.fetchExperienceFormData}
                    style={styles.PersonalDetailbuttonHover}
                  >
                    <Text style={styles.PersonalDetailbuttonText}>
                      {CONSTANT.PersonalDetailAddNow}
                    </Text>
                  </TouchableOpacity>
                </View>
                }
                {this.state.ExperienceData ? (
                  <FlatList
                    data={this.state.ExperienceData}
                    extraData={this.state.ExpRefresh}
                    renderItem={({ item, index }) => (
                      <Collapse>
                        <CollapseHeader>
                          <View
                            style={styles.PersonalDetailCollapseHeaderArea}
                          >
                            <TouchableOpacity
                              activeOpacity={1}
                              style={
                                styles.PersonalDetailCoollapseHeaderTextArea
                              }
                            >
                              <Text
                                numberOfLines= {1}
                                style={
                                  styles.PersonalDetailCoollapseHeaderText
                                }
                              >
                                {item.company_name}
                              </Text>
                              <Text
                                style={
                                  styles.PersonalDetailCoollapseHeaderText
                                }
                              >
                                ({item.start_date.split(' ')[0]} - {item.ending_date.split(' ')[0]})
                              </Text>
                            </TouchableOpacity>
                            <View style={styles.PersonalDetailEditBTN}>
                              <AntIcon name="edit" color={"#fff"} size={20} />
                            </View>
                            <TouchableOpacity
                              onPress={() => this.HandleExpDeleteForm(index)}
                              style={styles.PersonalDetailDeleteBTN}
                            >
                              <AntIcon
                                name="delete"
                                color={"#fff"}
                                size={20}
                              />
                            </TouchableOpacity>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View style={{ marginTop: 10 }}>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailCompanyName}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditExpCompany =>
                                this.setState({ EditExpCompany })
                              }
                            >
                              {item.company_name}
                            </TextInput>
                            {/* <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailStartingDate}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditExpStart =>
                                this.setState({ EditExpStart })
                              }
                            >
                              {item.start_date}
                            </TextInput> */}
                            <View>
                              <DateTimePickerModal
                                isVisible={this.state.EditDatePickerVisibleExpStartingDate}
                                mode="date"
                                onConfirm={this.EdithandleConfirmExpStartingDate}
                                onCancel={this.EdithideDatePickerExpStartingDate}
                              />
                            </View>
                            <View
                              style={[
                                styles.TextInputLayoutStyle,
                                {
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }
                              ]}
                            >
                              <Text style={{ color: "#323232" }}>
                                {this.state.EditExpStart == CONSTANT.EducationAndExperienceLayoutStartingDate ? item.start_date.split(' ')[0] : this.state.EditExpStart}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.EditshowDatePickerExpStartingDate()}
                                style={{ padding: 5 }}
                              >
                                <AntIcon
                                  name="calendar"
                                  color={CONSTANT.primaryColor}
                                  size={22}
                                />
                              </TouchableOpacity>
                            </View>
                            {/* <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailEndDate}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditExpEnd =>
                                this.setState({ EditExpEnd })
                              }
                            >
                              {item.ending_date}
                            </TextInput> */}
                            <View>
                              <DateTimePickerModal
                                isVisible={this.state.EditDatePickerVisibleExpEndDate}
                                mode="date"
                                onConfirm={this.EdithandleConfirmExpEndDate}
                                onCancel={this.EdithideDatePickerExpEndDate}
                              />
                            </View>
                            <View
                              style={[
                                styles.TextInputLayoutStyle,
                                {
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }
                              ]}
                            >
                              <Text style={{ color: "#323232" }}>
                                {this.state.EditExpEnd == CONSTANT.EducationAndExperienceLayoutEndDate ? item.ending_date.split(' ')[0] : this.state.EditExpEnd}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.EditshowDatePickerExpEndDate()}
                                style={{ padding: 5 }}
                              >
                                <AntIcon
                                  name="calendar"
                                  color={CONSTANT.primaryColor}
                                  size={22}
                                />
                              </TouchableOpacity>
                            </View>
                            <TextInput
                              onChangeText={data =>
                                this.setState({ textInput_Holder: data })
                              }
                              placeholderTextColor="#7F7F7F"
                              underlineColorAndroid="transparent"
                              placeholder={CONSTANT.PersonalDetailJobTitle}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditExpTitle =>
                                this.setState({ EditExpTitle })
                              }
                            >
                              {item.job_title}
                            </TextInput>
                            <TextInput
                              multiline={true}
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailDescription}
                              style={styles.TextInputLayoutStyleForDetail}
                              onChangeText={EditExpDesc =>
                                this.setState({ EditExpDesc })
                              }
                            >
                              {item.job_description}
                            </TextInput>
                            <TouchableOpacity
                              onPress={() => this.ExpEditData(index, item)}
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
                ) : null}
              </View>
            </View>
            <View style={styles.PersonalDetailSectionsStyle}>
              <View style={{flexDirection:'row', justifyContent: 'space-between', alignItems: 'center',}}>
                <Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailEducation}</Text>
                <TouchableOpacity 
                  onPress={() => this.on_EduAddNew()}
                >
                  <Text style={{marginRight:10, color:'#3fabf3'}}>{CONSTANT.PersonalDetailAddNew}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.PersonalDetailSectionArea}>
                { this.state.EduAddNew == true &&
                <View>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailInstituteName}
                    onChangeText={EduInstituteName =>
                      this.setState({ EduInstituteName })
                    }
                    style={styles.TextInputLayoutStyle}
                  />
                  <View>
                    <DateTimePickerModal
                      isVisible={this.state.DatePickerVisibleEduStartingDate}
                      mode="date"
                      onConfirm={this.handleConfirmEduStartingDate}
                      onCancel={this.hideDatePickerEduStartingDate}
                    />
                  </View>
                  <View
                    style={[
                      styles.TextInputLayoutStyle,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }
                    ]}
                  >
                    {/* <Text style={{ color: "#7f7f7f" }}>
                      {this.state.EduStartingDate}
                    </Text> */}
                    {this.state.EduStartingDate == CONSTANT.EducationAndExperienceLayoutStartingDate ?
                      <Text style={{ color: "#7f7f7f" }}>
                        {this.state.EduStartingDate}
                      </Text>
                      :
                      <Text style={{ color: "#323232" }}>
                        {this.state.EduStartingDate}
                      </Text>
                    }
                    <TouchableOpacity
                      onPress={() => this.showDatePickerEduStartingDate()}
                      style={{ padding: 5 }}
                    >
                      <AntIcon
                        name="calendar"
                        color={CONSTANT.primaryColor}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  <View>
                    <DateTimePickerModal
                      isVisible={this.state.DatePickerVisibleEduEndDate}
                      mode="date"
                      onConfirm={this.handleConfirmEduEndDate}
                      onCancel={this.hideDatePickerEduEndDate}
                    />
                  </View>
                  <View
                    style={[
                      styles.TextInputLayoutStyle,
                      {
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }
                    ]}
                  >
                    {/* <Text style={{ color: "#7f7f7f" }}>
                      {this.state.EduEndDate}
                    </Text> */}
                    {this.state.EduEndDate == CONSTANT.EducationAndExperienceLayoutEndDate ?
                      <Text style={{ color: "#7f7f7f" }}>
                        {this.state.EduEndDate}
                      </Text>
                      :
                      <Text style={{ color: "#323232" }}>
                        {this.state.EduEndDate}
                      </Text>
                    }
                    <TouchableOpacity
                      onPress={() => this.showDatePickerEduEndDate()}
                      style={{ padding: 5 }}
                    >
                      <AntIcon
                        name="calendar"
                        color={CONSTANT.primaryColor}
                        size={22}
                      />
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    onChangeText={data =>
                      this.setState({ textInput_Holder: data })
                    }
                    placeholderTextColor="#7F7F7F"
                    underlineColorAndroid="transparent"
                    placeholder={CONSTANT.PersonalDetailInstituteTitle}
                    onChangeText={EduInstituteTitle =>
                      this.setState({ EduInstituteTitle })
                    }
                    style={styles.TextInputLayoutStyle}
                  />
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailDescription}
                    onChangeText={EduDescription =>
                      this.setState({ EduDescription })
                    }
                    style={styles.TextInputLayoutStyleForDetail}
                  />
                  <TouchableOpacity
                    onPress={this.fetchEducationFormData}
                    style={styles.PersonalDetailbuttonHover}
                  >
                    <Text style={styles.PersonalDetailbuttonText}>
                      {CONSTANT.PersonalDetailAddNow}
                    </Text>
                  </TouchableOpacity>
                </View>
                }
                {this.state.EducationData ? (
                  <FlatList
                    data={this.state.EducationData}
                    extraData={this.state.EduRefresh}
                    renderItem={({ item, index }) => (
                      <Collapse>
                        <CollapseHeader>
                          <View
                            style={styles.PersonalDetailCollapseHeaderArea}
                          >
                            <TouchableOpacity
                              activeOpacity={1}
                              style={
                                styles.PersonalDetailCoollapseHeaderTextArea
                              }
                            >
                              <Text
                                numberOfLines= {1}
                                style={
                                  styles.PersonalDetailCoollapseHeaderText
                                }
                              >
                                {item.institute_name}
                              </Text>
                              <Text
                                style={
                                  styles.PersonalDetailCoollapseHeaderText
                                }
                              >
                                ({item.start_date.split(' ')[0]} - {item.ending_date.split(' ')[0]})
                              </Text>
                            </TouchableOpacity>
                            <View style={styles.PersonalDetailEditBTN}>
                              <AntIcon name="edit" color={"#fff"} size={20} />
                            </View>
                            <TouchableOpacity
                              onPress={() => this.HandleEduDeleteForm(index)}
                              style={styles.PersonalDetailDeleteBTN}
                            >
                              <AntIcon
                                name="delete"
                                color={"#fff"}
                                size={20}
                              />
                            </TouchableOpacity>
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View style={{ marginTop: 10 }}>
                            <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailInstituteName}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditEduInstitute =>
                                this.setState({ EditEduInstitute })
                              }
                            >
                              {item.institute_name}
                            </TextInput>
                            {/* <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailStartingDate}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditEduStart =>
                                this.setState({ EditEduStart })
                              }
                            >
                              {item.start_date}
                            </TextInput> */}
                            <View>
                              <DateTimePickerModal
                                isVisible={this.state.EditDatePickerVisibleEduStartingDate}
                                mode="date"
                                onConfirm={this.EdithandleConfirmEduStartingDate}
                                onCancel={this.EdithideDatePickerEduStartingDate}
                              />
                            </View>
                            <View
                              style={[
                                styles.TextInputLayoutStyle,
                                {
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }
                              ]}
                            >
                              <Text style={{ color: "#323232" }}>
                                {this.state.EditEduStart == CONSTANT.EducationAndExperienceLayoutStartingDate ? item.start_date.split(' ')[0] : this.state.EditEduStart}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.EditshowDatePickerEduStartingDate()}
                                style={{ padding: 5 }}
                              >
                                <AntIcon
                                  name="calendar"
                                  color={CONSTANT.primaryColor}
                                  size={22}
                                />
                              </TouchableOpacity>
                            </View>
                            {/* <TextInput
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailEndDate}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditEduEnd =>
                                this.setState({ EditEduEnd })
                              }
                            >
                              {item.ending_date}
                            </TextInput> */}
                            <View>
                              <DateTimePickerModal
                                isVisible={this.state.EditDatePickerVisibleEduEndDate}
                                mode="date"
                                onConfirm={this.EdithandleConfirmEduEndDate}
                                onCancel={this.EdithideDatePickerEduEndDate}
                              />
                            </View>
                            <View
                              style={[
                                styles.TextInputLayoutStyle,
                                {
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  alignItems: "center"
                                }
                              ]}
                            >
                              <Text style={{ color: "#323232" }}>
                                {this.state.EditEduEnd == CONSTANT.EducationAndExperienceLayoutEndDate ? item.ending_date.split(' ')[0] : this.state.EditEduEnd}
                              </Text>
                              <TouchableOpacity
                                onPress={() => this.EditshowDatePickerEduEndDate()}
                                style={{ padding: 5 }}
                              >
                                <AntIcon
                                  name="calendar"
                                  color={CONSTANT.primaryColor}
                                  size={22}
                                />
                              </TouchableOpacity>
                            </View>
                            <TextInput
                              placeholderTextColor="#7F7F7F"
                              underlineColorAndroid="transparent"
                              placeholder={CONSTANT.PersonalDetailDegreeTitle}
                              style={styles.TextInputLayoutStyle}
                              onChangeText={EditEduTitle =>
                                this.setState({ EditEduTitle })
                              }
                            >
                              {item.degree_title}
                            </TextInput>
                            <TextInput
                              multiline={true}
                              underlineColorAndroid="transparent"
                              placeholderTextColor="#7F7F7F"
                              placeholder={CONSTANT.PersonalDetailDescription}
                              style={styles.TextInputLayoutStyleForDetail}
                              onChangeText={EditEduDesc =>
                                this.setState({ EditEduDesc })
                              }
                            >
                              {item.degree_description}
                            </TextInput>
                            <TouchableOpacity
                              onPress={() => this.EduEditData(index, item)}
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
                ) : null}
              </View>
            </View>
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

export default ExpEduProfile;
