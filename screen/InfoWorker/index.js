import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { height, width } from 'common/styles';
import { sendNotificationMess, compareDate, createInvoice } from 'modals/function';
import { connect } from 'react-redux';
import call from 'react-native-phone-call';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';
import ModalCalender from './SetupCaculate/index';
import ModalViewMap from './ViewMap/index';
import ModalOptionCall from './ChangeCall/index';

class InfoWorker extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      setUpCaulate: '',
      note: 'Sửa xe',
      address: '',
      time: '',
      optionCall: true
    };
  }

  componentDidMount() {

  }

  onChangeAddress=( tex ) => {
    this.setState( { address: tex } );
  }

  onChangeNote=( tex ) => {
    this.setState( { note: tex } );
  }

  setUpCalender = ( ) => {
    const { item } = this.props;
    this.popup = <ModalCalender
      note={this.state.note}
      onChangeNote={this.onChangeNote}
      onChangeAddress={this.onChangeAddress}
      close={this.closeModal}
      onSubMit={this.submitSetUpCalender}
      sdtWorker={item.sdt}/>;
    this.openModal();
  }

  submitSetUpCalender=( date, isCheck ) => {
    const isTrue = compareDate( date, 3 );
    if ( isTrue ) {
      const { note, address } = this.state;
      const { item, user, listQualityWorker } = this.props;
      let tokenOrtherUser = '';
      for ( let i = 0; i < listQualityWorker.length; i++ ) {
        if ( item.sdt == listQualityWorker[i].sdt ) {
          tokenOrtherUser = listQualityWorker[i].token;
        }
      }
      sendNotificationMess( tokenOrtherUser, '0', user.sdt, note );
      createInvoice( user.sdt, user.name, user.id, item.sdt, item.name, item.id, note, date, address );
      this.closeModal();
      Alert.alert( 'Chờ thợ phàn hồi' );
    }
  }

  changOptionCall = ( index ) => {
    const { item } = this.props;
    const args = {
      number: item.sdt,
      prompt: true
    };
    this.closeModal();
    this.setState( { optionCall: false } );
    if ( index === 0 ) {
      Alert.alert( 'Đang phát triển' );
    } else {
      call( args ).catch( console.error );
    }
  }

  onActionScreen=( type ) => {
    const { item, user, optionCall } = this.props;
    const temp = {
      date: '',
      image: item.image || '',
      key: '',
      note: '',
      sdtReceive: item.sdt,
      sdtSend: user.sdt,
      status: 0,
      address: ''
    };
    const args = {
      number: item.sdt,
      prompt: true
    };
    switch ( type ) {
    case 0:
      this.setUpCalender();
      break;
    case 1:
      Actions.messPage( { sdt: item.sdt, user, userOther: temp } );
      break;
    case 2:
      call( args ).catch( console.error );
      break;
    default:
      this.viewGGMap();
      break;
    }
  }

  viewGGMap=() => {
    const { user, item } = this.props;
    this.popup = <ModalViewMap user={user} worker={item}></ModalViewMap>;
    this.openModal();
  }

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NormalTitle.titleInforWord}
        noFooter
        props={this.props}
        func={this}
        state={this.state}

      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  user: state.user,
  listQualityWorker: state.listQualityWorker
} );
export default connect( mapStateToProps )( InfoWorker );
