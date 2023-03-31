import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import CONSTANT from '../Constants/local';
import CustomHeader from '../Header/CustomHeader';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import FavDoctors from './FavDoctors';
import FavHospitals from './FavHospitals';
import FavArticles from './FavArticles';
import {Button} from 'native-base';
class FavoriteListing extends Component {
  render() {
    return (
      <View style={styles.favListingContainer}>
        <CustomHeader headerText={CONSTANT.FavoritesFavoriteListing} />

        <ScrollableTabView
          tabBarTextStyle={styles.favListingTextStyle}
          tabBarUnderlineStyl={styles.favListingUnderlineStyle}
          tabBarActiveTextColor={CONSTANT.primaryColor}
          style={styles.favListingStyle}
          showsHorizontalScrollIndicator={false}>
          <FavDoctors style={styles.favListingTebHeadingFontFamily} tabLabel={CONSTANT.FavoritesDoctors} />
          <FavHospitals style={styles.favListingTebHeadingFontFamily} tabLabel={CONSTANT.FavoritesHospitals} />
          {/* <FavArticles tabLabel={CONSTANT.FavoritesArticles} /> */}
        </ScrollableTabView>
      </View>
    );
  }
}
export default FavoriteListing;
