import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {withNavigation, DrawerActions} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import { WebView } from 'react-native-webview';
import CONSTANT from '../Constants/local';

class PrivacyPolicy extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.DrawerPrivacyPolicy} />
        <WebView source={{ uri: 'https://qathiya.com/privacy-policy' }} />
      </View>
    );
  }
}
export default withNavigation(PrivacyPolicy);
