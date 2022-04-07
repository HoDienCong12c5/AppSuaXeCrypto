import React from 'react';
import {
  View, TextInput, StyleSheet, Text,
  Dimensions, Platform, PixelRatio, Image
} from 'react-native';
import image from 'assets/index';
import In18 from '../../common/constants';

const MYWIDTH = Dimensions.get( 'window' ).width;
const MYHEIGHT = Dimensions.get( 'window' ).height;
const width = ( num ) => PixelRatio.roundToNearestPixel( MYWIDTH * ( num / 100 ) );
const height = ( num ) => PixelRatio.roundToNearestPixel( MYHEIGHT * ( num / 100 ) );

const TextInputs = ( props ) => {
  const {
    type = null, placeholder, isDisable = false, style, icon, styleImg, styleInput, password = false, noIcon = false, numberOfLines = 0
  } = props;
  const imgAvatar = !icon ? image.Image.icProfile : icon;
  return (
    <View style={styles.all}>
      <View style={[styles.sectionStyle, style]}>
        {
          !noIcon ? (
            <Image source={imgAvatar} style={[styles.ImageStyle, styleImg]} />
          ) : null
        }
        {
          numberOfLines > 1 ? (
            <TextInput
              autoComplete={type || 'off'}
              editable = {true}
              multiline = {true}
              numberOfLines={numberOfLines}
              placeholder={placeholder}
              secureTextEntry={password}
              {...props}
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.textInput, styleInput]}
            >
            </TextInput>
          ) : (
            <TextInput
              placeholder={placeholder}
              secureTextEntry={password}
              {...props}
              // eslint-disable-next-line react-native/no-inline-styles
              style={[styles.textInput, styleInput]}
            >
            </TextInput>
          )
        }

      </View>

    </View>

  );
};
const styles = StyleSheet.create( {
  all: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  styleIcon: {
    position: 'absolute'
  },
  textInput: {
    flex: 1
  },
  sectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'orange',
    borderRadius: 10,
    width: width( 90 ),
    paddingHorizontal: 5
  },
  ImageStyle: {
    // padding: 10,
    marginLeft: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'flex-end'
    // backgroundColor: 'green',
  }
} );
export default TextInputs;
