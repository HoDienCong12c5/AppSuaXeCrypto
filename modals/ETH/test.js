import { ethers } from 'ethers';

const Web3 = require( 'web3' );
// const Tx = require( 'ethereumjs-tx' );

const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
const web3 = new Web3( new Web3.providers.HttpProvider( API_URL ) );
// eslint-disable-next-line import/prefer-default-export
export const sendTransaction = async ( privateKey, toAddress ) => {
  web3.eth.getGasPrice()
    .then( console.log );
  const tx = {
    from: toAddress,
    to: toAddress,
    gasPrice: '2500000007',
    gas: '5208',
    value: '10000000000000',
    data: '0x'
  };
  console.log( '--signedTransaction---' );
  // web3.eth.getTransactionCount( toAddress ).then( console.log );
  const signedTransaction = web3.eth.accounts.signTransaction( tx, privateKey ).then( console.log );
  // web3.eth.sendTransaction( tx, privateKey ).then( console.log );
  console.log( 'signedTransaction', signedTransaction );
};
