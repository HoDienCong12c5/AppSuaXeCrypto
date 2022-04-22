import React from 'react';
import {
  Alert, View, PermissionsAndroid, Platform
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import store from 'react-native-simple-store';
import storage from '@react-native-firebase/storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { setStoreLocal, getStoreLocal, SaveProfile } from 'modals/function';
import ActionStore from 'reduxs/Action/ActionStore';
import Geolocation from 'react-native-geolocation-service';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';

const firebase = database().ref( '/User/' );
const firestores = firestore().collection( 'User' );
class Login extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      txtSDT: '0387373405',
      txtPass: 'diencong',
      values: '0',
      saveLogin: false
    };
  }

  async componentDidMount() {

  }

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
          if ( datas.sdt === txtSDT && datas.pass === txtPass ) {
            i = 1;
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
              checkWorker: datas.checkWorker
            };
            if ( this.state.saveLogin ) {
              await setStoreLocal( temp );
            }
            setUser( temp );
            Actions.home();
            const users = await getStoreLocal( 'user' );
          }
          if ( i === 0 ) {
            Alert.alert( In18.Error.noLogin );
          }
        } );
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
// export default Login;
