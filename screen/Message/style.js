import React from 'react';
import { StyleSheet } from 'react-native';
import {Colors} from 'common/Colors';
import { height, width } from 'common/styles';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'space-between'

  },
  header: {
    flexDirection: 'row',
    paddingTop: 30,
    paddingBottom: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.YELLOW,
    shadowColor: '#171717',
    shadowOffset: { width: -2, peak: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  avatar: {
    width: height( 7 ),
    height: height( 7 ),
    marginLeft: 15,
    borderRadius: 50
  },

  nameCustomer: {
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: 5
  },
  body: {
    // height: height( 80 ),
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  footer: {
    flexDirection: 'row',
    display: 'flex',
    padding: 10,
    height: height( 10 )
  },
  input: {
    width: width( 80 ),
    padding: 0,
    paddingLeft: 20,
    borderRadius: 18,
    backgroundColor: Colors.GRAY
  },
  btnSubmit: {

    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  iconClose: {
    height: height( 3 ),
    width: height( 3 ),
    resizeMode: 'contain'

  },
  iconSend: {
    height: height( 5 ),
    width: height( 5 ),
    resizeMode: 'contain',
    marginTop: 10
  }
} );
export default styles;
