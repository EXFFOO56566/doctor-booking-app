import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Image,
  Keyboard,
  NativeModules,
  TextInput,
  BackHandler,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import styles from "../styles/DoctreatAppStyles";
import AntIcon from 'react-native-vector-icons/AntDesign';
import RNRestart from 'react-native-restart';
import axios from 'axios';
import CONSTANT from '../Constants/local';
import CustomHeader from '../Header/CustomHeader';
import PersonalDetail from './PersonalDetail';
import ExpEduProfile from './ExpEduProfile';
import AwardsDownloads from './AwardsDownloads';
import Registrations from './Registrations';
import Gallery from './Gallery';
import BookingSettings from './BookingSettings';
import DefaultLocation from './DefaultLocation';
import { ScrollView } from 'react-native-gesture-handler';
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react';
class ProfileTabs extends Component {
  state={
    doctor_slider_data: [
      {
        name: CONSTANT.PersonalDetail,
      },
      {
        name: CONSTANT.ExperienceAndEducation,
      },
      {
        name: CONSTANT.AwardsAndDownloads,
      },
      {
        name: CONSTANT.Registrations,
      },
      {
        name: CONSTANT.Gallery,
      },
      {
        name: CONSTANT.BookingSettings,
      },
      {
        name: CONSTANT.DefaultLocation,
      },
    ],
    hospital_slider_data: [
      {
        name: CONSTANT.PersonalDetail,
      },
      {
        name: CONSTANT.Registrations,
      },
      {
        name: CONSTANT.Gallery,
      },
    ],
    patient_slider_data: [
      {
        name: CONSTANT.PersonalDetail,
      },
      {
        name: CONSTANT.DefaultLocation,
      },
    ],
    PersonalDetail: true,
    ExperienceEducation: false,
    AwardsDownloads: false,
    Registrations: false,
    Gallery: false,
    BookingSettings: false,
    DefaultLocation: false,
    index_v: 0,
    storedType: "",
    docBookingOpt: '',
  }

  componentDidMount() {
    this.getUser();
    this.getThemeSettingsForDocLocation();
  }

  getThemeSettingsForDocLocation = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + 'user/get_theme_settings',
    );
    const json = await response.json();
    this.setState({docBookingOpt: json.doctor_booking_option });
    //Alert.alert('doc Booking Option', JSON.stringify(this.state.docBookingOpt))
  };
  
  getUser = async () => {
    try {
      const storedType = await AsyncStorage.getItem("user_type");
      if (storedType !== null) {
				this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
    }
  };

  onSliderMenuItemPress = (item, index) => {
    if (item.name == CONSTANT.PersonalDetail) {
      this.setState({PersonalDetail: true});
      this.setState({ExperienceEducation: false});
      this.setState({AwardsDownloads: false});
      this.setState({Registrations: false});
      this.setState({Gallery: false});
      this.setState({BookingSettings: false});
      this.setState({DefaultLocation: false});
    } 
    else if (item.name == CONSTANT.ExperienceAndEducation) {
      this.setState({PersonalDetail: false});
      this.setState({ExperienceEducation: true});
      this.setState({AwardsDownloads: false});
      this.setState({Registrations: false});
      this.setState({Gallery: false});
      this.setState({BookingSettings: false});
      this.setState({DefaultLocation: false});
    }
    else if (item.name == CONSTANT.AwardsAndDownloads) {
      this.setState({PersonalDetail: false});
      this.setState({ExperienceEducation: false});
      this.setState({AwardsDownloads: true});
      this.setState({Registrations: false});
      this.setState({Gallery: false});
      this.setState({BookingSettings: false});
      this.setState({DefaultLocation: false});
    } 
    else if (item.name == CONSTANT.Registrations) {
      this.setState({PersonalDetail: false});
      this.setState({ExperienceEducation: false});
      this.setState({AwardsDownloads: false});
      this.setState({Registrations: true});
      this.setState({Gallery: false});
      this.setState({BookingSettings: false});
      this.setState({DefaultLocation: false});
    } 
    else if (item.name == CONSTANT.Gallery) {
      this.setState({PersonalDetail: false});
      this.setState({ExperienceEducation: false});
      this.setState({AwardsDownloads: false});
      this.setState({Registrations: false});
      this.setState({Gallery: true});
      this.setState({BookingSettings: false});
      this.setState({DefaultLocation: false});
    } 
    else if (item.name == CONSTANT.BookingSettings) {
      this.setState({PersonalDetail: false});
      this.setState({ExperienceEducation: false});
      this.setState({AwardsDownloads: false});
      this.setState({Registrations: false});
      this.setState({Gallery: false});
      this.setState({BookingSettings: true});
      this.setState({DefaultLocation: false});
    }
    else if (item.name == CONSTANT.DefaultLocation) {
      this.setState({PersonalDetail: false});
      this.setState({ExperienceEducation: false});
      this.setState({AwardsDownloads: false});
      this.setState({Registrations: false});
      this.setState({Gallery: false});
      this.setState({BookingSettings: false});
      this.setState({DefaultLocation: true});
    }

    this.setState({index_v: index});
  };

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.HeaderText} />

        <View style={{height:50, backgroundColor: CONSTANT.primaryColor}}>
          <FlatList
            //style={{backgroundColor: '#24355a'}}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            data={this.state.storedType == 'doctor' ? this.state.doctor_slider_data :
                  this.state.storedType == 'hospital' ? this.state.hospital_slider_data : 
                  this.state.storedType == 'regular_user' ? this.state.patient_slider_data : null}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() => this.onSliderMenuItemPress(item, index)}>
                <View style={{
                  height:50,
                  marginRight:10,
                  paddingHorizontal: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                  {this.state.index_v === index ? (
                    <Text style={{color: '#fff', fontSize:16, fontWeight:'700'}}>{item.name}</Text>
                    ):
                    <Text style={{color: '#fff', fontSize:12 }}>{item.name}</Text>
                  }
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
          {this.state.PersonalDetail == true && <PersonalDetail />}
          {this.state.AwardsDownloads == true && <AwardsDownloads />}
          {this.state.ExperienceEducation == true && <ExpEduProfile />}
          {this.state.Registrations == true && <Registrations />}
          {this.state.Gallery == true && <Gallery />}
          {this.state.BookingSettings == true && <BookingSettings docBookingOpt={this.state.docBookingOpt}/>}
          {this.state.DefaultLocation == true && <DefaultLocation />}
      </View>
    );
  }
}
export default ProfileTabs;
