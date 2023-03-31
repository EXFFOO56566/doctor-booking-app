import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  ImageBackground,
  AsyncStorage
} from 'react-native';
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from '../styles/DoctreatAppStyles';
import StarRating from 'react-native-star-rating';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
// import CONSTANT from '../Constants/local';
import CONSTANT from '../Constants/local';
import HealthForumCard from './HealthForumCard';
import MultiSelect from 'react-native-multiple-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class SearchQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedItems: [],
      SpecialityKnown: [],
      Title: '',
      HomeSpecialities:[],
      Description: '',
      Search: '',
      Refresh: false,
      storedType: "",
      spinner:false
    };
  }
  componentWillMount = async ()=> {
    const value = await AsyncStorage.getItem("Language");
    this.getUser();
  }
  getUser = async () => {
    try {

      const storedType = await AsyncStorage.getItem("user_type");
   

      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      this.HomeSpecialitiesSpinner();
      this.fetchHealthForumBasic();
      this.fetchHealthQuestion();
    } catch (error) {
      // alert(error)
    }
  };
  onSelectedItemsChange = selectedItems => {
    this.setState({selectedItems});
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
      })
      .catch(error => {
        console.error(error);
      });
  };
  fetchHealthForumBasic = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(CONSTANT.BaseUrl + 'forums/basic');
    const json = await response.json();
    this.setState({fetchHealthtitle: json[0].hf_title});
    this.setState({fetchHealthhf_sub_title: json[0].hf_sub_title});
    this.setState({fetchHealthhf_description: json[0].hf_description});
  };
  fetchHealthQuestion = async () => {
    const response = await fetch(CONSTANT.BaseUrl + 'forums/get_listing');
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({HealthQuestion: [], isLoading: false}); // empty data set
    } else {
      this.setState({HealthQuestion: json, isLoading: false});
    }
  };
  fetchSearchQuestion = async () => {
    this.setState({
      HealthQuestion: [],
      spinner:true
    });
    const response = await fetch(
      CONSTANT.BaseUrl +
        'forums/get_listing?specialities=' +
        this.state.SpecialityKnown[0] +
        '&search=' +
        this.state.Search,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({HealthQuestion: [], isLoading: false, spinner:false});
    } else {
      this.setState({HealthQuestion: json, isLoading: false, ExpRefresh: true,  spinner:false});
    }
  };
  submitQuestion = async() => {
    const {reply} = this.state;
    const {params} = this.props.navigation.state;
    const id = await AsyncStorage.getItem('projectUid');
    
    if (
      this.state.Title == '' &&
      this.state.Description == '' &&
      this.state.SpecialityKnown[0] == ''
    ) {
      this.setState({email: 'Please Add Complete Data'});
    } else {
      axios
        .post(CONSTANT.BaseUrl + 'forums/add_question', {
          user_id: id,
          speciality: this.state.SpecialityKnown[0],
          title: this.state.Title,
          description: this.state.Description,
        })
        .then(async response => {
          if (response.status === 200) {
            alert(response.data.message);
          } else if (response.status === 203) {
            alert(response.data.message);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  render() {
    let data = this.state.HomeSpecialities;

    const {isLoading} = this.state;

    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.GetAnswersHeaderText} />
        {isLoading ? (
          <View style={styles.searchQuestionMainArea}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.searchQuestionActivityIndicator}
            />
          </View>
        ) : null}
        <ScrollView>
          <ImageBackground
            source={require('../../Assets/Images/HealthMain.png')}
            style={styles.searchQuestionScrollImageBackground}>
            <View >
              <View style={styles.searchQuestionScrollTextArea}>
                {this.state.fetchHealthtitle ? (
                  <Text style={styles.searchQuestionScrollTitleText}>
                    {this.state.fetchHealthtitle}
                  </Text>
                ):
                null}
                {this.state.fetchHealthhf_sub_title ? (
                  <Text style={styles.searchQuestionScrollSubTitleText}>
                    {this.state.fetchHealthhf_sub_title}
                  </Text>
                ):
                null}
                {this.state.fetchHealthhf_description ? (
                  <Text style={styles.searchQuestionScrollDescriptionText}>
                    {this.state.fetchHealthhf_description}
                  </Text>
                ):
                null}
                <TouchableOpacity
                  onPress={() => { this.state.storedType != '' ?
                    this.RBSheet.open() : Alert.alert(CONSTANT.Sorry , CONSTANT.PleaseLoginFirst);
                  }}
                  style={styles.searchQuestionTouchableArea}>
                  <Text style={styles.searchQuestionTouchableText}>
                    {CONSTANT.GetAnswersPostQuestion}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
          <View style={styles.searchQuestionScrollSearchArea}>
            <View style={styles.searchQuestionScrollSearchTextArea}>
              <Text style={styles.MainHeadingTextStyle}>
                {CONSTANT.GetAnswersSearchQuery}
              </Text>
             
            </View>
            <View style={styles.searchQuestionScrollSearchTextInputArea}>
              <View>
                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.GetAnswersTypeQuery}
                  onChangeText={Search => this.setState({Search})}
                  style={styles.TextInputLayoutStyle}
                />
                <View style={styles.MultiSelectArea}>
                  <MultiSelect 
styleListContainer={{maxHeight:150}}
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({SpecialityKnown: value})
                    }
                    uniqueKey="slug"
                    items={this.state.HomeSpecialities}
                    selectedItems={this.state.SpecialityKnown}
                    borderBottomWidth={0}
                    single={true}
                    selectText={CONSTANT.GetAnswersPickSpeciality}
                    searchInputPlaceholderText={
                      CONSTANT.GetAnswersSearchSpeciality
                    }
                    onChangeInput={text => console.log(text)}
                    displayKey="name"
                    styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                    styleDropdownMenuSubsection={
                      styles.MultiSelectstyleDropdownMenuSubsection
                    }
                    submitButtonText={CONSTANT.GetAnswersSubmit}
                  />
                </View>
                <TouchableOpacity
                  onPress={this.fetchSearchQuestion}
                  style={styles.searchQuestionButtonHover}>
                  <Text style={styles.searchQuestionSearchTouchableText}>
                    {CONSTANT.GetAnswersSearch}
                  </Text>
                  {this.state.spinner == true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.searchQuestionHealthArea}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.GetAnswersPublicHealthForum}
            </Text>
          </View>
          {this.state.HealthQuestion && (
            <FlatList
              style={styles.searchQuestionHealthListStyle}
              data={this.state.HealthQuestion}
              extraData={this.state.Refresh}
              ListEmptyComponent={this._listEmptyComponent}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('GetAnswers', {
                      itemId: item.ID,
                      itemQuestion: item.title,
                    });
                  }}
                  activeOpacity={0.9}>
                  <HealthForumCard
                    image={{uri: `${item.image}`}}
                    name={`${entities.decode(item.title)}`}
                    date={`${entities.decode(item.post_date)}`}
                    answer={`${entities.decode(item.answers)}`}
                    detail={`${entities.decode(item.content)}`}
                  />
                </TouchableOpacity>
              )}
            />
          )}
        </ScrollView>

        <RBSheet
          ref={ref => {
            this.RBSheet = ref;
          }}
          height={450}
          duration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: 'transparent',

            },
          }}>
          <View style={styles.searchQuestionRBSheetMainArea}>
            <View style={styles.searchQuestionRBSheetTextArea}>
              <Text style={styles.searchQuestionRBSheetTextStyle}>
                {CONSTANT.GetAnswersPostQuestion}
              </Text>
            </View>

            <View style={styles.searchQuestionRBSheetScrollArea}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.searchQuestionRBSheetScrollStyle}>
                <View style={styles.MultiSelectArea}>
                  <MultiSelect 
