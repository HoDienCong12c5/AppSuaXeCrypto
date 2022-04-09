import React from 'react';
import {
  View, StyleSheet, Image, Text, ScrollView
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox';
import User from 'modals/User';
import In18 from 'common/constants';
import TextInput from 'components/TextInput/index';
import { height, width } from 'common/styles';
import styles from './style';
import Img from 'assets/index';
import Buttons from '/components/Button/index';
// import QRCode from 'react-native-qrcode-svg';
const page = ( p ) => {
  const {
    onPressCreate,
    onPressSend,
    onPressScan,
    onPressSubmitCheck
  } = p.func;
  const { walletUser } = p.state;
  const { wallet } = p.props;
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';

  return (
    <View style={styles.container} >
      <View style={styles.containerHeader}>
        {/* <QRCode
          value="Just some string value"
          logo={{uri: base64Logo}}
          logoSize={30}
          logoBackgroundColor='transparent'
        /> */}
      </View>
      <View style={styles.containerBody}>

      </View>
    </View>
  );
};
export default page;
