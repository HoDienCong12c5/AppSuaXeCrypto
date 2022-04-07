import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import database from '@react-native-firebase/database';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAllListWorker, getListWorkerQuality } from 'modals/function';
import ActionStore from 'reduxs/Action/ActionStore';
import Page from './page';
import In18 from '../../common/constants';
import Base from '../../container/BaseContainer';

class GGMap extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      txtSDT: '',
      txtPass: ''
    };
  }

  componentDidMount() {
    const { listWorkerNearLimit } = this.props;
  }

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NormalTitle.ggMap}
        noFooter={false}
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
  listWorker: state.listWorker,
  listWorkerNearLimit: state.listWorkerNearLimit
} );
const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( GGMap );
