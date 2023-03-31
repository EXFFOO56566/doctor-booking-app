import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  StatusBar,
  I18nManager
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import CONSTANT from '../Constants/local';

class CustomHeader extends Component {
  // constructor(props){
  //     super(props);
  //     this.showSearch = this.showSearch.bind(this);// you should bind this to the method that call the props

  render() {
    return (
      <View>
        <View style={styles.HeaderArea}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={styles.HeaderBackBTN}
          >
            <AntIcon name="back" size={25} color={"#fff"} 
              style={{transform:I18nManager.isRTL ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}]}}
            />
          </TouchableOpacity>
          <View style={styles.HeaderHeadingArea}>
            <Text style={styles.HeaderHeadingText}>
              {this.props.headerText}
            </Text>
          </View>
          <View style={styles.HeaderBackBTN} />
        </View>
      </View>
      // </TouchableOpacity>
    );
  }
}
export default withNavigation(CustomHeader);
