import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {SwipeRow, List, Content} from 'native-base';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import Dash from 'react-native-dash';
import SwipeCards from 'react-native-swipeable-cards';
import CONSTANT from '../Constants/local';
class TeamListCard extends React.Component {
  render() {
    return (
      <View style={styles.TeamListCardcontainer}>
        <View>
          <View style={styles.TeamListCardMainTopRatedStyle}>
            <View style={styles.TeamListCardImageLayoutStyle}>
              <Image
                resizeMode="contain"
                style={styles.TeamListCardImageStyle}
                source={this.props.TeamImage}
              />
            </View>
            <View style={styles.TeamListCarddocContentstyle}>
              <View style={styles.TeamListCardDocNameArea}>
                <Text style={styles.TeamListCardDocName}>{this.props.name}</Text>
              </View>
              <View style={styles.TeamListCardDocStatusArea}>
                <Text style={styles.TeamListCardDocStatusTextOne}>
                  {CONSTANT.TeamListCardStatus}{' '}
                </Text>
                <Text
                  style={styles.TeamListCardDocStatusTextTwo}>
                  {this.props.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(TeamListCard);
