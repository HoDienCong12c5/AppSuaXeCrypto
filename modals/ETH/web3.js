
const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
const Web3 = require( 'web3' );
const web3 = new Web3( new Web3.providers.HttpProvider( API_URL ) );
const toAdd = '0xb2f92112cff116e589900e4622b9d1265284665d';
import store from 'react-native-simple-store';

var Tx = require( '@ethereumjs/tx' ).Transaction;

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
//sendTrancstion
const sendTransaction = async ( wallet, toAdd, value ) => {
  console.log( 'vo' );
  return new Promise( async ( resolve, reject ) => {
    const gasPrice = await web3.eth.getGasPrice();
    const privKey = wallet.privateKey.substring( 2 );

    console.log( 'privKey', privKey );
    const privKeyBuffer =new  Buffer.from( privKey, 'hex' );

    console.log( 'privKeyBuffer', privKeyBuffer );
    const nonce = await web3.eth.getTransactionCount( wallet.address );


    const rawTransaction = {
      nonce: nonce,
      gasPrice: gasPrice,
      gasLimit: '21000',
      to: toAdd,
      value: value,
      data:'0x'
    };
    console.log( 'rawTransaction', rawTransaction );
    var tx =await  new Tx( '0x7f7465737432000000000000000000000000000000000000000000000000000000600057', {'chain':'ropsten'} );
    // tx.sign( privKeyBuffer );

    // var serializedTx = tx.serialize();
    // console.log( 'serializedTx', serializedTx );
    // const receipt = await web3.eth.sendSignedTransaction( '0x' + serializedTx.toString( 'hex' ) );
    resolve( tx );
  } );
}
const getStoreLocalWallet = async ( key ) => {
  return new Promise( async ( resolve, reject ) => {
    store.get( key ).then( ( res ) => { 
      resolve( res );
    } );
  } ) 
};
export default {
  newWallet,
  sendTransaction,
  getStoreLocalWallet
}
