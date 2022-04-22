import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register } from 'modals/function';
import messaging from '@react-native-firebase/messaging';
import Geolocation from 'react-native-geolocation-service';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import auth from '@react-native-firebase/auth';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';
import Modal from './component/Vertical/index';
// import firestore from '@react-native-firebase/firestore';
class Regitster extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      txtSDT: '',
      txtPass: '',
      txtPass2: '',
      txtAddress: '',
      isWorker: false,
      txtName: '',
      x: '0',
      y: '0',
      confirm: '',
      isConfirm: false,
      otp: 1
    };
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      async ( position ) => {
        const positions = position.coords;
        this.setState( { x: positions.latitude, y: positions.longitude } );
        // list = getAllListWorker( user.x, user.y );
      },
      ( error ) => {
        // See error code charts below.
        console.log( error.code, error.message );
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }

  onSubmitOTP = async () => {

  }

  onChangTextOTP= async ( value ) => {
    this.setState( { otp: value } );
  }

  onSubmitRegister = async () => {
    const { otp, confirm } = this.state;
    this.closeModal();
    try {
      await confirm.confirm( otp ).then( ( ) => {
        // this.setState( { userId: user.uid } );
        alert( 'Đăng ký thành công' );
        this.successConfirmOTP();
      } )
        .catch( ( ) => {
          alert( 'Nhập sai ma otp' );
          this.setState( { otp: 0 } );
        } );
    } catch ( error ) {
      alert( 'Nhập sai ma otp' );
      this.setState( { otp: 0 } );
    }
  }

  connectString = ( arr ) => {
    const tep = arr.splice( 1, arr.length );
    let str = '+84';
    tep.forEach( ( element ) => {
      str += element;
    } );
    return str;
  }

  successConfirmOTP = async ( ) => {
    const {
      txtSDT, txtPass, x, txtAddress, txtName, isWorker, y
    } = this.state;
    const worker = isWorker ? 1 : 0;
    messaging()
      .getToken()
      .then( async ( token ) => {
        await Register( txtSDT, txtName, txtAddress, worker, txtPass, token, x, y );
      } );
  }

  onPressRegister = async () => {
    if ( this.state.txtSDT.length > 8 ) {
      const sdtFinal = this.connectString( this.state.txtSDT.split( '' ) );

      const confirmation = await auth().signInWithPhoneNumber( sdtFinal );
      await this.setState( { confirm: confirmation } );
      this.popup = <Modal
        onSubmitOTP={() => this.onSubmitRegister()}
        otp={this.state.otp}
        onChangText={this.onChangTextOTP}
        closeModal={() => this.closeModal()}
      ></Modal>;
      this.openModal();
    }
  };

  onChangePassword = ( value ) => {
    this.setState( { ...this.state, txtPass: value } );
  };

  onChangeSDT = ( value ) => {
    this.setState( { ...this.state, txtSDT: value } );
  };

  onChangePassword2 = ( value ) => {
    this.setState( { ...this.state, txtPass2: value } );
  };

  onChangeName = ( value ) => {
    this.setState( { ...this.state, txtName: value } );
  };

  onChangeAddress = ( value ) => {
    this.setState( { ...this.state, txtAddress: value } );
  };

  setisCheckWorker = ( isWorker ) => {
    this.setState( { ...this.state, isWorker: !isWorker } );
  };

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.TitleBtn.register}
        noFooter
        props={this.props}
        func={this}
        state={this.state}
        noHeader
        showBtnBack={false}
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  user: state.user
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Regitster );
