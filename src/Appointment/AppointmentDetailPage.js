import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
  PermissionsAndroid,
  AsyncStorage
} from "react-native";
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from "../styles/DoctreatAppStyles";
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import Dash from "react-native-dash";
import Moment from "moment";
import axios from "axios";
import CONSTANT from "../Constants/local";
import RNBackgroundDownloader from "react-native-background-downloader";
import RBSheet from "react-native-raw-bottom-sheet";
import RNFetchBlob from "rn-fetch-blob";

class AppointmentDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchAppointment: [],
      isLoading: true,
      html: "",
      Store_type: "",
      message: "",
      id: ""
    };
  }
  componentDidMount() {
    this.fetchAppointmentDetail();
    this.getUser();
  }
  getUser = async () => {
    try {
      const Store_type = await AsyncStorage.getItem("user_type");
      const id = await AsyncStorage.getItem("projectUid");
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
      if (Store_type !== null) {
        this.setState({ Store_type });
      } else {
        // alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // alert(error)
    }
  };
  fetchAppointmentDetail = async () => {
    const { params } = this.props.navigation.state;
    const uid = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl + "appointments/get_single?booking_id=" + params.id
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ fetchAppointment: [], isLoading: false }); // empty data set
    } else {
      this.setState({ fetchAppointment: json, isLoading: false });
    }
  };

  ApproveAppointment = () => {
    const { params } = this.props.navigation.state;
    axios
      .post(CONSTANT.BaseUrl + "appointments/update_appointment_status", {
        id: params.id,
        status: "publish"
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.fetchAppointmentDetail();
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
        }
      })
      .catch(error => {
        Alert.alert(CONSTANT.Oops, CONSTANT.AppointmentDetailPagelookcode);
      });
  };

  CancelAppointment = () => {
    const { params } = this.props.navigation.state;
    axios
      .post(CONSTANT.BaseUrl + "appointments/update_appointment_status", {
        id: params.id,
        status: "cancelled"
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.fetchAppointmentDetail();
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
        }
      })
      .catch(error => {
        Alert.alert(CONSTANT.Oops, CONSTANT.AppointmentDetailPagelookcode);
      });
  };

  FileDownload = () => {
    const { dirs } = RNFetchBlob.fs;
    const { params } = this.props.navigation.state;
    let options = Platform.select({
      ios: {
        fileCache: true,
        path: `${dirs.DownloadDir}/` + this.props.name
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          mediaScannable: true,
          title: this.props.name,
          path: `${dirs.DownloadDir}/` + this.props.name
        }
      }
    });
    RNFetchBlob.config(options)
      .fetch(
        "GET",
        CONSTANT.BaseUrlforDownload +
          "download-prescription?download_prescription_id=" +
          params.id,
        {}
      )
      .then(res => {
        console.log("Success", res);
        //  console.log(res);
        if (Platform.OS === "ios") {
          RNFetchBlob.ios.openDocument(res.data);
        }
      })
      .catch(e => {
        console.log(e);
      });
  };
  downloadFile = async () => {
    if (Platform.OS === "ios") {
      this.FileDownload();
    } else {
      try {
        const granted_permission = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: CONSTANT.DownloadCardStoragePermission,
            message: CONSTANT.DownloadCardAccess
          }
        );
        if (granted_permission === PermissionsAndroid.RESULTS.GRANTED) {
          this.FileDownload();
        } else {
          Alert.alert(
            CONSTANT.DownloadCardPermissionDenied,
            CONSTANT.DownloadCardStorage
          );
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  sendMessage = () => {
    const { params } = this.props.navigation.state;
    axios
      .post(CONSTANT.BaseUrl + "appointments/send_appointment_message", {
        booking_id: params.id,
        user_id: this.state.id,
        message: this.state.message
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.RBSheet.close();
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
        }
      })
      .catch(error => {
        Alert.alert(CONSTANT.Oops, CONSTANT.AppointmentDetailPagelookcode);
      });
  };

  render() {
    const { isLoading } = this.state;
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.AppointmentDetailPageheaderText} />
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
          <View style={styles.AppointmentDetailMainArea}>
            <View style={styles.AppointmentDetailHeaderArea}>
              <View style={styles.AppointmentDetailNameArea}>
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailCountryText}>
                    {this.state.fetchAppointment.user_type}
                  </Text>
                )}
                {this.state.fetchAppointment.name != "" && (
                  <Text
                    numberOfLines={2}
                    style={styles.AppointmentDetailNameText}
                  >
                    {this.state.fetchAppointment.name}
                  </Text>
                )}
                {this.state.fetchAppointment.email != "" ? (
                  <Text style={styles.AppointmentDetailUseTypeText}>
                    {this.state.fetchAppointment.email}
                  </Text>
                ) : null}
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailCountryText}>
                    {this.state.fetchAppointment.country}
                  </Text>
                )}
              </View>
              <View style={styles.AppointmentDetailLefBorder} />
              <View style={styles.AppointmentDetailAcceptedArea}>
                <View>
                  {this.state.fetchAppointment.post_status == "Confirmed" ? (
                    <View>
                      <AntIcon
                        name="checkcircle"
                        color={"#3fabf3"}
                        size={15}
                        style={styles.AppointmentDetailAcceptedIcon}
                      />
                      <Text style={styles.AppointmentDetailAcceptedText}>
                        {CONSTANT.AppointmentDetailPageAccepted}
                      </Text>
                    </View>
                  ) : this.state.fetchAppointment.post_status == "pending" ? (
                    <View>
                      <AntIcon
                        name="loading1"
                        color={"#999999"}
                        size={15}
                        style={styles.AppointmentDetailAcceptedIcon}
                      />
                      <Text style={styles.AppointmentDetailAcceptedText}>
                        {CONSTANT.AppointmentDetailPagePending}
                      </Text>
                    </View>
                  ) : this.state.fetchAppointment.post_status == "rejected" ? (
                    <View>
                      <AntIcon
                        name="circle-with-cross"
                        color={"#fe736e"}
                        size={15}
                        style={styles.AppointmentDetailAcceptedIcon}
                      />
                      <Text style={styles.AppointmentDetailAcceptedText}>
                        {CONSTANT.AppointmentDetailPageRejected}
                      </Text>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
            <View style={styles.AppointmentDetailBorderBottom} />
            <View style={styles.AppointmentDetailBodyMainArea}>
              {this.state.fetchAppointment.other_name != "" ? (
                <View style={styles.AppointmentDetailBodyArea}>
                  <Text style={styles.AppointmentDetailBodyHeading}>
                    {CONSTANT.AppointmentDetailPagePatientName}
                  </Text>
                  {this.state.fetchAppointment && (
                    <Text style={styles.AppointmentDetailBodyText}>
                      {this.state.fetchAppointment.other_name}
                    </Text>
                  )}
                </View>
              ) : null}

              {this.state.fetchAppointment.phone != "" ? (
                <View style={styles.AppointmentDetailBodyArea}>
                  <Text style={styles.AppointmentDetailBodyHeading}>
                    Phone No:
                  </Text>
                  {this.state.fetchAppointment && (
                    <Text style={styles.AppointmentDetailBodyText}>
                      {this.state.fetchAppointment.phone}
                    </Text>
                  )}
                </View>
              ) : null}

              {this.state.fetchAppointment.other_relation != "" ? (
                <View style={styles.AppointmentDetailBodyArea}>
                  <Text style={styles.AppointmentDetailBodyHeading}>
                    {CONSTANT.AppointmentDetailPageRelationWithUser}
                  </Text>
                  {this.state.fetchAppointment && (
                    <Text style={styles.AppointmentDetailBodyText}>
                      {this.state.fetchAppointment.other_relation}
                    </Text>
                  )}
                </View>
              ) : null}

              <View style={styles.AppointmentDetailBodyArea}>
                <Text style={styles.AppointmentDetailBodyHeading}>
                  {CONSTANT.AppointmentDetailPageAppointmentLocation}
                </Text>
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailBodyText}>
                    {this.state.fetchAppointment.loc_title}
                  </Text>
                )}
              </View>
              <View style={styles.AppointmentDetailBodyArea}>
                <Text style={styles.AppointmentDetailBodyHeading}>
                  {CONSTANT.AppointmentDetailPageAppointmentDate}
                </Text>
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailBodyText}>
                    {this.state.fetchAppointment.slots}
                  </Text>
                )}
              </View>
              {this.state.fetchAppointment && (
                <View style={styles.AppointmentDetailBodyArea}>
                  <Text style={styles.AppointmentDetailBodyHeading}>
                    {CONSTANT.AppointmentDetailPageServicesRequired}
                  </Text>
                  <FlatList
                    data={this.state.fetchAppointment.all_sp_serv}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity activeOpacity={0.9}>
                        <View style={{ marginBottom: 10 }}>
                          <Text style={styles.AppointmentDetailBodyText}>
                            {item.title}
                          </Text>
                          <FlatList
                            data={item.services}
                            keyExtractor={(x, i) => i.toString()}
                            renderItem={({ item }) => (
                              <TouchableOpacity activeOpacity={0.9}>
                                <View style={{ flexDirection: "row" ,alignItems:"center"}}>
                                  <Entypo
                                    name="dot-single"
                                    color={"#000"}
                                    size={20}
                                  />
                                  <Text
                                    style={styles.AppointmentDetailservices}
                                  >
                                    {item.name}
                                    {" ("} {item.price}
                                    {")"}
                                  </Text>
                                </View>
                              </TouchableOpacity>
                            )}
                          />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
              <View style={styles.AppointmentDetailBodyArea}>
                <Text style={styles.AppointmentDetailBodyHeading}>
                  {CONSTANT.AppointmentDetailPageComments}
                </Text>
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailBodyText}>
                    {this.state.fetchAppointment.content}
                  </Text>
                )}
              </View>

              <View style={styles.AppointmentDetailBodyArea}>
                <Text style={styles.AppointmentDetailBodyHeading}>
                  Consultation Fee:
                </Text>
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailBodyText}>
                    {this.state.fetchAppointment.consultation_fee}
                  </Text>
                )}
              </View>

              <View style={styles.AppointmentDetailBodyArea}>
                <Text style={styles.AppointmentDetailBodyHeading}>
                  Total Fee:
                </Text>
                {this.state.fetchAppointment && (
                  <Text style={styles.AppointmentDetailBodyText}>
                    {this.state.fetchAppointment.total_fees}
                  </Text>
                )}
              </View>
            </View>
            {this.state.fetchAppointment.post_status == "pending" && (
              <View style={styles.AppointmentDetailButtonArea}>
                <TouchableOpacity
                  onPress={() => this.ApproveAppointment()}
                  style={styles.AppointmentDetailButtonStyle1}
                >
                  <Text style={styles.AppointmentDetailButtonText}>
                    {CONSTANT.AppointmentDetailPageApprove}
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => this.CancelAppointment()}
                  style={styles.AppointmentDetailButtonStyle2}
                >
                  <Text style={styles.AppointmentDetailButtonText}>
                    {CONSTANT.AppointmentDetailPageReject}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {this.state.fetchAppointment.post_status == "Confirmed" && (
              <View style={{ flexDirection: "row" }}>
                {this.state.Store_type == "doctor" && (
                  <MaterialIcons
                    onPress={() =>
                      this.props.navigation.navigate("Prescription", {
                        id: params.id
                      })
                    }
                    name="file-copy"
                    color={"#767676"}
                    size={30}
                    style={{ marginLeft: 15, marginTop: 15, marginBottom: 15 }}
                  />
                )}

                <AntIcon
                  onPress={() => this.downloadFile()}
                  name="download"
                  color={"#767676"}
                  size={30}
                  style={{ marginLeft: 15, marginTop: 15, marginBottom: 15 }}
                />
                <AntIcon
                  onPress={() => this.RBSheet.open()}
                  name="message1"
                  color={"#767676"}
                  size={30}
                  style={{ marginLeft: 15, marginTop: 15, marginBottom: 15 }}
                />
              </View>
            )}
          </View>
        </ScrollView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom: 30,
              backgroundColor: "transparent"
            }
          }}
        >
          <View
            style={{
              backgroundColor: CONSTANT.primaryColor,
              height: 50,
              width: "100%",
              justifyContent: "center",
              borderTopLeftRadius: 6,
              borderTopRightRadius: 6
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 20,
                textAlign: "center",
                fontWeight: "700"
              }}
            >
              Send message
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.getAnswersRBSheetMainArea}
          >
            <View style={{ height: 10 }}></View>
            <TextInput
              multiline={true}
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={"Your message"}
              onChangeText={message => this.setState({ message })}
              style={styles.TextInputLayoutStyleForDetail}
            />
            <TouchableOpacity
              onPress={() => this.sendMessage()}
              style={{
                paddingHorizontal: 10,
                backgroundColor: CONSTANT.primaryColor,
                marginHorizontal: 10,
                width: "30%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10
              }}
            >
              <Text
                style={{
                  color: "#fff",
                  fontSize: 16,
                  fontWeight: "700",
                  marginVertical: 10
                }}
              >
                Send
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}
export default withNavigation(AppointmentDetailPage);
