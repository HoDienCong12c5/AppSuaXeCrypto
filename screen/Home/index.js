import React from 'react';

import database from '@react-native-firebase/database';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setLocationUser, getAllListWorker, getListWorkerQuality, getListWorkerNearLimit,
  PlayMusic, setStoreLocals, getStoreLocals, setHistory, formatDateTimeToString
} from 'modals/functions';
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
import ManagerWeb3 from 'modals/ManagerWeb3';
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
  getDataLocal = async () => {
    
  }
  async componentDidMount() {
    await this.onWaitingNotification();
    const {
      setListWorker, 
      setListQualityWorker, 
      user, setUser, 
      setListNearWorkerLimit,
      setHistory,
      history
    } = this.props;
    let list = [];
    await setHistory( await getStoreLocals( 'history' ) );
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
        console.log( ' error.code', error.message );
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

  onShowModal= async( remoteMessage ) => {
    const {
      setMessage, message, setCalender, calender, user
    } = this.props;
    const data = remoteMessage;
    const { type } = data.data;
    const {body, title} = data.notification;
    const dkViral='Có người chuyển tiền'
    switch ( type ) {
    case 0:
      if( body===dkViral ){
        this.getBalancetemp(
          type,
          title,
          user.sdt
        )
      }
      else{
        setCalender( calender + 1 );
        PlayMusic( 'setupcalender' );
      }
     
      break;
    case 1:
      if( body===dkViral ){
        this.getBalancetemp(
          type,
          title,
          user.sdt
        )
      }
      else{
        setMessage( message + 1 );
        PlayMusic( 'message' );
      }
      break;
    case 2:
      if( body===dkViral ){
        this.getBalancetemp(
          type,
          title,
          user.sdt
        )
      }
      else{
        PlayMusic( 'call' );
      }
      break;
    case 3:
      if( body===dkViral ){
        this.getBalancetemp(
          type,
          title,
          user.sdt
        )
      }
      else{
        PlayMusic( 'message2' );
      }
      break;
    case 4:
      if( body===dkViral ){
        this.getBalancetemp(
          type,
          title,
          user.sdt
        )
      }
      else{
        PlayMusic( 'setupcalender' );
      }
      break;
    default:
      this.getBalancetemp(
        type,
        title,
        user.sdt
      )
      break;
    }
    
  }
  getBalancetemp = async ( amount, sdtSend,sdtReceive ) => {
    console.log( 'da nhan tien' );
    const {setHistory} = this.props;
    getStoreLocals( 'history' ).then( async ( result )=>{
      let date = formatDateTimeToString( new Date(  ) ); 
      const temp={
        amount: amount,
        isSend:false,
        sdtSend:sdtSend,
        sdtReceive:sdtReceive,
        date:date
      }
      console.log( 'temp - home', temp );
      console.log( 'result -history',result );
      let resultTemp=result
      if( resultTemp ){
        resultTemp.push( temp )
        await setStoreLocals( 'history', resultTemp );
        await setHistory( resultTemp );
      }else{
        let listTemp=[]
        await listTemp.push( temp )
        console.log( 'listTemp',listTemp );
        await setHistory( listTemp );
        await setStoreLocals( 'history', listTemp );
  
      }
    } )
    PlayMusic( 'setupcalender' );
    this.updateBalance()
  }

  updateBalance = async()=>{
    const {token,setBalance, user} = this.props
    const get = await ManagerWeb3.getBalance( user.addressWallet, token )
    console.log( 'get',get );
    setBalance( await ManagerWeb3.getBalance( user.addressWallet, token ) )
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
  onChatBox=()=>{
    console.log( 'dã vào' );
    Actions.chatBox()
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
  message: state.message,
  history: state.history
} );
const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setListWorker: bindActionCreators( ActionStore.setListWorker, dispatch ),
  setListQualityWorker: bindActionCreators( ActionStore.setListQualityWorker, dispatch ),
  setListNearWorkerLimit: bindActionCreators( ActionStore.setListNearWorkerLimit, dispatch ),
  setMessage: bindActionCreators( ActionStore.setMessage, dispatch ),
  setHistory: bindActionCreators( ActionStore.setHistory, dispatch ),
  setBalance:bindActionCreators( ActionStore.setBalance, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Home );
