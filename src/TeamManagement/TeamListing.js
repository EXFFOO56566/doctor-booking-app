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
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from "../styles/DoctreatAppStyles";
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import Dash from "react-native-dash";
import SwipeCards from "react-native-swipeable-cards";
import CONSTANT from "../Constants/local";
import TeamListCard from "./TeamListCard";
import Carousel from "react-native-snap-carousel";
import axios from "axios";
import RBSheet from "react-native-raw-bottom-sheet";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
const horizontalMargin = 10;
const slideWidth = 280;

const sliderWidth = Dimensions.get("window").width;
const itemWidth = slideWidth + horizontalMargin * 2;
const itemHeight = 200;
class TeamListing extends Component {
  constructor(props) {
    super(props);
    this.approveDoctor = this.approveDoctor.bind(this);
    this.state = {
      isLoading: true,
      outOfCards: false,
      storedValue: "",
      storedType: "",
      profileImg: "",
      type: "",
      id: "",
      email:"",
      message:"",
      emailArray:[],
      emailValid:false,
      refresh:false,
      pendingTeamId: "",
      showAlert: false,
      TopRatedData: [],
      isDateTimePickerVisible: false,
      current_date: "",
      selected_date: "",
      entries: [{ title: "hello" }, { title: "world" }]
    };
  }

