import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, FlatList, StatusBar, ScrollView, Text, Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import CONSTANT from '../Constants/local';
import styles from '../styles/DoctreatAppStyles';

class LocationsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
  }
  render() {
    return (
      <TouchableOpacity 
        activeOpacity={.7} 
        onPress={() => this.props.navigation.navigate("DetailDoctorScreen")} 
        style={styles.locationsContainer}
      >
        <View >
          <View style={styles.locationsMainTopRatedStyle}>
            <View style={styles.locationsImageLayoutStyle}>
              <Image
                resizeMode={"cover"} style={styles.locationsImageStyle}
                source={this.props.image}
              />
              <View
                style={styles.locationsFeaturedImageArea}
              />
              <Image
                resizeMode={'contain'} 
                style={styles.locationsFeaturedImageStyle}
                source={require('../../Assets/Images/featured.png')}
              />
            </View>
            <View style={styles.locationsDocContentstyle}>
              <Text style={styles.locationsTitleStyle}>{this.props.specialityName}</Text>
              <View style={styles.locationsDocNameArea}>
                <Text style={styles.locationsDocName}>{this.props.Name}</Text>
                <AntIcon
                  name="heart"
                  color={"#3fabf3"}
                  size={12}
                  style={styles.locationsIconStyle}
                />
                <AntIcon
                  name="checkcircle"
                  color={"#1abc9c"}
                  size={12}
                  style={styles.locationsIconStyle}
                />
              </View>
              <Text numberOfLines={1} 
                style={styles.locationsTextStyle1}>
                  {this.props.subHeading}
              </Text>
              {/* <View style={{flexDirection:'row' ,marginTop:2}}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={16}
                      fullStarColor={"#fecb02"}
                      emptyStarColor={"#fecb02"}
                      rating={4}
                      selectedStar={rating => this.onStarRatingPress(rating)}
                    />
                    <Text style={{marginLeft:10 , color:'#767676', fontSize:13}}>2100 Feedback</Text>
                  </View> */}
              <View style={styles.locationsDocNameArea}>
                <AntIcon
                  name="pushpino"
                  color={"#3d4461"}
                  size={11}
                  style={styles.locationsIconStyle}
                />
                <Text style={styles.locationsTextStyle1}>{this.props.location}</Text>
              </View>
              <View style={styles.locationsDocNameArea}>
                <AntIcon
                  name="calendar"
                  color={"#3d4461"}
                  size={11}
                  style={styles.locationsIconStyle}
                />
                <FlatList
                  horizontal={true}
                  style={{}}
                  data={this.props.booking_days}
                  keyExtractor={(x, i) => i.toString()}
                  renderItem={({ item }) => (
                    <Text style={styles.locationsTextStyle2}>{item.name}  </Text>
                  )
                  }
                />

              </View>
              <View style={styles.locationsDocNameArea}>
                <AntIcon
                  name="like2"
                  color={"#3d4461"}
                  size={11}
                  style={styles.locationsIconStyle}
                />
                <Text style={styles.locationsTextStyle1}>{CONSTANT.LocationCardOnboardDoctors} {this.props.onboard_doctors}</Text>
              </View>
              <View style={styles.locationsDocNameArea}>
                <AntIcon
                  name="calendar"
                  color={"#3d4461"}
                  size={11}
                  style={styles.locationsIconStyle}
                />
                <Text style={styles.locationsTextStyle2}>{CONSTANT.LocationCardAvailability} {this.props.availability}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>

    );
  }
}
export default withNavigation(LocationsCard);
