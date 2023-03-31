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
  Alert,
  TextInput,
  ActivityIndicator,
  ImageBackground,
  AsyncStorage
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import StarRating from 'react-native-star-rating';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';
import axios from 'axios';
import MultiSelect from 'react-native-multiple-select';
import RBSheet from 'react-native-raw-bottom-sheet';
import HealthForumAnswerCard from './HealthForumAnswerCard';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class GetAnswers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reply: '',
      isLoading: true,
      Title: '',
      Description: '',
      storedType:'',
    };
  }
  componentWillMount() {
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
      this.fetchHealthAnswers();
    } catch (error) {
      // alert(error)
    }
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
          HomeSpecialities,
        });
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
  fetchHealthAnswers = async () => {
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl + 'forums/get_answer?post_id=' + params.itemId,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({HealthAnswers: [], isLoading: false}); // empty data set
    } else {
      this.setState({HealthAnswers: json, isLoading: false});
      this.setState({HealthAnswersList: json[0].answers, isLoading: false});
    }
  };
  submitAnswer = () => {
    if(this.state.storedType != ""){
      const {reply} = this.state;
      const {params} = this.props.navigation.state;
      if (reply == '') {
        //alert("Please enter Email address");
        this.setState({email: 'Please type Answer'});
      } else {
        // this.openProgressbar();
        axios
          .post(CONSTANT.BaseUrl + 'forums/update_answer', {
            post_id: params.itemId,
            profile_id: '460',
            answer: reply,
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
    }else{
      Alert.alert(CONSTANT.Sorry , CONSTANT.PleaseLoginFirst)
    }
   
  };
  submitQuestion = () => {
    const {reply} = this.state;
    const {params} = this.props.navigation.state;
    if (
      this.state.Title == '' &&
      this.state.Description == '' &&
      this.state.SpecialityKnown[0] == ''
    ) {
      //alert("Please enter Email address");
      this.setState({email: 'Please Add Complete Data'});
    } else {
      // this.openProgressbar();
      axios
        .post(CONSTANT.BaseUrl + 'forums/add_question', {
          user_id: '12',
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
    const {isLoading} = this.state;
    const {params} = this.props.navigation.state;
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.GetAnswersHeaderText} />
        {isLoading ? (
          <View style={styles.getAnswersMainArea}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.getAnswersActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <ScrollView>
          <ImageBackground
            source={require('../../Assets/Images/HealthMain.png')}
            style={styles.getAnswersScrollArea}>
            <View>
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
          <View
            style={styles.getAnswersBackgroundArea}>
            <View style={styles.getAnswersBackgroundTextArea}>
              <Text
                style={styles.MainHeadingTextStyle}>
                {CONSTANT.GetAnswersQuestion}
              </Text>
              <TouchableOpacity
                onPress={() => this.joinDataEducation()}
                style={styles.getAnswersAddNow}>
                {/* <Text   style={{color:'#3d4461'  , fontSize:13 }}>Add Now (+)</Text> */}
              </TouchableOpacity>
            </View>
            <View style={styles.getAnswersItemArea}>
              <View>
                {this.state.HealthAnswers && (
                  <Text
                    style={styles.getAnswersItemText}>
                    {params.itemQuestion}
                  </Text>
                )}

                <TextInput
                  underlineColorAndroid="transparent"
                  placeholderTextColor="#7F7F7F"
                  placeholder={CONSTANT.GetAnswersTypeReply}
                  onChangeText={reply => this.setState({reply})}
                  style={styles.TextInputLayoutStyle}
                />

                <TouchableOpacity
                  onPress={this.submitAnswer}
                  style={styles.buttonHover}>
                  <Text
                    style={styles.getAnswersPostAnswer}>
                    {CONSTANT.GetAnswersPostAnswer}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.getAnswersGetAnswersArea}>
            {this.state.HealthAnswers && (
              <View style={styles.getAnswersGetAnswersArea}>
                <Text
                  style={styles.MainHeadingTextStyle}>
                  {this.state.HealthAnswers[0].count_answers}
                </Text>
                <Text
                  style={styles.MainHeadingTextStyle}>
                  {CONSTANT.GetAnswersAnswers}
              </Text>
              </View>
            )}
          </View>
          {this.state.HealthAnswersList && (
            <FlatList
              style={styles.getAnswersListStyle}
              data={this.state.HealthAnswersList}
              ListEmptyComponent={this._listEmptyComponent}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.9}>
                  <HealthForumAnswerCard
                    image={{uri: `${item.image}`}}
                    name={`${entities.decode(item.name)}`}
                    date={`${entities.decode(item.sub_heading)}`}
                    detail={`${entities.decode(item.answer)}`}
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
          <View
            style={styles.getAnswersRBSheetMainArea}>
            <View style={styles.getAnswersRBSheetPostQuestionArea}>
              <Text
                style={styles.getAnswersRBSheetPostQuestionText}>
                {CONSTANT.GetAnswersPostQuestion}
              </Text>
            </View>

            <View
              style={styles.getAnswersRBSheetSpecialityArea}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.getAnswersRBSheetSpecialityScrollArea}>
                <View style={styles.getAnswersRBSheetSpecialityMultiArea}>
                  <MultiSelect 
styleListContainer={{maxHeight:150}}
                    style={styles.getAnswersRBSheetSpecialityMultiStyle}
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
                    searchInputPlaceholderText={CONSTANT.GetAnswersPickSpeciality}
                    onChangeInput={text => console.log(text)}
                    displayKey="name"
                    styleDropdownMenu={styles.getAnswersRBSheetSpecialityDropdown}
                    selectText={CONSTANT.GetAnswersPickSpeciality}
                    styleMainWrapper={styles.getAnswersRBSheetSpecialityWrapper}
                    styleDropdownMenuSubsection={styles.getAnswersRBSheetSpecialitySubDropdown}
                    submitButtonText={CONSTANT.GetAnswersSubmit}
                  />
                </View>
                <View
                  style={styles.getAnswersRBSheetQueryArea}>
                  <TextInput
                    style={styles.getAnswersRBSheetQueryText}
                    underlineColorAndroid="transparent"
                    name={CONSTANT.GetAnswersTypeQuery}
                    placeholder={CONSTANT.GetAnswersTypeQuery}
                    placeholderTextColor="#807f7f"
                    onChangeText={Title => this.setState({Title})}
                  />
                </View>
                <View
                  style={styles.getAnswersRBSheetDetailArea}>
                  <TextInput
                    multiline={true}
                    style={styles.getAnswersRBSheetDetailText}
                    underlineColorAndroid="transparent"
                    name={CONSTANT.GetAnswersQueryDetail}
                    placeholder={CONSTANT.GetAnswersQueryDetail}
                    placeholderTextColor="#807f7f"
                    onChangeText={Description => this.setState({Description})}
                  />
                </View>
              </ScrollView>
            </View>

            <TouchableOpacity
              onPress={this.submitQuestion}
              style={styles.buttonHover}>
              <Text
                style={styles.getAnswersRBSheetAskQuery}>
                {CONSTANT.GetAnswersAskQuery}
              </Text>
            </TouchableOpacity>
          </View>
        </RBSheet>
      </View>
    );
  }
}
export default withNavigation(GetAnswers);
