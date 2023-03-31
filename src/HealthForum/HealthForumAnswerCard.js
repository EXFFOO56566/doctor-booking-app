import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Text,
  Image,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import StarRating from 'react-native-star-rating';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CONSTANT from '../Constants/local';
import {withNavigation, DrawerActions} from 'react-navigation';

class HealthForumAnswerCard extends Component {
  render() {
    return (
      <View activeOpacity={0.7} style={styles.healthForumAnswerContainer}>
        <View style={styles.healthForumAnswerMainLayoutServices}>
          <View
            style={styles.healthForumAnswerMainArea}>
            <View
              style={styles.healthForumAnswerImageArea}>
              <Image
                style={styles.healthForumAnswerImageStyle}
                source={this.props.image}
              />
            </View>

            <View style={styles.healthForumAnswerTextArea}>
              <Text
                style={styles.healthForumAnswerNameText}>
                {this.props.name}
              </Text>
              <Text
                style={styles.healthForumAnswerDataText}>
                {this.props.date}
              </Text>
            </View>
          </View>
          <Text
            style={styles.healthForumAnswerDetailText}>
            {this.props.detail}
          </Text>
        </View>
      </View>
    );
  }
}
export default withNavigation(HealthForumAnswerCard);
