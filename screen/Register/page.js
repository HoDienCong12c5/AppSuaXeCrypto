import React from 'react';
import {
  View, StyleSheet, Text, ScrollView
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox';
import In18 from 'common/constants';
import TextInput from 'components/TextInput/index';
import Img from 'assets/index';
import Image from 'components/Image/index';
import styles from './style';
import Button from '../../components/Button/index';
import Userss from '../../modals/Users';

const page = ( p ) => {
  const {
    txtSDT,
    txtPass,
    txtPass2,
    txtAddress,
    isWorker,
    txtName
  } = p.state;
  const {
    onPressRegister,
    onChangePassword,
    onChangeSDT,
    onChangePassword2,
    onChangeName,
    onChangeAddress,
    setisCheckWorker

  } = p.func;
  const users = Userss.getInStance();
  return (
    <View style={styles.container} >
      <ScrollView >
        <View style={{
          alignItems: 'center', paddingHorizontal: 30, justifyContent: 'center', paddingVertical: 10
        }}>
          < View style={styles.containerLogo}>

            <Image url={Img.Image.imageRegister}style={styles.imgRegister} />
          </View>
          <View style={styles.containerContext}>
            <TextInput
              icon={Img.Image.icCall}
              value={txtSDT}
              placeholder={In18.User.numberPhone}
              onChangeText={onChangeSDT}
              keyboardType='numeric'
            >
            </TextInput>

            <TextInput
              icon={Img.Image.iconUserName}
              value={txtName}
              placeholder={In18.User.name}
              onChangeText={onChangeName}
            >
            </TextInput>

            <TextInput
              icon={Img.Image.iconPass}
              value={txtPass}
              placeholder={In18.User.password}
              onChangeText={onChangePassword}
              password
            >
            </TextInput>

            <TextInput
              icon={Img.Image.iconPass}
              value={txtPass2}
              placeholder={In18.User.password2}
              onChangeText={onChangePassword2}
            >
            </TextInput>
            {
              isWorker ? (
                <TextInput
                  icon={Img.Image.iconAddress}
                  value={txtAddress}
                  placeholder={In18.User.address}
                  onChangeText={onChangeAddress}
                >
                </TextInput>
              ) : null
            }

          </View>
          <View style={styles.checkboxContainer}>
            <Text style={styles.label}>{In18.NormalTitle.questionWorker} </Text>
            <CheckBox
              onValueChange={() => setisCheckWorker( isWorker )}

              value={isWorker}
            />
          </View>

          <Button
            title={In18.TitleBtn.register}
            onPress={onPressRegister}
          >
          </Button>
          <View style={styles.conatinerRegitster}>
            <Text>{In18.NormalTitle.questionAccount}</Text>
            <Button
              title={In18.TitleBtn.login}
              onPress={() => Actions.login()}
              styleText={styles.textRegister}
              styleBtn={styles.btnRegister}
            ></Button>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default page;
