import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { bindActionCreators } from 'redux';
import ActionStore from 'reduxs/Action/ActionStore';
import { connect } from 'react-redux';
import { getListWorkerNear } from 'modals/function';
import User from 'modals/User';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page';
// import firestore from '@react-native-firebase/firestore';
class Search extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      list: [],
      type: 1,
      currentIndex: 0,
      listWorkerNear: [],
      listShow: [],
      isShowMap: false
    };
  }

  async componentDidMount() {
    const { listQualityWorker } = this.props;
    this.setState( {
      list: await listQualityWorker,
      listWorkerNear: await getListWorkerNear( listQualityWorker )
    } );
  }

  onChangeType = async ( types ) => {
    const { listQualityWorker } = this.props;
    if ( types === 0 ) {
      console.log( this.state.listWorker );
      this.setState( {
        list: listQualityWorker,
        currentIndex: 0,
        type: 0,
        isShowMap: false
      } );
    }
    if ( types === 1 ) {
      this.setState( {
        list: this.state.listWorkerNear,
        currentIndex: 1,
        type: 1,
        isShowMap: false
      } );
    }
    if ( types === 2 ) {
      this.setState( {
        isShowMap: true,
        currentIndex: 2,
        type: 2
      } );
    }
  };

  onPressInfoWorker = ( item ) => {
    Actions.infoWorker( { item } );
  };

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.List.listSearch}
        // noFooter
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
  listWorker: state.listWorker,
  listQualityWorker: state.listQualityWorker,
  listWorkerNearLimit: state.listWorkerNearLimit

} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setUser: bindActionCreators( ActionStore.setUser, dispatch ),
  setListWorker: bindActionCreators( ActionStore.setListWorker, dispatch ),
  setListQualityWorker: bindActionCreators( ActionStore.setListQualityWorker, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Search );
// export default Search;
