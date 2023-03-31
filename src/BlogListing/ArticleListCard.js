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
  ImageBackground
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import CONSTANT from '../Constants/local';

const Entities = require("html-entities").XmlEntities;
const entities = new Entities();

class ArticleListCard extends Component {
  render() {
    return (
      <View style={styles.articleListcontainer}>
        <View style={styles.articleListMainArea}>
          <View style={styles.articleListSubArea}>
            <View style={styles.articleListImageArea}>
              <Image
                resizeMode={"cover"}
                style={styles.articleListImageStyle}
                source={this.props.image}
              />
            </View>
            <View style={styles.articleListTextArea}>
              <View>
                <Text style={styles.articleListCategoryText}>
                  {this.props.category}
                </Text>
              </View>
              <View>
                <Text numberOfLines={2} style={styles.articleListTitleText}>
                  {this.props.title}
                </Text>
              </View>
              <View style={styles.articleListDataTextArea}>
                <Text style={styles.articleListDataText}>
                  {this.props.date}
                </Text>
                
              </View>
             
            </View>
          </View>
        </View>
      </View>
    );
  }
}
export default withNavigation(ArticleListCard);