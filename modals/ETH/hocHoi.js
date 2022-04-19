
//import web 3
import Web3 from 'web3';
import { API_URL } from 'config';
const web3 = new Web3( new Web3.providers.HttpProvider( API_URL ) );
//send new
const sendNew= async ( privateKey, to, value )=>{
  console.log( 'fromAdd', to );
  const nonce = await web3.eth.getTransactionCount( to, 'latest' )+1;
  console.log( 'nonce', nonce );
  const gasPrice = await web3.eth.getGasPrice();
  const temp={
    nonce,
    gasPrice,
    to,
    value,
    'gas': 30000
  }
  return new Promise( async ( resolve, reject ) => {
    const signedTx = await web3.eth.accounts.signTransaction( temp, privateKey );
    console.log( 'signedTx', signedTx );
    resolve( signedTx );
  } )
}
