import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Text,
  Image
} from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CONSTANT from '../Constants/local';
import styles from "../styles/DoctreatAppStyles";

class TopRatedCard extends Component {
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
      <View style={styles.TopRatedCardcontainer}>
        <View style={styles.ImageLayoutStyle}>
          <Image
            resizeMode="contain"
            style={styles.ImageStyle}
            source={this.props.profileImage}
          />
          {this.props.featured_check == "yes" && (
            <View style={styles.topRatedCardArea} />
          )}
          {this.props.featured_check == "yes" && (
            <Image
              resizeMode={"contain"}
              style={styles.topRatedCardImage}
              source={require("../../Assets/Images/featured.png")}
            />
          )}
        </View>
        <View style={styles.docContentstyle}>
          {this.props.specialities != "" ? (
            <Text style={styles.titleStyle}>{this.props.specialities}</Text>
          ) : null}
          <View style={styles.topRatedCardName}>
            {this.props.name != "" ? (
              <Text style={styles.DocName}>{this.props.name}</Text>
            ) : null}
            {this.props.verified_medically == "yes" && (
              <AntIcon
                name="star"
                color={"#3fabf3"}
                size={13}
                style={styles.topRatedCardIconOne}
              />
            )}

            {this.props.verified == "yes" && (
              <AntIcon
                name="checkcircle"
                color={"#1abc9c"}
                size={12}
                style={styles.topRatedCardIconTwo}
              />
            )}
          </View>
          {this.props.sub_heading != "" ? (
            <Text style={styles.topRatedCardTextOne}>
              {this.props.sub_heading}
            </Text>
          ) : null}
          <View style={styles.topRatedStarArea}>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.topRatedCardTextTwo}>
                {this.props.total_rating}
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
              rating={this.props.average_rating}
              selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(TopRatedCard);
