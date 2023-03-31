import React, { Component } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  FlatList,
  Dimensions,
  ScrollView,
  StatusBar,
  ActivityIndicator
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Carousel from "react-native-snap-carousel";
import AntIcon from "react-native-vector-icons/AntDesign";
import CONSTANT from '../Constants/local';
import HTML from "react-native-render-html";
import axios from "axios";
import CustomHeader from "../Header/CustomHeader";

const { width: viewportWidth } = Dimensions.get("window");
class Packages extends Component {
  state = {
    data: [],
    default_color: "#fff",
    storedValue: "",
    storedType: "",
    profileImg: "",
    type: "",
    id: "",
    Pid: "",
    isLoading: true,
    fetchPackages: [],
    Name: "",
    address: "",
    location: "",
    Notes: "",
    Customerid: "",
    S_address1: "",
    S_city: "",
    S_company: "",
    S_country: "",
    S_first_name: "",
    S_last_name: "",
    S_state: "",
    B_address1: "",
    B_city: "",
    B_conpany: "",
    B_country: "",
    B_email: "",
    B_first_name: "",
    B_last_name: "",
    B_phone: "",
    B_state: ""
  };
  componentDidMount() {
    this.fetchPackagesList();
    this.getUser();
  }
  fetchPackagesList = async () => {
    const response = await fetch(
      CONSTANT.BaseUrl + "user/get_packages?user_type=doctors"
    );
    const json = await response.json();
    this.setState({ fetchPackages: json.pakcages, isLoading: false });
    console.log(response);
  };
  getUser = async () => {
    console.log("i am in");
    try {
      const storedValue = await AsyncStorage.getItem("full_name");
      const storedType = await AsyncStorage.getItem("user_type");
      const profileImg = await AsyncStorage.getItem("profile_img");
      const type = await AsyncStorage.getItem("profileType");
      const id = await AsyncStorage.getItem("projectUid");
      const Address = await AsyncStorage.getItem("Address");
      const Location = await AsyncStorage.getItem("Location");
      const s_address1 = await AsyncStorage.getItem("shipping_address1");
      const s_city = await AsyncStorage.getItem("shipping_city");
      const s_company = await AsyncStorage.getItem("shipping_company");
      const s_country = await AsyncStorage.getItem("shipping_country");
      const s_first_name = await AsyncStorage.getItem("shipping_first_name");
      const s_last_name = await AsyncStorage.getItem("shipping_last_name");
      const s_state = await AsyncStorage.getItem("shipping_state");
      const b_address1 = await AsyncStorage.getItem("billing_address_1");
      const b_city = await AsyncStorage.getItem("billing_city");
      const b_conpany = await AsyncStorage.getItem("billing_company");
      const b_country = await AsyncStorage.getItem("billing_country");
      const b_email = await AsyncStorage.getItem("billing_email");
      const b_first_name = await AsyncStorage.getItem("billing_first_name");
      const b_last_name = await AsyncStorage.getItem("billing_last_name");
      const b_phone = await AsyncStorage.getItem("billing_phone");
      const b_state = await AsyncStorage.getItem("billing_state");

      if (storedValue !== null) {
        this.setState({ Name: storedValue });
      } else {
        // alert('something wrong')
      }
      if (storedType !== null) {
        this.setState({ storedType });
      } else {
        //  alert('something wrong')
      }
      if (profileImg !== null) {
        this.setState({ profileImg });
      } else {
        //  alert('something wrong')
      }
      if (type !== null) {
        this.setState({ type });
      } else {
        //  alert('something wrong')
      }
      if (id !== null) {
        this.setState({ Customerid: id });
      } else {
        //  alert('something wrong')
      }
      if (Address !== null) {
        this.setState({ address: Address });
      } else {
        //  alert('something wrong')
      }
      if (Location !== null) {
        this.setState({ location: Location });
      } else {
        //  alert('something wrong')
      }
      if (s_address1 !== null) {
        this.setState({ S_address1: s_address1 });
      } else {
        //  alert('something wrong')
      }
      if (s_city !== null) {
        this.setState({ S_city: s_city });
      } else {
        //  alert('something wrong')
      }
      if (s_company !== null) {
        this.setState({ S_company: s_company });
      } else {
        //  alert('something wrong')
      }
      if (s_country !== null) {
        this.setState({ S_country: s_country });
      } else {
        //  alert('something wrong')
      }
      if (s_first_name !== null) {
        this.setState({ S_first_name: s_first_name });
      } else {
        //  alert('something wrong')
      }
      if (s_last_name !== null) {
        this.setState({ S_last_name: s_last_name });
      } else {
        //  alert('something wrong')
      }
      if (s_state !== null) {
        this.setState({ S_state: s_state });
      } else {
        //  alert('something wrong')
      }
      if (b_address1 !== null) {
        this.setState({ B_address1: b_address1 });
      } else {
        //  alert('something wrong')
      }
      if (b_city !== null) {
        this.setState({ B_city: b_city });
      } else {
        //  alert('something wrong')
      }
      if (b_conpany !== null) {
        this.setState({ B_conpany: b_conpany });
      } else {
        //  alert('something wrong')
      }
      if (b_country !== null) {
        this.setState({ B_country: b_country });
      } else {
        //  alert('something wrong')
      }
      if (b_email !== null) {
        this.setState({ B_email: b_email });
      } else {
        //  alert('something wrong')
      }
      if (b_first_name !== null) {
        this.setState({ B_first_name: b_first_name });
      } else {
        //  alert('something wrong')
      }
      if (b_last_name !== null) {
        this.setState({ B_last_name: b_last_name });
      } else {
        //  alert('something wrong')
      }
      if (b_phone !== null) {
        this.setState({ B_phone: b_phone });
      } else {
        //  alert('something wrong')
      }
      if (b_state !== null) {
        this.setState({ B_state: b_state });
      } else {
        //  alert('something wrong')
      }
    } catch (error) {
      // Error saving data
      // alert(error)
      console.log(error);
    }
  };
  PurchasePackage = async id => {
    const { params } = this.props.navigation.state;
    const {
      Uid,
      Notes,
      Customerid,
      S_address1,
      S_city,
      S_company,
      S_country,
      S_first_name,
      S_last_name,
      S_state,
      B_address1,
      B_city,
      B_conpany,
      B_country,
      B_email,
      B_first_name,
      B_last_name,
      B_phone,
      B_state
    } = this.state;

    var billing_info_map = {};
    billing_info_map["address_1"] = B_address1;
    billing_info_map["city"] = B_city;
    billing_info_map["company"] = B_conpany;
    billing_info_map["country"] = B_country;
    billing_info_map["email"] = B_email;
    billing_info_map["first_name"] = B_first_name;
    billing_info_map["last_name"] = B_last_name;
    billing_info_map["phone"] = B_phone;
    billing_info_map["state"] = B_state;
    var shipping_info_map = {};
    shipping_info_map["address_1"] = S_address1;
    shipping_info_map["city"] = S_city;
    shipping_info_map["company"] = S_company;
    shipping_info_map["country"] = S_country;
    shipping_info_map["first_name"] = S_first_name;
    shipping_info_map["last_name"] = S_last_name;
    shipping_info_map["state"] = S_state;
    var payment_data_map_array = {};
    payment_data_map_array["order_type"] = "package";
    payment_data_map_array["customer_id"] = Customerid;
    payment_data_map_array["product_id"] = id;
    payment_data_map_array["customer_note"] = Notes;
    payment_data_map_array["shipping_methods"] = "stripe";
    payment_data_map_array["sameAddress"] = "1";
    payment_data_map_array["billing_info"] = billing_info_map;
    payment_data_map_array["shipping_info"] = shipping_info_map;
    var payment_data = JSON.stringify(payment_data_map_array);
    axios
      .post(CONSTANT.BaseUrl + "user/create_checkout_page", {
        payment_data: payment_data
      })
      .then(async response => {
        if (response.status === 200) {
          console.log(response);
          this.props.navigation.navigate("BuyPackageWebview", {
            url: response.data.url
          });
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Error, response.data.message);
        }
      })
      .catch(error => {
        Alert.alert(error);
      });
  };

  _renderItem = ({ item, index }) => {
    return (
      <View style={styles.packagesContainer}>
        <View style={styles.packagesTitle}>
          <Text style={styles.packagesTitletext}>{item.title}</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.packagesCardmain}>
            <View style={styles.packagesImageArea}>
              <Image
                style={styles.packagesImage}
                source={require("../../Assets/Images/package_bgimage2.png")}
              />

              <View style={styles.packagesPriceArea}>
                <Text style={styles.packagesPrice}>{CONSTANT.PackagesPrice} {item.price}</Text>
                <HTML
                  html={item.symbol}
                  style={styles.packagesSymbol}
                />
              </View>

              <Text style={styles.packagesTaxes}>
                {CONSTANT.Packagesincludealltaxes}{" "}
                <Text>
                  {" "}
                  <FontAwesome
                    name="question-circle-o"
                    size={14}
                    color={"#b4b4b4"}
                  />
                </Text>{" "}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() =>
              this.PurchasePackage(
                JSON.stringify(this.state.fetchPackages[index].ID)
              )
            }
            style={styles.packagesButtonArea}
          >
            <Text
              style={styles.packagesButtonText}
            >
              {CONSTANT.PackagesBuyNow}
            </Text>
          </TouchableOpacity>
          <View style={styles.packagesFeatured}>
            <Text style={styles.packagesFeaturetittle}>{CONSTANT.PackagesPackageFeatures}</Text>
            <View>
              <FlatList
                showsVerticalScrollIndicator={false}
                style={{ margin: 10,}}
                data={this.state.fetchPackages[index].features}
                extraData={this.state}
                renderItem={({ item, index }) => (
                  <View
                    style={{
                      flexDirection: "row",
                      paddingVertical: 10,
                    }}
                  >
                    <Text
                      style={{ 
                        flex: 3, 
                        fontWeight: "700", 
                        color: "#767676", 
                        textAlign:'left', 
                        fontFamily:CONSTANT.PoppinsRegular,}}
                    >
                      {item.title}:
                    </Text>
                    <Text
                      style={{
                        flex: 2,
                        textAlign:'right',
                      fontFamily:CONSTANT.PoppinsRegular,
                        color: CONSTANT.primaryColor
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>
                )}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  render() {
    const { isLoading } = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <CustomHeader headerText={CONSTANT.PackagesPackages} />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {this.state.fetchPackages && (
          <Carousel
            layoutCardOffset={`100`}
            layout={"default"}
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.fetchPackages}
            renderItem={this._renderItem}
            sliderWidth={viewportWidth}
            itemWidth={350}
            // loop={true}
            // autoplay={true}
            // autoplayDelay={500}
            // autoplayInterval={1500}
          />
        )}
      </SafeAreaView>
    );
  }
}
export default Packages;
