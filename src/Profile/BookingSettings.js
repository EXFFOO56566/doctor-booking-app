import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
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
  Button
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import { SwipeRow, List, Content, ListItem, Separator } from "native-base";
import { SwipeableFlatList } from "react-native-swipeable-flat-list";
import AntIcon from "react-native-vector-icons/AntDesign";
import DocumentPicker from "react-native-document-picker";
import MapView, { Marker } from "react-native-maps";
import {
  Collapse,
  CollapseHeader,
  CollapseBody
} from "accordion-collapse-react-native";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import ImagePicker from "react-native-image-crop-picker";
import MultiSelect from "react-native-multiple-select";
import Dash from "react-native-dash";
import CONSTANT from '../Constants/local';
import axios from "axios";
import {RadioGroup} from 'react-native-btr';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class BookingSettings extends Component {
	state={
		isLoading: true,
		bookingData: [],
		bookingDataNew: [],
		bookingContact: "",
		editBookingContact: "",
		bookingRefresh: false,
		bookingDetail: '', 
  }

	componentDidMount() {
	this.fetchBookingData();
	}

	fetchBookingData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(CONSTANT.BaseUrl + "profile/setting?id=" + id);
    const json = await response.json();
    console.log("This is Json" + JSON.stringify(json));
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ ProfileData: [] });
    } else {
      this.setState({ ProfileData: json, isLoading: false });
      this.setState({ bookingData: json[0].am_booking_contact });
			this.setState({ bookingDetail: json[0].am_booking_detail });
			this.setState({ bookingDataNew: []})
			for(let i = 0; i < this.state.bookingData.length; i++){
        for (let value of Object.values(this.state.bookingData[i])) {
          this.state.bookingDataNew.push(`${value}`);
        }
			}
			console.log("New Required Array", this.state.bookingDataNew);
    }
	};
	
	fetchProfileBookkingData = () => {
    if (this.state.bookingContact == "") {
      Alert.alert("Oops", "Please Enter The Data Properly");
    } else {
      this.state.bookingData.push({number: this.state.bookingContact});
      this.setState({
				bookingRefresh: true,
				bookingContact: ''
      });
      console.log('membership', this.state.bookingData)
			this.state.bookingDataNew.push(this.state.bookingContact);
			console.log("New Required Array", this.state.bookingDataNew);
    }
	};
	
	BookingEditData = (index, item) => {
    console.log(this.state.editBookingContact)
    this.state.bookingData[index] = {
      number: this.state.editBookingContact != '' ? this.state.editBookingContact : item.number,
    }
		console.log(this.state.bookingData[index])
		this.state.bookingDataNew[index] = this.state.editBookingContact != '' ? this.state.editBookingContact : item.number ;
    console.log(this.state.bookingDataNew[index])
		this.setState({bookingRefresh: true});
  };

  HandleBookingDeleteForm = index => {
		this.state.bookingData.splice(index, 1);
		this.state.bookingDataNew.splice(index, 1);
    this.setState({
      bookingRefresh: true
    });
	};
	
	UpdateProfileData = async () => {
    this.setState({ isLoading: true });
    const id = await AsyncStorage.getItem("projectUid");
    const {
			bookingDataNew,
			bookingDetail
    } = this.state;
    console.log(
			id,
			bookingDataNew,
			bookingDetail
    );
    axios
    .post(CONSTANT.BaseUrl + "profile/update_booking_contact",{
        id: id,
        am_booking_contact: bookingDataNew,
        am_booking_detail: bookingDetail,
      })
      .then(async response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Success, response.data.message);
          console.log("Success", response.data.message)
          this.fetchBookingData();
        } else if (response.status === 203) {
          this.setState({ isLoading: false });
          Alert.alert(CONSTANT.Error, response.data.message);
          console.log("Error", response.data.message)
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };

  render() {
		const {isLoading} = this.state;
    return (
      <>
        { this.props.docBookingOpt == 'enable' ?
				<View style={styles.container}>
				{isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
					<ScrollView>
					<View style={styles.PersonalDetailSectionsStyle}>
						<Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailYourContactPhNum}</Text>
						<View style={styles.PersonalDetailSectionArea}>
							<View>
								<TextInput
									underlineColorAndroid="transparent"
									placeholderTextColor="#7F7F7F"
									placeholder={CONSTANT.PersonalDetailYourAddPhNum}
									onChangeText={bookingContact =>
										this.setState({ bookingContact })
									}
									value={this.state.bookingContact}
									style={styles.TextInputLayoutStyle}
								/>
								<TouchableOpacity
									onPress={this.fetchProfileBookkingData}
									style={styles.PersonalDetailbuttonHover}
								>
									<Text style={styles.PersonalDetailbuttonText}>
										{CONSTANT.PersonalDetailAddNow}
									</Text>
								</TouchableOpacity>
							</View>

							<FlatList
								data={this.state.bookingData}
								extraData={this.state.bookingRefresh}
								renderItem={({ item, index }) => (
									<Collapse>
										<CollapseHeader>
											<View style={styles.PersonalDetailCollapseHeaderArea}>
												<TouchableOpacity
													activeOpacity={1}
													style={styles.PersonalDetailCoollapseHeaderTextArea}
												>
													<Text
														style={styles.PersonalDetailCoollapseHeaderText}
													>
														{item.number}
													</Text>
												</TouchableOpacity>
												<View style={styles.PersonalDetailEditBTN}>
													<AntIcon name="edit" color={"#fff"} size={20} />
												</View>
												<TouchableOpacity
													onPress={() => this.HandleBookingDeleteForm(index)}
													style={styles.PersonalDetailDeleteBTN}
												>
													<AntIcon name="delete" color={"#fff"} size={20} />
												</TouchableOpacity>
											</View>
										</CollapseHeader>

										<CollapseBody>
											<View style={{ marginTop: 10 }}>
												<TextInput
													underlineColorAndroid="transparent"
													placeholderTextColor="#7F7F7F"
													placeholder={CONSTANT.PersonalDetailYourMemberships}
													onChangeText={editBookingContact =>
														this.setState({ editBookingContact })
													}
													style={styles.TextInputLayoutStyle}
												>
													{item.number}
												</TextInput>

												<TouchableOpacity
													onPress={ () => this.BookingEditData(index)}
													style={styles.PersonalDetailbuttonHover}
												>
													<Text style={styles.PersonalDetailbuttonText}>
														{CONSTANT.PersonalDetailAddNow}
													</Text>
												</TouchableOpacity>
											</View>
										</CollapseBody>
									</Collapse>
								)}
							/>
						</View>
					</View>
					
					<View style={styles.PersonalDetailSectionsStyle}>
						<Text style={styles.MainHeadingTextStyle}>{CONSTANT.PersonalDetailBookingDetails}</Text>
						{this.state.ProfileData ? (
						<TextInput
							multiline={true}
							underlineColorAndroid="transparent"
							placeholderTextColor="#7F7F7F"
							placeholder={CONSTANT.PersonalDetailYourAddConDet}
							style={styles.TextInputLayoutStyleForDetail}
							onChangeText={bookingDetail => this.setState({ bookingDetail })}
						>{`${entities.decode(
							this.state.ProfileData[0].am_booking_detail
						)}`}</TextInput>
						) : (
							<TextInput
								multiline={true}
								underlineColorAndroid="transparent"
								placeholderTextColor="#7F7F7F"
								placeholder={CONSTANT.PersonalDetailYourAddConDet}
								style={styles.TextInputLayoutStyleForDetail}
							/>
							)}
					</View>
					
					<TouchableOpacity
						onPress={this.UpdateProfileData}
						style={styles.PersonalDetailFooterArea}
					>
						<Text style={styles.PersonalDetailFooterText}>
							{CONSTANT.PersonalDetailUpdateAllChanges}
						</Text>
					</TouchableOpacity>
				</ScrollView>
				</View>
				:
				<View style={styles.SearchResultScreenNoResultArea}>
					<Image
						style={styles.SearchResultScreenNoResultImage}
						source={require("../../Assets/Images/arrow.png")}
					/>
					<Text style={styles.SearchResultScreenNoResultText}>
						{CONSTANT.SearchResultDisableFromAdmin}
					</Text>
				</View>
				
				}
      </>
    );
  }
}

export default BookingSettings;
