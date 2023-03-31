import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text } from "react-native";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import styles from '../styles/DoctreatAppStyles';
import CONSTANT from '../Constants/local';

class Location extends Component {
  focus=()=>{
    return
  }
  render() {
    return (
      <View style={styles.Locationcontainer}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <ScrollView>
          <Text style={styles.LocationlocationText}>{CONSTANT.LocationSearchLocation}
          </Text>
          <Input
            style={styles.Locationinput}
            textStyle={styles.LocationinputText}
            placeholder={CONSTANT.LocationSearchLocation}
          />
          <Button onPress={()=> this.props.navigation.navigate("Home")} style={styles.LocationbuttonStyle}>{CONSTANT.LocationSearch}</Button>
          <View style={styles.Locationsingleline} />
          <View style={styles.LocationCurrentLocationStyle}>
            <Text style={styles.LocationCurrentLocationTextStyle}>
              {CONSTANT.LocationCurrentLocation}
            </Text>
            <View style={styles.LocationiconStyle}>
              <AntIcon name="earth" color="#ff5851" size={15} />
            </View>
          </View>
          <View style={styles.Locationsingleline} />
        </ScrollView>
      </View>
    );
  }
}
export default Location;
