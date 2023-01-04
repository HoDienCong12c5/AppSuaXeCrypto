import { View, Text } from 'react-native'
import React from 'react'
import SignClient from "@walletconnect/sign-client";
import Web3Modal from "@web3modal/standalone";
const WalletConnectV2 = () => {
  
  const initWallet = async() => {
    const signClient = await SignClient.init( {
      projectId: "f77f0c1ec95f97cff2af307f804d1e45",
      metadata: {
        name: "Test Wallet",
        description: "Test Wallet",
        url: "#",
        icons: ["https://walletconnect.com/walletconnect-logo.png"]
      }
    } );
    return signClient
  }
  const dp= async ( pairing )=>{
    const  signClient =await initWallet() 
    signClient.on( "session_event", ( event ) => {
      // Handle session events, such as "chainChanged", "accountsChanged", etc.
      console.log( {event} );
    } );
  }
  return (
    <View>
      <Text>WalletConnectV2</Text>
    </View>
  )
}

export default WalletConnectV2
