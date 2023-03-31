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

class AwardsDownloads extends Component {
  state={
    isLoading: true,
    AwardData: [],
    AwardTitle: "",
    AwardYear: "",
    awardrefresh: false,
    DownloadData: [],
    DownloadFileData: [],
    DownloadRefresh: false,
    DownloadFileRefresh: false,
    editTitle: '',
    editYear: '',
    Downloadimages:[],
    DownloadimagesRef: false,
  }

  componentDidMount() {
    this.fetchAwardDownloadData();
  }

  fetchAwardDownloadData = async () => {
    this.setState({ isLoading: true, Downloadimages: [] });

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
      this.setState({ AwardData: json[0].am_award });
      this.setState({ DownloadData: json[0].am_downloads, isLoading: false });
      console.log('DownloadData', this.state.DownloadData)
    }
  };

  fetchAwardsData = () => {
    if (this.state.AwardTitle == "" && this.state.AwardYear == "") {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      const { AwardTitle, AwardYear } = this.state;
      this.state.AwardData.push({
        title: this.state.AwardTitle,
        year: this.state.AwardYear,
      });
      this.setState({
        awardrefresh: true,
        AwardTitle: '',
        AwardYear: ''
      });
    }
  };

  HandleAwardDeleteForm = index => {
    this.state.AwardData.splice(index, 1);
    this.setState({
      awardrefresh: true
    });
  };

  HandleDownloadDeleteForm = index => {
    this.state.DownloadData.splice(index, 1);
    this.setState({
      DownloadRefresh: true
    });
  };

  HandlePickDownloadDeleteForm = index => {
    this.state.Downloadimages.splice(index, 1);
    this.setState({
      DownloadimagesRef: true
    });
  };

  EditAwardsData = (index) => {
    this.state.AwardData[index] = {
      title: this.state.editTitle,
      year: this.state.editYear,
    }
    this.setState({awardrefresh: true});
  };

  pickMultipleDownloads() {
    try {
      DocumentPicker.pickMultiple({})
        .then(DownloadFileData => {
          this.setState({
            Downloadimages: DownloadFileData,
            DownloadFileRefresh: true
          });
          console.log('images', this.state.Downloadimages)
        })
        .catch(e => alert(e));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  UpdateProfileData = async () => {
    this.setState({ isLoading: true });

    const id = await AsyncStorage.getItem("projectUid");
    const {
      AwardData,
      DownloadData,
      Downloadimages,
    } = this.state;
    console.log(
      AwardData,
      DownloadData,
      Downloadimages,
      id
    );
    const formData = new FormData();
    formData.append("id", id);
    formData.append("am_award", JSON.stringify(AwardData));
    formData.append("am_downloads", JSON.stringify(DownloadData));
    if( Downloadimages != null){
      Downloadimages.forEach((item, i) => {
        formData.append("am_downloads_files" + i, {
          uri: item.uri,
          type: item.type,
          name: item.name,
        });
      });
    }
    formData.append(
      "size", Downloadimages != [] ? Downloadimages.length : "0"
    );
    axios
      .post(CONSTANT.BaseUrl + "profile/update_profile_awards_downloads", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ isLoading: false });
          Alert.alert("Success", response.data.message);
          console.log("Success", response);
          this.fetchAwardDownloadData();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert("Error", response.data.message);
          console.log("Error", response);
        }
      })
      .catch(error => {
        //Alert.alert(error);
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
              {CONSTANT.PersonalDetailAddReward}
            </Text>
            <View style={styles.PersonalDetailSectionArea}>
              <View>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.PersonalDetailAwardTitle}
                  onChangeText={AwardTitle => this.setState({ AwardTitle })}
                  style={styles.TextInputLayoutStyle}
                  value={this.state.AwardTitle}
                />
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.PersonalDetailYear}
                  onChangeText={AwardYear => this.setState({ AwardYear })}
                  style={styles.TextInputLayoutStyle}
                  value={this.state.AwardYear}
                />

                <TouchableOpacity
                  onPress={this.fetchAwardsData}
                  style={styles.PersonalDetailbuttonHover}
                >
                  <Text style={styles.PersonalDetailbuttonText}>
                    {CONSTANT.PersonalDetailAddNow}
                  </Text>
                </TouchableOpacity>
              </View>

              {this.state.AwardData ? (
                <FlatList
                  data={this.state.AwardData}
                  extraData={this.state.awardrefresh}
                  renderItem={({ item, index }) => (
                    <Collapse>
                      <CollapseHeader>
                        <View style={styles.PersonalDetailCollapseHeaderArea}>
                          <TouchableOpacity
                            activeOpacity={1}
                            style={
                              styles.PersonalDetailCoollapseHeaderTextArea
                            }
                          >
                            <Text
                              style={styles.PersonalDetailCoollapseHeaderText}
                            >
                              {item.title}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.PersonalDetailEditBTN}>
                            <AntIcon name="edit" color={"#fff"} size={20} />
                          </View>
                          <TouchableOpacity
                            onPress={() => this.HandleAwardDeleteForm(index)}
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
                            placeholder={CONSTANT.PersonalDetailAwardTitle}
                            onChangeText={editTitle =>
                              this.setState({ editTitle })
                            }
                            style={styles.TextInputLayoutStyle}
                          >
                            {item.title}
                          </TextInput>
                          <TextInput
                            underlineColorAndroid="transparent"
                            placeholderTextColor="#7F7F7F"
                            placeholder={CONSTANT.PersonalDetailAwardYear}
                            onChangeText={editYear =>
                              this.setState({ editYear })
                            }
                            style={styles.TextInputLayoutStyle}
                          >
                            {item.year}
                          </TextInput>

                          <TouchableOpacity
                            onPress={() => this.EditAwardsData(index)}
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
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.PersonalDetailDownloads}
            </Text>
            <View style={styles.PersonalDetailSectionArea}>
              <TouchableOpacity
                onPress={() => this.pickMultipleDownloads()}
                style={styles.PersonalDetailDownloadArea}
              >
                <AntIcon name="plus" color={"#767676"} size={27} />
                <Text style={styles.PersonalDetailDownloadText}>
                  {CONSTANT.PersonalDetailAddFileforDownlaod}
                </Text>
              </TouchableOpacity>
              {this.state.DownloadData ? (
                <FlatList
                  data={this.state.DownloadData}
                  extraData={this.state.DownloadRefresh}
                  renderItem={({ item, index }) => (
                    <View style={styles.PersonalDetailCollapseHeaderArea}>
                      <View style={styles.PersonalDetailImageArea}>
                        <Image
                          resizeMode={"cover"}
                          style={styles.PersonalDetailImageStyle}
                          source={require("../../Assets/Images/Download.png")}
                        />
                      </View>
                      <View
                        style={styles.PersonalDetailCoollapseHeaderTextArea}
                      >
                        <Text
                          style={styles.PersonalDetailCoollapseHeaderText}
                        >
                          {item.name} {"\n"}
                          {item.size}
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => this.HandleDownloadDeleteForm(index)}
                        style={styles.PersonalDetailDeleteBTN}
                      >
                        <AntIcon name="delete" color={"#fff"} size={20} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : null}
              {this.state.Downloadimages != [] ? (
                <FlatList
                  data={this.state.Downloadimages}
                  extraData={this.state.DownloadimagesRef}
                  keyExtractor={(y, z) => z.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.PersonalDetailCollapseHeaderArea}>
                      <View style={styles.PersonalDetailImageArea}>
                        <Image
                          resizeMode={"cover"}
                          style={styles.PersonalDetailImageStyle}
                          source={require("../../Assets/Images/Download.png")}
                        />
                      </View>
                      <View
                        style={styles.PersonalDetailCoollapseHeaderTextArea}
                      >
                        <Text
                          style={styles.PersonalDetailCoollapseHeaderText}
                        >
                          {item.name} {"\n"}
                          {item.size >= 1073741824 ? (item.size / 1073741824).toFixed(2) + " GB" :
                          item.size >= 1048576 ? (item.size / 1048576).toFixed(2) + " MB" :
                          item.size >= 1024 ? (item.size / 1024).toFixed(2) + " KB" : 
                          item.size > 1 ? item.size + " bytes" : "0 bytes"
                          }
                        </Text>
                      </View>

                      <TouchableOpacity
                        onPress={() => this.HandlePickDownloadDeleteForm(index)}
                        style={styles.PersonalDetailDeleteBTN}
                      >
                        <AntIcon name="delete" color={"#fff"} size={20} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              ) : null}
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

export default AwardsDownloads;
