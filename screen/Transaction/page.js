import React from 'react';
import { View, Text, Alert , TouchableOpacity} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux'; 
import styles from './styles';
import Image from 'components/Image/index';
import Button from 'components/Button';
import TextInput from 'components/TextInput';
import Img from 'assets/index';
import In18 from 'common/constants';
export default function page( p ) {
  const {amount, toAdd  } = p.state;
  const { 
    openPopup,
    onChangeAmount,
    onChangeToAddress,
    onPressSend,
    onPressBack
    

  } = p.func;
  
  return (
    <View style={styles.container}>
      <View style={styles.body}>
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
            onPress={openPopup}
            icon={Img.Image.iconQR}
            styleBtn={styles.qr}
          />
        </View>
        <View style={styles.containerToAddress}>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>{In18.web3.amount}</Text>
            <TextInput 
              onChangeText={( text )=>onChangeAmount( text )}
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
      </View>
      <TouchableOpacity onPress={()=>Actions.pop()} >
        <Image url={Img.Image.icBack} style={styles.iconBack} /> 
      </TouchableOpacity>
      {/* <View style={styles.containerHeader}>
        <TouchableOpacity onPress={Actions.pop()} >
          <Image url={Img.Image.icBack} style={styles.iconBack} /> 
        </TouchableOpacity>
        <View style={styles.midHeader}>
          <Text style={styles.textHeader}>{In18.web3.newTransaction}</Text>
          <Text style={styles.textAmountHeader}>Bạn có : {amount} ETH</Text>
        </View>
        <View></View>
      </View>
      <View style={styles.body}>
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
            onPress={openPopup}
            icon={Img.Image.iconQR}
            styleBtn={styles.qr}
          />
        </View>
        <View style={styles.containerToAddress}>
          <View style={styles.containerInput}>
            <Text style={styles.textTitle}>{In18.web3.amount}</Text>
            <TextInput 
              onChangeText={( text )=>onChangeAmount( text )}
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
        <View>
          
        </View>
      </View> */}
      
    </View>
  )
}
