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

class TermsOfService extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.DrawerTermsOfService} />
        <WebView source={{ uri: 'https://qathiya.com/terms-of-service/' }} />
      </View>
    );
  }
}
export default withNavigation(TermsOfService);
