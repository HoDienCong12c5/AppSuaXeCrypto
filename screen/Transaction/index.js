import { View, Text, Alert , TouchableOpacity} from 'react-native'
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register, getLisBill } from 'modals/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page'
import React from 'react';
//class component
class index extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      toAdd: '',
      isShowPopup: false
    };
  }
  openPopup = () => {
    console.log( 'openPopup' );
    this.setState( {
      isShowPopup: !this.state.isShowPopup
    } );
  }
  onChangeAmount = ( value ) => {

    console.log( 'onChangeAmount', value );
  }
  onChangeToAddress = ( value ) => {
    this.setState( {
      toAdd: value
    } );

  }
  onPressSend = async () => {
  }
  onPressBack=()=>{

  }
  componentDidMount() {

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
export default index;
