import React from 'react';
import {
  View, TouchableOpacity, StyleSheet, Text
} from 'react-native';
import { height } from 'common/styles';
import Image from 'components/Image';

const Button = ( props ) => {
  const {
    style, title, isDisable = false, styleText, styleBtn, icon, styleIcon, isFontWeight = false, customViewRight
  } = props;
  return (
    <TouchableOpacity disabled={isDisable}
      style={[styles.container, style]}
      {...props}
    >
      <View style={[styles.containerText, styleBtn]}>
        {
          icon ? (
            <Image style={[styles.styleImage, styleIcon]} url={icon}></Image>
          ) : null
        }
        <View style={{ alignContent: 'center', justifyContent: 'center' }}>
          <Text style={[styles.textButton, isFontWeight && { fontWeight: 'bold' }, styleText]}>{title}</Text>
        </View>
        {
          customViewRight || null
        }
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create( {
  container: {
    display: 'flex',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerText: {
    display: 'flex',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    borderColor: 'orange',
    borderWidth: 1,
    height: height( 6 ),
    flexDirection: 'row'
  },
  styleImage: {
    height: height( 5 ),
    width: height( 5 ),
    marginRight: 10
  },
  textButton: {
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center'
  }
} );
export default Button;
