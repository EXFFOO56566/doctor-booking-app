import React, { Component } from "react";
import { View, StyleSheet, StatusBar, ScrollView, Text , Image , Alert , Dimensions} from "react-native";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import CONSTANT from '../Constants/local';
import styles from '../styles/DoctreatAppStyles';

class TopCategoryCard extends Component {
  render() {

    return (
      <View style={styles.TopCategoryCardcontainer}>
      
        <View style={[ styles.CardMainView, {backgroundColor: this.props.colorCode} ]}>
        <View style={styles.ThirdLayerStyle}>
        </View>
        <View style={styles.SecondLayerStyle}>
         </View>
         <View style={styles.FirstLayerStyle}>
         <Image resizeMode={'contain'} style={styles.CatImageStyle}
          source={this.props.imageUri}
        />
         </View>
        <Text numberOfLines={1} style={styles.CardMainViewText}>{this.props.name}</Text>
       </View>
    
      </View>
    );
  }
}
export default TopCategoryCard;
