import React, { useState } from 'react';
import {
  View, Text, TextInput, Button,
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import User from './user';

export default function screen1() {
  const user = User.getInstance();
  const [name, setName] = useState( user.getName() );
  console.log( '====================================' );
  console.log( name );
  console.log( '====================================' );
  const onPress = () => {
    user.setName( name );
    Actions.screen2();
  };
  
  const read = async () => {
    const i = 0;
    const firebase = await database().ref( '/User/' );
    await firebase.on( 'value', ( snapshot ) => {
      snapshot.forEach( ( key ) => {
        console.log( key.key );
        x = 0;
      } );
    } );
  };
  const promise = new Promise( read );

  // Tham số  từ resolve sẽ được chuyển đến then.
  promise.then( ( number ) => console.log( { x } ) );

  return (
    <View>
      <Text>Nhập tên</Text>
      <TextInput
        placeholder='nhập tên'
        onChangeText={( text ) => setName( text )}
      >
      </TextInput>
      <Button name='nhấn' onPress={onPress} title='nhấn '></Button>
    </View>
  );
}
