import React from 'react';
import {
  View, TouchableOpacity, Image, Text
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import Img from '../../assets';
import styles from './style';

const Header = ( props ) => {
  const { title, showBtnBack = true, isRefresh = false, customView=null } = props;
  return (
    <View style={styles.container}>
      {
        customView?(
          customView
        ):(
          <>
            {
              showBtnBack ? (
                <TouchableOpacity onPress={isRefresh ? ( () => Actions.refresh() ) : ( () => Actions.pop() )}>
                  <Image source={Img.Image.icBack} style={styles.rightBTN} onPress={() => {}}/>
                </TouchableOpacity>
              ) : <Text/> }
            <Text style={styles.title}>{title}</Text>
            <Text> </Text>
          </>
        )
      }
     
    </View>
  );
};
export default Header;
