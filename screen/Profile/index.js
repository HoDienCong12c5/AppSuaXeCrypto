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
import PopupEdit from './componets/popupEdit';

class Profile extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      pass: '',
      names: '',
      address: '',
      img: '',
      isWorker: false,
      contentNew: ''
    };
  }

  async componentDidMount() {
    const { user } = this.props;
    this.setState( {
      sdt: user.sdt,
      names: user.name,
      address: user.address,
      imag: user.image,
      pass: user.pass,
      isWorker: user.checkWorker == 1

    } );
  }

  onPressLogOut() {
    Actions.login();
  }

  onPressSave = async ( type ) => { 
    const { user } = this.props;
    const { contentNew } = this.state;
    await SaveProfile( user.id, type, contentNew );
    if ( type === '0' ) {
      user.name = contentNew;
      this.setState( { ...this.state, names: contentNew } );
    }
    if ( type === '1' ) {
      user.address = contentNew;
      this.setState( { ...this.state, sdt: contentNew } );
    }
    if ( type === '2' ) {
      user.pass = contentNew;
      this.setState( { ...this.state, pass: contentNew } );
    }
    if ( type === '3' ) {
      user.address = contentNew;
      this.setState( { ...this.state, address: contentNew } );
    }
  };

  onPressSetting = ( type ) => {
    // Actions.build({
  }

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

  onChangeTexts = ( type ) => {

  };

  onChangeImgAvatar = ( value ) => {
    this.setState( { ...this.state, txtSDT: value } );
  };

  render() {
    const Template = this.view;
    return (
      <Template
        title='Thông tin cá nhân'
        // noFooter
        props={this.props}
        func={this}
        state={this.state}
        noFooter
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
export default connect( mapStateToProps, mapDispatchToProps )( Profile );
// export default Profile;
