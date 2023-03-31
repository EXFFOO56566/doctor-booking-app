import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Button,
  Alert,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {Input, InputProps} from 'react-native-ui-kitten';
import TopCategoryCard from './TopCategoryCard';
import {RadioGroup} from 'react-native-btr';
import TopRatedCard from './TopRatedCard';
import AntIcon from 'react-native-vector-icons/AntDesign';
import CONSTANT from '../Constants/local';
import MultiSelect from 'react-native-multiple-select';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class Home extends Component {
  state = {
    radioButtons: [
      {
        label: CONSTANT.AdvanceSearchRadioButtonOne,
        value: 'doctors',
        checked: true,
        color: '#323232',
        disabled: false,
        fontFamily:CONSTANT.OpenSansRegular,
        size: 7,
      },
      {
        label: CONSTANT.AdvanceSearchRadioButtonTwo,
        value: 'hospitals',
        checked: false,
        color: '#323232',
        disabled: false,
        fontFamily:CONSTANT.OpenSansRegular,
        size: 7,
      },
    ],
    title: '',
    data: [],
    TopRatedData: [],
    projectServicesKnown: '',
    projectServices: [],
    ProjectSpecialitiesKnown: '',
    projectLocationKnown: '',
    ShowAdvanceSearch: false,
    isLoading:true,
    AdvanceSearchShow: true,
    HomeSpecialities:[],
    HomeSpecialitiesInitial:[]
  };
  componentDidMount() {
    this.getUser();
    this.fetchFeaturedDoctorsData();
    this.HomeSpecialitiesSpinner();
    this.ProjectLocationSpinner();
  }
  fetchFeaturedDoctorsData = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'listing/get_doctors?listing_type=featured',
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
      console.log('hello!', JSON.stringify(this.state.TopRatedData))
    }
  };
  ProjectLocationSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + 'taxonomies/get_taxonomy?taxonomy=locations',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        let projectLocation = responseJson;
        this.setState({
          projectLocation,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  HomeSpecialitiesSpinner = async () => {
    return fetch(CONSTANT.BaseUrl + 'taxonomies/get-specilities', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let HomeSpecialities = responseJson;
        this.setState({
          HomeSpecialities:HomeSpecialities
        });
        for(var i = 0 ; i < this.state.HomeSpecialities.length; i++)
        {
           this.state.HomeSpecialities[i].name = entities.decode(this.state.HomeSpecialities[i].name)
        }
        console.log('Home Specialities', this.state.HomeSpecialities)
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectServicesSpinner = async () => {
    const {
      ProjectSpecialitiesKnown,
      projectServices,
      projectSpecialityServices,
    } = this.state;
    if (ProjectSpecialitiesKnown != '') {
      const response = await fetch(
        CONSTANT.BaseUrl +
          'taxonomies/get_servicess?speciality='+JSON.stringify(ProjectSpecialitiesKnown[0]),
      );
      const json = await response.json();
      console.log(json);
      if (Array.isArray(json) && json && json.type && json.type === 'error') {
        this.setState({projectServices: [], isLoading: false}); // empty data set
      } else {
        this.setState({projectServices: json, isLoading: false});
        console.log('projectServices', JSON.stringify(this.state.projectServices))
      }
    }
  };
  Search = () => {
    let selectedItem = this.state.radioButtons.find(e => e.checked == true);
    selectedItem = selectedItem
      ? selectedItem.value
      : this.state.radioButtons[0].value;
    const {title, ProjectSpecialitiesKnown, projectLocationKnown} = this.state;
    this.props.navigation.navigate('SearchResultScreen', {
      title: title,
      selectedItem: selectedItem,
      location: projectLocationKnown,
      Speciality: ProjectSpecialitiesKnown,
    });
  };
   onAdvanceSearchPress = () => {
    this.setState({
      ShowAdvanceSearch: true,
      AdvanceSearchShow: false,
    });
  };
  onCancleSearchPress = () => {
    this.setState({
      ShowAdvanceSearch: false,
      ProjectSpecialitiesKnown: '',
      projectLocationKnown: '',
      projectServicesKnown:'',
      AdvanceSearchShow: true,
    });
  };
  fetchData = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'taxonomies/get-specilities',
    );
    const json = await response.json(); 
    this.setState({data: json });
  };
  getUser = async () => {
    this.fetchData();
  };

  render() {
    const {ShowAdvanceSearch , isLoading} = this.state;

    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar hidden />}
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          //nestedScrollEnabled={true}
        >
          <View style={styles.HomeHeader}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.HomeHeaderText}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.HomeHeaderSearchText}
              onChangeText={title => this.setState({title})}
              style={styles.TextInputLayoutStyle}
            />
            {ShowAdvanceSearch == false ?
            <TouchableOpacity onPress={this.Search} style={styles.buttonHover}>
              <Text style={styles.buttonHoverText}>
                {CONSTANT.HomeHeaderSearchButton}
              </Text>
            </TouchableOpacity>:null}
            { this.state.AdvanceSearchShow == true &&
              <View style={styles.AdvanceSearchArea}>
                <Text
                  onPress={this.onAdvanceSearchPress}
                  style={styles.AdnanceSearchStyle}>
                  {CONSTANT.HomeHeaderAdvanceSearch}
                </Text>
                <AntIcon
                onPress={this.onAdvanceSearchPress}
                  name="bars"
                  color={'#767676'}
                  size={17}
                  style={styles.AdvanceSearchIcon}
                />
              </View>
            }
          </View>
          {ShowAdvanceSearch == true ? (
            <View>
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.AdvanceSerchHeaderText}
              </Text>
              <View style={styles.borderStyle}>
                <RadioGroup
                  color="#3fabf3"
                  labelStyle={styles.RadioLabelStyle}
                  radioButtons={this.state.radioButtons}
                  onPress={radioButtons => this.setState({radioButtons})}
                  style={styles.RadioButtonStyle}
                />
              </View>

              <View style={styles.MultiSelectArea}>
                <MultiSelect 
                  styleListContainer={{maxHeight:150}}
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({projectLocationKnown: value})
                  }
                  uniqueKey="slug"
                  items={this.state.projectLocation}
                  selectedItems={this.state.projectLocationKnown}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText={CONSTANT.AdvanceSearchLocation}
                  onChangeInput={text => console.log(text)}
                  selectText={CONSTANT.AdvanceSearchLocation}
                  styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                  styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                  displayKey="name"
                  submitButtonText={CONSTANT.Submit}
                />
              </View>

              <View style={styles.MultiSelectArea}>
                <MultiSelect 
                //flatListProps={{nestedScrollEnabled:true}}
                //fixedHeight={true}
                styleListContainer={{maxHeight:150}}
                  ref={component => {
                    this.multiSelect = component;
                  }}
                  onSelectedItemsChange={value =>
                    this.setState({
                      projectServices:[],
                      ProjectSpecialitiesKnown: value},
                      this.ProjectServicesSpinner,)
                  }
                  uniqueKey="id"
                  items={this.state.HomeSpecialities}
                  selectedItems={this.state.ProjectSpecialitiesKnown}
                  borderBottomWidth={0}
                  single={true}
                  searchInputPlaceholderText={CONSTANT.AdvanceSearchSpeciality}
                  onChangeInput={text => console.log(text)}
                  selectText={CONSTANT.AdvanceSearchSpeciality}
                  styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                  styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                  displayKey="name"
                  submitButtonText={CONSTANT.Submit}
                />
              </View>
              {this.state.projectServices.length >= 1 ? 
               <View style={styles.MultiSelectArea}>
              
               <MultiSelect 
                styleListContainer={{maxHeight:150}}
                 ref={component => {
                   this.multiSelect = component;
                 }}
                 onSelectedItemsChange={ value => this.setState({projectServicesKnown: value}) }
                 uniqueKey="id"
                 items={this.state.projectServices}
                 selectedItems={this.state.projectServicesKnown}
                 borderBottomWidth={0}
                 single={true}
                 searchInputPlaceholderText={CONSTANT.AdvanceSearchService}
                 onChangeInput={text => console.log(text)}
                 selectText={CONSTANT.AdvanceSearchService}
                 styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                 styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                 displayKey="name"
                 submitButtonText={CONSTANT.Submit}
               />
             </View>
             : null
              }
              <TouchableOpacity
                onPress={this.Search}
                style={styles.buttonHover}>
                <Text style={styles.buttonHoverText}>
                  {CONSTANT.AdvanceSearchApplyButton}
                </Text>
              </TouchableOpacity>
              <View style={styles.buttonClearFilterStyle}>
                <Text
                  onPress={this.onCancleSearchPress}
                  style={styles.AdnanceSearchStyle}>
                  {CONSTANT.AdvanceSearchClearButton}
                </Text>
                <AntIcon
                 onPress={this.onCancleSearchPress}
                  name="close"
                  color={'#767676'}
                  size={17}
                  style={styles.AdvanceSearchIconStyle}
                />
              </View>
            </View>
          ) : null}

          <View style={styles.bannerArea}>
            <View style={styles.bannerImgArea}>
              <Image
                source={require('../../Assets/Images/docdemo.png')}
                style={styles.bannerImage}></Image>
            </View>
            <View style={styles.bannerTextArea}>
              <Text style={styles.bannerTextOne}>{CONSTANT.BannerTextOne}</Text>
              <Text style={styles.bannerTextTwo}>{CONSTANT.BannerTextTwo}</Text>
            </View>
            <View style={styles.bannerButtonArea}>
              <TouchableOpacity onPress={()=> this.props.navigation.navigate("SignupScreen")} style={styles.bannerButton}>
                <Text style={styles.bannerButtonText}>
                  {CONSTANT.BannerButton}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          { this.state.data.length >=1 &&
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.CategoriesSection}
            </Text>
          }
          <View style={styles.TopCatCardManagment}>
            <ScrollView
              style={styles.TopCatCardArea}
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <FlatList
                data={this.state.data}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({item}) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => this.props.navigation.navigate(
                        'SearchResultTopCategory',
                        {
                          Speciality: item.id,
                        },
                      )
                    }>
                    <TopCategoryCard
                      imageUri={{uri: `${item.url}`}}
                      name={`${entities.decode(item.name)}`}
                      colorCode={item.color}
                    />
                  </TouchableOpacity>
                )}
                horizontal={true}
              />
            </ScrollView>
          </View>
          { this.state.TopRatedData.length >= 1 &&
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.TopRatedSection}
            </Text>
          }
          <View style={styles.TopRatedCardManagment}>
            <FlatList
              style={styles.TopRatedFlatlistStyle}
              data={this.state.TopRatedData}
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
                    specialities={`${entities.decode(item.specialities.name)}`}
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
            />
          </View>
         
        </ScrollView>
      </View>
    );
  }
}
export default Home;

