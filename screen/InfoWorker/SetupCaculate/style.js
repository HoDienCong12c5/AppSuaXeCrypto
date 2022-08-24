import React from 'react';
import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';
import {Colors} from 'common/Colors';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  containerCheckBox: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.YELLOW,
    marginBottom: 10
  },
  textSTD: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  styleBtnDate: {
    borderWidth: 0,
    padding: 0,
    paddingHorizontal: 0
  },
  containerContent: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    margin: 5

  },
  styleNote: {
    width: width( 80 ),
    flexWrap: 'wrap'
  },
  styleTextChangDate: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  styleBtnSubmit: {
    width: width( 35 )
  },
  styleBtnClose: {
    width: width( 35 )
  },
  address: {
    width: width( 79 ),
    backgroundColor: 'white'
  }
} );
export default styles;
