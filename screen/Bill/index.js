import React from 'react';
import {
  Alert, View, PermissionsAndroid, Platform
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
// import User from 'modals/User';
import database from '@react-native-firebase/database';
import store from 'react-native-simple-store';
import storage from '@react-native-firebase/storage';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import { getLisBill } from 'modals/function';
import ActionStore from 'reduxs/Action/ActionStore';
import Geolocation from 'react-native-geolocation-service';
import Modal from 'components/ModalBase/index';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';

const firestores = firestore().collection( 'Bild' );
class Bill extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      type: 0,
      listBill: [],
      tempList: [],
      isWorker: false
    };
  }

  async componentDidMount() {
    const { user, option } = this.props;

    this.setState( {
      listBill: await getLisBill( user.sdt, user.checkWorker ) , 
      tempList: await getLisBill( user.sdt, user.checkWorker ),
      isWorker: user.checkWorker == 1
    } );
    if ( option === 0 ) {
      await this.getListView( 2 );
    } else {
      await this.getListView( 1 );
    }
  }

  onPressOption= async ( type ) => {
    this.setState( {
      type: type
    } );
    await this.getListView( type );
  }

  getListView= async ( type ) => {
    const { listBill } = this.state;
    const listFinal = [];
    listBill.forEach( ( element ) => {
      if ( type === 0 ) {
        listFinal.push( element );
      }
      if ( type === 1 ) {
        if ( element.status == 1 ) {
          listFinal.push( element );
        }
      }
      if ( type === 2 ) {
        if ( element.status == 0 ) {
          listFinal.push( element );
        }
      }
    } );
    this.setState( {
      tempList: listFinal
    } );
  }

  async onPressSubmit( item ) {
    const { listBill, type } = this.state;
    for ( let i = 0; i < listBill.length; i++ ) {
      if ( listBill[i].id == item.id ) {
        listBill[i].status = 1;
        this.getListView( type );
      }
    }
    this.closeModal();
  }

  onPressSuccess= ( item ) => {
    this.popup = <Modal onPressSuccess={() => this.onPressSubmit( item )} onPressClose={this.closeModal} description={In18.Notification.buildSucess}></Modal>;
    this.openModal();
  }

  render() {
    const { option } = this.props;
    const Template = this.view;
    return (
      <Template
        title={option === 0 ? In18.NormalTitle.doing : option === 1 ? In18.NameScreen.bill : In18.NameScreen.calender}
        noFooter
        props={this.props}
        func={this}
        state={this.state}
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  user: state.user,
  listWorker: state.listWorker
} );
const mapDispatchToProps = ( dispatch ) => ( {
  setUser: bindActionCreators( ActionStore.setUser, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Bill );
// export default Login;