  componentDidMount() {
    this.getUser();
  }
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      //  console.log(storedValue ,storedType, profileImg  ,type , id);
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
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ id });
      } else {
        //  alert('something wrong')
      }
      this.fetchPendingTeamListing();
      this.fetchTeamListing();
    } catch (error) {
      // alert(error)
    }
  };
  fetchTeamListing = async () => {
    const { id, current_date } = this.state;

    const response = await fetch(
      CONSTANT.BaseUrl + "team/get_listing?user_id=" + id
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ TeamPendingData: [], isLoading: false }); // empty data set
    } else {
      this.setState({ TeamPendingData: json, isLoading: false });
    }
  };
  
  submitInviteDoctors = async () => {
    //console.log("id : "+ this.state.id + " message : "+this.state.message +  " emails : " +this.state.emailArray)
    if(this.state.message != "" && this.state.emailArray.length >= 1)
    { axios
      .post(CONSTANT.BaseUrl + "team/invite_doctor", {
        user_id: this.state.id,
        message: this.state.message,
        emails: this.state.emailArray
      })
      .then(async (response) => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.RBSheet.close()
          this.setState({ emailArray: [],message: ''});
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        Alert.alert(error);
        console.log(error);
      });}
   
  };

  addMultipleEmails = () => {
    if (this.state.emailValid == true && this.state.email != "")
    {
      this.state.emailArray.push(
        this.state.email)
        this.setState({refresh: !this.state.refresh})
        this.setState({email:""})
    }
    else
    {
      Alert.alert("Email invalid")
    }
  
  };
  deleteEmails = (index) => {
    this.state.emailArray.splice(index, 1);
    this.setState({refresh: !this.state.refresh})
  };

 validate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(email) === false) {
     this.setState({emailValid: false})
      return false;
    }
    else {
      this.setState({emailValid: true})   
      this.setState({email: email})

    }
  }

  fetchPendingTeamListing = async () => {
    const { id, current_date } = this.state;
    const response = await fetch(
      CONSTANT.BaseUrl + "team/get_listing?status=pending&user_id=" + id
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ TeamPendingListData: [], isLoading: false }); // empty data set
    } else {
      this.setState({ TeamPendingListData: json, isLoading: false });
      console.log("Data:", JSON.stringify(TeamPendingListData));
    }
  };

  approveDoctor = async ID => {
    axios
      .post(CONSTANT.BaseUrl + "team/update_status", {
        id: ID,
        status: "publish"
      })
      .then(async response => {
        if (response.status === 200) {
          alert(response.data.message);
        } else if (response.status === 203) {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };

  rejectDoctor = async ID => {
    axios
      .post(CONSTANT.BaseUrl + "team/update_status", {
        id: ID,
        status: "trash"
      })
      .then(async response => {
        if (response.status === 200) {
          alert(response.data.message);
        } else if (response.status === 203) {
          alert(response.data.message);
        }
      })
      .catch(error => {
        alert(error);
        console.log(error);
      });
  };
  _renderItem({ item, index }) {
    return (
      <View>
        <View style={styles.teamListingRenderItem}>
          <Image
            style={styles.teamListingRenderItemImageStyle}
            source={{ uri: item.image }}
          />
          <Text numberOfLines={1} style={styles.teamListingRenderItemName}>
            {item.name}
          </Text>
          <Text style={styles.teamListingRenderItemRequest}>
            {CONSTANT.TeamManagementNewRequest}
          </Text>
        </View>
        <View style={styles.teamListingTouchableArea}>
          <TouchableOpacity
            onPress={() => this.rejectDoctor(item.ID)}
            style={styles.teamListingTouchableReject}
          >
            <AntIcon name="close" color={"#fff"} size={20} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.approveDoctor(item.ID)}
            style={styles.teamListingTouchableApprove}
          >
            <AntIcon name="check" color={"#fff"} size={20} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.teamListingcontainer}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.TeamManagementHeaderText} />
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
          <View style={styles.teamListingTopRatedCardManagment}>
            {this.state.TeamPendingListData ? (
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={this.state.TeamPendingListData}
                renderItem={this._renderItem.bind(this)}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                inactiveSlideScale={1}
                slideStyle={styles.teamListingCarousalSlideStyle}
              />
            ) : null}
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.teamListingSectionText}>
              {CONSTANT.TeamManagementSectionText}
            </Text>
            <TouchableOpacity
              onPress={() => this.RBSheet.open()}
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#1abc9c",
                margin: 5,
                borderRadius: 5
              }}
            >
              <Text style={styles.teamListingInviteText}>
                {CONSTANT.TeamManagementInviteDoctors}
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.teamListingTopRatedCardManagment}>
            {this.state.TeamPendingData && (
              <FlatList
                style={styles.teamListingFlatListStyle}
                data={this.state.TeamPendingData}
                ListEmptyComponent={this._listEmptyComponent}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity activeOpacity={0.9}>
                    <TeamListCard
                      TeamImage={{ uri: `${item.image}` }}
                      status={`${entities.decode(item.status)}`}
                      name={`${entities.decode(item.name)}`}
                    />
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
        </ScrollView>
        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              paddingLeft: 15,
              paddingRight: 15,
              marginBottom:30,
              backgroundColor: "transparent",
             
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
              Send invite request
            </Text>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.getAnswersRBSheetMainArea}
          >
            <Text
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                fontFamily: CONSTANT.PoppinsMedium
              }}
            >
              You can add multiple email address to send emails in bulk to
              invite. Type email address and hit enter
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                //value={this.state.email}
                placeholder={"Add email"}
                style={styles.TextInputEmailStyle}
                autoCorrect={false}
                keyboardType="email-address"
                onChangeText={email => this.validate(email)}
              />
              <View style={{ height: 50,justifyContent: "center",backgroundColor:CONSTANT.primaryColor ,marginTop:-10,borderBottomRightRadius:2,borderTopRightRadius:2}}>
                <Entypo
                onPress={() => this.addMultipleEmails()}
                  style={{ margin: 5 }}
                  name="plus"
                  color={"#fff"}
                  size={30}
                />
              </View>
            </View>

            {this.state.emailArray.length >=1 &&
            <View
              style={{
                width: "95%",
                borderColor: "#dddddd",
                borderWidth: 1,
                marginHorizontal: 10,
                marginBottom: 10
              }}
            >
              {/* <ScrollView  horizontal={true}> */}
              <FlatList
              style={{marginHorizontal:5}}
              horizontal={true}
                data={this.state.emailArray}
                extraData={this.state.refresh}
                renderItem={({ item, index }) => (
                    <View style={{ flexDirection: "row" ,padding:10,backgroundColor:"#f7f7f7",borderRadius:4,marginHorizontal:10,marginVertical:10,justifyContent:"space-between"}}>
                      <Text
                        style={{
                          marginTop: 5,
                          marginLeft: 5,
                          fontWeight: "700"
                        }}
                      >
                        {item}
                      </Text>
                      <Entypo
                      onPress={() => this.deleteEmails(index)}
                  style={{marginLeft:10 }}
                  name="cross"
                  color={"#000"}
                  size={22}
                />
                    </View>
                )}
              />
              {/* </ScrollView> */}
            </View>}
            <TextInput
              multiline={true}
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={"Your message"}
              onChangeText={message => this.setState({ message })}
              style={styles.TextInputLayoutStyleForDetail}
            />
            <TouchableOpacity
               onPress={() => this.submitInviteDoctors()}
              style={{
                paddingHorizontal: 10,
                backgroundColor:CONSTANT.primaryColor,
                marginHorizontal: 10,
                width: "30%",
                borderRadius: 5,
                alignItems: "center",
                justifyContent: "center"
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
                {CONSTANT.Submit}
              </Text>
            </TouchableOpacity>
            <View style={{height:20}}>
            </View>
          </ScrollView>
        </RBSheet>
      </View>
    );
  }
}
export default withNavigation(TeamListing);
