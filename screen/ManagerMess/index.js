import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import store from 'react-native-simple-store'; 
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from 'container/BaseContainer';
import { bindActionCreators } from 'redux';
import { SaveProfile } from 'modals/functions';
import In18 from '../../common/constants';
import Page from './page';

class Profile extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      pass: '1',
      names: '',
      address: '10 a/1, Bình đngs, Bình hào, thuận An, Bình Dương',
      img: '',
      isWorker: false,
      contentNew: '',
      searchNumber: 0
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    this.setState( {
      sdt: user.sdt,
      names: user.name,
      address: user.address,
      imag: user.image,
      pass: user.pass
    } );
  }

  onSearch= async ( text ) => {
    console.log( '====================================' );
    console.log( text );
    console.log( '====================================' );
  }

  onPressLogOut() {
    Actions.login();
  }

  onPressSave = async ( type ) => {

  };

  onChangTextNew=( text ) => {
    this.setState( { ...this.state, contentNew: text } );
  }

  onOpenEdit=( type, nameTextOld, textOld ) => {
    this.openModal();
    // eslint-disable-next-line no-lone-blocks
    { this.popup = <PopupEdit
      nameTextOld={nameTextOld}
      textOld={textOld}
      onSave={() => this.onPressSave( type )}
      onChangText={this.onChangTextNew}
      onClose={this.closeModal}>
    </PopupEdit>; }
  }

  onChangeImgAvatar = ( value ) => {
    this.setState( { ...this.state, txtSDT: value } );
  };

  updateNotiMess = async () => {
    const { message, setMessage } = this.props;
    if ( message > 0 ) { setMessage( message - 1 ); }
  }

  render() {
    const Template = this.view;
    return (
      <Template
        title='Quản lý tin nhắn'
        // noFooter
        isRefresh
        props={this.props}
        func={this}
        state={this.state}
        showBtnBack={false}
        // noHeader
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  user: state.user,
  message: state.message
} );
const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setMessage: bindActionCreators( ActionStore.setMessage, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Profile );
// export default Profile;
