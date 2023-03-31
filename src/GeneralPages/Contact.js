import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import styles from '../styles/DoctreatAppStyles';
import { withNavigation, DrawerActions } from 'react-navigation';
import CustomHeader from '../Header/CustomHeader';
import CONSTANT from '../Constants/local';

class Contact extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomHeader headerText={CONSTANT.ContactNumberContactSupport} />
          <View style={styles.contactMainArea}>
            <View style={styles.contactTextArea}>
              <Text style={styles.contactHeadingText}>
                  {CONSTANT.ContactNumberHeader}
              </Text>
              <Text style={styles.contactInfoText}>
                  {CONSTANT.ContactNumberOne}
              </Text>
              <Text style={styles.contactInfoText}>
                {CONSTANT.ContactNumberTwo}
              </Text>
            </View>
            
            <View style={styles.contactTextArea}>
              <Text style={styles.contactHeadingText}>
                {CONSTANT.ContactEmailHeader}
              </Text>
              <Text style={styles.contactInfoText}>
                {CONSTANT.ContactEmailOne}
              </Text>
              <Text style={styles.contactInfoText}>
                {CONSTANT.ContactEmailTwo}
              </Text>
            </View>
          </View>
      </View>
    );
  }
}
export default withNavigation(Contact);
