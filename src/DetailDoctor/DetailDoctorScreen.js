import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  Button,
  Dimensions,
  AsyncStorage,
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import AntIcon from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";
import LocationsCard from "./LocationsCard";
import UserDetailPage from "./UserDetailPage";
import OnlineConsultationCard from "./OnlineConsultationCard";
import PatientFeedBackCard from "./PatientFeedBackCard";
import ArticlesCard from "./ArticlesCard";
import OfferedServicesCard from "./UserDetailPageCards/OfferedServicesCard";
import ExperienceCard from "./UserDetailPageCards/ExperienceCard";
import SpecializationCard from "./UserDetailPageCards/SpecializationCard";
import AwardsAndRecognitionsCard from "./UserDetailPageCards/AwardsAndRecognitionsCard";
import DownloadCard from "./UserDetailPageCards/DownloadCard";
import RBSheet from "react-native-raw-bottom-sheet";
import { FloatingAction } from "react-native-floating-action";
import TopRatedCard from "../Home/TopRatedCard";
import CustomHeader from "../Header/CustomHeader";
import CONSTANT from '../Constants/local';
import GallerySwiper from "react-native-gallery-swiper";
import axios from "axios";
import HTML from "react-native-render-html";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class DetailDoctorScreen extends Component {
  constructor(props) {
    super(props);
    this.arrayGallery = [];
    this.state = {
      storedValue: "",
      storedType: "",
      profileImg: "",
      type: "",
      id: "",
      idProfile: "",
      fetching_from_server: false,
      arrayHolder_Gallery: [],
      floatvisible : false,
      actions: [
        {
          text: CONSTANT.DetailDoctorScreenAvailableL,
          color: "#3fabf3",
          name: "bt_accessibility",
          icon: (
            <AntIcon
              onPress={() =>{
                this.onPressGetData("no", "no", "no", "yes", "no", "no");
                this.floatingAction.animateButton();
              }
               
              }
              name="pushpino"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 2,
          onPressItem: this.onPressGetData("no", "no", "no", "yes", "no", "no"),
        },
        {
          text: CONSTANT.DetailDoctorScreenUserD,
          color: "#3fabf3",
          name: "bt_language",
          icon: (
            <AntIcon
              onPress={() =>
                {this.onPressGetData("no", "no", "no", "no", "yes", "no")
                this.floatingAction.animateButton();}
              }
              name="user"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 1,
          onPressItem: this.onPressGetData("no", "no", "no", "no", "yes", "no"),
        },
        {
          text: CONSTANT.DetailDoctorScreenOnlineC,
          color: "#3fabf3",
          name: "bt_room",
          icon: (
            <AntIcon
              onPress={() =>
               { this.onPressGetData("no", "no", "yes", "no", "no", "no")
                this.floatingAction.animateButton();}
              }
              name="earth"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 3,
          onPressItem: this.onPressGetData("no", "no", "yes", "no", "no", "no"),
        },
        {
          text: CONSTANT.DetailDoctorScreenFeedback,
          color: "#3fabf3",
          name: "bt_videocam",
          icon: (
            <AntIcon
              onPress={() =>
              {  this.onPressGetData("no", "yes", "no", "no", "no", "no")
              this.floatingAction.animateButton();}
              }
              name="like2"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 4,
          onPressItem: this.onPressGetData("no", "yes", "no", "no", "no", "no"),
        },
        {
          text: CONSTANT.DetailDoctorScreenArticles,
          color: "#3fabf3",
          name: "bt_videocam",
          icon: (
            <AntIcon
              onPress={() =>
               { this.onPressGetData("yes", "no", "no", "no", "no", "no")
                this.floatingAction.animateButton();}
              }
              name="filetext1"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 5,
          onPressItem: this.onPressGetData("yes", "no", "no", "no", "no", "no"),
        },
      ],
      HosActions: [
        {
          text: CONSTANT.DetailDoctorScreenUserD,
          color: "#3fabf3",
          name: "bt_language",
          icon: (
            <AntIcon
              onPress={() =>
                {this.onPressGetData("no", "no", "no", "no", "yes", "no")
                this.floatingAction.animateButton();}
              }
              name="user"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 1,
          onPressItem: this.onPressGetData("no", "no", "no", "no", "yes", "no"),
        },
       
        {
          text: CONSTANT.DetailDoctorScreenOnboardD,
          color: "#3fabf3",
          name: "bt_videocam",
          icon: (
            <AntIcon
              onPress={() =>
                {this.onPressGetData("no", "no", "no", "no", "no", "yes")
                this.floatingAction.animateButton();}
              }
              name="filetext1"
              color={"#fff"}
              size={30}
              style={{
                alignSelf: "center",
                textAlign: "center",
              }}
            />
          ),
          position: 5,
          onPressItem: this.onPressGetData("no", "no", "no", "no", "no", "yes"),
        },
      ],

      Articles: "no",
      Feedback: "no",
      OnlineConsultation: "no",
      Location: "no",
      UserDetail: "yes",
      starCount: 3.5,
      isLoading: true,
      iconColor: "#dddddd",
      fetchbookingCallSetting: "",
      fetchWishData: [],
      fetchfeedback: [],
      fetchArticle: [],
      fetchLocationData: [],
      fetchConsultationData: [],
      fetchOnboardDoctorData: [],
      fetchspecialities: [],
      fetchspecialires: [],
      GalleryImages: [],
      fetchGalleryImages: [],
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  onPressGetData = (articles, feedback, consult, loc, detail, onboard) => {
    this.setState({
      Articles: articles,
      Feedback: feedback,
      OnlineConsultation: consult,
      Location: loc,
      UserDetail: detail,
      OnboardDoctor: onboard,
    });
  };
  componentDidMount() {
    this.setState({ arrayHolder_Gallery: [...this.arrayGallery] });
    this.getUser();
    this.fetchDoctorDetail();
    this.fetchArticles();
    this.fetchFeedback();
    this.fetchLocation();
    this.fetchConsultation();
    this.fetchOnboardDoctors();
  }
  getUser = async () => {
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      const idProfile = await AsyncStorage.getItem('projectProfileId');
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
      if (idProfile !== null) {
        this.setState({idProfile});
      } else {
        //  alert('something wrong')
      }
      this.fetchAppointments();
    } catch (error) {
      // alert(error)
    }
  };
  fetchDoctorDetail = async () => {
    const { params } = this.props.navigation.state;
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_doctor?profile_id=" +
        params.itemId +
        "&user_id=" +
        id
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ fetchDoctor: [], isLoading: false,floatvisible : true }); // empty data set
    } else {
      this.setState({ fetchDoctor: json });
      this.setState({ fetchrole: json[0].user_type });
      this.setState({ fetchExperience: json[0].experiences });
      this.setState({ fetchspecialires: json[0].specialities_data });
      this.setState({ fetchEducation: json[0].educations });
      this.setState({ fetchAward: json[0].awards });
      this.setState({ fetchDownload: json[0].downloads });
      this.setState({ fetchspecialities: json[0].specialities });
      this.setState({ fetchWishData: json[0].already_saved });
      this.setState({ fetchbookingCallSetting: json[0] });
      this.setState({ fetchMembership: json[0].memberships, isLoading: false ,floatvisible : true});
      this.setState(
        { fetchGalleryImages: json[0].gallery_images, isLoading: false,floatvisible : true },
        this.setGalleryImages(this.state.fetchGalleryImages)
      );
    }
  };
  setGalleryImages = (item) => {
    this.arrayGallery.push({
      uri: item.url,
    });
    this.setState({ arrayHolder_Gallery: [...this.arrayGallery] });
  };
  fetchArticles = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_articles?profile_id=" +
        params.itemId +
        "&page_number=1"
    );
    const json = await response.json();
    this.setState({ fetchArticle: json });
  };
  fetchFeedback = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_feedback?profile_id=" +
        params.itemId +
        "&page_number=1"
    );
    const json = await response.json();
    this.setState({ fetchfeedback: json });
  };
  fetchConsultation = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_consultation?profile_id=" +
        params.itemId +
        "&page_number=1"
    );
    const json = await response.json();
    this.setState({ fetchConsultationData: json });
  };
  fetchOnboardDoctors = async () => {

    const { params } = this.props.navigation.state;
    console.log("this is the ID",params.itemId)
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_hospital_team?profile_id=" +
        params.itemId +
        "&page_number=1"
    );
    const json = await response.json();

    this.setState({ fetchOnboardDoctorData: json });
  };
  fetchLocation = async () => {
    const { params } = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        "listing/get_location?profile_id=" +
        params.itemId +
        "&page_number=1"
    );
    const json = await response.json();
    this.setState({ fetchLocationData: json });
  };
  AddinWishList = async () => {
    if (this.state.storedType != "") {
      this.setState({
        fetching_from_server: true,
      });
      const { params } = this.props.navigation.state;
      const uid = await AsyncStorage.getItem("projectUid");
      axios
        .post(CONSTANT.BaseUrl + "user/add_wishlist", {
          id: params.itemId,
          user_id: uid,
        })
        .then(async (response) => {
          if (response.status == "200") {
            if (response.data.type == "demo") {
              this.setState({
                fetching_from_server: false,
              });
              alert(JSON.stringify(response.data.message));
            } else {
              this.setState({
                fetching_from_server: false,
                iconColor: "#fe736e",
                isLoading: false,
                floatvisible : true
              });
              alert(JSON.stringify(response.data.message));
            }
          } else if (response.status == "203") {
            this.setState({
              fetching_from_server: false,
              iconColor: "#fe736e",
              isLoading: false,
              floatvisible : true
            });
            alert(JSON.stringify(response.data.message));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      Alert.alert(
        CONSTANT.DetailDoctorScreenSorry,
        CONSTANT.DetailDoctorScreenNotAllowed
      );
    }
  };
  ContactPressed = (ID) => {
    if (
      this.state.storedType != "" &&
      this.state.storedType == "regular_user"
    ) {
      this.props.navigation.navigate("MessageDoctor", { id: ID });
    } else {
      Alert.alert(
        CONSTANT.DetailDoctorScreenSorry,
        CONSTANT.DetailDoctorScreenNotAllowed
      );
    }
  };
  BookAppointmentPressed = () => {
    const { params } = this.props.navigation.state;
    if (
      this.state.storedType != "" &&
      this.state.storedType == "regular_user"
    ) {
      {
        this.state.fetchbookingCallSetting.oncall == "yes"
          ? this.props.navigation.navigate("BookAppointmentCall", {
              id: params.itemId,
            })
          : this.props.navigation.navigate("BookAppointment", {
              id: params.itemId,
            });
      }
    } else {
      Alert.alert(
        CONSTANT.DetailDoctorScreenSorry,
        CONSTANT.DetailDoctorScreenNotAllowed
      );
    }
  };
  render() {
    const { params } = this.props.navigation.state;
    const { navigate } = this.props.navigation;
    const { fetchDoctor, isLoading, storedType } = this.state;
    return (
      <View style={styles.container}>
        {params.itemId == this.state.idProfile ?
        <CustomHeader headerText="Profile" />:
        <CustomHeader headerText={CONSTANT.DetailDoctorScreenDetailPage} />}
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
          <View style={styles.DetailDoctorMainArea}>
            <View style={styles.DetailDoctorImageArea}>
              {this.state.fetchDoctor && (
                <Image
                  resizeMode="cover"
                  style={styles.DetailDoctorImageStyle}
                  source={{ uri: `${this.state.fetchDoctor[0].image}` }}
                />
              )}
              <View
                      style={{
                        marginTop: -30,
                        marginLeft: -70,
                        backgroundColor: '#00cc8d',
                        alignSelf: 'center',
                        overflow: 'visible',
                        borderRadius: 50,
                        borderWidth: 1,
                        padding: 5,
                        borderColor: '#fff',
                      }}>
                      <TouchableOpacity
                        style={{flexDirection: 'row'}}
                        onPress={() =>
                          this.ContactPressed(this.state.fetchDoctor[0].user_id)
                        }
                       >
                        <Ionicons name="md-chatbubbles-sharp" color={'#fff'} size={14} />
                      </TouchableOpacity>
                    </View>
            </View>
            <View
            //style={{ width: "100%" }}
            >
              <View style={styles.DetailDoctordocContentstyle}>
                {this.state.fetchspecialities.length >= 1 && (
                  <Text style={styles.DetailDoctortitleStyle}>
                    {this.state.fetchDoctor[0].specialities[0].name}
                  </Text>
                )}
                <View style={styles.DetailDoctorNameArea}>
                  {this.state.fetchDoctor && (
                    <Text style={styles.DetailDoctorDocName}>
                      {this.state.fetchDoctor[0].name}
                    </Text>
                  )}

                  <AntIcon
                    name="heart"
                    color={"#3fabf3"}
                    size={13}
                    style={styles.DetailDoctorNameAreaIcon}
                  />
                  <AntIcon
                    name="checkcircle"
                    color={"#1abc9c"}
                    size={13}
                    style={styles.DetailDoctorNameAreaIcon}
                  />
                </View>
                {this.state.fetchDoctor && (
                  <Text style={styles.DetailDoctorDegreeText}>
                    {this.state.fetchDoctor[0].sub_heading}
                  </Text>
                )}

                <View style={styles.DetailDoctorRatingArea}>
                  {this.state.fetchDoctor && (
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={14}
                      fullStarColor={"#fecb02"}
                      emptyStarColor={"#fecb02"}
                      rating={this.state.fetchDoctor[0].average_rating}
                      selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                  )}
                  {this.state.fetchDoctor && (
                    <Text style={styles.DetailDoctorRatingText}>
                      {this.state.fetchDoctor[0].total_rating}{" "}
                      {CONSTANT.DetailDoctorScreenFeedback}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View style={styles.DetailDoctorButtonsArea}>
              {storedType != null && storedType == "regular_user"  && (
                
                <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("AddFeedback", {
                            id: params.itemId
                          })
                }
                style={styles.DetailDoctorbuttonStyle1}
              >
                <Text style={styles.DetailDoctorButtonText}>
                FeedBack
                </Text>
              </TouchableOpacity>
              )}
              
              {this.state.fetchrole == "doctors" && (
                <TouchableOpacity
                  onPress={() => this.BookAppointmentPressed()}
                  style={styles.DetailDoctorbuttonStyle2}
                >
                  <Text style={styles.DetailDoctorButtonText}>
                    {CONSTANT.DetailDoctorScreenBookNow}
                  </Text>
                </TouchableOpacity>
              )}
              {this.state.fetchWishData == "yes" ? (
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      CONSTANT.DetailDoctorScreenMessage,
                      CONSTANT.DetailDoctorScreenAlreadyAddedinWishlist
                    )
                  }
                  style={styles.DetailDoctorbuttonStyle3}
                >
                  <AntIcon name="heart" color={"#fe736e"} size={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={this.AddinWishList}
                  style={styles.DetailDoctorbuttonStyle3}
                >
                  {this.state.fetching_from_server == false && (
                    <AntIcon
                      name="heart"
                      color={this.state.iconColor}
                      size={25}
                    />
                  )}
                  {this.state.fetching_from_server == true && (
                    <ActivityIndicator
                      color={CONSTANT.primaryColor}
                      size="small"
                    />
                  )}
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={styles.DetailDoctorSectionsMainArea}>
            {this.state.Location === "yes" ? (
              <View>
                {this.state.fetchDoctor && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DetailDoctorScreenLocationsBy} “
                    {this.state.fetchDoctor[0].name}”
                  </Text>
                )}

                {this.state.fetchLocationData.length >= 1 ? (
                  <FlatList
                    style={{}}
                    data={this.state.fetchLocationData}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => (
                      <LocationsCard
                        image={{ uri: `${item.image}` }}
                        specialityName={`${entities.decode(
                          item.specialities[0].name
                        )}`}
                        Name={`${item.name}`}
                        subHeading={`${entities.decode(item.sub_heading)}`}
                        location={`${entities.decode(item.location)}`}
                        availability={`${entities.decode(item.availability)}`}
                        onboard_doctors={`${entities.decode(
                          item.onboard_doctors
                        )}`}
                        booking_days={item.bookings_days}
                      />
                    )}
                  />
                ) : (
                  <View style={styles.NoDataArea}>
                    <Image
                      resizeMode={"contain"}
                      style={styles.NoDataImage}
                      source={require("../../Assets/Images/arrow.png")}
                    />
                    <Text style={styles.NoDataText1}>{CONSTANT.Oops}</Text>
                    <Text style={styles.NoDataText2}>
                      {CONSTANT.NoDataAvailable}
                    </Text>
                  </View>
                )}
              </View>
            ) : null}
            {this.state.UserDetail === "yes" ? (
              <View>
                {this.state.fetchDoctor && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DetailDoctorScreenAbout} "
                    {this.state.fetchDoctor[0].name}"
                  </Text>
                )}

                {this.state.fetchDoctor && (
                  <Text style={styles.DetailDoctoraboutContentStyle}>
                    {this.state.fetchDoctor[0].contents}
                  </Text>
                )}
                {/* {this.state.fetchspecialires.length >= 1 ? 
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DetailDoctorScreenOfferedServices}
                  </Text>
                  : null} */}
                {this.state.fetchspecialires && (
                  <FlatList
                    data={this.state.fetchspecialires}
                    extraData={this.state}
                    renderItem={({ item, index }) => (
                      <Collapse>
                        <CollapseHeader>
                          <View style={styles.CollapseHeaderStyle}>
                            <TouchableOpacity>
                              <View
                                style={styles.DetailDoctormainLayoutServices}
                              >
                                <Image
                                  resizeMode="cover"
                                  style={
                                    styles.DetailDoctorCollapseHeaderImageStyle
                                  }
                                  source={{ uri: item.logo }}
                                />
                                <View style={styles.DetailDoctorBorderLeft} />
                                {/* <Text
                              numberOfLines={1}
                              style={styles.mainServiceName}>
                              {item.title}
                            </Text> */}
                                <HTML
                                  numberOfLines={1}
                                  html={item.name}
                                  containerStyle={
                                    styles.DetailDoctormainServiceName
                                  }
                                  imagesMaxWidth={
                                    Dimensions.get("window").width
                                  }
                                />
                              </View>
                            </TouchableOpacity>

                            <AntIcon
                              name="down"
                              color={"#484848"}
                              size={17}
                              style={styles.DetailDoctorCollapseHeaderIcon}
                            />
                          </View>
                        </CollapseHeader>
                        <CollapseBody>
                          <View>
                            <FlatList
                              style={styles.DetailDoctorCollapseBodyArea}
                              data={this.state.fetchspecialires[index].services}
                              extraData={this.state}
                              renderItem={({ item, index }) => (
                                <TouchableOpacity
                                  style={
                                    styles.DetailDoctorCollapseBodyTextArea
                                  }
                                >
                                  <Text
                                    style={styles.DetailDoctorCollapseBodyText}
                                  >
                                    {item.title}
                                  </Text>
                                  <View
                                    style={
                                      styles.DetailDoctorCollapseBodyPriceArea
                                    }
                                  >
                                    <View
                                      style={
                                        styles.DetailDoctorCollapseBodyPriceTextArea
                                      }
                                    >
                                      <Text
                                        style={
                                          styles.DetailDoctorCollapseBodyPriceText
                                        }
                                      >
                                        {CONSTANT.DetailDoctorScreenPrice}
                                      </Text>
                                      <Text
                                        style={
                                          styles.DetailDoctorCollapseBodyPriceText
                                        }
                                      >
                                        :
                                      </Text>
                                    </View>
                                    <HTML
                                      numberOfLines={1}
                                      html={item.price}
                                      // containerStyle={styles.mainServiceName}
                                      imagesMaxWidth={
                                        Dimensions.get("window").width
                                      }
                                    />
                                  </View>
                                </TouchableOpacity>
                              )}
                            />
                          </View>
                        </CollapseBody>
                      </Collapse>
                    )}
                  />
                )}
                {this.state.fetchDoctor &&
                  this.state.fetchExperience &&
                  this.state.fetchExperience.length >= 1 &&
                  this.state.fetchrole == "doctors" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenExperience}
                      </Text>
                      {this.state.fetchExperience && (
                        <FlatList
                          style={{}}
                          data={this.state.fetchExperience}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item }) => (
                            <ExperienceCard
                              name={`${entities.decode(item.company_name)}`}
                              start={`${entities.decode(item.start)}`}
                              end={`${entities.decode(item.ending)}`}
                              title={`${entities.decode(item.job_title)}`}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}

                {this.state.fetchDoctor &&
                  this.state.fetchEducation &&
                  this.state.fetchEducation.length >= 1 &&
                  this.state.fetchrole == "doctors" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenEducation}
                      </Text>
                      {this.state.fetchEducation && (
                        <FlatList
                          data={this.state.fetchEducation}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item }) => (
                            <ExperienceCard
                              name={`${entities.decode(item.institute_name)}`}
                              start={`${entities.decode(item.start)}`}
                              end={`${entities.decode(item.ending)}`}
                              title={`${entities.decode(item.degree_title)}`}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}
                {this.state.fetchDoctor &&
                  this.state.fetchspecialities &&
                  this.state.fetchspecialities.length >= 1 &&
                  this.state.fetchrole == "doctors" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenSpecializations}
                      </Text>
                      {this.state.fetchspecialities && (
                        <FlatList
                          data={this.state.fetchspecialities}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item }) => (
                            <SpecializationCard
                              name={`${entities.decode(item.name)}`}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}

                {this.state.fetchDoctor &&
                  this.state.fetchAward &&
                  this.state.fetchAward.length >= 1 &&
                  this.state.fetchrole == "doctors" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenAwardsAndRecognitions}
                      </Text>
                      {this.state.fetchAward && (
                        <FlatList
                          data={this.state.fetchAward}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item }) => (
                            <AwardsAndRecognitionsCard
                              year={`${entities.decode(item.year)}`}
                              title={`${entities.decode(item.title)}`}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}

                {this.state.fetchDoctor &&
                  this.state.fetchMembership &&
                  this.state.fetchMembership.length >= 1 &&
                  this.state.fetchrole == "doctors" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenMemberships}
                      </Text>
                      {this.state.fetchMembership && (
                        <FlatList
                          data={this.state.fetchMembership}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item }) => (
                            <SpecializationCard
                              name={`${entities.decode(item.title)}`}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}

                {this.state.fetchDoctor &&
                  this.state.fetchrole == "doctors" &&
                  this.state.fetchDoctor[0].registration_number != "" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenRegistrations}
                      </Text>
                      <View style={styles.DetailDoctorRegistrationArea}>
                        {this.state.fetchDoctor && (
                          <Text style={styles.DetailDoctorRegistrationText}>
                            {this.state.fetchDoctor[0].registration_number}
                          </Text>
                        )}
                      </View>
                    </View>
                  )}

                {this.state.fetchDoctor &&
                  this.state.fetchDownload &&
                  this.state.fetchDownload.length >= 1 &&
                  this.state.fetchrole == "doctors" && (
                    <View>
                      <Text style={styles.MainHeadingTextStyle}>
                        {CONSTANT.DetailDoctorScreenDownloads}
                      </Text>
                      {this.state.fetchDownload && (
                        <FlatList
                          data={this.state.fetchDownload}
                          keyExtractor={(x, i) => i.toString()}
                          renderItem={({ item }) => (
                            <DownloadCard
                              name={`${entities.decode(item.download_name)}`}
                              size={`${entities.decode(item.download_size)}`}
                              Url={`${entities.decode(item.download_url)}`}
                            />
                          )}
                        />
                      )}
                    </View>
                  )}

                {this.state.fetchGalleryImages && (
                  <>
                    <Text style={styles.MainHeadingTextStyle}>
                      {CONSTANT.DetailDoctorScreenGallery}
                    </Text>
                    <GallerySwiper
                      style={styles.DetailDoctorGalleryArea}
                      images={this.state.fetchGalleryImages}
                      initialNumToRender={1}
                      sensitiveScroll={false}
                      resizeMode={"cover"}
                    />
                  </>
                )}
              </View>
            ) : null}

            {this.state.OnlineConsultation === "yes" ? (
              <View>
                {this.state.fetchDoctor && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DetailDoctorScreenConsultationBy} “
                    {this.state.fetchDoctor[0].name}”
                  </Text>
                )}
                {this.state.fetchConsultationData.length >= 1 ? (
                  <FlatList
                    style={{}}
                    data={this.state.fetchConsultationData}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => (
                      <OnlineConsultationCard
                        image={{ uri: `${item.image_url}` }}
                        Name={`${item.name}`}
                        date={`${entities.decode(item.date)}`}
                        coment={`${entities.decode(item.comment)}`}
                        title={`${entities.decode(item.title)}`}
                      />
                    )}
                  />
                ) : (
                  <View style={styles.NoDataArea}>
                    <Image
                      resizeMode={"contain"}
                      style={styles.NoDataImage}
                      source={require("../../Assets/Images/arrow.png")}
                    />
                    <Text style={styles.NoDataText1}>{CONSTANT.Oops}</Text>
                    <Text style={styles.NoDataText2}>
                      {CONSTANT.NoDataAvailable}
                    </Text>
                  </View>
                )}
              </View>
            ) : null}

            {this.state.OnboardDoctor === "yes" ? (
              <View>
                {this.state.fetchDoctor && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DetailDoctorScreenTeamBy} “
                    {this.state.fetchDoctor[0].name}”
                  </Text>
                )}
                {this.state.fetchOnboardDoctorData[0].hasOwnProperty('type')  ? 
                
                <View style={styles.NoDataArea}>
                    <Image
                      resizeMode={"contain"}
                      style={styles.NoDataImage}
                      source={require("../../Assets/Images/arrow.png")}
                    />
                    <Text style={styles.NoDataText1}>{CONSTANT.Oops}</Text>
                    <Text style={styles.NoDataText2}>
                      {CONSTANT.NoDataAvailable}
                    </Text>
                  </View>
                :  (
                  <FlatList
                    style={{}}
                    data={this.state.fetchOnboardDoctorData}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => (
                      <TopRatedCard
                        profileImage={{ uri: `${item.image}` }}
                        specialities={`${entities.decode(
                          item.specialities.name
                        )}`}
                        name={`${entities.decode(item.name)}`}
                        sub_heading={`${entities.decode(item.sub_heading)}`}
                        total_rating={`${entities.decode(item.total_rating)}`}
                        average_rating={`${entities.decode(
                          item.average_rating
                        )}`}
                        featured_check={`${entities.decode(item.featured)}`}
                        verified={`${entities.decode(item.is_verified)}`}
                        verified_medically={`${entities.decode(
                          item.is_verified
                        )}`}
                        // role={`${entities.decode(item.role)}`}
                      />
                    )}
                  />
                )}
              </View>
            ) : null}

            {this.state.Feedback === "yes" ? (
              <View>
                <Text style={styles.MainHeadingTextStyle}>
                  {CONSTANT.DetailDoctorScreenPatientFeedback}
                </Text>
                {this.state.fetchfeedback.length >= 1 ? (
                  <FlatList
                    data={this.state.fetchfeedback}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => (
                      <PatientFeedBackCard
                        tagline={`${entities.decode(item.tag_line)}`}
                        name={`${entities.decode(item.name)}`}
                        date={`${entities.decode(item.date)}`}
                        is_verified={`${entities.decode(item.is_verified)}`}
                        content={`${entities.decode(item.content)}`}
                        recommend={`${entities.decode(item.recommend)}`}
                        recommend_text={`${entities.decode(
                          item.recommend_text
                        )}`}
                        image_url={{ uri: `${item.image_url}` }}
                      />
                    )}
                  />
                ) : (
                  <View style={styles.NoDataArea}>
                    <Image
                      resizeMode={"contain"}
                      style={styles.NoDataImage}
                      source={require("../../Assets/Images/arrow.png")}
                    />
                    <Text style={styles.NoDataText1}>{CONSTANT.Oops}</Text>
                    <Text style={styles.NoDataText2}>
                      {CONSTANT.NoDataAvailable}
                    </Text>
                  </View>
                )}
              </View>
            ) : null}

            {this.state.Articles === "yes" ? (
              <View>
                {this.state.fetchDoctor && (
                  <Text style={styles.MainHeadingTextStyle}>
                    {CONSTANT.DetailDoctorScreenArticlesBy} “
                    {this.state.fetchDoctor[0].name}”
                  </Text>
                )}
                {this.state.fetchArticle.length >= 1 ? (
                  <FlatList
                    data={this.state.fetchArticle}
                    keyExtractor={(x, i) => i.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          this.props.navigation.navigate("ArticleDetailPage", {
                            itemId: item.ID,
                          });
                        }}
                      >
                        <ArticlesCard
                          image={{ uri: `${item.image_url}` }}
                          likes={`${item.likes}`}
                          views={`${item.views}`}
                          category={`${entities.decode(item.categories.name)}`}
                          title={`${entities.decode(item.title)}`}
                          date={`${entities.decode(item.posted_date)}`}
                        />
                      </TouchableOpacity>
                    )}
                  />
                ) : (
                  <View style={styles.NoDataArea}>
                    <Image
                      resizeMode={"contain"}
                      style={styles.NoDataImage}
                      source={require("../../Assets/Images/arrow.png")}
                    />
                    <Text style={styles.NoDataText1}>{CONSTANT.Oops}</Text>
                    <Text style={styles.NoDataText2}>
                      {CONSTANT.NoDataAvailable}
                    </Text>
                  </View>
                )}
              </View>
            ) : null}
          </View>
        </ScrollView>

       { this.state.floatvisible &&
       <>
        {this.state.fetchrole == "doctors" ? (
          <FloatingAction
          ref={(ref) => { this.floatingAction = ref; }}
            color={"#3fabf3"}
            actions={this.state.actions}
            onPressItem={(name) => {
              console.log(`selected button: ${name}`);
            }}
          />
        ) : (
          <FloatingAction
          ref={(ref) => { this.floatingAction = ref; }}
            color={"#3fabf3"}
            actions={this.state.HosActions}
            onPressItem={(name) => {
              console.log(`selected button: ${name}`);
            }}
          />
        )}
        </>
        }
      </View>
    );
  }
}
export default DetailDoctorScreen;
