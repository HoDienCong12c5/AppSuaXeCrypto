import React, { Component } from 'react';
import {
  View, Text, Button, AppState, PermissionsAndroid, Platform
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import { createStore } from 'redux'; 
import {
  ModalPortal, Modal
} from 'react-native-modals';
import {
  PlayMusic, getStoreLocal
} from 'modals/function';
import scenes from './common/router';
import rootReducer from './reduxs/Reducer/index';

const store = createStore( rootReducer );
class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      initScreen: 'home',
      isShowMess: false,
      isShowCall: false,
      isShowSetUpCalender: false,
      isShowModal: false,
      alerts: null,
      isBackground: false,
      appState: AppState.currentState
    };
  }

  async componentWillUnmount() {
    const user = await getStoreLocal( 'user' );
    console.log( { user } );
    // this.appStateSubscription.remove( this.onAppStateChange() );
  }

   onAppStateChange = async ( nextAppState ) => {
     const { appState } = this.state;
     console.log( { nextAppState } );
     console.log( { appState } );
     if (
       this.state.appState.match( /inactive|background/ )
      && nextAppState === 'active'
     ) {
       console.log( 'App has come to the foreground!' );
     }
     this.setState( { appState: nextAppState } );
   }

   async componentDidMount() {
     const user = await getStoreLocal( 'user' );
     await Promise.all( user );
     console.log( { user } );
     if ( Platform.OS === 'ios' ) {
       Geolocation.requestAuthorization();
       Geolocation.setRNConfiguration( {
         skipPermissionRequests: false,
         authorizationLevel: 'whenInUse'
       } );
     }
     await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    if ( Platform.OS === 'android' ) {
      console.log('đã vô');
       await PermissionsAndroid.request(
         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
       );
     }
   }

    onDisableModal=() => {
      this.setState( { isShowModal: false } );
    }

   onShowModal=( remoteMessage ) => {
     const data = remoteMessage;
     const { type } = data.data;
     const { body, title } = data.notification;
     if ( type == 0 ) {
       PlayMusic( 'setupcalender' );
     }
     if ( type == 1 ) {
       PlayMusic( 'message' );
     }
     if ( type == 2 ) {
       PlayMusic( 'call' );
     }
     if ( type == 3 ) {
       PlayMusic( 'message2' );
     }
     if ( type == 4 ) {
       PlayMusic( 'setupcalender' ) ;
     }
   }

   render() {
     return (
     //     <View>
     // <Tex></Tex>
     //     </View>
       <Provider store={store}>
         <Router scenes={scenes( 'home' )} />
         <Modal
           //  style={{ backgroundColor: 'red' }}
           modalStyle={{ padding: 0 }}
           visible={this.state.isShowModal}
           onTouchOutside={() => {
             this.setState( { isShowModal: false } );
           }}
         >{this.state.alerts || null}
         </Modal>
         <ModalPortal />
       </Provider>
     );
   }
}

export default App;


// import {View, Text} from 'react-native';
// import React from 'react';

// const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
// const Web3 = require('web3');

// const web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
// const toAdd = '0xb2f92112cff116e589900e4622b9d1265284665d';
// const privatekey =
//   '0xc77e6040bd37d4d2beac9399284372ece39d747253c99b423daa3a5aa2d805ff';

// const news = () => {
//   const register = async () => {
//     console.log('Calling Contract.....');
//     await sendTransaction(privatekey, toAdd);
//     /*const tx = {
//       // from: toAddress,
//       to: toAdd,
//       value: '100000000000',
//       gas: 2000000,
//       // gasPrice: '2500000007',
//       // gas: '5208',
//       // value: '10000000000000'
//       // data: '0x'
//     };
//     const myContract = await new web3.eth.Contract([], toAdd, {
//       from: toAdd, // default from address
//       gasPrice: '10000000000', // default gas price in wei, 20 gwei in this case,
//     });
//     console.log('--signedTransaction---');
//     console.log('myContract', await myContract);*/
//   };
//   register();
//   return (
//     <View>
//       <Text>newsdasdas</Text>
//     </View>
//   );
// };
// const sendTransaction = async (privateKey, toAddress) => {
//   web3.eth.getGasPrice().then(console.log);
//   const tx = {
//     // from: toAddress,
//     to: toAddress,
//     value: '100000000000',
//     gas: 2000000,
//     // gasPrice: '2500000007',
//     // gas: '5208', 
//     // value: '10000000000000'
//     // data: '0x'
//   };
//   console.log('--signedTransaction---');
//   // web3.eth.getTransactionCount( toAddress ).then( console.log );
//   const signedTransaction = await web3.eth.accounts.signTransaction(
//     tx,
//     privateKey,
//   );
//   // web3.eth.sendTransaction( tx, privateKey ).then( console.log );
//   console.log('signedTransaction', await signedTransaction);
// };
// export default news;
