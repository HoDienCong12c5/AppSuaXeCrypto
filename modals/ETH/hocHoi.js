import { ethers } from 'ethers';
import converter from 'hex2dec';
import Web3 from 'web3';
import { chainType } from 'common/constants';
import { concatSig } from 'eth-sig-util';
import bigdecimal from 'bigdecimal';

const { Buffer } = require( 'buffer/' );

const API_URL = 'https://kovan.infura.io/v3/e4c6b2743e544bdb910ef53155687b0f';
const web3 = new Web3( );
web3.setProvider( new Web3.providers.HttpProvider( API_URL ) );
// export class
export default class Wallet {
  // eslint-disable-next-line consistent-return
  static async sendEthTokenTxsWithoutSign( privateKey, payload, isWaitDone = false, fromAdd, callback ) {
    try {
      // web3.eth.getTransactionCount( fromAddress )
      //   .then( console.log );
      const isContract = payload.isContract || false;
      const contractToken = payload.contractToken || null;
      const decimal = payload.decimal || null;
      let dataForSend;
      return new Promise( async ( resolve, reject ) => {
        if ( isContract ) {
          // console.log('is contract')
          const amountConvert = this.convertBalanceToWei( payload.value, decimal );

          // console.log(amountConvert)
          dataForSend = this.generateDataToken( amountConvert, payload.to );
        }

        const generateTxs = {
          to: isContract ? contractToken : payload.to,
          nonce: payload.nonce,
          gasLimit: payload.gasLimit,
          gasPrice: payload.gasPrice,
          data: isContract ? dataForSend : '0x'
        };

        this.postBaseSendTxsWithoutSign( privateKey, [generateTxs], true, callback ).then( ( result ) => {
          resolve( result[0] );
        } ).catch( ( err ) => {
          reject( err );
        } );
      } );
    } catch ( error ) {
      console.log( error );
    }
  }

  static convertBalanceToWei = ( strValue, iDecimal = 18 ) => {
    const multiplyNum = new bigdecimal.BigDecimal( 10 ** iDecimal );
    const convertValue = new bigdecimal.BigDecimal( String( strValue ) );
    return multiplyNum.multiply( convertValue ).toString().split( '.' )[0];
  }

  // eslint-disable-next-line default-param-last
  static generateDataToken = ( amount = 0, address ) => {
    const transferOpCode = '0xa9059cbb';
    const ABIValueToTransfer = this.zeroPadLeft( converter.decToHex( amount.toString().split( '.' )[0] ).replace( '0x', '' ), 64 );

    if ( address ) {
      const ethNakedAddress = address.toLowerCase().replace( '0x', '' );
      const ABIAddressTarget = this.zeroPadLeft( ethNakedAddress );
      return transferOpCode + ABIAddressTarget + ABIValueToTransfer;
    }
    return transferOpCode + ABIValueToTransfer;
  }

  static zeroPadLeft = ( text, length = 64 ) => {
    while ( text.length < length ) {
      text = `0${text}`;
    }
    return text;
  }

  static async postBaseSendTxsWithoutSign( privateKey, arrSend, isWaitDone, callback, isValueBanlanceToWei = false ) {
    return new Promise( async ( resolve, reject ) => {
      const promise = arrSend.map( async ( item, index ) => new Promise( async ( resolve, reject ) => {
        const {
          to, data, valueNoConvert, gasPrice
        } = item;
        let { gasLimit } = item;

        console.log( 'postBaseSendTxsForWalletConnect' );
        // const myContractInstance = new this.maticWeb3.eth.Contract(myContractAbi, myContractAddress)

        const temp = web3.eth.accounts.privateKeyToAccount( privateKey.replace( '0x', '' ) );
        const hmyMasterAccount = temp;
        web3.eth.accounts.wallet.add( hmyMasterAccount );
        console.log( { hmyMasterAccount } );
        web3.eth.defaultAccount = hmyMasterAccount.address;

        const myAddress = web3.eth.defaultAccount;
        console.log( myAddress );

        // const gasPriceBN = parseFloat(converter.hexToDec(gasPrice))
        console.log( 'gasPrice' );

        console.log( 'gasPriceDefault' );
        console.log( gasPrice );
        let gasPriceDefault;

        gasPriceDefault = await this.getGasPrice();
        gasPriceDefault = Number.parseFloat( gasPriceDefault );
        console.log( `0x${gasPriceDefault.toString( 16 )}` );
        gasPriceDefault = `0x${gasPriceDefault.toString( 16 )}`;

        console.log( '11111' );

        const from = web3.eth.defaultAccount;
        if ( !gasLimit ) {
          gasLimit = 21000;
        }
        const decValue = this.convertBalanceToWei( 1 ); // 1 ONE
        web3.eth.sendTransaction( {
          from, to, value: decValue, gasPrice: gasPriceDefault, gasLimit, data
        } )
          .on( 'transactionHash', ( hash ) => {
            console.log( { hash } );
          } )
          .on( 'receipt', ( receipt ) => {
            console.log( { receipt } );
          } )
          .on( 'error', ( err ) => {
            reject( err );
          } );
      } ) );

      Promise.all( promise ).then( ( result ) => {
        console.log( { result } );
      } ).catch( ( err ) => {
        console.log( { err } );
      } );
    } );
  }

  static async getGasPrice() {
    return new Promise( async ( resolve, reject ) => {
      web3.eth.getGasPrice( ( err, res ) => {
        if ( err ) {
          resolve( 0 );
        }
        console.log( 'getGasPrice' );
        console.log( res );
        resolve( res );
      } );
    } );
  }
}
/* if ( data !== '0x' ) {
          if ( !gasLimit ) {
            gasLimit = 450000;
          }
          console.log( 'data1' );
          console.log( data );
          const decValue = valueNoConvert ? this.convertBalanceToWei( valueNoConvert ) : 0; // 1 ONE

          web3.eth.sendTransaction( {
            from, to, gasPrice: gasPriceDefault, gasLimit, data, value: decValue
          } )
            .on( 'transactionHash', ( hash ) => {
              console.log( 'transactionHash', hash );
              console.log( hash );
            } )
            .on( 'receipt', ( receipt ) => {
              console.log( 'receipt', receipt );
            } )
            .on( 'error', ( err ) => {
              reject( err );
            } );
        } else {
          if ( !gasLimit ) {
            gasLimit = 21000;
          }
          const decValue = valueNoConvert ? this.convertBalanceToWei( valueNoConvert ) : 0; // 1 ONE
          console.log( ' with no data' );
          console.log( { data } );
          console.log( { from } );
          console.log( { to } );
          console.log( { decValue } );
          console.log( { gasPriceDefault } );
          console.log( { gasLimit } );
          console.log( { gasLimit } );

          web3.eth.sendTransaction( {
            from, to, value: decValue, gasPrice: gasPriceDefault, gasLimit, data
          } )
            .on( 'transactionHash', ( hash ) => {
              console.log( { hash } );
            } )
            .on( 'receipt', ( receipt ) => {
              console.log( { receipt } );
            } )
            .on( 'error', ( err ) => {
              reject( err );
            } );
        } */
