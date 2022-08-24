import React from 'react';
import { View, Text, Alert , TouchableOpacity} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux'; 
import styles from './styles';
import Image from 'components/Images';
import Button from 'components/Buttons';
import TextInput from 'components/TextInput';
import Img from 'assets';
import In18 from 'common/constants';
import QRScan from './QRScan';
export default function page( p ) {
  const {amount, toAdd, isShowPopup  } = p.state;
  const { 
    openPopupQRSCan,
    onChangeAmount,
    onChangeToAddress,
    onPressSend,
    onPressBack,
    onReadScan
    

  } = p.func;
  const { balance} = p.props; 
  return (
    <View style={styles.container}>
      {
        !isShowPopup?(
          <>
            <View style={styles.body}>
              <View style={styles.containerBalance}>
                <Text style={[styles.textBalance, {fontWeight:'bold'}]}>Số dư :    </Text>
                <Text style={styles.textBalance} >{balance} TOMO</Text>
              </View>
              <View style={styles.containerToAddress}> 
                <View style={styles.containerInput}>
                  <Text style={styles.textTitle}>{In18.web3.toAddress}</Text>
                  <TextInput 
                    onChangeText={( text )=>onChangeToAddress( text )}
                    value={toAdd}
                    noIcon
                    style={styles.inputToAddress}
                    styleAll={styles.inputToAddressText}
                    placeholder='0x'
                  />
                </View>
                <Button 
                  isShowText
                  onPress={openPopupQRSCan}
                  icon={Img.Image.iconQR}
                  styleBtn={styles.qr}
                />
              </View>
              <View style={styles.containerToAddress}>
                <View style={styles.containerInput}>
                  <Text style={styles.textTitle}>{In18.web3.amount}</Text>
                  <TextInput 
                    onChangeText={onChangeAmount}
                    value={amount}
                    noIcon
                    style={styles.inputToAddress}
                    styleAll={styles.inputToAddressText}
                    // placeholder={0}
                    keyboardType="numeric"
                  />
                </View>
                <Text style={styles.textTitle}>ETH / USDT</Text>
              </View>
              <View  style={{marginTop:30}}>
                <Button
                  onPress={onPressSend}
                  icon={Img.Image.iconSend}
                  title={In18.web3.send} 
                  styleBtn={styles.btnSend}
                  styleText={styles.textBtnSend}
                />
       
              </View>
            </View>
          </>

        ):(
          <>
            <QRScan onReadScan={onReadScan} />
          </>
        )
      }
    </View>
  )
}
