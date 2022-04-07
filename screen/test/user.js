import { View, Text } from 'react-native';
import React from 'react';
import { sendTransaction } from 'modals/ETH/test'; 
// import WalletManager from 'modals/ETH/hocHoi';
import Web3ServicesEther from 'modals/ETH/setupETH'; 
import ClassETH from 'modals/ETH/Web3/index'; 

const toAdd = '0x5270b3da7df9b03ba997d065575bb77ffdd3f39a';

export default function user () {
  const send = async () => {
    const privatekey = '0x2cd2840037fcce1017d8ac8f396b0deb19594c010a6a818dab76ea1e37d7c8bf';
    // await sendTransaction( privatekey, toAdd );
    // await WalletManager.sendEthTokenTxsWithoutSign( privatekey, { to: toAdd, value: '0.1', data: '' }, false, toAdd );
  };
  send();
  return (
    <View>
      <Text>user ho dien cong</Text>
    </View>
  );
}
// const toAdd = '0x5270b3da7df9b03ba997d065575bb77ffdd3f39a';
// const privateKeyCty='2cd2840037fcce1017d8ac8f396b0deb19594c010a6a818dab76ea1e37d7c8bf'
// const privatekey = 'c77e6040bd37d4d2beac9399284372ece39d747253c99b423daa3a5aa2d805ff';
// import { View, Text, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { getRandomInfuraKey } from 'modals/ETH/web3';
// import { registerTransaction, getGasPrice, createTransaction } from 'modals/ETH/test';
// import Image from 'components/Image';
// import * as ImagePicker from 'react-native-image-picker';
// import storage from '@react-native-firebase/storage';

// const reference = storage().ref( '/Anh/' );
// export default function user() {
//   const [selectedImage1, setSelectedImage1] = useState( '' );
//   const [urlI1, setUrLi1] = useState( null );
//   const options = {
//     title: 'Select Avatar',
//     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
//     storageOptions: {
//       skipBackup: true,
//       path: 'images'
//     }
//   };
//   const PickerUmageHandler = ( p ) => {
//     ImagePicker.launchImageLibrary( options, async ( response ) => {
//       console.log( 'Response = ', response );
//       if ( response.didCancel ) {
//         console.log( 'User cancelled image picker' );
//       } else if ( response.error ) {
//         console.log( 'ImagePicker Error: ', response.error );
//       } else if ( response.customButton ) {
//         console.log( 'User tapped custom button: ', response.customButton );
//       } else if ( response.assets ) {
//         const imageAssetsArray = response.assets[0].uri;
//         console.log( { imageAssetsArray } );
//         setSelectedImage1( await response.assets[0].uri );

//         // console.log( '====================================' );

//         // console.log( '====================================' );
//       }
//     } );
//   };

//   const saveImage = () => {
//     const fileName = selectedImage1.substring(
//       selectedImage1.lastIndexOf( '/' ) + 1
//     );
//     const ref = storage().ref( `Anh/${fileName}` );
//     console.log( { ref } );
//     const task = ref.putFile( selectedImage1 );
//     console.log( { task } );
//     task.then( async () => {
//       const url = await ref.getDownloadURL();
//       // onSuccess(url)
//       setUrLi1( url );
//       const y = url;
//       console.log( `dương link :${y}` );
//       // Alert.alert(url)
//     } );
//   };
//   return (
//     <View>
//       <Text>user</Text>
//       <TouchableOpacity
//         onPress={() => PickerUmageHandler( 2 )}
//       >
//         <Text>user</Text>
//         {
//           selectedImage1 ? <Image http={selectedImage1} /> : null
//         }
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={saveImage}
//       >
//         <Text>user</Text>
//         {
//           selectedImage1 ? <Image http={selectedImage1} /> : null
//         }
//       </TouchableOpacity>
//     </View>
//   );
// }
// const add = '0xb2f92112cff116e589900e4622b9d1265284665d';
// const privatekey = '31fb9d5fbd1f6503027d99cc8e10a845df45d6401232434b78354035381d940f';
// const data = { data: [49, 251, 157, 95, 189, 31, 101, 3, 2, 125, 153, 204, 142, 16, 168, 69, 223, 69, 214, 64, 18, 50, 67, 75, 120, 53, 64, 53, 56, 29, 148, 15], type: 'Buffer' };
