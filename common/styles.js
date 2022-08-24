import React from 'react';
import {
  Dimensions, Text, Platform, PixelRatio, StatusBar
} from 'react-native';

const MYWIDTH = Dimensions.get( 'window' ).width;
const MYHEIGHT = Dimensions.get( 'window' ).height;
export const width = ( num ) => PixelRatio.roundToNearestPixel( MYWIDTH * ( num / 100 ) );
export const height = ( num ) => PixelRatio.roundToNearestPixel( MYHEIGHT * ( num / 100 ) );
export const Colors = {
  // text color
  TEXT_PRIMARY: '#069EDB',
  TEXT_SECONDARY: '#333333',
  TEXT_GRAY1: '#828282',
  TEXT_GRAY2: '#E0E0E0',

  // app color
  BLACK: '#000000',
  WHITE: '#FFFEFF',
  GRAY: '#BDBDBD',
  GRAY1: '#828282',
  GRAY2: '#E0E0E0',
  BLUE: '#069EDB',
  BLUE1: '#006CBC',
  GREEN: '#5DBB46',
  GREEN1: '#219653',
  YELLOW: '#F99D26',
  RED: '#E61A27',
  RED1: '#ED1C24'
};
export default ()=>{}
