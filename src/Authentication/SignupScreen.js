import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  Image,
  CheckBox,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import AntIcon from 'react-native-vector-icons/AntDesign';
import {RadioGroup} from 'react-native-btr';
import CONSTANT from '../Constants/local';
import {ScrollView} from 'react-native-gesture-handler';
import MultiSelect from 'react-native-multiple-select';
import CustomHeader from '../Header/CustomHeader';
import axios from 'axios';
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();
class SignupScreen extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      isLoading: true,
      projectLocationKnown: '',
      DepartmentKnown: '',
      EmployeeKnown: '',
      FirstName: '',
      LastName: '',
      UserName: '',
      DisplayName: '',
      Email: '',
      Password: '',
      RetypePassword: '',
      CheckSettingData: '',
      fetching_from_server: false,
      available_role: [],
      SelectedradioButtonsforStartAs: [],
      radioButtonsforStartAs: [
        {
          label: CONSTANT.SignupRegularUser,
          value: 'regular_users',
          checked: false,
          color: '#323232',
          disabled: false,
          width: '33.33%',
          fontFamily: CONSTANT.PoppinsRegular,
          size: 7,
        },
        {
          label: CONSTANT.SignupHospital,
          value: 'hospitals',
          checked: true,
          color: '#323232',
          disabled: false,
          width: '33.33%',
          fontFamily: CONSTANT.PoppinsRegular,
          size: 7,
        },
        {
          label: CONSTANT.SignupDoctor,
          value: 'doctors',
          checked: false,
          color: '#323232',
          disabled: false,
          width: '33.33%',
          fontFamily: CONSTANT.PoppinsRegular,
          size: 7,
        },
      ],
    };
    this.showFilters = true;
  }
  componentDidMount() {
    this.ProjectLocationSpinner();
    this.CheckVerifyPage();
  }
  
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
  CheckVerifyPage = async () => {
  
    const response = await fetch(CONSTANT.BaseUrl + 'user/get_theme_settings');
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({CheckSettingData: '', isLoading: false}); // empty data set
    } else {
      this.setState({CheckSettingData: json, isLoading: false});
     console.log("comes from sevrer",json);
      for (const [key, value] of Object.entries(
        this.state.CheckSettingData.user_type_registration,
      )) {
        this.state.available_role.push({role: value});
      }
      
      try {
        for (var j = 0; j < this.state.available_role.length; j++) {
          for (var i = 0; i < this.state.radioButtonsforStartAs.length; i++) {
            if (
              this.state.radioButtonsforStartAs[i].value ==
              this.state.available_role[j].role
            ) {
              this.state.SelectedradioButtonsforStartAs.push({
                label: this.state.radioButtonsforStartAs[i].label,
                value: this.state.radioButtonsforStartAs[i].value,
                checked: this.state.radioButtonsforStartAs[i].checked,
                color: this.state.radioButtonsforStartAs[i].color,
                disabled: this.state.radioButtonsforStartAs[i].disabled,
                width: this.state.radioButtonsforStartAs[i].width,
                fontFamily: this.state.radioButtonsforStartAs[i].fontFamily,
                size: this.state.radioButtonsforStartAs[i].size,
              });
            }
           
          }
          
        }
        this.setState({SelectedradioButtonsforStartAs: this.state.SelectedradioButtonsforStartAs})
       
        
      } catch (error) {
        Alert.alert(
          err
        );
      }
    }
  };

  CreateAccount = () => {
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true,
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;
    const {
      projectLocationKnown,
      FirstName,
      LastName,
      UserName,
      DisplayName,
      Email,
      Password,
      RetypePassword,
    } = this.state;
    console.log(
      'radio button: ' ,selectedItemforStartAs
    )
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (
      FirstName == '' &&
      LastName == '' &&
      Email == '' &&
      Password == '' &&
      RetypePassword == '' &&
      UserName == '' &&
      DisplayName == ''
    ) {
      alert(CONSTANT.SignupEnterCompDetail);
      this.setState({email: 'Please enter complete detail'});
    } else if (reg.test(Email) === false) {
      alert(CONSTANT.SignupEmailNotCorrect);
      this.setState({email: 'Email is not correct'});
      return false;
    } else if (Password !== RetypePassword) {
      alert(CONSTANT.SignupPasswordsnotmatch);
    } else {
      this.setState({
        fetching_from_server: true,
      });
      console.log(
        UserName,
        Email,
        FirstName,
        LastName,
        DisplayName,
        projectLocationKnown[0],
        Password,
        RetypePassword,
        selectedItemforStartAs,
      );
      axios
        .post(CONSTANT.BaseUrl + 'user/signup', {
          username: UserName,
          email: Email,
          first_name: FirstName,
          last_name: LastName,
          display_name: DisplayName,
          location: projectLocationKnown[0],
          password: Password,
          verify_password: RetypePassword,
          user_type: selectedItemforStartAs,
          termsconditions: 'yes',
        })
        .then(async response => {
          if (response.status === 200) {
            if (response.data.type == 'demo') {
              this.setState({
                fetching_from_server: false,
              });
              alert(JSON.stringify(response.data.message));
            } else {
              if (this.state.CheckSettingData.verify_user != 'no') {
                this.setState({
                  fetching_from_server: false,
                });
                axios
                  .post(CONSTANT.BaseUrl + 'user/account_verification', {
                    user_id: response.data.ID,
                  })
                  .then(async response => {
                    if (response.status === 200) {
                      this.setState({
                        fetching_from_server: false,
                      });
                      Alert.alert(CONSTANT.Success, response.data.message);
                    } else if (response.status === 203) {
                      Alert.alert(CONSTANT.Error, response.data.message);
                    }
                  });
              } else {
                Alert.alert('Response', response.data.message);
              }
            }
          } else if (response.status === 203) {
            Alert.alert('Error', response.data.message);
            this.setState({
              fetching_from_server: false,
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  render() {
    let selectedItemforStartAs = this.state.radioButtonsforStartAs.find(
      e => e.checked == true,
    );
    selectedItemforStartAs = selectedItemforStartAs
      ? selectedItemforStartAs.value
      : this.state.radioButtonsforStartAs[0].value;

    const {
      FirstName,
      LastName,
      UserName,
      DisplayName,
      Email,
      Password,
      RetypePassword,
    } = this.state;
    return (
      <KeyboardAvoidingView style={styles.SignUpcontainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <CustomHeader headerText={CONSTANT.SignupHeader} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Image
            style={styles.SignupImageStyle}
            source={require('../../Assets/Images/SplashImage.png')}
          />
          <Text style={styles.SignupParagraphText}>{CONSTANT.Signupmain}</Text>
          <View style={styles.SignupHeadingArea}>
            <Text style={styles.SignupHeadingText}>
              {CONSTANT.SignupStartas}
            </Text>
          </View>
          <View style={{marginLeft: 10}}>
            <RadioGroup
              color={CONSTANT.primaryColor}
              labelStyle={{fontSize: 14}}
              radioButtons={this.state.radioButtonsforStartAs}
              onPress={radioButtons => this.setState({radioButtons})}
              style={styles.RadioButtonStyle}
            />
          </View>
          <View style={styles.SignupHeadingArea}>
            <Text style={styles.SignupHeadingText}>
              {CONSTANT.SignupPersonal}
            </Text>
          </View>
          <View style={styles.SignupTextInputArea}>
            <TextInput
              style={styles.SignupTextInput}
              underlineColorAndroid="transparent"
              editable={true}
              placeholderTextColor="#999999"
              onChangeText={FirstName => this.setState({FirstName})}
              placeholder={CONSTANT.SignupFname}></TextInput>
            <View style={styles.SignupTextInputBorder} />
            <TextInput
              style={styles.SignupTextInput}
              underlineColorAndroid="transparent"
              editable={true}
              placeholderTextColor="#999999"
              onChangeText={LastName => this.setState({LastName})}
              placeholder={CONSTANT.SignupLname}></TextInput>
            <View style={styles.SignupTextInputBorder} />
            <TextInput
              style={styles.SignupTextInput}
              underlineColorAndroid="transparent"
              editable={true}
              placeholderTextColor="#999999"
              onChangeText={UserName => this.setState({UserName})}
              placeholder={CONSTANT.SignupUname}></TextInput>
            <View style={styles.SignupTextInputBorder} />
            <TextInput
              style={styles.SignupTextInput}
              underlineColorAndroid="transparent"
              editable={true}
              placeholderTextColor="#999999"
              onChangeText={DisplayName => this.setState({DisplayName})}
              placeholder={CONSTANT.SignupDname}></TextInput>
            <View style={styles.SignupTextInputBorder} />
            <View style={styles.SignupTextInputWithIconArea}>
              <TextInput
                style={styles.SignupTextInputWithIcon}
                underlineColorAndroid="transparent"
                editable={true}
                placeholderTextColor="#999999"
                autoCompleteType="email"
                onChangeText={Email => this.setState({Email})}
                placeholder={CONSTANT.SignupEmail}></TextInput>
              <AntIcon
                name="mail"
                size={15}
                color={'#999999'}
                style={styles.SignupTextInputIconStyle}
              />
            </View>
            <View style={styles.SignupTextInputBorder} />
            <View style={styles.SignupTextInputWithIconArea}>
              <TextInput
                style={styles.SignupTextInputWithIcon}
                underlineColorAndroid="transparent"
                editable={true}
                placeholderTextColor="#999999"
                autoCompleteType="password"
                onChangeText={Password => this.setState({Password})}
                placeholder={CONSTANT.SignupPassword}></TextInput>
              <AntIcon
                name="lock"
                size={15}
                color={'#999999'}
                style={styles.SignupTextInputIconStyle}
              />
            </View>
            <View style={styles.SignupTextInputBorder} />
            <View style={styles.SignupTextInputWithIconArea}>
              <TextInput
                style={styles.SignupTextInputWithIcon}
                underlineColorAndroid="transparent"
                editable={true}
                placeholderTextColor="#999999"
                autoCompleteType="password"
                onChangeText={RetypePassword => this.setState({RetypePassword})}
                placeholder={CONSTANT.SignupRetypePassword}></TextInput>
              <AntIcon
                name="lock"
                size={15}
                color={'#999999'}
                style={styles.SignupTextInputIconStyle}
              />
            </View>
          </View>
          <View style={styles.SignupHeadingArea}>
            <Text style={styles.SignupHeadingText}>
              {CONSTANT.SignupLocation}
            </Text>
          </View>
          <View style={{marginLeft: 15, marginRight: 15}}>
            <MultiSelect
              styleListContainer={{maxHeight: 150}}
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
              searchInputPlaceholderText={CONSTANT.SignupSearchProjectLocation}
              onChangeInput={text => console.log(text)}
              selectText={CONSTANT.SignupPickLocation}
              styleMainWrapper={styles.MultiSelectstyleMainWrapper}
              styleDropdownMenuSubsection={
                styles.MultiSelectstyleDropdownMenuSubsection
              }
              displayKey="name"
              submitButtonText={CONSTANT.Submit}
              underlineColorAndroid="transparent"
            />
          </View>

          <TouchableOpacity
            onPress={this.CreateAccount}
            style={styles.MainButtonArea}>
            <View style={{flexDirection:'row'}}>
            <Text style={styles.MainButtonText}>{CONSTANT.SignupContinue}</Text>
            {this.state.fetching_from_server == true ? (
              <ActivityIndicator color="white" style={{marginLeft: 8}} />
            ) : null}
            </View>
          </TouchableOpacity>
          <View style={styles.SignupFooterArea}>
            <Text style={styles.SignupFooterText}
             onPress={() => this.props.navigation.navigate('LoginScreen')}
            >
              {CONSTANT.SignupMoveSignin}
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
export default SignupScreen;
