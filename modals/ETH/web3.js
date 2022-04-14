
const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
const Web3 = require( 'web3' );
const web3 = new Web3( new Web3.providers.HttpProvider( API_URL ) );
import bigdecimal from 'bigdecimal'
import store from 'react-native-simple-store';
import converter from 'hex2dec'
var Tx = require( '@ethereumjs/tx' ).Transaction;
import { ethers } from 'ethers'
let web3Provider = new ethers.providers.Web3Provider( web3.currentProvider )

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
//send new 
const sendNew= async ( privateKey, fromAdd, value )=>{
  console.log( 'fromAdd', fromAdd );
  const nonce = await web3.eth.getTransactionCount( fromAdd );

  const gasPrice = await web3.eth.getGasPrice();
 
  return new Promise( async ( resolve, reject ) => {
    var rawTx = {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: '21000',
      to: fromAdd,
      value: value ,
      data:'0x'
    } 
    sendTransaction2( privateKey, rawTx ).then( ( data )=>{
      resolve( data )
    }
    )
  } )

}
//new send2
const sendTransaction2 = async ( privateKey, item ) => {
  const { to, gasPrice, value, gasLimit, data } = item;
  return new Promise( async ( resolve, reject ) => {
    const hmyMasterAccount = web3.eth.accounts.privateKeyToAccount( privateKey.replace( '0x', '' ) )
    // web3.eth.accounts.wallet.add( hmyMasterAccount )
    web3.eth.defaultAccount = hmyMasterAccount.address
    const myAddress = web3.eth.defaultAccount
    const from = web3.eth.defaultAccount
    console.log( 'myAddress',myAddress )
    // resolve( myAddress )
    web3.eth.sendTransaction( {from,to , gasPrice, gasLimit, data,  value } )
      .on( 'transactionHash', function ( hash ) {
        console.log( 'transactionHash' )
        console.log( hash ) 
        resolve( hash ) 
      } )
      .on( 'receipt', function ( receipt ) {
        console.log( 'receipt' )
        console.log( receipt ) 
        resolve( receipt )
        // ReduxService.clearTrackingTxs(receipt.transactionHash)
      } )
      .on( 'error', ( err ) => {
        reject( err )
      } )

  } )
}
//sendTrancstion
const sendTransaction = async ( privateKey, toAdd, value ) => {
  console.log( 'vo' );
  var Tx = require( '@ethereumjs/tx' ).Transaction;
  console.log( 'wallet', privateKey );
  var privateKeyNew = Buffer.from( privateKey, 'hex' );
  console.log( 'privateKeyNew', privateKeyNew );
  //get nonce
  const nonce = await web3.eth.getTransactionCount( toAdd )+1;
  console.log( 'nonce', nonce );
  //get gasPrice 
  const gasPrice = await web3.eth.getGasPrice();
  console.log( 'gasPrice', gasPrice );
  //get gasLimit
  // const gasLimit = await web3.eth.getGasLimit();
  var rawTx =await {
    nonce: web3.utils.utf8ToHex( nonce ),
    gasPrice: web3.utils.utf8ToHex( gasPrice ),
    gasLimit: "0x05710",
    to: toAdd,
    value: '0x00'
  } 
  return await new Promise( async ( resolve, reject ) => {
    const ethWallet = new ethers.Wallet( privateKey, web3Provider ) 
    const signedTransaction = await ethWallet.signTransaction( rawTx )
    console.log( 'signedTransaction', signedTransaction );
    web3.eth.sendSignedTransaction( signedTransaction, ( error, result ) => {
      if ( error ) {
        console.log( 'error', error );
        reject( error );
      } else {
        console.log( 'result', result );
        resolve( result );
      }
    } )
    // await web3.eth.sendSignedTransaction( '0x' + serializedTx.toString( 'hex' ) ).on( 'receipt', function ( receipt ) {
    //   console.log( 'receipt' )
    //   console.log( receipt )
    //   resolve( receipt.transactionHash )
    // } )
    //   .on( 'error', ( err ) => {
    //     reject( err )
    //   } )
  } );
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
const generateDataToken = ( amount = 0, address ) => {
  const transferOpCode = '0xa9059cbb'
  const ABIValueToTransfer = zeroPadLeft( converter.decToHex( amount.toString().split( '.' )[0] ).replace( '0x', '' ), 64 )

  if ( address ) {
    const ethNakedAddress = address.toLowerCase().replace( '0x', '' )
    const ABIAddressTarget = zeroPadLeft( ethNakedAddress )
    return transferOpCode + ABIAddressTarget + ABIValueToTransfer
  } else {
    return transferOpCode + ABIValueToTransfer
  }
}
const zeroPadLeft = ( text, length = 64 ) => {
  while ( text.length < length ) {
    text = '0' + text
  }
  return text
}
const newTransaction=( privateKey, payload, isWaitDone = false, callback )=>{
  try {
    const isContract = payload.isContract || false
    const contractToken = payload.contractToken || null
    const decimal = payload.decimal || null
    let dataForSend
    return new Promise( async ( resolve, reject ) => {
      if ( isContract ) {
        // console.log('is contract')
        const amountConvert = convertBalanceToWei( payload.value, decimal )

        console.log( amountConvert )
        dataForSend = generateDataToken( amountConvert, payload.to )
       
      } 
      const gasPrice = await web3.eth.getGasPrice();
      const generateTxs = {
        to: isContract ? contractToken : payload.to,
        nonce: payload.nonce,
        gasLimit: '21000',
        gasPrice: gasPrice,
        data: isContract ? dataForSend : '0x'
      }
      if ( payload.value && !isContract ) {
        generateTxs.valueNoConvert = payload.value

        console.log( 'generatpayload.valueeTxs' )
        console.log( generateTxs.valueNoConvert )
      }

      console.log( 'generateTxs' )
      console.log( generateTxs )
    } )
  } catch ( error ) {
    console.log( 'error', error );
  }
}
const getDataHistory= ( path, queryBody ) =>{
  return postGateWay( path, REQUEST_TYPE.GET, undefined, queryBody )
}
const postGateWay= ( url, method = REQUEST_TYPE.GET, body, queryBody, timeOutCustom = 5000, customAuth = null, isCustomLink = false )=> {
  const callApi = new Promise( async ( resolve, reject ) => {
    try {
      const userToken = ReduxService.getUserToken()
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
  newTransaction,
  getDataHistory,
  sendNew
}
