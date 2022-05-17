import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { SaveProfile, setStoreLocals, getStoreLocals } from 'modals/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page'; 
import ClassWeb3 from 'modals/ManagerWeb3/index';
import QRFull from './QRFull';
import ModalBase from 'components/ModalBase/index';
import { token } from 'reudxs/Reducer/Reducer';
import Loading from 'components/Loading'
import store from 'react-native-simple-store';

// import firestore from '@react-native-firebase/firestore';
class wallet extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      isLoad:false,
      walletUser:'',
      amount:'0',
      isChanging:false
    }
    
  }

  async componentDidMount() {
    const {user, setBalance, token, history} = this.props;
    console.log( 'history', history );
    this.setState( {
      walletUser : user.addressWallet 
    } )
    await setBalance( await ClassWeb3.getBalance( user.addressWallet, token ) ); 
    // await store.delete( 'history' )
  }

  onPressCreate=async() => {
    const {user, setUser} = this.props;
    const walletNew = await ClassWeb3.newWallet();
    user.addressWallet = walletNew.address;
    user.privateKey = walletNew.privateKey;
    setUser( user );

    console.log( 'walletNew',await walletNew );
    await SaveProfile( user.id, 8,walletNew );
    this.setState( {
      walletUser: walletNew.address
    } )  
  }
  onPressSend=async( sdt, data ) => {

  } 
  onPressScan=() => {

  } 
  onPressSubmitCheck = ( address ) => {
   
  };
  async useCallbackChanging(){
    this.setState( {
      isChanging:!this.state.isChanging
    } ) 
  }
 


  onChangeToken =async (  ) => {
    const { setToken, token } = this.props; 
    if( this.state.walletUser ){
      this.popup= <Loading title='Đang chuyển mạng lưới'/>
      await setToken( !token )
      const {user, setBalance} = this.props;
      this.setState( {
        walletUser : user.addressWallet 
      } )
      await this.useCallbackChanging()
      await this.openModal() 
      await setBalance( await ClassWeb3.getBalance( user.addressWallet, !token ) ); 
      console.log( 'setToken',token );
      await this.useCallbackChanging()
      await this.closeModal()
    }
    else{
      Alert.alert( 'Cảnh báo', 'Vui lòng tạo ví trước khi chuyển mạng lưới' )
    }
    

  }
  onPressQRFull = () => {
    const temp= <QRFull walletUser ={this.state.walletUser}></QRFull>
    this.popup = <ModalBase isShowBtn customView ={temp}></ModalBase>
    this.openModal()
  }
  onNexTransaction = () => {
    const { setToken, token } = this.props; 
    // console.log( 'amount',balance );
    Actions.transactionNew( {nameToke :token} )
  }
  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NameScreen.wallet}
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
  menuFooterRedux: state.menuFooterRedux,
  user: state.user,
  wallet: state.wallet,
  token: state.token,
  balance: state.balance,
  history: state.history
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setWallet: bindActionCreators( ActionStore.setWallet, dispatch ),
  setToken: bindActionCreators( ActionStore.setToken, dispatch ),
  setBalance: bindActionCreators( ActionStore.setBalance, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( wallet );
