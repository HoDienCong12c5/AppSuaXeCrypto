const settings = () => {
  // const { environmentRedux } = reduxState;
  // const isMainNet = !environmentRedux || environmentRedux === APP_ENVIRONMENT.MAINNET;
  const isMainNet = false;
  return {
    web3Link: {
      ether: {
        linkScanHash: isMainNet
          ? 'https://etherscan.io/tx/'
          : 'https://kovan.etherscan.io/tx/',
        linkScan: isMainNet
          ? 'https://etherscan.io/address/'
          : 'https://kovan.etherscan.io/address/',
        linkProvider: isMainNet
          ? 'https://mainnet.infura.io/v3'
          : 'https://kovan.infura.io/v3',
        chainId: isMainNet
          ? 1
          : 42
      }
    },
    gas: {
      ETH: 21000,
      TOKEN: 0,
      TOKEN_ETH: 100000,
      externalFeeToken: 150000,
      externalLargeFeeToken: 300000,
      externalSuperLargeFeeToken: 600000,
      externalFee: 21000
    }
  };
};

export default settings;
