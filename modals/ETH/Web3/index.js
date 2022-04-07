import Web3 from 'web3';
import { ethers } from 'ethers';
import converter from 'hex2dec';
import { chainType } from 'common/constants';
import { concatSig } from 'eth-sig-util';
import { convertHexToNumber } from '@walletconnect/utils';
import bigdecimal from 'bigdecimal';
import settings from '../setting';
import EtherGasStation from './EtherGasStation';
// const web3 = new Web3()
// Web3Services.web3.setProvider(new Web3Services.web3.providers.HttpProvider(settings().web3Link.tomoChain, { timeout: 5000 }))

export default class Web3Services {
  static web3 = new Web3()

  static web3ProviderForEther = null

  static currentRpcUrl = settings().web3Link.ether

  static async init( isRetryConnect = false ) {
    const rpcURL = settings().web3Link.ether;
    try {
      Web3Services.web3.setProvider( new Web3Services.web3.providers.HttpProvider( rpcURL, { timeout: 5000 } ) );
      Web3Services.web3ProviderForEther = new ethers.providers.Web3Provider( Web3Services.web3.currentProvider );
      Web3Services.currentRpcUrl = rpcURL;
      await Web3Services.web3.eth.net.getId();
    } catch ( error ) {
      Web3Services.currentRpcUrl = rpcURL;
      if ( !isRetryConnect ) {
        await Web3Services.init( settings().web3Link.ether, true );
      }
    }
  }

  static getCurrentRcpUrl() {
    return Web3Services.currentRpcUrl;
  }

  static signPersonalTransaction( privateKey, payload, message, percent ) {
    return new Promise( async ( resolve, reject ) => {
      const ethWallet = new ethers.Wallet( `0x${privateKey}` );
      ethWallet.provider = Web3Services.web3ProviderForEther;

      const nonce = await Web3Services.web3.eth.getTransactionCount( ethWallet.address );

      const rawTransaction = {
        nonce,
        to: payload.to,
        value: payload.value,
        gasLimit: payload.gas * 1.2,
        gasPrice: payload.gasPrice,
        data: payload.data
      };

      const signedTransaction = await ethWallet.sign( rawTransaction );

      resolve( signedTransaction );
    } );
  }

  static convertToAscii( code ) {
    return Web3.utils.asciiToHex( code );
  }

  static convertAsciiToString( code ) {
    return Web3.utils.hexToAscii( code );
  }

  /*
  For contract just need decimal and address only *Only in send token*
  */
  //
  static async sendEthTokenTxs( privateKey, toAddress, amount, seletedToken, callback, percent ) {
    return new Promise( async ( resolve, reject ) => {
      let contract = seletedToken;
      if ( contract && contract.hash ) {
        contract.address = contract.hash;
      }

      let dataForSend = '';

      if ( contract ) {
        const amountConvert = this.convertBalanceToWei( amount, contract.decimals );
        dataForSend = this.generateDataToken( amountConvert, toAddress );
      } else {
        const isContract = await Web3Services.web3.eth.getCode( toAddress ) !== '0x';
        if ( isContract ) {
          contract = {
            address: toAddress,
            decimals: await this.getTokenDecimal( toAddress )
          };
        }
      }

      const generateTxs = {
        to: contract ? contract.address : toAddress,
        data: dataForSend
      };

      if ( !seletedToken ) {
        generateTxs.value = amount;
      }

      if ( percent ) {
        generateTxs.percent = ( percent / 100 );
      }

      this.postBaseSendTxs( privateKey, [generateTxs], false, callback ).then( ( result ) => {
        resolve( result[0] );
      } ).catch( ( _err ) => {
        reject( _err );
      } );
    } );
  }