styleListContainer={{maxHeight:150}}
                    ref={component => {
                      this.multiSelect = component;
                    }}
                    onSelectedItemsChange={value =>
                      this.setState({SpecialityKnown: value})
                    }
                    uniqueKey="id"
                    items={this.state.HomeSpecialities}
                    selectedItems={this.state.SpecialityKnown}
                    borderBottomWidth={0}
                    single={true}
                    searchInputPlaceholderText={
                      CONSTANT.GetAnswersSearchSpeciality
                    }
                    onChangeInput={text => console.log(text)}
                    displayKey="name"
                    selectText={CONSTANT.GetAnswersPickSpeciality}
                    styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                    styleDropdownMenuSubsection={
                      styles.MultiSelectstyleDropdownMenuSubsection
                    }
                    submitButtonText={CONSTANT.GetAnswersSubmit}
                  />
                </View>
                <TextInput
                  style={styles.TextInputLayoutStyle}
                  underlineColorAndroid="transparent"
                  name={CONSTANT.GetAnswersTypeQuery}
                  placeholder={CONSTANT.GetAnswersTypeQuery}
                  placeholderTextColor="#807f7f"
                  onChangeText={Title => this.setState({Title})}
                />
                <TextInput
                  multiline={true}
                  style={styles.TextInputLayoutStyleForDetail}
                  underlineColorAndroid="transparent"
                  name={CONSTANT.GetAnswersQueryDetail}
                  placeholder={CONSTANT.GetAnswersQueryDetail}
                  placeholderTextColor="#807f7f"
                  onChangeText={Description => this.setState({Description})}
                />
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={this.submitQuestion}
              style={styles.searchQuestionButtonHover}>
              <Text style={styles.searchQuestionRBSheetTouchableText}>
                {CONSTANT.GetAnswersAskQuery}
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}
export default withNavigation(SearchQuestions);
