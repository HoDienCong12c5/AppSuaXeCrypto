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
import SetupETH from 'modals/ETH/setupETH'

// import firestore from '@react-native-firebase/firestore';
const privateKey = "31fb9d5fbd1f6503027d99cc8e10a845df45d6401232434b78354035381d940f";
const toAdd = '0xb2f92112cff116e589900e4622b9d1265284665d';
class Setting extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      countCalender: 0
    };
  }

  async componentDidMount() {
     
    // const dataWallet = await ClassWeb3.getStoreLocalWallet( 'wallet' );
    // console.log( 'dataWallet', dataWallet );
    // const privateKey ='0xeed0b9d34c105ab1867778ab7ee5781d87601e783626a3bbb79155822eca4b5b'

    // const send = await ClassWeb3.newWallet()
    // console.log( 'ClassWeb3.sendTransaction', send ); 
    // await ClassWeb3.newTransaction( privateKey, toAdd,0.00001 )
    const { user, calender, setCalender } = this.props;
    // const list = await getLisBill( user.sdt );
    // let count = 0;
    // list.map( ( item ) => {
    //   if ( item.status == 0 ) {
    //     count++;
    //   }
    // } );
    // setCalender( count );
  }

  onPressLogOut=() => {

  }

  onPressActions= ( type ) => {
    switch ( type ) {
    case 0:
      Actions.profile();
      break;
    case 1:
      Actions.bill( { option: 0 } );
      break;
    case 2:
      Actions.calenderDoing( { option: 1 } );
      break;
    case 3:
      Actions.calender( { option: 2 } );
      break;
    case 4:
      Actions.wallet( );
      break;
    }
  };

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NameScreen.setting}
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
  calender: state.calender,
  calenderDoing: state.calenderDoing
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setCalender: bindActionCreators( ActionStore.setCalender, dispatch ),
  setCalenderDoing: bindActionCreators( ActionStore.setCalenderDoing, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Setting );
