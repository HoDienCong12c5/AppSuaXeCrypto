import React from 'react';
import {
  Alert, View, PermissionsAndroid, Platform
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  getLisBill, compareDate, sendNotificationMess, updateBill,
  formatDateTimeToString,
  updateBillDateEnd
} from 'modals/function';
import ActionStore from 'reduxs/Action/ActionStore';
import Modal from 'components/ModalBase/index';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';
import ModalSetupDate from './ModalSetupDate';

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
      isWorker: false,
      dateEnd: formatDateTimeToString( new Date() )
    };
  }

  async componentDidMount() {
    const { user, option } = this.props;
    this.setState( {
      listBill: await getLisBill( user.sdt, user.checkWorker ),
      tempList: await getLisBill( user.sdt, user.checkWorker ),
      isWorker: user.checkWorker == 1
    } );
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

  senNotification = async ( sdtCustomer, idBuild, dateEnd ) => {
    const { user } = this.props;
    const isWorker = user.checkWorker == 1;
    await firestoreUser.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( ( documentSnapshot ) => {
          const datas = documentSnapshot.data();
          if ( datas.sdt == sdtCustomer ) {
            sendNotificationMess( datas.token, isWorker ? '3' : '4', user.sdt );
            updateBillDateEnd( idBuild, -1, isWorker ? 0 : 1, dateEnd );
          }
        } );
      } );
  }

  async onPressSubmit( item ) {
    const { dateEnd } = this.state;
    if ( compareDate( dateEnd, 3 ) ) {
      const { listBill, type } = this.state;
      const { user } = this.props;
      const isWorker = user.checkWorker == 1;
      for ( let i = 0; i < listBill.length; i++ ) {
        if ( listBill[i].id == item.id ) {
          this.getListView( type );
          this.senNotification( isWorker ? listBill[i].sdtCustomer : listBill[i].sdtWorker, listBill[i].id, dateEnd );
          if ( isWorker ) {
            listBill[i].status = -1;
            listBill[i].dateEnd = dateEnd;
          } else {
            listBill.splice( i, 1 );
            return;
          }
        }
      }
      this.closeModal();
    } else {
      Alert.alert( 'Ngày không hợp lệ' );
    }
    this.setState( { tempList: this.state.listBill } );
  }

  onChangeDateEnd = ( date ) => {
    console.log( { date } );
    this.setState( { dateEnd: date } );
  }

  onPressSuccess= ( item ) => {
    const { user } = this.props;
    const isWorker = user.sdt == item.sdtWorker || false;
    const customBody = <ModalSetupDate
      dateEnd={this.state.dateEnd}
      onChangeDateEnd={this.onChangeDateEnd}
    ></ModalSetupDate>;
    this.popup = <Modal
      onPressSuccess={() => this.onPressSubmit( item )}
      onPressClose={this.closeModal}
      customView={customBody}
      description={isWorker ? In18.Notification.submitCalender : In18.Notification.unSubmitCalender}
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
