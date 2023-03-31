import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  Text,
  Image,
  ActivityIndicator,
  Alert,
  TextInput,
  ImageBackground,
  AsyncStorage
} from "react-native";
import styles from "../styles/DoctreatAppStyles";
import { withNavigation, DrawerActions } from "react-navigation";
import CustomHeader from "../Header/CustomHeader";
import CONSTANT from '../Constants/local';
import ArticleListCard from "./ArticleListCard";
import ArticleDetailPage from "./ArticleDetailPage";
import axios from "axios";
const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class ArticleListing extends Component {
  constructor() {
    super();
    this.onEndReachedCalledDuringMomentum = true;
    this.state = {
      loading: true,
      //Loading state used while loading the data for the first time
      serverData: [],
      //Data Source for the FlatList
      fetching_from_server: false,
      //Loading state used while loading more data
      BlogListTotalCount: "",
      data: [],
      Toataldata: "",
      page: 1,
      isLoading: false,
      MyArticleList: [],
      selectedItems: [],
      SpecialityKnown: [],
      Title: "",
      Description: "",
      Search: "",
      Refresh: false
    };
    this.offset = 1;
    //Index of the offset to load from web API
  }
  componentWillMount() {
    this.fetchMyArticles();
  }
  fetchMyArticles = async () => {
    this.setState({
      isLoading: true
    });
    const Uid = await AsyncStorage.getItem("projectProfileId");
    const response = await fetch(CONSTANT.BaseUrl + "listing/get_articles?profile_id=" + Uid);
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ MyArticleList: [], isLoading: false });
    } else {
      this.offset = this.offset + 1;
      this.setState({
        MyArticleList: [...this.state.MyArticleList, ...this.state.MyArticleList.concat(json)],
        isLoading: false
      });
      this.setState({ BlogListTotalCount: json[0].totals, isLoading: false });
    }
  };
  loadMoreData = async () => {
    const Uid = await AsyncStorage.getItem("projectProfileId");
    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl +
          "listing/get_articles?profile_id=" + Uid +
          "&page_number=" +
          this.offset
      )
        .then(response => response.json())
        .then(responseJson => {
          if (
            Array.isArray(responseJson) &&
            responseJson[0] &&
            responseJson[0].type &&
            responseJson[0].type === "error"
          ) {
            this.setState({ data: [], isLoading: false });
          } else {
            this.offset = this.offset + 1;
            this.setState({
              MyArticleList: this.state.MyArticleList.concat(responseJson),
              isLoading: false,
              fetching_from_server: false
            });
          }
        })
        .catch(error => {
          console.error(error);
        });
    });
  };

  renderFooter() {
    return (
      //Footer View with Load More button
      <View>
        {this.state.BlogListTotalCount.toString() !=
        this.state.MyArticleList.length ? (
          <View style={styles.articleListingfooter}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              //On Click of button calling loadMoreData function to load more data
              style={styles.articleListingloadMoreBtn}
            >
              <Text style={styles.articleListingbtnText}>Load More</Text>
              {this.state.fetching_from_server ? (
                <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
              ) : null}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  }
  deleteArticle = async id => {
    this.setState({
      isLoading: true
    });
    const Uid = await AsyncStorage.getItem("projectUid");
    axios
      .post(CONSTANT.BaseUrl + "listing/remove_article", {
        id: id,
        user_id: Uid
      })
      .then(async response => {
        if (response.status === 200) {
          Alert.alert(CONSTANT.Success, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
          this.fetchMyArticles();
        } else if (response.status === 203) {
          Alert.alert(CONSTANT.Oops, JSON.stringify(response.data.message));
          this.setState({ isLoading: false });
        }
      })
      .catch(error => {
        Alert.alert(error);
        console.log(error);
      });
  };
  _listEmptyComponent = () => {
    return (
      <View style={{marginTop:'50%'}}>
        {this.state.BlogListTotalCount == "" ? (
          <View style={styles.SearchResultScreenNoResultArea}>
            <Image
              style={styles.SearchResultScreenNoResultImage}
              source={require("../../Assets/Images/arrow.png")}
            />
            <Text style={styles.SearchResultScreenNoResultText}>
              {CONSTANT.SearchResultNoRecordFound}
            </Text>
          </View>
        ) : (
          Alert.alert(CONSTANT.Oops, CONSTANT.ArticleNodata)
        )}
      </View>
    );
  };

  render() {
    let data = this.state.HomeSpecialities;
    const { isLoading } = this.state;
    return (
      <View style={styles.articleListingContainer}>
        <CustomHeader headerText={CONSTANT.MyArticlesHeaderText} />
        {isLoading ? (
          <View style={styles.ActivityIndicatorAreaStyle}>
            <ActivityIndicator
              size="small"
              color={CONSTANT.primaryColor}
              style={styles.ActivityIndicatorStyle}
            />
          </View>
        ) : null}
        {this.state.BlogListTotalCount != "" ? (
          <View style={{ flexDirection: "row" }}>
            <Text style={styles.MainHeadingTextStyle}>
              {this.state.BlogListTotalCount}
            </Text>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.ArticleListingSectionText}
            </Text>
          </View>
        ) : null}

        {this.state.MyArticleList && (
          <FlatList
            style={styles.articleListingsearchListStyle}
            data={this.state.MyArticleList}
            extraData={this.state.Refresh}
            ListEmptyComponent={this._listEmptyComponent}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("ArticleDetailPage", {
                    itemId: item.ID
                  });
                }}
                activeOpacity={0.9}
              >
                <View style={styles.articleListcontainer}>
                  <View style={styles.articleListMainArea}>
                    <View style={styles.articleListSubArea}>
                      <View style={styles.articleListImageArea}>
                        <Image
                          resizeMode={"cover"}
                          style={styles.articleListImageStyle}
                          source={{ uri: item.image_url }}
                        />
                      </View>
                      <View style={styles.articleListTextArea}>
                        <View>
                          <Text style={styles.articleListCategoryText}>
                            {item.categories.name}
                          </Text>
                        </View>
                        <View>
                          <Text
                            numberOfLines={2}
                            style={styles.articleListTitleText}
                          >
                            {item.title}
                          </Text>
                        </View>
                        <View style={styles.articleListDataTextArea}>
                          <Text style={styles.articleListDataText}>
                            {item.posted_date}
                          </Text>
                          {/* <Text style={styles.articleListViewText}>
                            {item.view}
                          </Text> */}
                        </View>
                        <View style={styles.articleListEditDeleteArea} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end"
                          }}
                        >
                          <Text style={{ color: "#55acee", fontSize: 15 }}>
                            {CONSTANT.Edit}
                          </Text>
                          <Text
                            onPress={() => this.deleteArticle(item.ID)}
                            style={{
                              color: "#fe736e",
                              fontSize: 15,
                              marginLeft: 20
                            }}
                          >
                            {CONSTANT.Delete}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            )}
            extraData={this.state}
            ListFooterComponent={this.renderFooter.bind(this)}
          />
        )}
      </View>
    );
  }
}
export default withNavigation(ArticleListing);
