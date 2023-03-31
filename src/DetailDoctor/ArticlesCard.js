import React, { Component } from "react";
import { View, StyleSheet, TouchableOpacity, StatusBar, ScrollView, Text, Image } from "react-native";
import StarRating from "react-native-star-rating";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from 'react-navigation';
import CONSTANT from '../Constants/local';
import styles from '../styles/DoctreatAppStyles';

class ArticlesCard extends Component {

  render() {
    return (
      <TouchableOpacity 
        activeOpacity={.7} 
        onPress={() => this.props.navigation.navigate("DetailDoctorScreen")} 
        style={styles.ArticleCardContainer}
      >
        <View style={styles.ArticleCardImageArea}>
          <Image resizeMode={'cover'} style={styles.ArticleCardImageStyle}
            source={this.props.image}
          />
          <View style={styles.ArticleCardDetailArea}>
            <Text style={styles.ArticleCardCategoryText}
            >
              {this.props.category}
            </Text>
            <View style={styles.ArticleCardTitleArea}>
              <Text numberOfLines={1} 
                style={styles.ArticleCardTitleText}>
                  {this.props.title}
              </Text>
              <View style={styles.ArticleCardMultiViewArea}>
                <View style={styles.ArticleCardArea40}>
                  <AntIcon
                    name="pushpino"
                    color={CONSTANT.primaryColor}
                    size={12}
                  />
                  <Text style={styles.ArticleCardTextStyle}>{this.props.date}</Text>
                </View>

                <View style={styles.ArticleCardArea20}>
                  <AntIcon
                    name="hearto"
                    color={CONSTANT.primaryColor}
                    size={12}
                  />
                  <Text style={styles.ArticleCardTextStyle}>{this.props.likes}</Text>
                </View>

                <View style={styles.ArticleCardArea20}>
                  <AntIcon
                    name="eyeo"
                    color={CONSTANT.primaryColor}
                    size={12}
                  />
                  <Text style={styles.ArticleCardTextStyle}>{this.props.views}</Text>
                </View>

                <View style={styles.ArticleCardArea20}>
                  <AntIcon
                    name="sharealt"
                    color={CONSTANT.primaryColor}
                    size={12}
                  />
                  <Text style={styles.ArticleCardTextStyle}>{CONSTANT.ArticlesCardShare}</Text>
                </View>
              </View>

            </View>
          </View>

        </View>
      </TouchableOpacity>

    );
  }
}
export default withNavigation(ArticlesCard);
