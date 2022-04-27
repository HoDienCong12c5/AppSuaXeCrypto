import React from 'react';
import {
  View, StyleSheet, Image, Text, ScrollView
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox';
 
import In18 from 'common/constants';
import TextInput from 'components/TextInput/index';
import { height, width } from 'common/styles';
import styles from './style';
import Img from '../../assets/index';
import Buttons from '../../components/Button/index';

const page = ( p ) => {
  const {
    onPressActions,
    onPressLogOut

  } = p.func;
  const { countCalender } = p.state;
  const { calender } = p.props;
  return (
    <View style={styles.container} >
      <ScrollView >
        <View style={styles.containerBuild}>
          <Buttons
            isFontWeight
            styleIcon={styles.iconButton}
            icon={Img.Image.imgAvatar}
            title={In18.NormalTitle.titleAccountUser}
            styleBtn={styles.styleBtnSetting}
            onPress={() => onPressActions( 0 )}></Buttons>
        
          {/* <Buttons
            isFontWeight
            styleIcon={styles.iconButton}
            icon={Img.Image.statistical}
            title={In18.NormalTitle.statistical}
            styleBtn={styles.styleBtnSetting}
            onPress={() => onPressActions( 1 )}></Buttons> */}
          <View style={styles.containerCalender}>
            <Buttons
              isFontWeight
              styleIcon={styles.iconButton}
              icon={Img.Image.calenderDoing}
              title={In18.NormalTitle.calenderDoing}
              styleBtn={styles.styleBtnCalender}
              onPress={() => onPressActions( 2 )}></Buttons>
            {
              countCalender > 0 ? <View style={styles.numberCalender}>
                <Text style={{ fontWeight: 'bold' }}>
                  {countCalender}
                </Text>
              </View> : null
            }
          </View>
          <View style={styles.containerCalender}>
            <Buttons
              isFontWeight
              styleIcon={styles.iconButton}
              icon={Img.Image.iconCalender}
              title={In18.TitleBtn.calender}
              styleBtn={styles.styleBtnCalender}
              onPress={() => onPressActions( 3 )}></Buttons>

            {
              calender > 0 ? <View style={styles.numberCalender}>
                <Text style={{ fontWeight: 'bold' }}>
                  {calender}
                </Text>
              </View> : null
            }

          </View>
          <Buttons
            isFontWeight
            styleIcon={styles.iconButton}
            icon={Img.Image.iconWallet}
            title={In18.NameScreen.wallet}
            styleBtn={styles.styleBtnSetting}
            onPress={() => onPressActions( 4 )}></Buttons>
          <Buttons
            styleIcon={styles.iconButton}
            icon={Img.Image.iconLogOut}
            title={In18.TitleBtn.logOut}
            styleBtn={styles.styleBtnSetting}
            onPress={() => onPressLogOut()}></Buttons>
        </View>
      </ScrollView>
    </View>
  );
};
export default page;
