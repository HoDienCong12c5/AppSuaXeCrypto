import { View, Text, Alert , TouchableOpacity} from 'react-native'
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register, getStoreLocals } from 'modals/function';
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
//class component
const HISTORY ='HISTORY'
class index extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      toAdd: '0x320C8531b18892431B1dC7d899007590a8764E49',
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
    const tem ={
      amount: amount,
      to: to, 
      date: date
    }
    if( !history ){
      const tempList = [];
      tempList.push( tem ); 
      setHistory( tempList );
    }else{
      history.push( tem );
      setHistory( history );
    }
    await Web3Class.sendTransaction( user.privateKey,to, amount, token ).then( ()=>callback() ) 
  }
  callback = async () => {
    console.log( 'callback' );
    this.setState( {
      isSending: false
    } );
    this.closeModal();
    Alert.alert( 'Gửi thành công' )
  }
  onPressSend = async () => {
    const {toAdd, amount}=this.state 
    const {balance, token, setBalance} = this.props;
    console.log( 'balance', balance );
    if( toAdd.slice( 0, 2 )=='0x' && toAdd.length >=42 ){
      
      await Web3Class.checkAmount( token, amount, balance ).then( async ( result )=>{
        if( result ){
          console.log( 'result', result );
          console.log( 'result - amount', amount );
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
  onPressBack=()=>{
    // console.log( 'onPressB/ack' ); 

  }
  async componentDidMount() {
    const { balance} = this.props;
    console.log( 'user - history', balance );
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
