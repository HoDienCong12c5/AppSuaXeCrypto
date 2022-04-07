import React from 'react';
import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';

const styles = StyleSheet.create( {
  containerItem: {
    backgroundColor: '#F2F2F2',
    margin: 7,
    paddingVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: 'Black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width( 90 )
  },
  containerItemDetail: {
    flexDirection: 'row',
    // justifyContent:'',
    marginVertical: 6
  },
  sdtCustomer: {
    color: 'red'
  },
  dateAndStatus: {
    fontSize: 13
  },
  hoanThanh: {
    color: 'green'
  },
  succes: {
    height: 20,
    width: 20,
    paddingRight: 10,
    // marginRight: 4,
    marginTop: 4
  },
  dangLam: {
    color: 'blue'
  }
} );
export default styles;
