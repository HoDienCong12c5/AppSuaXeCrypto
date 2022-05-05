import React from 'react';
import {
  View, StyleSheet, Text, ScrollView
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox';
 
import In18 from 'common/constants';
import TextInput from 'components/TextInput/index';
import { height, width } from 'common/styles';
import styles from './style';
import Img from 'assets/index';
import Button from 'components/Button/index';
import QRCode from 'react-native-qrcode-svg';
import Image from 'components/Image/index';  
import { TouchableOpacity } from 'react-native-gesture-handler'; 
const page = ( p ) => {
  const {
    onPressCreate,
    onPressQRFull,
    onNexTransaction,
    onChangeToken
  } = p.func;
  const { walletUser  } = p.state; 

  const {token, balance, history} = p.props;
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  const toAdd = '0x5270b3da7df9b03ba997d065575bb77ffdd3f39a';
  return (
    <View style={styles.container} >
      <View style={styles.containerHeader}>
        <View style={styles.containerPlatform}>
          <View style={{flex:7}}>
            <Text style={styles.supportChain}>Nền tảng </Text>
            <View style={[styles.containerSupport,{borderBottomWidth:0}]}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.ethereum}>Ethereum : </Text>
                <Image url={Img.Image.iconCoin0} style={styles.iconEthereum}/>
              </View>
              <CheckBox 
                onValueChange={() => onChangeToken( )}
                value={token}>
              </CheckBox>
            </View>
            <View style={[styles.containerSupport,{borderBottomWidth:0}]}>
              <View style={{flexDirection:'row'}}>
                <Text style={styles.ethereum}>Tomo: </Text>
                <Image url={Img.Image.iconCoin1} style={styles.iconEthereum}/>
              </View>
              <CheckBox 
                onValueChange={() => onChangeToken( )}
                value={!token}>
              </CheckBox>
            </View>
            <View style={styles.containerSupport}>
              <Text style={styles.amount}>{In18.web3.amount}: {balance} {token ?'ETH' :' TOMO'} </Text>
            </View>
          </View>
          <View style={styles.containerNewTransaction}>
           
          </View>
        </View>
        
        <View style={styles.containerAddress}>
          <View  style={{flex: 7.5}}>
            <Text style={styles.address}>Địa chỉ ví </Text>
            <View style={{ flexDirection:'row', alignItems:'center', display:'flex'}}>
              <View >
                <Text style={styles.textHeader}>{walletUser ||'Chưa có ->' } </Text>

              </View>
              {
                !walletUser ? (
                  <Button 
                    onPress={onPressCreate}
                    title='Tạo mới ví' 
                    style={styles.btnNewAddress}  
                    styleBtn={styles.btnNewAddress} 
                    styleText={styles.textBtnNewAddress} 
                  />
                ):null
              }
            </View>
          </View>
          <View style={{flex:2.5, alignItems:'flex-end'}}>
            <TouchableOpacity onPress={onPressQRFull}>
              <QRCode
                value={toAdd}
                logo={{uri: base64Logo}}
                size={height( 8 )}
                logoBackgroundColor='transparent'
              />

            </TouchableOpacity>
          
          </View>
         
        </View>
       
      </View>
      <View style={styles.containerHistory}>
        <View  style={styles.containerHeaderHistory}>
          <Text style={styles.supportChain}>Lịch sử giao dịch </Text>
          <Button 
            onPress={()=>onNexTransaction()}
            title={In18.web3.newTransaction}
            styleBtn={[styles.btnNewTransaction]}
          /> 

        </View>

       
      </View>
    </View>
  );
};
export default page;
