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
import styles from '../styles/DoctreatAppStyles';
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CONSTANT from '../Constants/local';
class OnlineConsultationCard extends Component {
  render() {
    return (
      <View style={styles.consultationContainer}>
        <View
          style={styles.consultationMain}
        >
          <View style={styles.consultationImageArea}>
            <Image
              resizeMode={"cover"}
              style={styles.consultationImageStyle}
              source={this.props.image}
            />
            <View style={styles.consultationTextArea}>
              <Text
                style={styles.consultationText1}
              >
                {this.props.title}
              </Text>
              <Text
                numberOfLines={1}
                style={styles.consultationText2}
              >
                {CONSTANT.OnlineConsultationCardAnsweredby} “{this.props.Name}”
              </Text>
              
              <Text
                numberOfLines={1}
                style={styles.consultationText2}
              >
                {this.props.date}
              </Text>
            </View>
          </View>
          <Text style={styles.consultationCommentText}>{this.props.coment}</Text>
        </View>
      </View>
    );
  }
}
export default withNavigation(OnlineConsultationCard);
