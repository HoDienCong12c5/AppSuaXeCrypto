import { View, Text } from 'react-native'
import React, { Component } from 'react'
import Eth from '../ETH/web3.js'
import Tomo from '../TOMO/web3.js'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ActionStore from 'reduxs/Action/ActionStore';
import Base from '../../container/BaseContainer';

class ManagerWeb3{
  static async sendTransaction( privateKey, to, value ,token ){

    return new Promise( async ( resolve, reject ) => {
      if( token ){
        Eth.sendTransaction( privateKey, to, value ).then( ( res ) => {
          resolve( res )
        } )
        // resolve ( await Eth.sendTransaction( privateKey, to, value ) ) 
        // resolve( 'ok' )
      }else{
        console.log( 'tomo' );

        Tomo.sendTransaction( privateKey, to, value ).then( ( res ) => {
          resolve( res )
        } )
      }
    } )
  }
  static async newWallet( token ){
    if( token ){
      return await Eth.newWallet();
    }else{
      console.log( 'tomo' );

      return await Tomo.newWallet();
    }
  }
  static async getBalance( address,token ){
    if( token ){
      return await Eth.getBalance( address );
    }else{
      console.log( 'tomo' );  
      return await Tomo.getBalance( address );
    }
  }
  static async getGasPrice( token ){
    if( token ){
      return await Eth.getGasPrice();
    }else{
      console.log( 'tomo' );
      return await Tomo.getGasPrice();
    }
  }
  //convertBalanceToWei
  static  async  checkAmount( token, value, balance ){ 
    value= Tomo.convertBalanceToWei( value );
    const total =parseInt( value ) +parseInt( await this.getGasPrice( token ) );
    console.log( 'total', total );
    console.log( 'value', value );
    console.log( 'balance',  Tomo.convertBalanceToWei( balance ) );
    return new Promise( ( resolve, reject ) => {
      resolve( Tomo.convertBalanceToWei( balance )>= total )
    } )
   
  }
}
// const mapStateToProps = ( state ) => ( {
//   token: state.user.token
// } );
// const mapDispatchToProps = ( dispatch ) => ( {
//   setUser: bindActionCreators( ActionStore.setUser, dispatch )
// } );
export default ManagerWeb3
// export default connect( mapStateToProps, mapDispatchToProps )( Person ); 

