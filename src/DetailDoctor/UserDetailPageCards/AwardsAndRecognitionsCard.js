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
import styles from '../../styles/DoctreatAppStyles';
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import * as CONSTANT from "../../Constants/Constant";
class AwardsAndRecognitionsCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.props.navigation.navigate("DetailDoctorScreen")}
        style={styles.AwardContainer}
      >
        <View style={styles.AwardMainLayoutServices}>
          <Text style={styles.AwardMainServiceName}>
            {this.props.title} ( {this.props.year} )
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(AwardsAndRecognitionsCard);
