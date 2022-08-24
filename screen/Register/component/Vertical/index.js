import { View, Text, useState } from 'react-native';
import React from 'react';
import { height, width } from 'common/styles';
import TextInputs from 'components/TextInput';
import Button from 'components/Buttons';
import In18 from 'common/constants';
import styles from './styles';

export default function index( props ) {
  const {
    onSubmitOTP, otp, onChangText, closeModal
  } = props;
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nhập mã OTP</Text>

      </View>

      <TextInputs
        value={otp}
        onChangeText={( text ) => onChangText( text )}
        keyboardType='numeric'
        noIcon
        style={styles.input}
        placeholder='Nhập mã OTP'
      >
      </TextInputs>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around' }} >
        <Button
          title={In18.TitleBtn.submit}
          onPress={onSubmitOTP}
          styleText={styles.btnSubmit}

        >

        </Button>
        <Button
          title={In18.TitleBtn.close}
          onPress={closeModal}
          styleText={styles.btnSubmit}

        >

        </Button>
      </View>

    </View>
  );
}
