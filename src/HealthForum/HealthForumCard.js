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

class HealthForumCard extends Component {
  render() {
    return (
      <View activeOpacity={0.7} style={styles.healthForumContainer}>
        <View style={styles.healthForumMainLayoutServices}>
          <View
            style={styles.healthForumMainArea}>
            <View
              style={styles.healthForumImageArea}>
              <Image
                style={styles.healthForumImageStyle}
                source={this.props.image}
              />
            </View>

            <View style={styles.healthForumTextArea}>
              <Text
                style={styles.healthForumNameText}>
                {this.props.name}
              </Text>
              <Text
                style={styles.healthForumDataText}>
                {this.props.date}
              </Text>
              <View style={styles.healthForumMainServiceNameArea}>
                <Text style={styles.healthForumMainServiceName}>
                  { this.props.answer >= 1 ?
                    (this.props.answer) : 0 }
                </Text>
                <Text style={styles.healthForumMainServiceName2}>
                  {CONSTANT.GetAnswersAnswers}
                </Text>
              </View>
            </View>
          </View>
          <Text
            style={styles.healthForumDetailText}>
            {this.props.detail}
          </Text>
        </View>
      </View>
    );
  }
}
export default withNavigation(HealthForumCard);
