import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  PanResponder,
  Alert,
  Dimensions,
  AsyncStorage,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {withNavigation, DrawerActions} from 'react-navigation';
import {ScrollableTabView} from 'react-native-scrollable-tab-view';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';
import axios from 'axios';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class YourPayouts extends Component {
  constructor() {
  super();
  this.onEndReachedCalledDuringMomentum = true;
  this.state = {
    data: [],
    Toataldata: "",
    NumberRes:'',
    fetching_from_server: false,
    page: 1,
    loading: true,
    spinner:false,
  };
  this.offset = 1;
}
  componentDidMount() {
    this.fetchPayoutListingData();
  }
  fetchPayoutListingData = async () => {
    this.setState({
      spinner: true
    })
    const id = await AsyncStorage.getItem('projectUid');
    const response = await fetch(
      CONSTANT.BaseUrl + 'profile/get_payout_listings?user_id=' + id + "&page=" +this.offset,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {

      this.setState({PayoutListData: [], spinner: false}); // empty data set
    } else {
      this.offset = this.offset + 1;
      this.setState({
        data: [...this.state.data, ...this.state.data.concat(json.payment_list)],
        spinner: false
      });
      this.setState({ Toataldata: json.total, spinner: false });

    }
  };
  loadMoreData = async() => {
     const id = await AsyncStorage.getItem('projectUid');

    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl + 'profile/get_payout_listings?user_id=' + id + "&page=" +this.offset,
      )
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          if (
            Array.isArray(responseJson) &&
            responseJson[0] &&
            responseJson[0].type &&
            responseJson[0].type === "error"
          ) {
            this.setState({ data: [], isLoading: false }); // empty data set
          } else {
            this.offset = this.offset + 1;
            this.setState({
              data: this.state.data.concat(responseJson.payment_list),
              isLoading: false,
              fetching_from_server: false
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  };
  _listEmptyComponent = () => {
    return (
      <View>
        {this.state.Toataldata == "" ? (
          <View style={styles.SearchResultScreenNoResultArea}>
            <Image
              style={styles.SearchResultScreenNoResultImage}
              source={require("../../Assets/Images/arrow.png")}
            />
            <Text style={styles.SearchResultScreenNoResultText}>
              {CONSTANT.SearchResultNoRecordFound}
            </Text>
          </View>
        ) : (
          Alert.alert(CONSTANT.Oops, "No More Data Available")
        )}
      </View>
    );
  };
  renderFooter() {
    return (
      
      <View>
        {this.state.Toataldata.toString() != this.state.data.length ? (
          <View style={styles.SearchResultScreenfooter}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              style={styles.SearchResultScreenloadMoreBtn}
            >
              <Text style={styles.SearchResultScreenbtnText}>{CONSTANT.LoadMore}</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }

  render() {
    const { spinner } = this.state;
    return (
      <View style={styles.container}>
        {spinner ? (
            <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {this.state.Toataldata != "" ? 
        <View>
          <Text style={{margin: 10, fontSize: 17, fontWeight: '700'}}>
           {CONSTANT.PayoutYourPayments}
          </Text>
        </View>:null}
        {this.state.Toataldata != "" ? 
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          ListEmptyComponent={this._listEmptyComponent}
          keyExtractor={(x, i) => i.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{
                borderColor: '#767676',
                borderRadius: 4,
                borderWidth: 0.6,
                marginHorizontal: 10,
                marginVertical: 5,
                overflow: 'hidden',
              }}
              activeOpacity={0.9}>
              <View>
                <View style={{flexDirection: 'row' , justifyContent:'space-between'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {CONSTANT.PayoutDate}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {item.processed_date}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {CONSTANT.PayoutPayoutDetails}
                  </Text>
                  {
                    item.payment_details.hasOwnProperty("bank_account_number") ?
                    <Text
                    style={{
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {item.payment_details.bank_account_number.slice(0, 4)+'****'}
                    </Text>
                    :
                    <Text
                    style={{
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {CONSTANT.PayoutNoDetail}
                    </Text>
                  }
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                   {CONSTANT.PayoutAmount}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {entities.decode(item.currency_symbol)}
                    {item.amount}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text
                    style={{
                      fontWeight: '700',
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {CONSTANT.PayoutPaymentMethod}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      marginHorizontal: 10,
                      marginVertical: 5,
                    }}>
                    {item.payment_method}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
        :
        <View style={{height:"90%",alignItems:"center",justifyContent:"center"}}>
       
            <Image
              style={styles.SearchResultScreenNoResultImage}
              source={require("../../Assets/Images/arrow.png")}
            />
            <Text style={styles.SearchResultScreenNoResultText}>
              {CONSTANT.SearchResultNoRecordFound}
            </Text>
    
        
      </View> }
        
      </View>
    );
  }
}
export default withNavigation(YourPayouts);
