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
class ExperienceCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.props.navigation.navigate("DetailDoctorScreen")}
        style={styles.experienceContainer}
      >
        <View style={styles.experienceMainLayoutServices}>
          <View style={styles.experienceMainServiceNameArea}>
            <Text style={styles.experienceMainServiceName}>
              {this.props.name}{' '}
            </Text>
            <Text style={styles.experienceMainServiceName}>
              ({this.props.start} - {this.props.end})
            </Text>
          </View>
          <Text style={styles.experienceMainServiceName2}>{this.props.title}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(ExperienceCard);
