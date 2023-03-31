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
  AsyncStorage
} from 'react-native';
// import { AsyncStorage } from '@react-native-community/async-storage';
import styles from '../styles/DoctreatAppStyles';
import {SwipeRow, List, Content} from 'native-base';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import { RadioGroup } from "react-native-btr";
import AntIcon from 'react-native-vector-icons/AntDesign';
import {withNavigation, DrawerActions} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import MultiSelect from 'react-native-multiple-select';
import axios from 'axios';
import Dash from 'react-native-dash';
import CONSTANT from '../Constants/local';

class MessageDoctor extends Component {
  constructor(props) {
    super(props);
      (this.state = {
        data: [],
        isLoading: true,
        fetchMessageDetail: [],
        message: '',
      });
  }
  componentDidMount() {
  }
  SendMessage = async () => {
    const {message} = this.state;
    const {params} = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem('projectUid');

    if (message == '') {
      this.setState({email: CONSTANT.MessageDoctorPleaseaddmessage});
    } else {
      axios
        .post(CONSTANT.BaseUrl + 'chat/sendUserMessage', {
          sender_id: Uid,
          receiver_id: params.id,
          message: message,
        })
        .then(async response => {
          if (response.status == 200) {
            this.setState({
              message: '',
            });
            Alert.alert( CONSTANT.MessageDoctorSuccess , CONSTANT.MessageDoctorMessageSentSuccessfully)
          } else if (response.status == 203) {
            Alert.alert(response.type);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };
 
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.MessageDoctorSendMessage} />
        <ScrollView>
        <TextInput
            multiline={true}
            placeholder={CONSTANT.MessageDoctorTypeHere}
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            style={styles.MessageDoctorTextInputLayout}
            onChangeText={message => this.setState({message})}></TextInput>
            <TouchableOpacity
              onPress={this.SendMessage}
              style={styles.MainButtonArea}
            >
              <Text
                style={styles.MainButtonText}
              >
                {CONSTANT.MessageDoctorSendNow}
            </Text>
            </TouchableOpacity>
        </ScrollView>
        
      </View>
    );
  }
}
export default withNavigation(MessageDoctor);
