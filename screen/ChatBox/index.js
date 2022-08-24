import React from 'react';
import { Alert } from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { Register, getLisBill } from 'modals/functions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';
import In18 from '../../common/constants';
import Page from './page'; 
import Content from './content';
import { isBuffer } from '@walletconnect/utils';
const temp=[
  'Xe không nổ',
  'Xe bị lủng lốp',
  'Xe bị đứt dây xích',
  'Xe không đề được',
  'Xe không sáng đèn',
  'Xe Không dắt được',
  'Xe bị bề dè dè bên phải',
  'Xe bị bề dè dè bên trái',
  'Xe bị bề dè dè bên sau',
  'Xe bị bề dè dè bên trước', 
  'Sơn lại xe',
  'Xe ga không lên'
]
class ChatBox extends Base {
  constructor( props ) {
    super( props );
    this.page = Page;
    this.state = {
      text: '',
      countCalender: 0,
      list:[
        {
          isUser:false,
          connect:'Bạn cần giúp gì?'
        }
      ],
      listRecommend:[],
      count:1
    };
  }
  changeText=( value )=> {
    console.log( value );
    this.setState( {
      text:value
    } );
  }
  async componentDidMount() {
    this.setState( {
      listRecommend:temp
    } )
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
  send=() => {
  
  }
  onPressSelect = async ( item ) => {
    const result=await this.searchKeyword( item ) ?? '50 - 1 triệu';
    console.log( 'result',result );
    const listTemp=
      {
        isUser:true,
        connect:`${item} ?`
      }
    const listTemp2=
      {
        isUser:false,
        connect:await `giá khoảng ${result} `
      }
    
    const {list}=this.state;
    var arr =list
    arr.push( listTemp )
    arr.push( await listTemp2 )
    this.setState( { 
      list  :arr.reverse(),
      count:this.state.count+1,
      text:''

    } ) 
    console.log( 'item' , this.state.list );
  
  }
  searchKeyword = async ( text ) => {
    for ( let index = 0; index < Content.Problem.length; index++ ) {
      if( Content.Problem[index].includes( text ) ){
        const priceStart = Content.PriceStart[index] +'-'+Content.PriceEnd[index];
        return priceStart
      }
      
    }
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
        title={'Chat Box hộ trợ khác hàng'}
        props={this.props}
        func={this}
        state={this.state}
        noFooter
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
