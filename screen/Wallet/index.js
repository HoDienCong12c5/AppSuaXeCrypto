import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register, getLisBill } from 'modals/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page'; 
import ClassWeb3 from 'modals/ETH/web3';

// import firestore from '@react-native-firebase/firestore';
class wallet extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      isLoad:false,
      walletUser:''
    }
    
  }

  async componentDidMount() {
    const dataWallet = await ClassWeb3.getStoreLocalWallet( 'wallet' );
    console.log( 'dataWallet', dataWallet );
    // const privateKey ='0xeed0b9d34c105ab1867778ab7ee5781d87601e783626a3bbb79155822eca4b5b'
    // const send = await ClassWeb3.sendTransaction( dataWallet, dataWallet.address, 1000000000000);
    // console.log( 'send', send );
  }

  onPressCreate=async() => {

  }
  onPressSend=async( sdt, data ) => {

  } 
  onPressScan=() => {

  } 
  onPressSubmitCheck = ( address ) => {
   
  };

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NameScreen.wallet}
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
  user: state.user,
  wallet: state.wallet
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setWallet: bindActionCreators( ActionStore.setWallet, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( wallet );
