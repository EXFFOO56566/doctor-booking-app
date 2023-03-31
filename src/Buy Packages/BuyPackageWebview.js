import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign";
import CONSTANT from '../Constants/local';
import { WebView } from 'react-native-webview';
import styles from '../styles/DoctreatAppStyles';
class BuyPackageWebview extends Component {
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.buyPackagecontainer}>
        <View style={styles.buyPackageMainArea}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack(null)}
            style={styles.buyPackageTouchableArea}
          >
            <AntIcon name="back" size={25} color={"#fff"} />
          </TouchableOpacity>
          <View style={styles.buyPackageBuyNowArea}>
            <View style={styles.buyPackageBuyNowTextArea}>
              <Text style={styles.buyPackageBuyNowTextStyle}>
                {CONSTANT.BuyPackagesBuyNow}
              </Text>
            </View>
          </View>
        </View>
        <WebView source={{ uri: params.url }} />
      </View>
    );
  }
}
export default BuyPackageWebview;
