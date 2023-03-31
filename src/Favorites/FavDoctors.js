import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  NativeModules,
  TextInput,
  BackHandler,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import AntIcon from "react-native-vector-icons/AntDesign";
import RNRestart from "react-native-restart";
import axios from "axios";
import CONSTANT from '../Constants/local';
import FavTopRatedCard from "../Home/FavTopRatedCard";
import { withNavigation } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import { ScrollableTabView } from "react-native-scrollable-tab-view";
import { Button } from "native-base";
import StarRating from "react-native-star-rating";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class FavDoctors extends Component {
  state = {
    data: [],
    TopRatedData: [],
    isLoading: false,
    starCount: 3.5,
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    this.fetchFavDoctorsData();
  }
  fetchFavDoctorsData = async () => {
    this.setState({
      isLoading: true,
    });
    const id = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(
      CONSTANT.BaseUrl + "user/get_wishlist?profile_id=" + id + "&type=doctors"
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ TopRatedData: [], isLoading: false }); // empty data set
    } else {
      this.setState({ TopRatedData: json, isLoading: false });
    }
  };
  deleteAllFavdoctorsData = async () => {
    this.setState({
      isLoading: true,
    });
    const id = await AsyncStorage.getItem("projectProfileId");
    axios
      .post(CONSTANT.BaseUrl + "user/delete_wishlists", {
        profile_id: id,
        type: "doctors",
      })
      .then(async (response) => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
          this.setState({ TopRatedData: [], isLoading: false });
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        Alert.alert(error);
        console.log(error);
      });
  };
  DeleteRecord = async (itemID) => {
    this.setState({
      isLoading: true,
    });
    const Uid = await AsyncStorage.getItem("projectUid");
    axios
      .post(CONSTANT.BaseUrl + "profile/delete_saved_items", {
        item_id: itemID,
        user_id: Uid,
        item_type: "_saved_doctors",
      })
      .then(async (response) => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
          this.fetchFavDoctorsData();
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
        }
      })
      .catch((error) => {
        Alert.alert(error);
        console.log(error);
      });
  };
  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state;
    return (
      <View style={styles.favDoctorsContainer}>
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <View style={styles.favDoctorsTopRatedCardManagment}>
        {this.state.TopRatedData.length >= 1 &&
          <TouchableOpacity 
          onPress={()=> this.deleteAllFavdoctorsData()}
          style={{height:45,flexDirection:"row",marginHorizontal:10,alignItems:"center",borderColor:"#3D4461",borderWidth:1,justifyContent:"space-between",borderRadius:8,marginBottom:8,marginTop:15,paddingHorizontal:10}}>
          <Text style={styles.DocName}>{CONSTANT.FavoritesRemovedAllDoctors}</Text>
          <AntIcon name="delete" color={"#ff5851"} size={20} />
          </TouchableOpacity>}
          {this.state.TopRatedData.length >= 1 ? (
            <FlatList
              style={{marginTop:10}}
              data={this.state.TopRatedData}
              ListEmptyComponent={this._listEmptyComponent}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.props.navigation.navigate("DetailDoctorScreen", {
                      itemId: item.ID,
                    });
                  }}
                  style={styles.TopRatedCardcontainer}
                >
                        <View style={{ flex:1, flexDirection: "row", width: "85%", alignItems:"center"}}>
                          <View style={styles.ImageLayoutStyle}>
                            <Image
                              resizeMode="contain"
                              style={styles.ImageStyle}
                              source={{ uri: item.image }}
                            />
                            {item.featured == "yes" && (
                              <View style={styles.topRatedCardArea} />
                            )}
                            {item.featured == "yes" && (
                              <Image
                                resizeMode={"contain"}
                                style={styles.topRatedCardImage}
                                source={require("../../Assets/Images/featured.png")}
                              />
                            )}
                          </View>
                          <View style={styles.docContentstyle}>
                            <Text style={styles.titleStyle}>
                              {item.specialities.name}
                            </Text>
                            <View style={styles.topRatedCardName}>
                              <Text style={styles.DocName}>{item.name}</Text>
                              {item.is_verified == "yes" && (
                                <AntIcon
                                  name="star"
                                  color={"#3fabf3"}
                                  size={13}
                                  style={styles.topRatedCardIconOne}
                                />
                              )}

                              {item.is_verified == "yes" && (
                                <AntIcon
                                  name="checkcircle"
                                  color={"#1abc9c"}
                                  size={12}
                                  style={styles.topRatedCardIconTwo}
                                />
                              )}
                            </View>
                            <Text style={styles.topRatedCardTextOne}>
                              {item.sub_heading}
                            </Text>
                            <View style={styles.topRatedStarArea}>
                              <View style={{ flexDirection: "row" }}>
                                <Text style={styles.topRatedCardTextTwo}>
                                  {item.total_rating}
                                </Text>
                                <Text style={styles.topRatedCardTextTwo}>
                                  {CONSTANT.TopRatedCardFeedback}
                                </Text>
                              </View>

                              <StarRating
                                disabled={true}
                                maxStars={5}
                                starSize={13}
                                fullStarColor={"#fecb02"}
                                emptyStarColor={"#fecb02"}
                                rating={item.average_rating}
                                selectedStar={(rating) =>
                                  this.onStarRatingPress(rating)
                                }
                              />
                            </View>
                          </View>
                        </View>
                        <View style={{ width: '15%', height: "100%", alignItems:'flex-end', justifyContent: 'center', }}>
                          <TouchableOpacity
                            onPress={() => this.DeleteRecord(item.ID)}
                            style={{
                              backgroundColor: "#ff5851",
                              borderRadius: 3,
                              justifyContent: "center",
                              height: 80,
                              width:50,
                              alignItems: "center",
                            }}
                          >
                            <AntIcon name="delete" color={"#fff"} size={20} />
                          </TouchableOpacity>
                        </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.favDoctorsArea}>
              <Image
                resizeMode={"contain"}
                style={styles.favDoctorsImageStyle}
                source={require("../../Assets/Images/arrow.png")}
              />
              <Text style={styles.favDoctorsOopsText}>{CONSTANT.Oops}</Text>
              <Text style={styles.favDoctorsNoDataText}>
                {CONSTANT.NoDataAvailable}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default withNavigation(FavDoctors);
