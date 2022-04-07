// import { logDebug } from 'common/function'

// Sync latest redux state

const settings = () => {
  const isMainNet = false;

  return {
    oneSignalId: '4e17486c-8bb0-448b-99d7-ffbd9d06471e',
    server: {
      api: isMainNet
        ? 'https://api.jo1digitaltradingcards.com/'
        : 'https://api-sdg.w3w.app/',
      apiYoshimoto: isMainNet
        ? 'https://api.yoshimotokoreka.com/'
        : 'https://dev-api.yoshimotokoreka.app/',
      apiPantographWeb: isMainNet
        ? 'https://api.pantograph.app/'
        : 'https://dev-api.pantograph.app/'
    },
    web3Link: {
      ether: isMainNet
        ? 'http://mainnet.fullnode.work/'
        : 'https://kovan.infura.io/v3/7df30e3e2db7404ba667b75498437084',
      tomoChain: isMainNet
        ? 'https://rpc.tomochain.com'
        : 'https://rpc.testnet.tomochain.com',
      rpcBacoor: isMainNet
        ? 'https://fullnode.work'
        : 'https://rpc.testnet.tomochain.com',
      socket: isMainNet
        ? 'wss://ws.tomochain.com'
        : 'wss://ws.testnet.tomochain.com',
      chainId: isMainNet
        ? '88'
        : '89',
      linkScanTxs: isMainNet
        ? 'https://scan.tomochain.com/txs/'
        : 'https://scan.testnet.tomochain.com/txs/',
      linkAddress: isMainNet
        ? 'https://scan.tomochain.com/address/'
        : 'https://scan.testnet.tomochain.com/address/',
      tomoApi: isMainNet
        ? 'https://scan.tomochain.com/api/'
        : 'https://scan.testnet.tomochain.com/api/'
    }
  };
};

export default settings;
