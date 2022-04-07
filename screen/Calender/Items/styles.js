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
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width( 90 )
  },
  containerItemDetail: {
    flexDirection: 'row',
    // justifyContent:'',
    marginVertical: 6,
    alignItems: 'center'
  },
  right: {
    alignItems: 'center',
    width: width( 13 )
  },
  sdtCustomer: {
    color: 'red'
  },
  dateAndStatus: {
    fontSize: 14,
    flexWrap: 'wrap',
    legacyImplementation: true,
    width: width( 60 )
  },
  hoanThanh: {
    color: 'green'
  },
  succes: {
    height: 40,
    width: 40,
    paddingRight: 10,
    // marginRight: 4,
    marginTop: 4
  },

  doing: {
    height: height( 8 ),
    width: height( 8 ),
    paddingRight: 10,
    // marginRight: 4,
    marginTop: 4
  },
  icon: {
    marginRight: 5
  },
  iconQuestion: {
    height: height( 3 ),
    width: height( 3 ),
    top: height( 0.5 )

  }
} );
export default styles;
