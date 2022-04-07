import Web3 from 'web3';
import { ethers } from 'ethers';
import Wallet from 'ethereumjs-wallet';
import bigdecimal from 'bigdecimal';
import converter from 'hex2dec';
import Setting from './setting';

const {
  // ChainID,
  ChainType
} = require( '@harmony-js/utils' );

const web3 = new Web3();

web3.setProvider( new web3.providers.HttpProvider( 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f' ) );
const web3Provider = new ethers.providers.Web3Provider( web3.currentProvider );
// reset

export default class Web3ServicesEther {
  static createWeb3 = async ( chain ) => {
    const providerLink = Setting().web3Link.ether.linkProvider;

    const web3Server = new Web3( new Web3.providers.HttpProvider( providerLink ) );

    return web3Server;
  };

  static createNewWalletData = ( ) => {
    const arrWallet = [];

    const defaultAccountName = 'Account 1';
    // eslint-disable-next-line no-undef
    const mainETHWallet = this.generateETH( 'ether' );
    const accountData = { name: defaultAccountName, data: [], isFromKeyCard: false };
    accountData.address = mainETHWallet?.address;
    accountData.data.push( { ...mainETHWallet, ...{ name: `ETH ${defaultAccountName}`, status: true, chain: ChainType.Ethereum } } );
    arrWallet.push( accountData );
    console.log( 'arrWallet', arrWallet );
    return arrWallet;
  };

  // eslint-disable-next-line no-undef
  static generateETH = ( chain = 'ether' ) => {
    const wallet = Wallet.generate();
    console.log( wallet.privateKey );
    console.log( chain );
    console.log( wallet.getPrivateKey().toString( 'hex' ) );
    console.log( wallet.getAddress().toString( 'hex' ) );

    return { address: `0x${wallet.getAddress().toString( 'hex' )}`, privateKey: wallet.getPrivateKey().toString( 'hex' ), chain: chain };
  };

  // eslint-disable-next-line consistent-return
  static async sendEthTokenTxsWithoutSign( privateKey, payload, isWaitDone = false, callback ) {
    console.log( 'signTransaction' );

    try {
      console.log( privateKey );
      console.log( payload );
      const isContract = payload.isContract || false;
      const contractToken = payload.contractToken || null;
      const decimal = payload.decimal || null;
      let dataForSend;
      return new Promise( async ( resolve, reject ) => {
        console.log( 'payload' );
        console.log( payload );

        if ( isContract ) {
          // logDebug('is contract')
          const amountConvert = this.convertBalanceToWei( payload.value, decimal );

          // logDebug(amountConvert)
          dataForSend = this.generateDataToken( amountConvert, payload.to );
        }

        const generateTxs = {
          to: isContract ? contractToken : payload.to,
          nonce: payload.nonce,
          gasLimit: payload.gasLimit,
          gasPrice: payload.gasPrice,
          data: isContract ? dataForSend : '0x'
        };

        console.log( 'generateTxs 1' );
        console.log( generateTxs );

        if ( payload.value && !isContract ) {
          generateTxs.valueNoConvert = payload.value;

          console.log( 'generatpayload.valueeTxs' );
          console.log( generateTxs.valueNoConvert );
        }

        console.log( 'generateTxs' );
        console.log( { generateTxs } );

        this.postBaseSendTxsWithoutSign( privateKey, [generateTxs], true, callback ).then( ( result ) => {
          resolve( result[0] );
        } ).catch( ( err ) => {
          reject( err );
        } );
      } );
    } catch ( e ) {
      // logDebug( 'error' );
      // logDebug( e );
    }
  }

  convertBalanceToWei = ( strValue, iDecimal = 18 ) => {
    const multiplyNum = new bigdecimal.BigDecimal( 10 ** iDecimal );
    const convertValue = new bigdecimal.BigDecimal( String( strValue ) );
    return multiplyNum.multiply( convertValue ).toString().split( '.' )[0];
  }

  // eslint-disable-next-line default-param-last
  generateDataToken = ( amount = 0, address ) => {
    const transferOpCode = '0xa9059cbb';
    const ABIValueToTransfer = this.zeroPadLeft( converter.decToHex( amount.toString().split( '.' )[0] ).replace( '0x', '' ), 64 );

    if ( address ) {
      const ethNakedAddress = address.toLowerCase().replace( '0x', '' );
      const ABIAddressTarget = this.zeroPadLeft( ethNakedAddress );
      return transferOpCode + ABIAddressTarget + ABIValueToTransfer;
    }
    return transferOpCode + ABIValueToTransfer;
  }

  zeroPadLeft = ( text, length = 64 ) => {
    while ( text.length < length ) {
      text = `0${text}`;
    }
    return text;
  }
}
