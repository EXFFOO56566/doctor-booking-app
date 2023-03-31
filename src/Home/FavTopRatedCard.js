import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Text,
  Image,
  AsyncStorage,
  Alert
} from 'react-native';
import StarRating from 'react-native-star-rating';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import axios from "axios";
import CONSTANT from '../Constants/local';
import styles from '../styles/DoctreatAppStyles';

class FavTopRatedCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 3.5,
    };
  }
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  DeleteRecord= async()=>{
    const Uid = await AsyncStorage.getItem("projectUid");
      axios
        .post(CONSTANT.BaseUrl + "profile/delete_saved_items", {
            item_id: this.props.id,
            user_id: Uid,
            item_type:'_saved_doctors',
        })
        .then(async response => {
          if (response.status === 200) {
            Alert.alert(CONSTANT.Success , JSON.stringify(response.data.message))
          } else if (response.status === 203) {
            Alert.alert(CONSTANT.Oops , JSON.stringify(response.data.message))
          }
        })
        .catch(error => {
          Alert.alert(error);
          console.log(error);
        });
  }
  render() {
    return (
        
      <View style={styles.TopRatedCardcontainer}>
        <View>
          <View style={[styles.FavMainTopRatedStyle , {justifyContent:'space-between'}]}>
          <View style={{flexDirection:'row', width:'85%'}}>
            <View style={styles.ImageLayoutStyle}>
              <Image
                resizeMode="contain"
                style={styles.ImageStyle}
                source={this.props.profileImage}
              />
              {this.props.featured_check == 'yes' && (
                <View
                  style={styles.topRatedCardArea}
                />
              )}
              {this.props.featured_check == 'yes' && (
                <Image
                  resizeMode={'contain'}
                  style={styles.topRatedCardImage}
                  source={require('../../Assets/Images/featured.png')}
                />
              )}
            </View>
            <View style={styles.docContentstyle}>
              <Text style={styles.titleStyle}>{this.props.specialities}</Text>
              <View style={styles.topRatedCardName}>
                <Text style={styles.DocName}>{this.props.name}</Text>
                {this.props.verified_medically == 'yes' && (
                  <AntIcon
                    name="star"
                    color={'#3fabf3'}
                    size={13}
                    style={styles.topRatedCardIconOne}
                  />
                )}

                {this.props.verified == 'yes' && (
                  <AntIcon
                    name="checkcircle"
                    color={'#1abc9c'}
                    size={12}
                    style={styles.topRatedCardIconTwo}
                  />
                )}
              </View>
              <Text style={styles.topRatedCardTextOne}>
                {this.props.sub_heading}
              </Text>
              <View style={styles.topRatedStarArea}>
                <View style={{flexDirection:'row'}}>
                  <Text
                    style={styles.topRatedCardTextTwo}>
                    {this.props.total_rating}
                  </Text>
                  <Text
                    style={styles.topRatedCardTextTwo}>
                    {CONSTANT.TopRatedCardFeedback}
                  </Text>
                </View>
                
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={13}
                  fullStarColor={'#fecb02'}
                  emptyStarColor={'#fecb02'}
                  rating={this.props.average_rating}
                  selectedStar={rating => this.onStarRatingPress(rating)}
                />
              </View>
            </View>
            </View>
            <View style={{width:'15%', height:'100%'}}>
                <TouchableOpacity onPress={()=> this.DeleteRecord()} style={{backgroundColor:'#ff5851' , borderRadius:3  ,justifyContent:'center' , flexDirection:'row', height:'100%', alignItems:"center"}}>
                    <AntIcon 
                    name="delete"
                    color={"#fff"}
                    size={20}
                    />
                </TouchableOpacity>
            </View>
            </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(FavTopRatedCard);