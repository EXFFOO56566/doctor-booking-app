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
      BlogList: [],
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
    this.fetchBlogList();
  }
  fetchBlogList = async () => {
    this.setState({
      isLoading: true
    });
    const response = await fetch(CONSTANT.BaseUrl + "listing/get_articles");
    const json = await response.json();
    if (
      Array.isArray(json) &&
      json[0] &&
      json[0].type &&
      json[0].type === "error"
    ) {
      this.setState({ BlogList: [], isLoading: false }); // empty data set
    } else {
      this.offset = this.offset + 1;
      this.setState({
        BlogList: [...this.state.BlogList, ...this.state.BlogList.concat(json)],
        isLoading: false
      });
      this.setState({ BlogListTotalCount: json[0].totals, isLoading: false });
    }
  };
  loadMoreData = async () => {
    // const response = await fetch(CONSTANT.BaseUrl + "listing/get_articles");
    // const json = await response.json();
    // if (
    //   Array.isArray(json) &&
    //   json[0] &&
    //   json[0].type &&
    //   json[0].type === "error"
    // ) {
    //   this.setState({ BlogList: [], isLoading: false }); // empty data set
    // } else {
    //   this.offset = this.offset + 1;
    //   this.setState({BlogList: this.state.BlogList.concat(responseJson)  , isLoading: false });
    //   // this.setState({ BlogListTotalCount: json[0].totals, isLoading: false });
    // }

    this.setState({ fetching_from_server: true }, () => {
      fetch(
        CONSTANT.BaseUrl +
          "listing/get_articles?" +
          "page_number=" +
          this.offset
      )
        //Sending the currect offset with get request
        .then(response => response.json())
        .then(responseJson => {
          //Successful response from the API Call

          //After the response increasing the offset for the next API call.
          if (
            Array.isArray(responseJson) &&
            responseJson[0] &&
            responseJson[0].type &&
            responseJson[0].type === "error"
          ) {
            this.setState({ data: [], isLoading: false }); // empty data set
          } else {
            this.offset = this.offset + 1;
            this.setState({
              BlogList: this.state.BlogList.concat(responseJson),
              isLoading: false,
              fetching_from_server: false
            });
            //                   this.setState({Toataldata: responseJson[0].totals , isLoading: false});
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
        this.state.BlogList.length ? (
          <View style={styles.articleListingfooter}>
            <TouchableOpacity
              onPress={this.loadMoreData}
              //On Click of button calling loadMoreData function to load more data
              style={styles.articleListingloadMoreBtn}
            >
              <Text style={styles.articleListingbtnText}>{CONSTANT.LoadMore}</Text>
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
          this.fetchBlogList();
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

  render() {
    let data = this.state.HomeSpecialities;
    const { isLoading } = this.state;
    return (
      <View style={styles.articleListingContainer}>
        <CustomHeader headerText={CONSTANT.ArticleListingHeaderText} />
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
              {CONSTANT.BlogListingSectionText}
            </Text>
          </View>
        ) : null}

        {this.state.BlogList && (
          <FlatList
            style={styles.articleListingsearchListStyle}
            data={this.state.BlogList}
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
                {/* <ArticleListCard
                  image={{ uri: `${item.image_url}` }}
                  title={`${entities.decode(item.title)}`}
                  date={`${entities.decode(item.posted_date)}`}
                  view={item.views}
                  category={`${entities.decode(item.categories.name)}`}
                /> */}
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
                            {entities.decode(item.title)}
                          </Text>
                        </View>
                        <View style={styles.articleListDataTextArea}>
                          <Text style={styles.articleListDataText}>
                            {item.posted_date}
                          </Text>
                          
                        </View>
                        {/* <View style={styles.articleListEditDeleteArea} />

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "flex-end"
                          }}
                        >
                          <Text style={{ color: "#55acee", fontSize: 15 }}>
                            Edit
                          </Text>
                          <Text
                            onPress={() => this.deleteArticle(item.ID)}
                            style={{
                              color: "#fe736e",
                              fontSize: 15,
                              marginLeft: 20
                            }}
                          >
                            Delete
                          </Text>
                        </View> */}
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
