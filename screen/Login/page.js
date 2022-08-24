// import React from 'react';
// import {View, StyleSheet, Image, Text, ScrollView, Alert} from 'react-native';
// import Button from 'components/Button';
// import {Router, Actions, Scene} from 'react-native-router-flux';
// import {push} from 'react-native-simple-store';
// import database from '@react-native-firebase/database';
// import {width} from 'common/styles';
// import messaging from '@react-native-firebase/messaging';

// import Img from 'assets';
// import TextInput from 'components/TextInput'; 
// import styles from './style';
// import In18 from '../../common/constants';
// // require( 'crypto' );
// // const Wallet = require( 'ethereumjs-wallet' );

// const page = p => {
//   const {txtSDT, txtPass} = p.state;

//   const {onPressLogin, onChangePassword, onChangeSDT, openPopup} = p.func;
//   return (
//     <View style={styles.container}>
//       <ScrollView>
//         <View style={{alignItems: 'center', justifyContent: 'center'}}>
//           <View style={styles.containerLogo}>
//             <Image style={styles.imgLoGo} source={Img.Image.worker} />
//           </View>
//           <View style={styles.containerContext}>
//             <TextInput
//               value={txtSDT}
//               placeholder={In18.User.numberPhone}
//               onChangeText={onChangeSDT}
//               keyboardType="numeric"></TextInput>

//             <TextInput
//               value={txtPass}
//               placeholder={In18.User.password}
//               onChangeText={onChangePassword}
//               icon={Img.Image.iconPass}
//               password={true}></TextInput>
//           </View>
//           <View style={styles.conatinerRegitster}>
//             <Text>{In18.NormalTitle.questionAccount}</Text>
//             <Button
//               title={In18.TitleBtn.register}
//               onPress={() => Actions.register()}
//               styleText={styles.textRegister}
//               styleBtn={styles.btnRegister}></Button>
//           </View>
//           <Button title={In18.TitleBtn.login} onPress={onPressLogin}></Button>

//         </View>
//       </ScrollView>
//     </View>
//   );
// };
// export default page;
// 
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
// import { Icon } from 'react-native-elements';
import {Colors} from 'common/Colors';
import {width, height} from 'common/styles';
import Img from 'assets';
import  Image   from 'components/Images';
import In18 from '../../common/constants';
import Button from 'components/Buttons';
import {Router, Actions, Scene} from 'react-native-router-flux';
import styless from './style';


export default function LoginScreen1( p ) {
  const {txtSDT, txtPass} = p.state;

  const {onPressLogin, onChangePassword, onChangeSDT, openPopup} = p.func;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}> 
        <View style={styles.bigCircle}> 
        </View>
        <View style={styles.smallCircle}> 
        </View> 
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
          
            <View style={styles.logoBox}>
              <Image url={Img.Image.doing} style={styles.iconLogin} >

              </Image> 
            </View>
            <Text style={styles.loginTitleText}>{In18.TitleBtn.login}</Text>
            <View style={styles.hr}></View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>{In18.User.numberPhone}</Text>
              <TextInput
                value={txtSDT} 
                onChangeText={onChangeSDT}
                style={styles.input}
                autoCapitalize={false}
                keyboardType='email-address'
                textContentType='emailAddress'
              />
            </View>
            <View style={styles.inputBox}>
              <Text style={styles.inputLabel}>{In18.User.password}</Text>
              <TextInput
                value={txtPass}
                onChangeText={onChangePassword}
                style={styles.input}
                autoCapitalize={false}
                secureTextEntry={true}
                textContentType='password'
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={onPressLogin}>
              <Text style={styles.loginButtonText}>{In18.TitleBtn.login}</Text>
            </TouchableOpacity>
            <View style={styless.conatinerRegitster}>
              <Text>{In18.NormalTitle.questionAccount}</Text>
              <Button
                title={In18.TitleBtn.register}
                onPress={() => Actions.register()}
                styleText={styless.textRegister}
                styleBtn={styless.btnRegister}></Button>
            </View> 
            
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    position: 'relative'
  },
  bigCircle: {
    width: height( 50 ),
    height: height( 50 ),
    backgroundColor: Colors.ORANGE2,
    borderRadius: 1000,
    position: 'absolute',
    right: width( 40 ),
    top: 50
  },
  smallCircle: {
    width: width( 40 ),
    height: Dimensions.get( 'window' ).height * 0.4,
    backgroundColor: Colors.ORANGE,
    borderRadius: 1000,
    position: 'absolute',
    bottom: Dimensions.get( 'window' ).width * -0.2,
    right: Dimensions.get( 'window' ).width * -0.3
  },
  centerizedView: {
    width: width( 100 ),
    top: '15%'
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  logoBox: {
    width: 100,
    height: 100,
    backgroundColor: Colors.YELLOW,
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2
  },
  loginTitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10
  },
  hr: {
    width: '100%',
    height: 0.5,
    backgroundColor: Colors.YELLOW,
    marginTop: 6
  },
  inputBox: {
    marginTop: 10
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#dfe4ea',
    borderRadius: 4,
    paddingHorizontal: 10
  },
  loginButton: {
    backgroundColor: Colors.YELLOW,
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 4
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16
  },
  iconLogin:{
    height: height( 11 ),
    width : height( 11 )
  }
} );
