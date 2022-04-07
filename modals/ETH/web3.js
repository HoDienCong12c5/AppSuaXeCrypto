// const Wallet = require( 'ethereumjs-wallet' );
import Wallet from 'ethereumjs-wallet';
import { ethers } from 'ethers';
import setting from './setting';

const web3 = require( 'web3' );

export { chainType } from 'common/constants';
const {
  // ChainID,
  ChainType
} = require( '@harmony-js/utils' );

export const sendTransaction = ( walletUer, txtAmount, txtAddress, contractToken, decimalToken ) => {

};
export const getRandomInfuraKey = () => {
  const arrListKey = [
    '61c448dbae4c45a4b00d1c3411fd251c',
    '538f9b89775547449ce1005b5079a366',
    '001f8052cf9a4a9da3041d00cfa7c009',
    '7c669cfb419e426eae848f5721862cb9',
    '5299ca128ca5456cb01270414d853235',
    '9c8cb94a47734c42aba00ceedc0a09fc',
    'a6f90cc19abc41bab4e3af72e7a58079',
    '8066e12ff5664c63bd17226b8e956b23',
    '31799786d98547ac897ac001aae8eaaa',
    '27d0bb4b6f6245c6b1adcda63a07f4d1',
    '20d4c8306e7044f187286a339a235774',
    '9c9195bc9e8d4aa8b2d67b4ad19c9e0c',
    '1bddca4ee30749608a0d0ecb87656a90',
    '5f2a3680f9e0478da71b0ac5cdeb71ec',
    'dec1a61709fd4363be516459fb745f79',
    '70a73ea1ab614b19ad90f2c193d0f194',
    '37dd84fb42134a37b8f8819067498f48',
    '05cb01bf10b8402da4cd4eb240366851',
    'fdde9a09e2844a54a5e5f55eca6f7f4d',
    '6745266db4494071ad57e199490fe161',
    '17dba07295cd4abcb8e99e45f7ee88e6',
    '8c6577a7a3404ab5b6c14557d4f34950',
    '61c448dbae4c45a4b00d1c3411fd251c'
  ];

  const minKeyIndex = 0;
  const maxKeyIndex = arrListKey.length - 1;

  const randomKeyIndex = Math.floor( Math.random() * ( maxKeyIndex - minKeyIndex + 1 ) ) + minKeyIndex;
  console.log( arrListKey[randomKeyIndex] );
  return arrListKey[randomKeyIndex];
};

const getInfuraLink = ( infuraLink ) => {
  const randomKey = getRandomInfuraKey();
  return `${infuraLink}/${randomKey}`;
};
console.log( getInfuraLink( setting().web3Link.ether.linkProvider ) );
// web3.setProvider( new web3.providers.HttpProvider( getInfuraLink( setting().web3Link.ether.linkProvider ) ) );
// const web3Provider = new ethers.providers.Web3Provider( web3.currentProvider );
