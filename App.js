import {View, Text} from 'react-native';
import React from 'react';

const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(API_URL));
const toAdd = '0xb2f92112cff116e589900e4622b9d1265284665d';
const privatekey =
  '0xc77e6040bd37d4d2beac9399284372ece39d747253c99b423daa3a5aa2d805ff';

const news = () => {
  const register = async () => {
    console.log('Calling Contract.....');
    await sendTransaction(privatekey, toAdd);
    /*const tx = {
      // from: toAddress,
      to: toAdd,
      value: '100000000000',
      gas: 2000000,
      // gasPrice: '2500000007',
      // gas: '5208',
      // value: '10000000000000'
      // data: '0x'
    };
    const myContract = await new web3.eth.Contract([], toAdd, {
      from: toAdd, // default from address
      gasPrice: '10000000000', // default gas price in wei, 20 gwei in this case,
    });
    console.log('--signedTransaction---');
    console.log('myContract', await myContract);*/
  };
  register();
  return (
    <View>
      <Text>newsdasdas</Text>
    </View>
  );
};
const sendTransaction = async (privateKey, toAddress) => {
  web3.eth.getGasPrice().then(console.log);
  const tx = {
    // from: toAddress,
    to: toAddress,
    value: '100000000000',
    gas: 2000000,
    // gasPrice: '2500000007',
    // gas: '5208', 
    // value: '10000000000000'
    // data: '0x'
  };
  console.log('--signedTransaction---');
  // web3.eth.getTransactionCount( toAddress ).then( console.log );
  const signedTransaction = await web3.eth.accounts.signTransaction(
    tx,
    privateKey,
  );
  // web3.eth.sendTransaction( tx, privateKey ).then( console.log );
  console.log('signedTransaction', await signedTransaction);
};
export default news;
