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
import styles from '../../styles/DoctreatAppStyles';
import StarRating from 'react-native-star-rating';
import {Input, InputProps} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import {Tooltip, Button} from 'react-native-ui-kitten';

class ReceiveMessageLayout extends Component {
  render() {
    return <View style={styles.ReceivedMessagescontainer}></View>;
  }
}
export default withNavigation(ReceiveMessageLayout);
