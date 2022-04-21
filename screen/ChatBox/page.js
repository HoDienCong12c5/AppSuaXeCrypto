import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image, ScrollView
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox';
import User from 'modals/User';
import In18 from 'common/constants';
import TextInput from 'components/TextInput/index';
import { height, width } from 'common/styles';
import styles from './styles';
import Img from '../../assets/index';
import Buttons from 'components/Button/index';

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
        <View style={styles.containerSend}>
          <TextInput
            style={styles.input}
            noIcon
          />
          <TouchableOpacity

          >
            <View style={styles.iconButton}>
              <Image 
                source={Img.Image.iconSend} 
                style={styles.iconSend}/>

            </View>
          </TouchableOpacity>
        
        </View>
      </ScrollView>
    </View>
  );
};
export default page;
