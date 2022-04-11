import { View, Text } from 'react-native'
import React from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
export default function index( p ) {
  const { onReadScan } = p;
  return (
    <View>
      <QRCodeScanner
        onRead={( value )=>onReadScan( value )}
        // flashMode={RNCamera.Constants.FlashMode.torch}
      />
    </View>
  )
}
