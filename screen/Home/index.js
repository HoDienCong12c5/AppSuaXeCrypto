import React from 'react';

import database from '@react-native-firebase/database';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setLocationUser, getAllListWorker, getListWorkerQuality, getListWorkerNearLimit,
  PlayMusic
} from 'modals/function';
import { PermissionsAndroid, Platform } from 'react-native';
import ActionStore from 'reduxs/Action/ActionStore';
import Geolocation from 'react-native-geolocation-service';
import { Router, Actions, Scene } from 'react-native-router-flux';
import messaging from '@react-native-firebase/messaging';
import Notification from 'modals/serviceNotifree';
import notifee, { EventType } from '@notifee/react-native';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';

const firebase = database().ref( '/User/' );
class Home extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      listAll: [],
      listQuality: [],
      isBackground: false
    };
  }

  async componentDidMount() {
    console.log('Start');
    await this.onWaitingNotification();
    const {
      setListWorker, setListQualityWorker, user, setUser, setListNearWorkerLimit
    } = this.props;
    let list = [];
    Geolocation.getCurrentPosition(
      async ( position ) => {
        const positions = position.coords;
        user.x = positions.latitude;
        user.y = positions.longitude;
        await setLocationUser( user.id, positions.latitude, positions.longitude );
        setUser( user );
        list = await getAllListWorker( user.id, user.x, user.y );
        this.setState( { listAll: list } );
        this.setState( { listQuality: await getListWorkerQuality( list ) } );
        await setListNearWorkerLimit( await getListWorkerNearLimit( list ) );
        await setListWorker( list );
        await setListQualityWorker( await getListWorkerQuality( list ) );
        // list = getAllListWorker( user.x, user.y );
      },
      ( error ) => {
        // See error code charts below.
        console.log(' error.code', error.message );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  onWaitingNotification = async ( ) => {
    if ( Platform.OS === 'ios' ) {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration( {
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse'
      } );
    }

    if ( Platform.OS === 'android' ) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
    }
    notifee.onBackgroundEvent( async ( { type, detail } ) => {
      const { notification, pressAction } = detail;
      if ( type == EventType.ACTION_PRESS && pressAction.id == 'mark-as-read' ) {
        await notifee.cancelAllNotifications( notification.id );
      }
    } );
    const { setMessage, message } = this.props;
    await messaging().setBackgroundMessageHandler( async ( remoteMessage ) => {
      setMessage( message + 1 );
      this.onShowModal( remoteMessage );
      this.setState( { isBackground: true } );
    } );
    if ( this.state.isBackground === false ) {
      await messaging().onMessage( async ( remoteMessage ) => {
        Notification.displayLocalNotifree(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          remoteMessage.data
        );
        this.onShowModal( remoteMessage );
      } );
    }
  }

  onShowModal=( remoteMessage ) => {
    const {
      setMessage, message, setCalender, calender
    } = this.props;
    const data = remoteMessage;
    const { type } = data.data;
    if ( type == 0 ) {
      setCalender( calender + 1 );
      PlayMusic( 'setupcalender' );
    }
    if ( type == 1 ) {
      setMessage( message + 1 );
      PlayMusic( 'message' );
    }
    if ( type == 2 ) {
      PlayMusic( 'call' );
    }
    if ( type == 3 ) {
      PlayMusic( 'message2' );
    }
    if ( type == 4 ) {
      PlayMusic( 'setupcalender' );
    }
  }

  onPressViewWorkerSort=() => {
    const { setMenuFooter } = this.props;
    setMenuFooter( In18.Menu.SEARCH );
    Actions.search( { types: 1 } );
  }

  onPressViewList=() => {
    const { setMenuFooter } = this.props;
    setMenuFooter( In18.Menu.SEARCH );
    Actions.search();
  }

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NormalTitle.home}
        // noFooter
        props={this.props}
        func={this}
        state={this.state}
        showBtnBack={false}
        noHeader
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  user: state.user,
  listWorker: state.listWorker,
  message: state.message
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setListWorker: bindActionCreators( ActionStore.setListWorker, dispatch ),
  setListQualityWorker: bindActionCreators( ActionStore.setListQualityWorker, dispatch ),
  setListNearWorkerLimit: bindActionCreators( ActionStore.setListNearWorkerLimit, dispatch ),
  setMessage: bindActionCreators( ActionStore.setMessage, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Home );
