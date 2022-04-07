import React from 'react';
import { StyleSheet } from 'react-native';
import { width, Colors, height } from 'common/styles';

const styles = StyleSheet.create( {
  container: {
    paddingHorizontal: 10,
  },
  containerButton: {
    flexDirection: 'row',
    width: width( 75 ),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height( 3 ),
  },
  title: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: height( 4 ),
  },
  decription: {
    fontSize: 16,
  },
  buttonClose: {
    width: width( 36 ),
  },
  buttonSave: {
    width: width( 36 ),
    backgroundColor: Colors.BLUE1,
  },
  styleInput: {
    width: width( 77 ),
    borderWidth: 0,
    borderBottomWidth: 1,
  },
} );
export default styles;