  static async postBaseSendTxs( privateKey, arrSend, isWaitDone, callback, isValueBanlanceToWei = false ) {
    return new Promise( async ( resolve, reject ) => {
      const ethWallet = new ethers.Wallet( privateKey, Web3Services.web3ProviderForEther );

      const nonce = await Web3Services.web3.eth.getTransactionCount( ethWallet.address );
      const gasPrice = EtherGasStation.getGasPrice();

      const promise = arrSend.map( async ( item, index ) => new Promise( async ( resolve, reject ) => {
        const {
          to, data, value, percent, valueNoConvert
        } = item;

        const rawTransaction = {
          nonce: nonce + index,
          to,
          from: ethWallet.address,
          gasPrice,
          data
          // chainId: settings().web3Link.chainId
        };

        if ( percent ) {
          rawTransaction.gasPrice = gasPrice * percent;
        }

        if ( value || valueNoConvert ) {
          if ( isValueBanlanceToWei ) {
            rawTransaction.value = this.convertBalanceToWei( value );
          } else {
            rawTransaction.value = converter.decToHex( valueNoConvert || this.convertBalanceToWei( value ) );
          }
        }

        this.estimateGasTxs( rawTransaction ).then( async ( gasLimit ) => {
          rawTransaction.gasLimit = `0x${gasLimit.toString( 16 )}`;

          delete rawTransaction.chainId;
          delete rawTransaction.from;

          const signedTransaction = await ethWallet.sign( rawTransaction );
          let hashTxs;

          Web3Services.web3.eth.sendSignedTransaction( signedTransaction, ( error, result ) => {
            if ( error ) {
              reject( error );
            } else {
              hashTxs = result;
              !isWaitDone && resolve( result );
            }
          } ).then( ( result ) => {
            console.log( 'estimateGasTxs-result', result );
            callback && callback( hashTxs );
            isWaitDone && resolve( hashTxs );
          } ).catch( ( error ) => {
            isWaitDone && reject( error );
          } );
        } ).catch( ( _err ) => {
          reject( _err );
        } );
      } ) );

      Promise.all( promise ).then( ( result ) => {
        resolve( result );
      } ).catch( ( _err ) => {
        reject( _err );
      } );
    } );
  }

  static async getTokenDecimal( contractAddress ) {
    return new Promise( async ( resolve, reject ) => {
      const minABI = [
        {
          constant: true,
          inputs: [],
          name: 'decimals',
          outputs: [{ name: '', type: 'uint8' }],
          type: 'function'
        }
      ];
      const contract = new Web3Services.web3.eth.Contract( minABI, contractAddress );
      contract.methods.decimals().call().then( ( decimal ) => {
        resolve( decimal );
      } ).catch( () => {
        resolve( 18 );
      } );
    } );
  }

  // eslint-disable-next-line consistent-return
  static async signTransaction( privateKey, payload, isWaitDone = false ) {
    try {
      return new Promise( async ( resolve, reject ) => {
        const generateTxs = {
          to: payload.to,
          nonce: payload.nonce,
          gasLimit: payload.gasLimit,
          gasPrice: payload.gasPrice,
          data: payload.data
        };

        if ( payload.value ) {
          generateTxs.value = convertHexToNumber( payload.value );
        }

        this.postBaseSendTxsForWalletConnect( privateKey, [generateTxs] ).then( ( result ) => {
          resolve( result[0] );
        } ).catch( ( _err ) => {
          reject( _err );
        } );
      } );
    } catch ( e ) {
      // code
    }
  }

  static async postBaseSendTxsForWalletConnect( privateKey, arrSend, isWaitDone, callback, isValueBanlanceToWei = false ) {
    return new Promise( async ( resolve, reject ) => {
      const ethWallet = new ethers.Wallet( privateKey, Web3Services.web3ProviderForEther );
      const nonce = await Web3Services.web3.eth.getTransactionCount( ethWallet.address );
      const promise = arrSend.map( async ( item, index ) => new Promise( async ( resolve, reject ) => {
        const {
          to, data, value, valueNoConvert, gasPrice, gasLimit
        } = item;

        const rawTransaction = {
          nonce: nonce + index,
          to,
          from: ethWallet.address,
          gasPrice,
          data
          // chainId: settings().web3Link.chainId
        };

        if ( value >= 0 || valueNoConvert >= 0 ) {
          if ( isValueBanlanceToWei ) {
            rawTransaction.value = this.convertBalanceToWei( value );
          } else {
            rawTransaction.value = converter.decToHex( valueNoConvert || this.convertBalanceToWei( value ) );
          }
        }

        rawTransaction.gasLimit = gasLimit;

        delete rawTransaction.chainId;
        delete rawTransaction.from;

        const signedTransaction = await ethWallet.sign( rawTransaction );

        let hashTxs;

        Web3Services.web3.eth.sendSignedTransaction( signedTransaction, ( error, result ) => {
          if ( error ) {
            reject( error );
          } else {
            // eslint-disable-next-line no-unused-expressions
            !isWaitDone && resolve( result );
          }
        } ).then( ( result ) => {
          console.log( 'Web3Services.web3.eth.sendSignedTransaction -result', result );
          callback && callback( hashTxs );
          isWaitDone && resolve( hashTxs );
        } ).catch( ( error ) => {
          isWaitDone && reject( error );
        } );
      } ) );

      Promise.all( promise ).then( ( result ) => {
        resolve( result );
      } ).catch( ( _err ) => {
        reject( _err );
      } );
    } );
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

  zeroPadLeft = ( text, length = 64 ) => {
    while ( text.length < length ) {
      text = `0${text}`;
    }
    return text;
  }
}
