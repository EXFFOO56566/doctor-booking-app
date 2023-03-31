import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  ActivityIndicator,
  FlatList,
  Image,
  Alert,
  Dimensions,
  I18nManager,
  AsyncStorage
} from 'react-native';
import styles from '../../styles/DoctreatAppStyles';
import {Input, InputProps, Button} from 'react-native-ui-kitten';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ReceiveMessageLayout from './ReceiveMessageLayout';
import axios from 'axios';
import {withNavigation, DrawerActions} from 'react-navigation';
import * as CONSTANT from '../../Constants/Constant';
import HTML from 'react-native-render-html';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

class MessageDetailLayout extends Component {
  state = {
    data: [],
    isLoading: true,
    fetchMessageDetail: [],
    message: '',
  };
  componentDidMount() {
    this.fetchMessages();
  }
  fetchMessages = async () => {
    const Pid = await AsyncStorage.getItem('projectUid');
    const {params} = this.props.navigation.state;
    const response = await fetch(
      CONSTANT.BaseUrl +
        'chat/list_user_messages/?reciver_id=' +
        Pid +
        '&current_id=' +
        params.receiver_id,
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === 'error'
    ) {
      this.setState({fetchMessageDetail: [], isLoading: false}); // empty data set
    } else {
      this.setState({fetchMessageDetail: json.chat_sidebar, isLoading: false});
      this.setState({fetchMessageList: json.chat_nodes, isLoading: false});
    }
  };
  SendMessage = async () => {
    this.setState({
      message: '',
    });
    const {message} = this.state;
    const {params} = this.props.navigation.state;
    const Uid = await AsyncStorage.getItem('projectUid');
  
    if (message == '') {
      //alert("Please enter Email address");
      this.setState({email: 'Please add message'});
      Alert.alert(CONSTANT.Oops , "Please add Message.")
    } else {
      axios
        .post(CONSTANT.BaseUrl + 'chat/sendUserMessage', {
          sender_id: Uid,
          receiver_id: params.receiver_id,
          message: message,
        })
        .then(async response => {
          if (response.status == 200) {
            this.setState({
              message: '',
            });
            this.fetchMessages();
          } else if (response.status == 203) {
            this.setState({
              message: '',
            });
            Alert.alert(response.type);
          }
        })
        .catch(error => {
          this.setState({
            message: '',
          });
          console.log(error);
        });
    }
    Keyboard.dismiss();
  };

  render() {
    const {isLoading} = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        
        {this.state.fetchMessageDetail && (
          <View
            style={styles.messageDetailFetchStyle}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack(null)}
              style={styles.messageDetailTouchableStyle}>
              <AntIcon name="back" size={25} color={'#fff'} 
                style={{transform:I18nManager.isRTL ? [{rotateY: '180deg'}] : [{rotateY: '0deg'}]}}
              />
            </TouchableOpacity>
            { !isLoading ?
            <View
              style={styles.messageDetailTopRatedArea}>
              <View
                style={styles.messageDetailTopRated}>
                <View style={styles.messageDetailMainTopRatedStyle}>
                  <View style={styles.messageDetailImageLayoutStyle}>
                    <Image
                      resizeMode="contain"
                      style={styles.messageDetailImageStyle}
                      source={{uri: `${this.state.fetchMessageDetail.avatar}`}}
                    />
                  </View>
                  <View style={styles.messageDetaildocContentstyle}>
                    <View style={styles.messageDetailTopRated}>
                      {this.state.fetchMessageDetail && (
                        <Text style={styles.messageDetailDocName}>
                          {this.state.fetchMessageDetail.username}
                        </Text>
                      )}
                    </View>
                    {this.state.fetchMessageDetail && (
                      <HTML 
                        html={this.state.fetchMessageDetail.user_register}
                        baseFontStyle={styles.messageDetailtitleStyle}
                      />
                    )}
                  </View>
                </View>
              </View>
            </View>
            :
            <View style={{flexDirection:'row', alignItems:'center', marginLeft:20}}>
              <View style={{height:40, width:40, borderRadius:20, backgroundColor:'#ddd'}}/>
              <View style={{marginLeft:10}}>
                <View style={{height:12, borderRadius:5, width:60, backgroundColor:'#ddd', marginBottom:10}}/>
              <View style={{height:12, borderRadius:5, width:160, backgroundColor:'#ddd'}}/>
              </View>
            </View>
            }
          </View>
        )}
        {isLoading && (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        )}
        
        {this.state.fetchMessageList ? (
          <FlatList
            inverted={true}
            style={styles.messageDetailListStyle}
            data={JSON.parse(JSON.stringify(this.state.fetchMessageList)).reverse()}
            keyExtractor={(a, b) => b.toString()}
            renderItem={({item}) => (
              <TouchableWithoutFeedback>
                {item.chat_is_sender == 'yes' ? (
                  <View
                    style={styles.messageDetailListTouchableArea}>
                    <View
                      style={styles.messageDetailListTouchableTextArea}>
                      <Text
                        style={styles.messageDetailListTouchableMessageText}>
                        {item.chat_message}
                      </Text>
                    </View>
                    <Text
                      style={styles.messageDetailListTouchableDateText}>
                      {item.chat_date}
                    </Text>
                  </View>
                ) : item.chat_is_sender == 'no' ? (
                  <View
                    style={styles.messageDetailListTouchableChatArea}>
                    <View
                      style={styles.messageDetailListTouchableChatMessageStyle}>
                      <Text
                        style={styles.messageDetailListTouchableChatMessageText}>
                        {item.chat_message}
                      </Text>
                    </View>
                    <View
                      style={styles.messageDetailListTouchableChatDateStyle}>
                      <Text
                        style={styles.messageDetailListTouchableChatDateText}>
                        {item.chat_date}
                      </Text>
                      <AntIcon
                        style={styles.messageDetailListTouchableChatDateIcon}
                        name="check"
                        size={13}
                        color={'#4B8B3B'}
                      />
                    </View>
                  </View>
                ) : null}
              </TouchableWithoutFeedback>
            )}
            keyExtractor={(item, index) => index}
          />
        ) : null}
         <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.messageDetailTextInputArea}>
          <TextInput
            multiline={true}
            value={this.state.message}
            placeholder={CONSTANT.MessagesTypehere}
            underlineColorAndroid="transparent"
            placeholderTextColor="#7F7F7F"
            style={styles.messageDetailTextInputLayout}
            onChangeText={message => this.setState({message})}></TextInput>
          <TouchableOpacity
            onPress={this.SendMessage}
            style={styles.messageDetailTextInputStyle}>
            <FontAwesome name="send" size={22} color={CONSTANT.primaryColor} />
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
export default withNavigation(MessageDetailLayout);

