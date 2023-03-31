import React, {Component} from 'react';
import {
  View,
  ScrollView,
  Text,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import {withNavigation, DrawerActions} from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';

class AboutUs extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.AboutUs} />
        <ScrollView>
          <View>
            <Text style={styles.aboutUsMainText}>
              {CONSTANT.AboutUsMain}
            </Text>
            <View style={styles.aboutUsView}>
                <View style={styles.aboutUsTextArea}>
                  <Text style={styles.aboutUsTextRegular}>{CONSTANT.AboutUsCompany}</Text>
                  <Text style={styles.aboutUsTextRegular}>:</Text>
                </View>
                <Text style={styles.aboutUsTextBold}>{CONSTANT.AboutUsCompanyName}</Text>
            </View>
            <View style={styles.aboutUsView}>
                <View style={styles.aboutUsTextArea}>
                  <Text style={styles.aboutUsTextRegular}>{CONSTANT.AboutUsAPPversionText}</Text>
                  <Text style={styles.aboutUsTextRegular}>:</Text>
                </View>
                <Text style={styles.aboutUsTextBold}>{CONSTANT.AboutUsAppVersion}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default withNavigation(AboutUs);
