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
import {withNavigation, DrawerActions} from 'react-navigation';
import CONSTANT from '../Constants/local';

class MessageMainLayout extends Component {
  render() {
    return (
      <View style={styles.mainLayoutcontainer}>
        <View style={styles.mainLayoutArea}>

          <View style={styles.mainLayoutMainTopRatedStyle}>
            <View style={styles.mainLayoutImageLayoutStyle}>
              <Image
                resizeMode="contain"
                style={styles.mainLayoutImageStyle}
                source={this.props.image}
              />
            </View>
            <View style={styles.mainLayoutdocContentstyle}>
              <View style={styles.mainLayoutdocTextArea}>
                <Text numberOfLines={1} style={styles.mainLayoutDocName}>
                  {this.props.name}
                </Text>
              </View>
              <Text numberOfLines={1} style={styles.mainLayouttitleStyle}>
                {this.props.message}
              </Text>
            </View>
            <View style={styles.mainLayoutCountArea}>
              <Text numberOfLines={1} style={styles.mainLayoutCountText}>
                {this.props.count}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(MessageMainLayout);
