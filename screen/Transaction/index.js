import { View, Text, Alert , TouchableOpacity} from 'react-native'
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register, getLisBill } from 'modals/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from 'common/constants';
import Page from './page'
import React from 'react';
import TOMO from 'modals/TOMO/web3';
import ModalSending from 'components/ModalBase/index'
import Img from 'assets/index'; 
//class component
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
    } );
    console.log( 'onChangeAmount', value );
  }
  onChangeToAddress = ( value ) => {
    this.setState( {
      toAdd: value
    } );

  }
  sendingTransaction = async ( callback, amount, to ) => {
    const { user} = this.props;
    await TOMO.sendTransaction( user.privateKey,to, amount ).then( ()=>callback() )
  }
  callback = async () => {
    console.log( 'callback' );
    this.setState( {
      isSending: false
    } );
  }
  onPressSend = async () => {
    const {toAdd, amount}=this.state
    if( toAdd.slice( 0, 2 )=='0x' && toAdd.length >=42 ){
      this.popup=<ModalSending 
        isShowBtn
        title={In18.web3.sending}
        icon={Img.Image.icoLoading}
      />
      this.openModal()
    
      if( this.state.isSending ){
        console.log( 'onPressSend' );
        this.closeModal();
        Alert.alert( 'Gửi thành công' )
      }
      else{
        this.popup=<ModalSending 
          isShowBtn
          title={In18.web3.sending}
          icon={Img.Image.icoLoading}
        />
        this.openModal();
        // /await this.sendingTransaction( this.callback,amount,toAdd )
      }
    }else{
      Alert.alert( 'Chưa đúng định dạng' )
    }
   
  }
  onPressBack=()=>{
    // console.log( 'onPressB/ack' ); 

  }
  componentDidMount() {
    const {user} = this.props;
    console.log( 'user', user );
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
  user: state.user
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setUser: bindActionCreators( ActionStore.setUser, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( index ); 
