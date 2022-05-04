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
      return await Tomo.newWallet();
    }
  }
  static async getBalance( address,token ){
    if( token ){
      return await Eth.getBalance( address );
    }else{
      return await Tomo.getBalance( address );
    }
  }
  static async getPrice( token ){
    
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

