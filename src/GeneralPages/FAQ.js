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

class FAQ extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.DrawerFAQ} />
        <WebView source={{ uri: 'https://qathiya.com/faq/' }} />
      </View>
    );
  }
}
export default withNavigation(FAQ);
