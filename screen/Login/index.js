
import React from 'react';
import {
  Alert, View, PermissionsAndroid, Platform
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import store from 'react-native-simple-store';
import storage from '@react-native-firebase/storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  setStoreLocal, getStoreLocal, getToken, updateToken
} from 'modals/function';
import ActionStore from 'reduxs/Action/ActionStore';
import messaging from '@react-native-firebase/messaging';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';
import BleManager from 'react-native-ble-manager';
const firestores = firestore().collection( 'User' );
class Login extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      txtSDT: '',
      txtPass: '',
      values: '0',
      saveLogin: false,
      tokenUser: ''
    };
  }
  async setLocalUser( sdt, pass ) {
    this.setState( {
      ...this.state,
      txtSDT: sdt,
      txtPass: pass

    } );
  }
  async componentDidMount() { 
    // await this.requestCameraPermission()
    // await BleManager.start( { showAlert: false } ).then( () => {
    //   // Success code
    //   console.log( "Module initialized" );
    // } );
    // BleManager.scan( [], 5, true ).then( () => {
    //   // Success code
    //   console.log( "Scan started" );
    // } );
    if ( Platform.OS === 'android' ) { 
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
    const testPromis=await getStoreLocal( 'user' )
    console.log( await testPromis.sdt );
    await this.setLocalUser(  testPromis.sdt,  testPromis.pass );
    // if ( user == null ) {
    //   store.get( 'user' ).then( async ( res ) => {
    //     await setUser( res[0] );
    //     this.setState( {
    //       txtSDT: res[0].sdt,
    //       txtPass: res[0].pass
    //     } );
    //   } );
    // } else {
    //   await setStoreLocal( user );
    //   await this.setState( {
    //     txtSDT: user.sdt,
    //     txtPass: user.pass
    //   } );
    // }
  }
  requestCameraPermission = async () => {
    try {
      const granted4 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH,
        {
          title: 'Example App',
          message: 'Example App access to your location ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      );
      if ( granted4 === PermissionsAndroid.RESULTS.GRANTED ) {
        console.log( 'You can use the BLUETOOTH' );
      } else {
        console.log( 'BLUETOOTH permission denied' );
      }
    } catch ( err ) {
      console.log( err );
      console.warn( err );
    }
  };
  saveLogin() {
    this.setState( {
      ...this.state,
      saveLogin: true
    } );
  }

  getTest() {
  }

  onPressLogin = async () => {
    const { txtSDT, txtPass } = this.state; 
    const { user, setUser } = this.props;
    let i = 0;
    const list = [];
    await firestores.get()
      .then( ( querySnapshot ) => { 
        querySnapshot.forEach( async ( documentSnapshot ) => {
          const datas = documentSnapshot.data(); 
          console.log( 'datas', datas );
          if ( datas.sdt === txtSDT && datas.pass === txtPass ) {
            i = 1;
            messaging()
              .getToken()
              .then( async ( token ) => {
                const temp = {
                  id: documentSnapshot.id,
                  name: datas.name,
                  sdt: datas.sdt,
                  luotXem: datas.luotXem,
                  x: datas.x,
                  y: datas.y,
                  address: datas.address,
                  image: datas.image,
                  pass: datas.pass,
                  checkWorker: datas.checkWorker,
                  token: token,
                  privateKey: datas.privateKey,
                  addressWallet: datas.addressWallet
                };
                console.log( temp );
                await updateToken( documentSnapshot.id, token );
              
                if ( this.state.saveLogin ) {
                  await setStoreLocal( temp );
                }
                await setStoreLocal( temp );
                await setUser( temp ); 
                await Actions.home();
              } );
          }
        } );
        if ( i === 0 ) {
          console.log( 'erro' );
          Alert.alert( In18.Error.noLogin );
        }
      } );
  };

  onChangePassword = ( value ) => {
    const p = this.state;
    this.setState( { p, txtPass: value } );
  };

  onChangeSDT = ( value ) => {
    this.setState( { ...this.state, txtSDT: value } );
  };

  render() {
    // return (
    //   <View>

    //   </View>
    // );
    const Template = this.view;
    return (
      <Template
        title={In18.TitleBtn.login}
        noFooter
        props={this.props}
        func={this}
        state={this.state}
        showBtnBack={false}
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  user: state.user
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Login );

