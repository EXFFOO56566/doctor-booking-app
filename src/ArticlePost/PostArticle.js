import React, { Component } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  ImageBackground,
  Text,
  Alert,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  PanResponder,
  Dimensions,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import styles from '../styles/DoctreatAppStyles';
import { SwipeRow, List, Content } from "native-base";
import { Input, InputProps, Button } from "react-native-ui-kitten";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import ImagePicker from "react-native-image-crop-picker";
import CustomHeader from "../Header/CustomHeader";
import MultiSelect from "react-native-multiple-select";
import axios from "axios";
import Dash from "react-native-dash";
import CONSTANT from '../Constants/local';

class PostArticle extends Component {
  constructor(props) {
    super(props);
    (this.array = []),
      (this.arrayTags = []),
      (this.state = {
        isLoading:false,
        articleTitle: "",
        articleDescription: "",
        textInput_Holder: "",
        TagTitle: "",
        arrayHolder_Tag: [],
        articleCategoryKnown: [],
        articleCategory:[],
        tagCategory:[],
        base64_string: "",
        name: "",
        type: "",
        image: "",
        images: "",
        desc: "",
        title: "",
        path: ""
      });
  }
  componentDidMount() {
    this.setState({ arrayHolder_Tag: [...this.arrayTags] });
    this.ProjectarticleCatSpinner();
    this.ProjectarticleTagSpinner();
  }
  joinDataForTags = () => {
    if (this.state.textInput_Holder == "")
    {
      Alert.alert(CONSTANT.Error, CONSTANT.AddCompleteData)
    }
    else {
     
      this.arrayTags.push({ title: this.state.textInput_Holder });
      this.setState({ arrayHolder_Tag: [...this.arrayTags] });
     
    }
    
  };
  ProjectarticleCatSpinner = async () => {
    this.setState({
      isLoading:true
    })
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=category",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let articleCategory = responseJson;
       
        this.setState({
          articleCategory
        });
        this.setState({
          isLoading:false
        })
      })
      .catch(error => {
        console.error(error);
      });
  };
  ProjectarticleTagSpinner = async () => {
    return fetch(
      CONSTANT.BaseUrl + "taxonomies/get_taxonomy?taxonomy=post_tag",
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        let tagCategory = responseJson;
        this.setState({
          tagCategory
        });
      
      })
      .catch(error => {
        console.error(error);
      });
  };
  pickSingleArticleImageBase64(cropit) {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      mediaType: "photo",
      cropping: cropit,
      includeBase64: true,
      includeExif: true
    })
      .then(image => {
        this.setState({
          image: {
            uri: `data:${image.mime};base64,` + image.data,
            width: image.width,
            height: image.height
          },
          images: null
        });
        this.setState({
          base64_string: image.data,
          name: "IMG-20190704-WA0004.jpg",
          type: image.mime,
          path: image.path
        });
      })
      .catch(e => console.log(e));
  }
  PostArticleData = async () => {

    const Uid = await AsyncStorage.getItem("projectUid");
    const {
      title,
      desc,
      base64_string,
      articleCategoryKnown,
      name,
      type,
      path
    } = this.state;
if (title != "" && desc != "" && base64_string != "" && articleCategoryKnown != "" && name != "" && type != "")
{
  this.setState({
    isLoading:true
  })
  axios
  .post(CONSTANT.BaseUrl + "listing/update_article", {
    user_id: Uid,
    post_title: title,
    post_content: desc,
    thumnail_base64: {
      base64_string,
      name,
      type
    },
    post_categories: articleCategoryKnown
  })
  .then(async response => {
    if (response.status === 200) {
      this.setState({ isLoading: false });
      console.log(response);
    } else if (response.status === 203) {
      this.setState({ isLoading: false });
      Alert.alert(CONSTANT.Error , response.data.message);
    }
  })
  .catch(error => {
    Alert.alert(error);
    console.log(error);
  });
}
else
{
  Alert.alert(CONSTANT.Error, CONSTANT.AddCompleteData)
}
   
  };
  render() {
    const { isLoading } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#f7f7f7" barStyle="dark-content" />
        <CustomHeader headerText={CONSTANT.ArticlePostPostArticle} />
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
          <View style={styles.postArticleDetailArea}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.ArticlePostArticleDetail}
            </Text>
            <TextInput
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.ArticlePostAddDetail}
              autoCorrect={false}
              style={styles.TextInputLayoutStyle}
              onChangeText={title => this.setState({ title })}
            ></TextInput>
            <TextInput
              multiline={true}
              underlineColorAndroid="transparent"
              placeholderTextColor="#7F7F7F"
              placeholder={CONSTANT.Description}
              autoCorrect={false}
              onChangeText={desc => this.setState({ desc })}
              style={styles.TextInputLayoutStyleForDetail}
            />
          </View>
          <View style={styles.postArticlePhotoArea}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.ArticlePostArticlePhoto}
            </Text>

            <View res style={styles.postArticleAddPhotoArea}>
              <View style={styles.postArticleAddPhotoStyle}>
                <TouchableOpacity
                  onPress={() => this.pickSingleArticleImageBase64(false)}
                  style={styles.postArticleAddPhotoTouchableArea}
                >
                  <AntIcon
                    onPress={this.joinData}
                    name="plus"
                    color={"#767676"}
                    size={27}
                  />
                  <Text style={styles.postArticleAddPhotoTouchableText}>
                    {CONSTANT.ArticlePostAddArticlePhoto}
                  </Text>
                </TouchableOpacity>
              </View>
              {this.state.base64_string == "" ? (
                <Image
                  source={{
                    uri: `${"data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QN/aHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzEzOCA3OS4xNTk4MjQsIDIwMTYvMDkvMTQtMDE6MDk6MDEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MWFjM2JiZTYtZDJmMy0yZTRkLWFlYzAtYjU1NThiMDVlMDI2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFGQUMxQTAxRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFGQUMxQTAwRUVDQzExRTc5MTY4Q0JGNkVDOERCMkYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE3IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjI4NzM2MWE3LTExMTctNzg0YS05ZmVlLTVhYzRiMTU3OWU5ZiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxYWMzYmJlNi1kMmYzLTJlNGQtYWVjMC1iNTU1OGIwNWUwMjYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAQCwsLDAsQDAwQFw8NDxcbFBAQFBsfFxcXFxcfHhcaGhoaFx4eIyUnJSMeLy8zMy8vQEBAQEBAQEBAQEBAQEBAAREPDxETERUSEhUUERQRFBoUFhYUGiYaGhwaGiYwIx4eHh4jMCsuJycnLis1NTAwNTVAQD9AQEBAQEBAQEBAQED/wAARCAIAAgADASIAAhEBAxEB/8QAXwABAQEBAQAAAAAAAAAAAAAAAAMCAQYBAQAAAAAAAAAAAAAAAAAAAAAQAQACAAYCAwEBAQEAAAAAAAABAhExUWFxEzIDIUGhgRJCkREBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A92AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABMxGcgDM+ysZfLM+2fr4BRybVjOUptac5cBXspq1ExOSBFprOMAuFZi0YwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADk3rH2zPtj6gGzHDNKfZadmcZnMFZ9lY3Zn26QwA7N7T9uDsUtP0Dg3Hq1lqPXWPrEEsJnJqPXadlQEreuaxjjiyvMYxMIA36pzhRGk4WhYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcm9YzlztruDROP0x213O2u4Oz2TlhDM+u85y7213O2u4M9Vtjqts1213O2u4M9Vtjqts1213O2u4OR6p+5aj11jP5c7a7nbXcG4iIygY7a7nbXcGxjtrudtdwbGO2u5213BtO3rmZmYwd7a7nbXcHOq2sKMdtdztruDYx213d7a7g0ORes5S6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5Norm7af8xihMzM4yDc+3SGZvaftwBT1R/wBSey+HxGbVYwrCV5xtIOAp1RqCYp1RrJ1RrIJinVGsnVGsgmKdUaydUayCYp1RrJ1RrIJinVGsnVGsgmKdUaydUayCYp1RrJ1RrIJinVGsnVGsgmKdUaydUayCYp1RrJ1RrIJinVGsnVGoJqeu+PxOacxhODtZwtALAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAx7coTV9kY14SBv10iYxlSIiMoT9U5woAhbynldC3lPIEZwuhGcLgA5a0VjGQdEp9lpy+HP8AdtQWE6+2f+v/AFSJifmAAAAAAAAAAAAAAAAAQt5TyVzjkt5TyVzjkFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJjGJhBdG8YWkCk4WhZBeJxiJAQt5TyuhbynkCM4XQjOFwJ+PlG1ptOKns8ZSAAAa9dsJw+pZAXAAAAAAAAGeyP9YfWrQAAAAAAIW8p5K5xyW8p5K5xyC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACftjKVGfZGNZ2BJX1zjXDRJv1T8zGoKIW8p5XQt5TyBGcLoRnC4OXjGsorpXp/mdgZAAIjGcBT10/6n+A2AAAAAAne/wBR/ZL3+o/ssAN0vh8TkwAuJ0vh8TkoAAAACFvKeSucclvKeSuccguAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAZgCE/E4O1nC0S77IwtyyC6FvKeV6/MRwhbynkCM4XQjOFwAAYn1ROXw51TqoAzX11jeWgAAAAATvf6j+yXv8AUf2WAAAAAG6Xw+JyYAXE6Xw+JyUAABC3lPJXOOS3lPJXOOQXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj2x8RKa14xrKILV8Y4Rt5TytXxjhG3lPIEZwuhGcLgAAA5a0VjGQLWisYy5S/+vifiUrWm04yAuM0v/r4nNoBO9/qP7Je/1H9lgAAAAAAAABul8PicmAFxn1+LQIW8p5K5xyW8p5K5xyC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACExhMwul7IwtjqClfGOEbeU8rV8Y4Rt5TyBGcLoRnC4AFrRWMZBy1orGMo2tNpxktabTjIAAA1PsmYw/wDZZAAAAAAAAAAAAAV9Xj/WmfV4/wBaBC3lPJXOOS3lPJXOOQXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY9sfGOjZaMazAOV8Y4Rt5TytXxjhG3lPIEZwuhGcLgWmKxjKNrTacZU9nikAAAAAAAAAAAAAAAAAACvq8f60z6vH+tAhbynkrnHJbynkrnHILgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIW8p5XQt5TyBGcLoRnC4M+zxSWtX/UYZMdW/4DA31b/h1b/gMDfVv+HVv+AwN9W/4dW/4DA31b/h1b/gMDfVv+HVv+AwN9W/4dW/4DA31b/h1b/gMDfVv+HVv+AwN9W/4dW/4DXq8f605Wv+YwzdBC3lPJXOOS3lPJXOOQXAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQt5Tyul7IwtO4MxnC6Dv+76gsI9l9TsvqCwj2X1Oy+oLCPZfU7L6gsI9l9TsvqCwj2X1Oy+oLCPZfU7L6gsI9l9TsvqCwj2X1Oy+oLCPZfU7L6gsI9l9TsvqCwj2X1Oy+oOW8p5K5xyO0jG0bfILAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOWrFodARmsxm4uAgL4GAIC+BgCAvgYAgL4GAIC+BgCAvgYAgL4GAIC+BgCAvgYAgL4GAIC+ACMVmcoVrWKxu6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//9k="} `
                  }}
                  style={styles.postArticleImageStyle}
                />
              ) : (
                <Image
                  source={{
                    uri: `data:image/gif;base64,${this.state.base64_string}`
                  }}
                  style={styles.postArticleImageStyle}
                />
              )}
            </View>
          </View>
          <View style={styles.postArticleCategoryArea}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.ArticlePostAddCategory}
            </Text>
            <View style={styles.postArticleMultiArea}>
              <MultiSelect 
               styleListContainer={{maxHeight:150}}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ articleCategoryKnown: value })
                }
                uniqueKey="id"
                items={this.state.articleCategory}
                selectedItems={this.state.articleCategoryKnown}
                borderBottomWidth={0}
                searchInputPlaceholderText={CONSTANT.ArticlePostSearchCategory}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.ArticlePostPickCategory}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
          </View>
          <View style={styles.postArticleTagsArea}>
            <Text style={styles.MainHeadingTextStyle}>
              {CONSTANT.ArticlePostAddTags}
            </Text>
            <View style={styles.postArticleMultiArea}>
              <MultiSelect 
               styleListContainer={{maxHeight:150}}
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={value =>
                  this.setState({ arrayHolder_Tag: value })
                }
                uniqueKey="id"
                items={this.state.tagCategory}
                selectedItems={this.state.arrayHolder_Tag}
                borderBottomWidth={0}
                searchInputPlaceholderText={CONSTANT.ArticlePostEnterValue}
                onChangeInput={text => console.log(text)}
                selectText={CONSTANT.ArticlePostEnterValue}
                styleMainWrapper={styles.MultiSelectstyleMainWrapper}
                styleDropdownMenuSubsection={styles.MultiSelectstyleDropdownMenuSubsection}
                displayKey="name"
                submitButtonText={CONSTANT.Submit}
              />
            </View>
            {/* <View style={styles.postArticleTagTitle}>
              <TextInput
                onChangeText={TagTitle =>
                  this.setState({ textInput_Holder: TagTitle })
                }
                underlineColorAndroid="transparent"
                placeholderTextColor="#7F7F7F"
                placeholder={CONSTANT.ArticlePostEnterValue}
                style={styles.postArticleTagTitleTextInput}
              />
              <TextInput onChangeText={Memberdata => this.setState({ textInput_Holder: data })} underlineColorAndroid="transparent" placeholderTextColor="#7F7F7F" placeholder="Enter Value Here" style={{ paddingLeft: 10, borderRadius: 2, height: 50, color: '#323232', borderWidth: 0.6, borderColor: '#dddddd', marginBottom: 10, width: '80%' }} />
              <View style={styles.postArticleTagsIconArea}>
                <AntIcon
                  onPress={this.joinDataForTags}
                  name="plus"
                  color={"#fff"}
                  size={20}
                  style={styles.postArticleTagsIconStyle}
                />
              </View>
            </View> */}
          </View>
          <TouchableOpacity
            onPress={this.PostArticleData}
            style={styles.MainButtonArea}
          >
            <Text style={styles.MainButtonText}>
              {CONSTANT.ArticlePostPostArticle}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(PostArticle);
