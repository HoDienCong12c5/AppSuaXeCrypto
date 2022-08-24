import React from 'react';
import {
  View, StyleSheet, Image, Text, ScrollView, Alert
} from 'react-native';
import Button from 'components/Buttons';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { push } from 'react-native-simple-store';
import database from '@react-native-firebase/database';
import { width } from 'common/styles';
import messaging from '@react-native-firebase/messaging';

import Img from 'assets';
import TextInput from 'components/TextInput';
import styles from './style';
import In18 from '../../common/constants';

// require( 'crypto' );
// const Wallet = require( 'ethereumjs-wallet' );

const page = ( p ) => {
  const {
    txtSDT, txtPass
  } = p.state;

  const {
    onPressLogin, onChangePassword, onChangeSDT, openPopup
  } = p.func;
  
  return (
    <View style={styles.container} >
      <ScrollView >
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.imgLoGo}
              source={Img.Image.worker}

            />
          </View>
          <View style={styles.containerContext}>
            <TextInput
              value={txtSDT}
              placeholder={In18.User.numberPhone}
              onChangeText={onChangeSDT}
              keyboardType='numeric'
            >
            </TextInput>

            <TextInput
              value={txtPass}
              placeholder={In18.User.password}
              onChangeText={onChangePassword}
              icon={Img.Image.iconPass}
              password={true}
            >
            </TextInput>
          </View>
          <View style={styles.conatinerRegitster}>
            <Text>{In18.NormalTitle.questionAccount}</Text>
            <Button
              title={In18.TitleBtn.register}
              onPress={() => Actions.register()}
              styleText={styles.textRegister}
              styleBtn={styles.btnRegister}
            ></Button>
          </View>
          <Button
            title={In18.TitleBtn.login}
            onPress={onPressLogin}
          >
          </Button>
          <Button
            title="push dai"
            onPress={openPopup}
          >
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};
export default page;
