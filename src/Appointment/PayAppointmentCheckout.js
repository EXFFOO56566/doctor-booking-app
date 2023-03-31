import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image  , Alert} from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import CONSTANT from '../Constants/local';
import CustomHeader from '../Header/CustomHeader';
import { WebView } from 'react-native-webview';
import styles from '../styles/DoctreatAppStyles';
import {I18nManager} from 'react-native';
import {NavigationActions} from 'react-navigation'; 
class PayAppointmentCheckout extends Component {
  render() {
    const { params } = this.props.navigation.state;
 
    return (
      <View style={styles.PayAppointmentCheckoutcontainer}>
        <View>
        <View style={styles.HeaderArea}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Home")}
            style={styles.HeaderBackBTN}
          >
            <AntIcon name="back" size={25} color={"#fff"} 
              style={{transform:I18nManager.isRTL ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}]}}
            />
          </TouchableOpacity>
          <View style={styles.HeaderHeadingArea}>
            <Text style={styles.HeaderHeadingText}>
              {CONSTANT.PayAppointmentCheckoutBuyNow}
            </Text>
          </View>
          <View style={styles.HeaderBackBTN} />
        </View>
      </View>
        <WebView source={{ uri: params.url }} />
      </View>
    );
  }
}
export default PayAppointmentCheckout;
