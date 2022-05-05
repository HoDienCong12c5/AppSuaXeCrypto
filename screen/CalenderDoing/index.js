import React from 'react';
import {
  Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  getLisBillDoing, sendNotificationMess, updateBill, compareDate
} from 'modals/function';
import ActionStore from 'reduxs/Action/ActionStore';
import Modal from 'components/ModalBase/index';
import Base from 'container/BaseContainer';
import In18 from 'common/constants';
import Page from './page';

const firestores = firestore().collection( 'Bild' );
const firestoreUser = firestore().collection( 'User' );
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
      listBill: await getLisBillDoing( user.sdt, user.checkWorker ),
      tempList: await getLisBillDoing( user.sdt, user.checkWorker ),
      isWorker: user.checkWorker == 1
    } );
    console.log( this.state.listBill );
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
        const result = compareDate( element.date, 1 );
        if ( result ) {
          listFinal.push( element );
        }
      }
      if ( type === 2 ) {
        const result = compareDate( element.date, 2 );
        if ( result ) {
          listFinal.push( element );
        }
      }
    } );
    this.setState( {
      tempList: listFinal
    } );
  }

  senNotification = async ( sdtCustomer, idBuild ) => {
    const { user } = this.props;
    const isWorker = user.checkWorker == 1;
    await firestoreUser.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( ( documentSnapshot ) => {
          const datas = documentSnapshot.data();
          if ( datas.sdt == sdtCustomer ) {
            sendNotificationMess( datas.token, isWorker ? '3' : '4', user.sdt );
            updateBill( idBuild, 1, isWorker ? 0 : 1 );
          }
        } );
      } );
  }

  async onPressSubmit( item ) {
    const { tempList, type } = this.state;
    const { user } = this.props;
    const isWorker = user.checkWorker == 1;
    console.log( 'isWorker', isWorker );
    for ( let i = 0; i < tempList.length; i++ ) {
      if ( tempList[i].id == item.id ) {
        this.getListView( type );
        this.senNotification( isWorker ? tempList[i].sdtCustomer : tempList[i].sdtWorker, tempList[i].id );
        if ( isWorker ) {
          tempList[i].status = 1;
          tempList.splice( i, 1 );
          this.setState( {
            tempList: tempList
          } );
          this.closeModal();
          return;
        } 
      }
    }

  }

  onPressSuccess= ( item ) => {
    const { user } = this.props;
    const isWorker = user.sdt == item.sdtWorker || false;
    this.popup = <Modal
      onPressSuccess={() => this.onPressSubmit( item )}
      onPressClose={this.closeModal}
      description={isWorker ? In18.NormalTitle.success : In18.Notification.unSubmitCalender}
      titleBtnSuccess={In18.TitleBtn.submit}
    ></Modal>;
    this.openModal();
  }

  seenInfor= async ( item ) => {
    const { user } = this.props;
    await firestoreUser.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( async ( documentSnapshot ) => {
          const datas = documentSnapshot.data();
          const temp = {
            id: documentSnapshot.id,
            name: datas.name,
            sdt: datas.sdt,
            luotXem: datas.luotXem,
            x: datas.x,
            y: datas.y,
            address: datas.address,
            image: datas.image,
            pass: datas.pass,
            checkWorker: datas.checkWorker,
            token: datas.token
          };
          if ( user.sdt == item.sdtWorker ) {
            if ( item.sdtCustomer == datas.sdt ) {
              Actions.infoWorker( { item: temp } );
            }
          }
          if ( user.sdt == item.sdtCustomer ) {
            if ( item.sdtWorker == datas.sdt ) {
              Actions.infoWorker( { item: temp } );
            }
          }
        } );
      } );
  }

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NameScreen.calenderDoing}
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
