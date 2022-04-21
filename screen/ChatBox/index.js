import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register, getLisBill } from 'modals/function';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page'; 
import Content from './content';
class ChatBox extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      sdt: '',
      countCalender: 0

    };
  }

  async componentDidMount() {
  }
  searchType=async ( text )=>{
    let indexType=0;
    for( var i = 0 ; i< Content.Problem.length; i++ ){
      if( Content.Problem[i].name.toLowerCase().indexOf( text.toLowerCase() ) !== -1 ){
        indexType=i; 
        const price = Content.PriceStart[i] +Content.PriceEnd[i];
        console.log( 'price',price );
        return price
      }
    }
    
  }
  onPressSend=() => {
  
  }

  onPressActions= ( type ) => {
    switch ( type ) {
    case 0:
      Actions.profile();
      break;
    case 1:
      Actions.bill( { option: 0 } );
      break;
    case 2:
      Actions.calenderDoing( { option: 1 } );
      break;
    case 3:
      Actions.calender( { option: 2 } );
      break;
    case 4:
      Actions.wallet( );
      break;
    }
  };

  render() {
    const Template = this.view;
    return (
      <Template
        title={In18.NameScreen.setting}
        props={this.props}
        func={this}
        state={this.state}
        // showBtnBack={false}
      />
    );
  }
}
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  user: state.user,
  lisChat: state.lisChat
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setListChat: bindActionCreators( ActionStore.setListChat, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( ChatBox );
