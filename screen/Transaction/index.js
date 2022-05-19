import { View, Text, Alert , TouchableOpacity} from 'react-native'
import { Router, Actions, Scene } from 'react-native-router-flux';
import { setStoreLocals, getStoreLocals, sendNotificationMess } from 'modals/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from 'common/constants';
import Page from './page'
import React from 'react';
import TOMO from 'modals/TOMO/web3';
import Loading from 'components/Loading'
import Img from 'assets/index'; 
import Web3Class from 'modals/ManagerWeb3/index'
import {formatDateTimeToString } from 'modals/function';
import ModalBase  from 'components/ModalBase'
import firestore from '@react-native-firebase/firestore';
import { isBuffer } from '@walletconnect/utils';
//class component
const HISTORY ='HISTORY'
class index extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      toAdd: '',
      isShowPopup: false,
      isSending: false,
      amount:0
    };
  }

  openPopupQRSCan = () => {
    console.log( 'openPopup' );

    const { isShowPopup } = this.state;
    this.setState( {
      isShowPopup: !isShowPopup
    } );
    // this.popup=<QRScan onReadScan={this.onReadScan}/>
    // this.openPopup();
  }
  onReadScan = ( data ) => {
    console.log( 'onReadScan', data.data );
    this.setState( {
      toAdd: data.data,
      isShowPopup: false
    } );

  }
  onChangeAmount = ( value ) => {
    this.setState( {
      amount: value
    } )
    // const { amount } = this.state;
    // //check work 
    // const temp  = amount.toString().split( '' );
    // console.log( 'value',value );
    // console.log( 'temp',temp );
    // let count=0;
    // for( var i = 0 ; i < temp.length ; i++ ){
    //   if( temp[i].includes( '.' ) &&  count <1 ){
    //     count++
    //     console.log( '+++++++' );
    //     this.setState( {
    //       amount: value
    //     } )
    //   }
    // }
    
    
  }
  onChangeToAddress = ( value ) => {
    this.setState( {
      toAdd: value
    } );

  }
  sendingTransaction = async ( callback, amount, to ) => {
    const {setHistory, history, user, token} = this.props;
    let date = formatDateTimeToString( new Date(  ) ); 
    await Web3Class.sendTransaction( user.privateKey,to, amount, token ).then( async ( result )=>{
      console.log( 'result- sended', result );
      
      callback()
      await this.sendNotiTransaction( user.sdt,to, amount )
    } ) 
  }
  callback = async () => {
    console.log( 'callback' );
    this.setState( {
      isSending: false
    } );
    this.closeModal();
    Alert.alert( 'Gửi thành công' )
  }
  query=async ( tokenSReceive, sdt, type, note )=>{
    const queryTemp = await fetch( 'https://shielded-beyond-13679.herokuapp.com/send', {
      method: 'POST',
      body: JSON.stringify( {
        tokens: tokenSReceive,
        sdt: sdt,
        type: type,
        note: note
      } ),
      data:{
        amount:'100'
      },
      headers: {
        'Content-Type': 'application/json'
      }
    } );
    queryTemp.then( (  )=>console.log )
    
  }
  sendNotiTransaction = async ( from,to, amount ) => { 
    let date = formatDateTimeToString( new Date(  ) ); 

    const firestores = firestore().collection( 'User' );
    const {user, setHistory}=this.props;
    console.log( 'from', from, 'to', to, 'amount', amount );
    await firestores.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( async ( documentSnapshot ) => {
          const data = documentSnapshot.data();
          if ( data.addressWallet == to ) {
            await sendNotificationMess( data.token ,amount,from,'Có người chuyển tiền' )
            getStoreLocals( 'history' ).then( async ( result )=>{
              // setStoreLocals('history', history );
              const temp={
                amount: this.state.amount,
                isSend:true,
                sdtSend:user.sdt,
                sdtReceive:data.sdt,
                date:date
              }
              if( result ){
                result.push( temp )
                await setStoreLocals( 'history', result );
                setHistory( result );
              }else{
                let listTemp=[]
                listTemp.push( temp )
                setHistory( listTemp );
                await setStoreLocals( 'history', listTemp );
        
              }
            } )
            
          }
        } );
      } );
   
  };
  onSubmit = async () => {
    const {toAdd, amount}=this.state 
    const {balance, token, setBalance} = this.props;
    console.log( 'balance', balance );
    if( toAdd.slice( 0, 2 )=='0x' && toAdd.length >=42 ){
      await Web3Class.checkAmount( token, amount, balance ).then( async ( result )=>{
        if( result ){
          
          this.popup=<Loading 
            title={In18.web3.sending} 
          />
          this.openModal()
    
          if( this.state.isSending ){
            console.log( 'onPressSend' );
            setBalance( balance - amount - 0.0025 );
            this.closeModal();
            Alert.alert( 'Gửi thành công' )
          }
          else{
            this.popup=<Loading  
              title={In18.web3.sending}
 
            />
            this.openModal();
            await this.sendingTransaction( this.callback,amount,toAdd )
          }
        }else{
          Alert.alert( 'Số lượng quá lớn' )
        }
      } )
     
    }else{
      Alert.alert( 'Chưa đúng định dạng' )
    }
  }
  onPressSend = async () => {
    const {toAdd, amount}=this.state 
    Alert.alert(
      "Cảnh báo",
      `Bạn có chắc là gửi ${amount}`,
      [
        {
          text: "Thoát",
          onPress: () => console.log( "Cancel Pressed" ),
          style: "cancel"
        },
        { text: "Có", onPress: () => this.onSubmit() }
      ]
    );

  }
  onPressBack=()=>{
    // console.log( 'onPressB/ack' ); 

  }
  async componentDidMount() {
    const { setHistory, user} = this.props;
    // const tokens='fQyWUv_5S0qi0RToeCxGC7:APA91bGokX2lhHqrr8iYW2mLsJ0XVLDiwYO8AXoTqu05794i8qeAerql6p8mdRaaoJW4aNrpN6tyuMyRhFmQ1vqkw7bjpQKEsvlei3u1cI9OECDuoyKlGXmXkGgCNyl9utZ0SPUiNXiL'
    // const addtest='0x29155cbf80CF5802EDabb0c99DeCAFb09dc039eC'
    // console.log( 'tokens', tokens );
    // await  this.sendNotiTransaction( user.sdt, addtest, '0.1' )
    // let date = formatDateTimeToString( new Date(  ) ); 
    // getStoreLocals( 'history' ).then( async ( result )=>{
    //   console.log( 'result -history',result );
    //   // setStoreLocals('history', history );
    //   const temp={
    //     amount: this.state.amount,
    //     isSend:true,
    //     sdtSend:user.sdt,
    //     sdtReceive:addtest,
    //     date:date
    //   }
    //   if( result ){
    //     result.push( temp )
    //     await setStoreLocals( 'history', result );
    //     setHistory( result );
    //   }else{
    //     let listTemp=[]
    //     listTemp.push( temp )
    //     setHistory( listTemp );
    //     await setStoreLocals( 'history', listTemp );

    //   }
    // } )
    
  }
  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.web3.newTransaction}
        props={this.props}
        func={this}
        state={this.state}
        // showBtnBack={false}
        noFooter
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  user: state.user,
  history: state.history,
  balance : state.balance
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setHistory: bindActionCreators( ActionStore.setHistory, dispatch ),
  setBalance: bindActionCreators( ActionStore.setBalance, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( index ); 
