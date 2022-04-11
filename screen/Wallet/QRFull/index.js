import { View, Text } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import { width, height } from 'common/styles';
export default function index( p ) {
  const { walletUser } = p;
  return (
    <View>
      {
        walletUser? <QRCode
          value={walletUser}
          size={height( 30 )}
          logoBackgroundColor='transparent'
        />:<Text> Chưa có địa chỉ ví</Text>
      }
     
    </View>
  )
}
