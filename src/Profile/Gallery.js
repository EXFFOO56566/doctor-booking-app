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

class Gallery extends Component {
  state={
    isLoading: true,
    images: null,
    ProfileGallery: [],
    galleryArrey: [],
    gallery_base64_string: "",
    galleryimage: null,
    GalleryRefresh: false,
    fetchVideoData: [],
    VideosData: [],
    VideosDataNew: [],
    VideosRefresh: false,
    VideosName: '',
    editVideosName: '',
  }

  componentDidMount() {
    this.fetchGalleryData();
  }

  fetchGalleryData = async () => {
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
      this.setState({ ProfileGallery: json[0].am_gallery });
      this.setState({ fetchVideoData: json[0].am_videos})
      this.setState({ VideosDataNew: [], VideosData: []})
      for (const [key, value] of Object.entries(this.state.fetchVideoData)) {
        console.log(`${key}: ${value}`);
        this.state.VideosData.push({
          link: `${value}`,
        });
        this.setState({VideosRefresh: true})
      }
      console.log("dsfsdfsdfsdfsdfsd",this.state.ProfileGallery)
      for(var i = 0; i < this.state.VideosData.length; i++){
        for (var value of Object.values(this.state.VideosData[i])) {
          //console.log(`${value}`);
          this.state.VideosDataNew.push(`${value}`);
        }
      }
    }
  };

  pickMultiple() {
    try {
      DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images]
      })
        .then(images => {
          this.setState({
            images: images,
          });
          console.log(this.state.images)
        })
        .catch(e => alert(e));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  }

  
  HandleGalleryDeleteForm = index => {
    this.state.ProfileGallery.splice(index, 1);
    this.setState({
      GalleryRefresh: true
    });
  };

  addVideosData = () => {
    if (this.state.VideosName == "") {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      this.state.VideosData.push({link: this.state.VideosName});
      this.setState({
        VideosRefresh: true,
        VideosName: ""
      });
      console.log('membership', this.state.VideosData)
      this.state.VideosDataNew.push(this.state.VideosName);
			console.log("VideosDataNew Array", this.state.VideosDataNew);
    }
  };

  VideosEditData = (index, item) => {
    console.log(this.state.VideosData)
    this.state.VideosData[index] = {
      link: this.state.editVideosName != '' ? this.state.editVideosName : item.link,
    }
		console.log(this.state.VideosData[index])
		this.state.VideosDataNew[index] = this.state.editVideosName != '' ? this.state.editVideosName : item.link ;
    console.log(this.state.VideosDataNew[index])
		this.setState({VideosRefresh: true, VideosName: ''});
  };

  HandleVideoDeleteForm = index => {
    this.state.VideosData.splice(index, 1);
    this.state.VideosDataNew.splice(index, 1);
    this.setState({
      VideosRefresh: true
    });
  };

  UpdateProfileData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const {
      ProfileGallery,
      images,
      VideosDataNew
    } = this.state;
    console.log(
      id,
      ProfileGallery,
      images,
      VideosDataNew
    );
    const formData = new FormData();
    formData.append("id", id);
    formData.append("am_gallery", JSON.stringify(ProfileGallery));
    if (images != null) {
      images.forEach((item, i) => {
        formData.append("am_gallery_files" + i, {
          uri: item.uri,
          type: item.type,
          name: item.name,
        });
      });
    }
    formData.append("size", images != null ? images.length : "0");
    formData.append("am_videos", JSON.stringify(VideosDataNew));
    axios
      .post(CONSTANT.BaseUrl + "profile/update_profile_gallery", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(async response => {
        if (response.status === 200) {
          this.setState({ images: [], isLoading: false });
          Alert.alert("Success", response.data.message);
          console.log("Success", response);
          this.fetchGalleryData();
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
          <View style={styles.PersonalDetailSectionsStyle}>
            <Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailGallery}</Text>
            <View style={styles.PersonalDetailSectionArea}>
              <TouchableOpacity
                onPress={() => this.pickMultiple()}
                style={styles.PersonalDetailDownloadArea}
              >
                <AntIcon name="plus" color={"#767676"} size={27} />
                <Text style={styles.PersonalDetailDownloadText}>
                  {CONSTANT.PersonalDetailAddImages}
                </Text>
              </TouchableOpacity>
              <View>
                <FlatList
                  numColumns={2}
                  data={this.state.ProfileGallery}
                  extraData={this.state.GalleryRefresh}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        width: "45%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        margin: "2.5%",
                        borderRadius: 5,
                        overflow: "hidden"
                      }}
                    >
                      <Image
                        source={{ uri: item.file_url }}
                        resizeMode={"cover"}
                        style={{ height: 120, width: "100%", borderTopRadius: 5 }}
                      />
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <View>
                        <Text style={{  padding: 5 }}>
                          {item.file_name}
                        </Text>
                        <Text style={{  padding: 5 ,color:"#999999" }}>
                         {"File size: "} {(item.file_size/1024).toFixed(2)}{" KB"}
                        </Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => this.HandleGalleryDeleteForm(index)}
                          style={{ padding: 5, }}
                        >
                          <AntIcon name="close" color={"red"} size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                />
                {this.state.images != null ? (
                  <FlatList
                    numColumns={2}
                    data={this.state.images}
                    keyExtractor={(y, z) => z.toString()}
                    renderItem={({ item }) => (
                      <View
                      style={{
                        width: "45%",
                        borderColor: "#ddd",
                        borderWidth: 1,
                        margin: "2.5%",
                        borderRadius: 5,
                        overflow: "hidden"
                      }}
                    >
                      <Image
                        source={{ uri: item.uri }}
                        resizeMode={"cover"}
                        style={{ height: 120, width: "100%", borderTopRadius: 5 }}
                      />
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          flexDirection: "row"
                        }}
                      >
                        <Text style={{ width: "80%", padding: 5 }}>
                          {item.name}
                        </Text>
                        <TouchableOpacity
                          onPress={() => this.HandleGalleryDeleteForm(index)}
                          style={{ padding: 5, width: "20%" }}
                        >
                          <AntIcon name="close" color={"red"} size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    )}
                  />
                ) : null}
              </View>
            </View>
          </View>
          { 
            <View style={styles.PersonalDetailSectionsStyle}>
              <Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailVideos}</Text>
              <View style={styles.PersonalDetailSectionArea}>
                <View>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholderTextColor="#7F7F7F"
                    placeholder={CONSTANT.PersonalDetailYourVideoURL}
                    onChangeText={VideosName =>
                      this.setState({ VideosName })
                    }
                    style={styles.TextInputLayoutStyle}
                    value={this.state.VideosName}
                  />
                  <TouchableOpacity
                    onPress={this.addVideosData}
                    style={styles.PersonalDetailbuttonHover}
                  >
                    <Text style={styles.PersonalDetailbuttonText}>
                      {CONSTANT.PersonalDetailAddNow}
                    </Text>
                  </TouchableOpacity>
                </View>
  
                <FlatList
                  data={this.state.VideosData}
                  extraData={this.state.VideosRefresh}
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
                              {item.link}
                            </Text>
                          </TouchableOpacity>
                          <View style={styles.PersonalDetailEditBTN}>
                            <AntIcon name="edit" color={"#fff"} size={20} />
                          </View>
                          <TouchableOpacity
                            onPress={() => this.HandleVideoDeleteForm(index)}
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
                            placeholder={CONSTANT.PersonalDetailYourVideoURL}
                            onChangeText={editVideosName =>
                              this.setState({ editVideosName })
                            }
                            style={styles.TextInputLayoutStyle}
                          >
                            {item.link}
                          </TextInput>
  
                          <TouchableOpacity
                            onPress={ () => this.VideosEditData(index, item)}
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
          }
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

export default Gallery;
