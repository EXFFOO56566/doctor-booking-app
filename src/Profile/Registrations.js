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

class Registrations extends Component {
  state={
    isLoading: true,
    Registration: "",
    RegName: '',
    uri: '',
    type: '',
    name: '',
    size: '',
    image: '',
  }

  componentWillMount() {
    this.fetchRegistrationData();
  }

  fetchRegistrationData = async () => {
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
      this.setState({ Registration: json[0].reg_number });
      this.setState({ RegName: json[0].document_name });
      this.setState({ RegSize: json[0].document_size });
      this.setState({ RegImage: json[0].document_url });
    }
  };

  pickRegDoc = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      this.setState({
        uri: res,
        image: res.uri,
        type: res.type,
        name: res.name,
        size: res.size
      })
      console.log(
        res,
        res.uri,
        res.type, // mime type
        res.name,
        res.size,
      );
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  }

  delRegDoc = () => {
    this.setState({RegName:'', name: ''})
  }

  UpdateProfileData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const {
      Registration,
      uri,
      type,
      name
    } = this.state;
    console.log(
      id,
      Registration,
      uri,
      type,
      name
    );
    const formData = new FormData();
    formData.append("id", id);
    formData.append("am_registration_number", Registration);
    formData.append("am_document_files0", uri)
    formData.append("size", "1");

    axios
      .post(CONSTANT.BaseUrl + "profile/update_profile_registration_certificate", formData,
       {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
      )
      .then(async response => {
        if (response.status === 200) {
          this.setState({ images: [], Downloadimages: [], isLoading: false });
          Alert.alert("Success", response.data.message);
          console.log("Success", response);
          this.fetchRegistrationData();
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
              {CONSTANT.PersonalDetailRegistrationNo}
            </Text>
            <View style={styles.PersonalDetailSectionArea}>
              {this.state.ProfileData ? (
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.PersonalDetailEnterRegistrationNumber}
                  style={styles.TextInputLayoutStyle}
                  onChangeText={Registration =>
                    this.setState({ Registration })
                  }
                >{`${entities.decode(
                  this.state.ProfileData[0].reg_number
                )}`}</TextInput>
              ) : (
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.PersonalDetailEnterRegistrationNumber}
                  style={styles.TextInputLayoutStyle}
                />
              )}
              { (this.state.RegName == '' && this.state.name == '') &&
                <TouchableOpacity 
                  onPress={() => this.pickRegDoc()}
                  style={styles.PersonalDetailDownloadArea}>
                  <AntIcon
                    name="plus"
                    color={"#767676"}
                    size={27}
                  />
                  <Text style={styles.PersonalDetailDownloadText}>
                    {CONSTANT.PersonalDetailAddDocument}
                  </Text>
                </TouchableOpacity>
              }

            
              { (this.state.name != '' && this.state.RegName == '') &&
                <View
                  style={{
                    borderColor: "#ddd",
                    borderWidth: 1,
                    margin: "2.5%",
                    borderRadius: 5,
                    overflow: "hidden"
                  }}
                >
                  <Image
                      resizeMode={"contain"}
                      style={{ height: 200, width: "100%", borderTopRadius: 5 }}
                      source={{uri: this.state.image}}
                    />
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={styles.PersonalDetailCoollapseHeaderText}>
                      {this.state.name} {"\n"}{CONSTANT.PersonalDetailFileSize}{" "}
                      {this.state.size >= 1073741824 ? (this.state.size / 1073741824).toFixed(2) + " GB" :
                      this.state.size >= 1048576 ? (this.state.size / 1048576).toFixed(2) + " MB" :
                      this.state.size >= 1024 ? (this.state.size / 1024).toFixed(2) + " KB" : 
                      this.state.size > 1 ? this.state.size + " bytes" : "0 bytes"
                      }
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.delRegDoc()}
                      style={{ padding: 5, width: "10%", alignItems:'center' }}
                    >
                      <AntIcon name="close" color={"red"} size={25} />
                    </TouchableOpacity>
                  </View>
              </View>
              }
              { this.state.RegName != '' &&
                <View
                  style={{
                    borderColor: "#ddd",
                    borderWidth: 1,
                    margin: "2.5%",
                    borderRadius: 5,
                    overflow: "hidden"
                  }}
                >
                  <Image
                    source={{ uri: this.state.RegImage }}
                    resizeMode={"contain"}
                    style={{ height: 200, width: "100%", borderTopRadius: 5 }}
                  />
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "space-between",
                      flexDirection: "row"
                    }}
                  >
                    <Text style={{ width: "90%", padding: 5, textAlign: 'left' }}>
                      {this.state.RegName}{'\n'}{CONSTANT.PersonalDetailFileSize}{" "} {this.state.RegSize}
                    </Text>
                    <TouchableOpacity
                      onPress={() => this.delRegDoc()}
                      style={{ padding: 5, width: "10%", alignItems:'center' }}
                    >
                      <AntIcon name="close" color={"red"} size={25} />
                    </TouchableOpacity>
                  </View>
              </View>
              }
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

export default Registrations;
