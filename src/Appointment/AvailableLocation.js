import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ActivityIndicator,
  PanResponder,
  Alert,
  Dimensions,
  AsyncStorage
} from "react-native";
//import { AsyncStorage } from '@react-native-community/async-storage';
import styles from '../styles/DoctreatAppStyles';
import { withNavigation, DrawerActions } from "react-navigation";
import { ScrollableTabView } from "react-native-scrollable-tab-view";
import CustomHeader from "../Header/CustomHeader";
import CONSTANT from '../Constants/local';
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class AvailableLocation extends Component {
  state = {
    availableLocationData: [],
    isLoading: true
  };
  componentDidMount() {
    this.fetchAvailablelocations();
  }
  fetchAvailablelocations = async () => {
    const id = await AsyncStorage.getItem("projectUid");
    const response = await fetch(
      CONSTANT.BaseUrl + "team/get_hospital_listing?user_id=" + id+ "&location=" +this.props.location
    );
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ availableLocationData: [], isLoading: false }); // empty data set
    } else {
      this.setState({ availableLocationData: json, isLoading: false });
    }
  };

  _listEmptyComponent = () => {
    return (
      <View
        style={styles.searchResultTopCategoryNoResultArea}>
        <Image
          style={styles.searchResultTopCategoryNoResultImage}
          source={require('../../Assets/Images/arrow.png')}
        />
        <Text
          style={styles.searchResultTopCategoryNoResultText}>
          {CONSTANT.SearchResultNoRecordFound}
        </Text>
      </View>
    );
  };

  render() {
    const { isLoading } = this.state;
    return (
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
        {this.state.availableLocationData && (
          <FlatList
            style={styles.AvailableLocationFlatlistStyle}
            data={this.state.availableLocationData}
            ListEmptyComponent={this._listEmptyComponent}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("LocationDetail", {
                    id: item.ID
                  })
                }
                activeOpacity={0.9}
              >
                <View
                  style={styles.AvailableLocationMainArea}
                >
                  <View>
                    <Image
                      style={styles.AvailableLocationImageStyle}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View
                    style={styles.AvailableLocationTextArea}
                  >
                    <Text style={styles.AvailableLocationStatusText}>
                      {item.status}
                    </Text>
                    <Text
                      style={styles.AvailableLocationNameText}
                    >
                      {entities.decode(item.name)}
                    </Text>

                    <FlatList
                      data={this.state.availableLocationData[index].days}
                      ListEmptyComponent={this._listEmptyComponent}
                      keyExtractor={(x, i) => i.toString()}
                      renderItem={({ item }) => (
                        <View>
                          <Text
                            style={styles.AvailableLocationDaysText}
                          >
                            {item.d}
                          </Text>
                        </View>
                      )}
                      horizontal={true}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    );
  }
}
export default withNavigation(AvailableLocation);
