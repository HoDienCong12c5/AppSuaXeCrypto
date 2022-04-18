
const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';

//import web 3
import Web3 from 'web3'; 
const web3 = new Web3( new Web3.providers.HttpProvider( API_URL ) ); 
import { ethers } from 'ethers'
let web3Provider = new ethers.providers.Web3Provider( web3.currentProvider )



//send new
const sendNew= async ( privateKey, to, value )=>{
  await web3.eth.accounts.privateKeyToAccount( '0x'+privateKey );
  const ethWallet = new  ethers.Wallet( privateKey, web3Provider )  
  await web3.eth.accounts.wallet.add( '0x'+privateKey );
  const wl= await web3.eth.accounts.wallet;
  console.log( 'wl',await wl );
  const tran = await  web3.eth.accounts.sign( '', '0x'+privateKey )
  console.log( 'tran',await tran );

  // console.log( 'ethWallet', ethWallet );
  return new Promise( async ( resolve, reject ) => {
    // web3.eth.accounts.signTransaction( {
    //   to: to,
    //   value: '1000000000',
    //   gas: 2000000
    // }, '0x'+privateKey )
    //   .then( console.log );
  } )
}
export default { 
  sendNew
}
