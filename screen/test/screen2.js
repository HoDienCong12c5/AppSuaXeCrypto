import React, { useState, useEffect } from 'react';
import {
  Button, TextInput, View, Text, Keyboard
} from 'react-native';
import auth from '@react-native-firebase/auth';
// import OTPInputView from '@twotalltotems/react-native-otp-input';
// import RNOtpVerify from 'react-native-otp-verify'; 

// // class
// class OTP extends React.Component {
//   constructor( props ) {
//     super( props );
//     this.state = {
//       otp: '',
//       otpCode: ''
//     };
//   }

//   // componentDidMount
//   componentDidMount() {
//     RNOtpVerify.removeListener();
//     RNOtpVerify.getHash()
//       .then( ( pp ) => {
//         console.log( { pp } );
//       } )
//       .catch( console.log );

//     RNOtpVerify.getOtp()
//       .then( ( p ) => RNOtpVerify.addListener( this.otpHandler ) )
//       .catch( ( p ) => console.log( p ) );

//     // RNOtpVerify.removeListener();
//   }

//   getHash = () => RNOtpVerify.getHash()
//     .then( console.log )
//     .catch( console.log );

// startListeningForOtp = () => RNOtpVerify.getOtp()
//   .then( ( p ) => RNOtpVerify.addListener( this.otpHandler ) )
//   .catch( ( p ) => console.log( p ) );

// otpHandler = ( message ) => {
//   const otp = /(\d{4})/g.exec( message )[1];
//   console.log( '====================================' );
//   console.log( { otp } );
//   console.log( '====================================' );
//   // this.setState( { otp } );
//   RNOtpVerify.removeListener();
//   Keyboard.dismiss();
// }

// // return view
// render() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>dhfjgshdg</Text>
//       <OTPInputView pinCount={4} />
//     </View>
//   );
// }
// }

const PhoneSignIn = () => {
  // If null, no SMS has been sent
  // useEffect( () => {
  //   const subscriber = auth().onAuthStateChanged( onAuthStateChanged );
  //   return subscriber; // unsubscribe on unmount
  // }, [] );
  // const onAuthStateChanged = ( user ) => {
  //   console.log( '====================================' );
  //   console.log( { user } );
  //   console.log( '====================================' );
  // };
  const [confirm, setConfirm] = useState( null );

  const [code, setCode] = useState( '' );

  // Handle the button press
  const signInWithPhoneNumber = async ( phoneNumber ) => {
    // await auth().signInWithPhoneNumber( phoneNumber ).then( ( confirmationResult ) => {
    //   console.log( 'confirmationResult=================' );
    //   console.log( { confirmationResult } );
    console.log( { phoneNumber } );
    // } );
    const confirmation = await auth().signInWithPhoneNumber( phoneNumber );
    console.log( { confirmation } );
    setConfirm( confirmation );
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm( code ).then( ( user ) => {
        // this.setState( { userId: user.uid } );
        alert( 'Thành công' );
      } )
        .catch( ( error ) => {
          alert( 'Sai mã OTP' );
        } );
    } catch ( error ) {
      console.log( 'Invalid code.' );
    }
  };
  return (
    <>
      <Button
        title="Phone Number Sign In"
        onPress={() => signInWithPhoneNumber( '+84387373405' )}
      />
      <TextInput value={code} onChangeText={( text ) => setCode( text )} />
      <Button title="Confirm Code" onPress={() => confirmCode()} />
    </>
  );
};
export default PhoneSignIn;
