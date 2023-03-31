import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Text,
  Image,
  Alert,
  Platform,
  PermissionsAndroid
} from "react-native";
import styles from '../../styles/DoctreatAppStyles';
import StarRating from "react-native-star-rating";
import AntIcon from "react-native-vector-icons/AntDesign";
import { withNavigation, DrawerActions } from "react-navigation";
import RNFetchBlob from "rn-fetch-blob";
import * as CONSTANT from "../../Constants/Constant";
class DownloadCard extends Component {

  FileDownload = () => {
    const { dirs } = RNFetchBlob.fs;
   let options = Platform.select({
      ios: {
        fileCache: true,
        path: `${dirs.DownloadDir}/`+ this.props.name,
      },
      android: {
        fileCache: true,
        addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mediaScannable: true,
        title: this.props.name,
        path: `${dirs.DownloadDir}/`+ this.props.name,
        },
      }
    });

    RNFetchBlob.config(options)
      .fetch('GET', this.props.Url, {})
      .then((res) => {
        console.log("Success", res);
        //  console.log(res);
        if (Platform.OS === "ios") {
          RNFetchBlob.ios.openDocument(res.data);
        }
      })
      .catch((e) => {
        console.log(e)
    });
 }
  downloadFile = async()=> {
    if (Platform.OS === "ios") {
      this.FileDownload();
    } else {
    try {
      const granted_permission = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE ,
        {
          title: CONSTANT.DownloadCardStoragePermission,
          message: CONSTANT.DownloadCardAccess
        });
      if (granted_permission === PermissionsAndroid.RESULTS.GRANTED) {
        this.FileDownload();
      } else {
        Alert.alert(CONSTANT.DownloadCardPermissionDenied, CONSTANT.DownloadCardStorage);
      }
    } catch (err) {
      console.warn(err);
    } 
  }
  }
  render() {
   
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={()=> this.downloadFile()}
        style={styles.downloadContainer}>
        <View style={styles.downloadMain}>
          <View style={styles.downloadImageArea}>
            <Image
              resizeMode={"cover"}
              style={styles.downloadImageStyle}
              source={require("../../../Assets/Images/Download.png")}
            />
          </View>  
          <View style={styles.downloadTextArea}>
            <Text
              numberOfLines={1}
              style={styles.downloadTextstyle1}
            >
              {this.props.name}
            </Text>
            <Text
              numberOfLines={1}
              style={styles.downloadTextstyle2}
            >
              {this.props.size}
            </Text>
          </View>
          <View
            style={styles.downloadIconArea}
          >
            <AntIcon
              name="download"
              color={"#484848"}
              size={15}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default withNavigation(DownloadCard);
