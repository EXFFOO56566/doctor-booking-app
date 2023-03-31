import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import TopRatedCard from '../Home/TopRatedCard';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class SearchResultTopCategory extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      loading: true,
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      data: [],
      Toataldata: [],
      page: 1,
      isLoading: true,
    };
    this.offset = 1;
  }

  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'listing/get_doctors?listing_type=search&specialities=' +
        params.Speciality +
        '&page_number=' +
        this.state.page,
    );
    console.log(
      'This is response 1',
      CONSTANT.BaseUrl +
        'listing/get_doctors?listing_type=search&specialities=' +
        params.Speciality +
        '&page_number=' +
        this.state.page,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({data: [], isLoading: false}); // empty data set
    } else {
      this.offset = this.offset + 1;
      this.setState({data: [...this.state.data, ...this.state.data.concat(json)] , isLoading: false});
      this.setState({Toataldata: json[0].totals, isLoading: false});
    }
  };
  loadMoreData = () => {
    const {params} = this.props.navigation.state;
   
    //On click of Load More button We will call the web API again

      this.setState({ fetching_from_server: true }, () => {
        fetch( CONSTANT.BaseUrl +
          'listing/get_doctors?listing_type=search&specialities=' +
          params.Speciality +
          '&page_number=' +
          this.offset,)
        //Sending the currect offset with get request
            .then(response => response.json())
            .then(responseJson => {
            //Successful response from the API Call 

              //After the response increasing the offset for the next API call.
              if (
                    Array.isArray(responseJson) &&
                    responseJson[0] &&
                    responseJson[0].type &&
                    responseJson[0].type === 'error'
                  ) {
                    this.setState({data: [], isLoading: false}); // empty data set
                  } else {
                    this.offset = this.offset + 1;
                    this.setState({data: this.state.data.concat(responseJson) , isLoading: false  , fetching_from_server: false});
 //                   this.setState({Toataldata: responseJson[0].totals , isLoading: false});
                  }
            })
            .catch(error => {
              console.error(error);
            });
      
       });
    };
  handleLoadMore = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        console.log('This is my page count', this.state.page),
        this.fetchFreelancerData,
      );
      this.onEndReachedCalledDuringMomentum = true;
    }
  };
  _listEmptyComponent = () => {
    return (
      <View
        style={styles.searchResultTopCategoryNoResultArea}>
        <Image
          style={styles.searchResultTopCategoryNoResultImage}
          source={require('../../Assets/Images/arrow.png')}
        />
        <Text
          style={styles.searchResultTopCategoryNoResultText}>
          {CONSTANT.SearchResultNoRecordFound}
        </Text>
      </View>
    );
  };
  renderFooter() {
    console.log("Hello" , this.state.Toataldata.toString() + "-----" + this.state.data.length )
    return (
    //Footer View with Load More button
    <View>
      
      {
        this.state.Toataldata.toString()  != this.state.data.length ?
        <View style={styles.searchResultTopCategoryfooter}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.searchResultTopCategoryloadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.searchResultTopCategoryloadMoreBtn}>
          <Text style={styles.searchResultTopCategorybtnText}>Load More</Text>
          {this.state.fetching_from_server ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>:
      null

      }

    </View>
      
    );
  }
  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.searchResultTopCategorycontainer}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.SearchResultSearchResult} />
        {isLoading ? (
          <View style={styles.searchResultTopCategoryMainArea}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.searchResultTopCategoryMainStyle}
            />
          </View>
        ) : null}
        <ScrollView>
          {/* {this.state.Toataldata != '' ? (
            <Text style={styles.searchResultTopCategoryText}>
              {this.state.Toataldata} {CONSTANT.SearchResultResultFound}
            </Text>
          ) : null} */}
          {this.state.Toataldata != "" ? (
            <View style={{flexDirection:'row'}}>
              <Text style={styles.MainHeadingTextStyle}>
                {this.state.Toataldata}
              </Text>
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.SearchResultResultFound}
              </Text>
            </View>
          ) : null}
          
            <View style={styles.searchResultTopCategoryListArea}>
              {
                this.state.data.length >= 1 ? 
                <FlatList
              style={styles.searchResultTopCategoryListStyle}
              data={this.state.data}
              ListEmptyComponent={this._listEmptyComponent}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    this.props.navigation.navigate('DetailDoctorScreen', {
                      itemId: item.ID,
                    });
                  }}>
                  <TopRatedCard
                    profileImage={{uri: `${item.image}`}}
                    specialities={`${entities.decode(
                      item.specialities.name,
                    )}`}
                    name={`${entities.decode(item.name)}`}
                    sub_heading={`${entities.decode(item.sub_heading)}`}
                    total_rating={`${entities.decode(item.total_rating)}`}
                    average_rating={`${entities.decode(item.average_rating)}`}
                    featured_check={`${entities.decode(item.featured)}`}
                    verified={`${entities.decode(item.is_verified)}`}
                    verified_medically={`${entities.decode(item.is_verified)}`}
                    role={`${entities.decode(item.role)}`}
                  />
                </TouchableOpacity>
              )}
              extraData={this.state}
              ListFooterComponent={this.renderFooter.bind(this)}
            />
            :
            <View
              style={styles.searchResultTopCategoryfavArea}>
              <Image
                resizeMode={'contain'}
                style={styles.searchResultTopCategoryfavImageStyle}
                source={require('../../Assets/Images/arrow.png')}
              />
              <Text
                style={styles.searchResultTopCategoryfavOopsText}>
                {CONSTANT.Oops}
              </Text>
              <Text style={styles.searchResultTopCategoryfavNoDataText}>
                {CONSTANT.NoDataAvailable}
              </Text>
            </View>
              }
             
          </View>
          
     
        </ScrollView>
      </View>
    );
  }
}
export default SearchResultTopCategory;
