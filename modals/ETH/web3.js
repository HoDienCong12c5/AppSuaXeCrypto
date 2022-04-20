
const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
const Web3 = require( 'web3' );
let web3 = new Web3( new Web3.providers.HttpProvider( API_URL ) );
import bigdecimal from 'bigdecimal'
import store from 'react-native-simple-store';
import converter from 'hex2dec'
import { ethers } from 'ethers'
// let web3Provider = new ethers.providers.Web3Provider( web3.currentProvider )

const newWallet = async () => {
  // new add in web3
  const wallet = await generateWallet();
  return new Promise( async ( resolve, reject ) => {
    const temp = {
      address: wallet.address,
      privateKey: wallet.privateKey
    };
    //set temp in store
    if( await getStoreLocalWallet( 'wallet' ) ){
      await store.update( 'wallet', temp );
    }else{
      await store.save( 'wallet', temp );
    }
    resolve( temp );
  } )
 
} 
const generateWallet  = async () => {
  return new Promise( async ( resolve, reject ) => {
    const wallet = await web3.eth.accounts.create();
    resolve( wallet );
  } );
}

const getGasPrice = async () => {
  return new Promise( async ( resolve, reject ) => {
    const gasPrice = await web3.eth.getGasPrice();
    console.log( 'get gasPrice in web3 ', gasPrice );
    resolve( await gasPrice );
  } );
}


const estimateGasTxs=async ( rawTransaction ) =>{
  return new Promise(  ( resolve, reject ) => {
    web3.eth.estimateGas( rawTransaction ).then( res => {
     
      resolve( res )
    } ).catch( ( err ) => {
      console.log( 'Gas estimate error: ' + err )
      reject( err )
    } )
  } )
}
const getStoreLocalWallet = async ( key ) => {
  return new Promise( async ( resolve, reject ) => {
    store.get( key ).then( ( res ) => { 
      resolve( res );
    } );
  } ) 
};
const convertBalanceToWei = ( strValue, iDecimal = 18 ) => {
  var multiplyNum = new bigdecimal.BigDecimal( Math.pow( 10, iDecimal ) )
  var convertValue = new bigdecimal.BigDecimal( String( strValue ) )
  return multiplyNum.multiply( convertValue ).toString().split( '.' )[0]
}
const sendTransaction=async( privateKey, to, value )=>{
  value=await web3.utils.numberToHex( convertBalanceToWei( value ) )
  return new Promise( async ( resolve, reject ) => { 
    console.log( 'start' );
    const web3Provider = new ethers.providers.Web3Provider( web3.currentProvider )
    let ethWallet = new ethers.Wallet( privateKey, web3Provider )
    ethWallet.connect( web3Provider ) 
    let nonceCustom = -1 
    nonceCustom = await web3.eth.getTransactionCount( ethWallet.address )
    console.log( 'nonceCustom', nonceCustom ) 

    const gasPrice = await web3.utils.numberToHex( await getGasPrice() )
    console.log( 'gasPrice', gasPrice );

    const rawTransaction = {
      nonce: nonceCustom > 0 ? `0x${nonceCustom.toString( 16 )}` : nonceCustom === 0 ? `0x${nonceCustom.toString( 16 )}` : nonce,
      to,
      from: ethWallet.address,
      gasPrice,
      value
    }
    resolve( estimateGasTxs( rawTransaction ).then( async ( gas ) => {
      console.log( 'gas', gas );
      let gasLimit = await web3.utils.numberToHex( ( gas ) )
      rawTransaction.gasLimit=gasLimit
      delete rawTransaction.chainId
      delete rawTransaction.from
      console.log( 'rawTransaction', rawTransaction );
  
      const signedTransaction = await ethWallet.signTransaction( rawTransaction )
      console.log( 'signedTransaction', signedTransaction );
      web3.eth.sendSignedTransaction( signedTransaction, ( error, result ) => {
        if ( error ) {
          console.log( 'error', error );
          reject( error )
        } else {
          console.log( 'result', result );
          resolve( result )
        }
      } )
  
  
    } ) ) 
  } )
  
}
const getDataHistory= ( path, queryBody ) =>{
  return postGateWay( path, REQUEST_TYPE.GET, undefined, queryBody )
}
const postGateWay= ( url, method = REQUEST_TYPE.GET, body, queryBody, timeOutCustom = 5000, customAuth = null, isCustomLink = false )=> {
  const callApi = new Promise( async ( resolve, reject ) => {
    try {
      // const userToken = ReduxService.getUserToken()
      const token = customAuth || userToken
      const params = {
        method,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token ? 'Bearer ' + token : ''
        }
      }
      if ( body ) {
        params.body = JSON.stringify( body )
      }
      let queryStr = ''
      if ( queryBody ) {
        queryStr = '?' + QueryString.stringify( queryBody )
      }

      const response = await fetch( ( isCustomLink ? '' : ( settings().server.api ) ) + url + queryStr, params )
      const responJson = await response.json()
      if ( response.status === 200 ) {
        resolve( responJson )
      }
      resolve( null )
    } catch ( error ) {
      reject( error )
    }
  } )
  // Close promise if over time
  const callRemove = new Promise( function ( resolve, reject ) {
    setTimeout( () => {
      // return reject( errOverTime )
    }, timeOutCustom )
  } )

  return Promise.race( [callApi, callRemove] ).then( ( result ) => {
    return result
  } ).catch( ( e ) => {
    if ( e === 'OverTime' ) {
      // EventRegister.emit('internetChange', I18n.t('Initial.connectErr'))
    }
    return null
  } )
}
export default {
  newWallet,
  sendTransaction,
  getStoreLocalWallet,
  getDataHistory
}
