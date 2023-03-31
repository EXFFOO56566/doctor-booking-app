import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  FlatList,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import CONSTANT from '../Constants/local';
import CustomHeader from '../Header/CustomHeader';
import {withNavigation} from 'react-navigation';
import ArticlesCard from '../DetailDoctor/ArticlesCard';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import {Button} from 'native-base';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class FavArticles extends Component {
  state = {
    data: [],
    TopRatedData: [],
  };

  componentDidMount() {
    this.fetchFavArticlesData();
  }
  fetchFavArticlesData = async () => {
    const id = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl +
        'user/get_wishlist?profile_id=' +
        id +
        '&type=articles',
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({TopRatedData: [], isLoading: false}); // empty data set
    } else {
      this.setState({TopRatedData: json, isLoading: false});
    }
  };
  render() {
    return (
      <View style={styles.favArticleContainer}>
        <View style={styles.favArticleTopRatedCardManagment}>
          {this.state.TopRatedData.length >= 1 ? (
            <FlatList
              style={{}}
              data={this.state.TopRatedData}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => (
                <ArticlesCard
                  image={{uri: `${item.image}`}}
                  likes={`${item.likes}`}
                  views={`${item.views}`}
                  category={`${entities.decode(item.category.title)}`}
                  title={`${entities.decode(item.title)}`}
                  date={`${entities.decode(item.publish_date)}`}
                />
              )}
            />
          ) : (
            <View
              style={styles.favArticleArea}>
              <Image
                resizeMode={'contain'}
                style={styles.favArticleImageStyle}
                source={require('../../Assets/Images/arrow.png')}
              />
              <Text
                style={styles.favArticleOopsText}>
                {CONSTANT.Oops}
              </Text>
              <Text style={styles.favArticleNoDataText}>
                {CONSTANT.NoDataAvailable}
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default withNavigation(FavArticles);
