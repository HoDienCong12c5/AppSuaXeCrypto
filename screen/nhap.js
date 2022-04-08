import React, { useState, useEffect } from 'react';
import { Alert, View, Text } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import User from 'modals/User';
import database from '@react-native-firebase/database';  
// import firebases from 'react-native-firebase';

const Nhap = () => {
  const page = async () => { 
    const firebase = database();
    try {
      await database()
        .ref( '/User/' )
        .once( 'value' )
        .then( ( snapshot ) => {
          console.log( 'User data: ', snapshot.val() )  ;
        } );
    } catch ( error ) {
      console.log( '====================================' ) ;
      console.log( error );
      console.log( '====================================' );
    }
  };
  page();
  return (
    <View>
      <Text>jashdgsh adgfgas afas afasgfsasag gah gas gah dagh</Text>
    </View>
  );
};
export default Nhap;
