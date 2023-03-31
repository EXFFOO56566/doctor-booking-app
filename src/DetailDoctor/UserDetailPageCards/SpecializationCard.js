import React, { Component } from "react";
import { View, StyleSheet,TouchableOpacity, StatusBar, ScrollView, Text , Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation'
import * as CONSTANT from "../../Constants/Constant";
import styles from '../../styles/DoctreatAppStyles';
class SpecializationCard extends Component {

  render() {
    return (
        <TouchableOpacity  
          activeOpacity={.7} 
          onPress={()=> this.props.navigation.navigate("DetailDoctorScreen")} 
          style={styles.specializationContainer}
        >
          <View style={styles.specializationMainLayoutServices}>
          <View style={styles.specializationCircle} />
            <Text style={styles.specializationMainServiceName}>{this.props.name}</Text>
          </View>
       </TouchableOpacity>
  
    );
  }
}
export default  withNavigation(SpecializationCard);