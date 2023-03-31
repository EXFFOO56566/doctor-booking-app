import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Alert,
  FlatList,
  Keyboard,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import styles from "../styles/DoctreatAppStyles";
import CONSTANT from '../Constants/local';
import axios from "axios";

class InviteHospitals extends Component {
  state = {
    email: "",
    extraEmailList: false,
    emailList: [],
    desc: "",
    fetching_from_server:false
  };

  CheckEmail = () => {
    const { email, emailList } = this.state;
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{3})+$/;
    if (reg.test(email) === true) {
      if(emailList.some(item => item.emails === email)){
        alert("Email already exist");
      } else{
        this.state.emailList.push({
          emails: this.state.email
        });
      }
      this.setState({ email: "" });
      Keyboard.dismiss();
    } else null
  };

  onDeleteEmail = index => {
    this.state.emailList.splice(index, 1);
    this.setState({
      extraEmailList: true
    });
  };

  InviteHospital = async () => {
    this.setState({fetching_from_server: true});
    const Uid = await AsyncStorage.getItem("projectUid");
    const { emailList , desc }= this.state;
    if( desc != "" && emailList.length >= 0 ){
      axios
      .post(CONSTANT.BaseUrl + "users_invitations", {
        user_id:  Uid,
        emails:   emailList,
        content:  desc,
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success , JSON.stringify(response.data.message));
          this.setState({fetching_from_server: false , desc :"" ,  emailList : []});
          console.log("Hello" , JSON.stringify(response))
        } else if (response.status === 203) {
          this.setState({fetching_from_server: false ,  desc :"" ,  emailList : []});
          Alert.alert(CONSTANT.Oops , JSON.stringify(response.data.message));
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
    }else {
      Alert.alert(CONSTANT.Oops , CONSTANT.InviteHospitalsFillcompleteform);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <CustomHeader headerText={CONSTANT.InviteHospitals} />
        <ScrollView>
          <View>
            <View
              style={{
                flexDirection: "row",
                height: 45,
                paddingLeft: 10,
                borderRadius: 5,
                borderWidth: 1,
                marginHorizontal: 10,
                marginTop: 20
              }}
            >
              <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#7f7f7f"
                placeholder={CONSTANT.InviteHospitalsEmailText}
                onChangeText={email => this.setState({ email } , this.CheckEmail.bind(this))}
                value={this.state.email}
                style={{
                  color: "#323232",
                  width: "90%"
                }}
              />
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "10%"
                }}
              >
                <Ionicons
                  name="md-mail"
                  color='#767676'
                  size={20}
                  style={{ backgroundColor: "transparent" }}
                />
              </View>
            </View>

            <FlatList
              style={{ marginTop: 20, width: "100%", paddingHorizontal: 10 }}
              data={this.state.emailList}
              extraData={this.state.extraEmailList}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item, index }) => (
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap"
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      height: 45,
                      paddingHorizontal: 10,
                      borderRadius: 5,
                      borderWidth: 1,
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexDirection: "row",
                      marginBottom: 10,
                      backgroundColor: "#ddd"
                    }}
                  >
                    <Text>{item.emails}</Text>
                    <TouchableOpacity
                      onPress={() => this.onDeleteEmail(index)}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "10%"
                      }}
                    >
                      <Ionicons
                        name="md-close-circle"
                        color={CONSTANT.primaryColor}
                        size={24}
                        style={{
                          backgroundColor: "transparent",
                          marginLeft: 10
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7f7f7f"
              placeholder={CONSTANT.InviteHospitalsDescriptionText}
              onChangeText={desc => this.setState({ desc })}
              value={this.state.desc}
              multiline={true}
              style={{
                color: "#323232",
                height: 150,
                paddingHorizontal: 10,
                paddingTop:10,
                borderRadius: 5,
                borderWidth: 1,
                marginHorizontal: 10,
                marginTop: 0
              }}
            />
            <TouchableOpacity
              onPress={() => this.InviteHospital()}
              style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: 20,
                paddingRight: 20,
                backgroundColor: CONSTANT.primaryColor,
                borderRadius: 4,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                margin: 10
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 15,
                  textAlign: "center",
                  fontFamily: CONSTANT.PoppinsMedium
                }}
              >
                {CONSTANT.InviteHospitalsSubmitBtn}
              </Text>
              {this.state.fetching_from_server == true ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(InviteHospitals);
