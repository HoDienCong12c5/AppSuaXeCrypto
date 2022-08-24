import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import React from 'react';
import { height, width } from 'common/styles';
import {Colors} from 'common/Colors';
import Img from 'assets';
import Image from 'components/Images';
import Button from 'components/Buttons';
import In18n from 'common/constants';

const ChangOptionCall = ( props ) => {
  const {
    changOptionCall
  } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => changOptionCall( 0 )}>
        <View style={styles.containerButton}>
          <Image url={Img.Image.iconCallWifi} style={styles.styleImage} />
          <Text style={styles.textButton}>{In18n.TitleBtn.callWifi}</Text>
        </View>

      </TouchableOpacity>
      <TouchableOpacity style={{ padding: 10 }} onPress={() => changOptionCall( 1 )}>
        <View style={styles.containerButton}>
          <Image url={Img.Image.iconCallLive} style={styles.styleImage} />
          <Text style={styles.textButton}>{In18n.TitleBtn.callLive}</Text>
        </View>
      </TouchableOpacity>

    </View>
  );
};
const styles = StyleSheet.create( {
  container: {
  //  flex: 1,
    width: width( 80 ),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center'
  },
  containerButton: {
    width: width( 30 ),
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    padding: 15,
    borderColor: Colors.YELLOW

  },
  textButton: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 12
  },
  styleImage: {
    height: height( 13 ),
    width: height( 13 )
  }
} );
export default ChangOptionCall;
