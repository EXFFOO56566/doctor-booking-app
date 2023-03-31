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
class OfferedServicesCard extends Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => this.props.navigation.navigate("DetailDoctorScreen")}
        style={styles.offerServicesContainer}
      >
        <View style={styles.offerServicesMainLayoutServices}>
          <Image
            resizeMode="cover"
            style={styles.offerServicesImageStyle}
            source={this.props.logo}
          />
          <View style={styles.offerServicesTextArea} />
          <Text numberOfLines={1} style={styles.offerServicesMainServiceName}>
            {this.props.name}
          </Text>
        </View>
        <AntIcon
          name="down"
          color={"#484848"}
          size={17}
          style={styles.offerServicesIconStyle}
        />
      </TouchableOpacity>
    );
  }
}
export default withNavigation(OfferedServicesCard);
