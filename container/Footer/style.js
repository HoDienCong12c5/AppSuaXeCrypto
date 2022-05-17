import React from 'react';
import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';
import Colors from 'common/Colors';

const styles = StyleSheet.create( {
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: 'red',
    borderTopWidth: 1
    // position:'absolute',
  },
  footerItem: {
    display: 'flex',
    alignItems: 'center'
  },
  boxMenuInActive: {
    height: 28,
    width: 28,
    padding: 2.5
  },
  img: {
    height: 30,
    width: 30,
    padding: 10
  },
  calender: {
    position: 'absolute',
    right: -height( 1.5 ),
    top: -height( 1 ),
    backgroundColor: Colors.GREEN,
    paddingHorizontal: 5,
    borderRadius: 20
  }
} );
export default styles;
