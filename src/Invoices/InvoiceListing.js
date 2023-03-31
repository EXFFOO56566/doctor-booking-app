import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Keyboard,
  NativeModules,
  TextInput,
  BackHandler,
  FlatList,
  Alert,
  Modal,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import AntIcon from "react-native-vector-icons/AntDesign";
import CONSTANT from '../Constants/local';
import CustomHeader from "../Header/CustomHeader";
import { withNavigation } from "react-navigation";

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();
class InvoiceListing extends Component {
  state = {
    data: [],
    invoiceData: [],
    isLoading: false,
    starCount: 3.5,
  };
  onStarRatingPress(rating) {
    this.setState({
      starCount: rating,
    });
  }
  componentDidMount() {
    this.fetchFavDoctorsData();
  }
  fetchFavDoctorsData = async () => {
    this.setState({
      isLoading: true,
    });
    const id = await AsyncStorage.getItem("projectUid");
    return fetch(
      CONSTANT.BaseUrl + "listing/invoices?user_id=" + id,
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
        console.log("responseJson" , responseJson.invoice_data)
        this.setState({
          invoiceData : responseJson.invoice_data,
          isLoading: false,
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const { isLoading } = this.state;
    return (
      <View style={styles.favDoctorsContainer}>
            <CustomHeader headerText={CONSTANT.invoices} />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        <View style={styles.AppointmentListMainArea}>
            {this.state.invoiceData.length >= 1 && (
              <FlatList
                data={this.state.invoiceData}
                ListEmptyComponent={this._listEmptyComponent}
                keyExtractor={(x, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    activeOpacity={0.9}
                  >
                    <View style={styles.AppointmentListFlatListArea}>
                      <View style={styles.AppointmentListDateArea}>
                        <Text style={styles.AppointmentListDateText}>
                          {item.order_id}
                        </Text>
                      </View>
                      <View style={styles.AppointmentListDetailArea}>
                        <View>
                          <Text style={styles.AppointmentListDateText}>
                          {entities.decode(item.symbol.symbol)} {item.amount}
                          </Text>
                          <View style={styles.AppointmentDetailMainStatusArea}>
                            <Text style={styles.AppointmentListMonthText}>
                              {item.date_created}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            )}
          </View>
      </View>
    );
  }
}
export default withNavigation(InvoiceListing);
