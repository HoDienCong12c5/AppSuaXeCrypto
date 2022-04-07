import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { height, width } from 'common/styles';
import Image from 'components/Image';
import Img from 'assets/index';
import Button from 'components/Button';
import Colors from 'common/Colors';

export default function index( props ) {
  const {
    fucClose, title, sdt, note, name
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {/* <View style={styles.containerContent}>
        <Text style={[styles.textTitle, { fontSize: 16 }]}>Người gửi : </Text>
        <Text style={[styles.name, { fontSize: 16 }]}>{name}</Text>
      </View> */}
      <View style={styles.containerContent}>
        <Text style={[styles.textTitle, { fontSize: 16 }]}>SDT : </Text>
        <Text style={[styles.sdt, { fontSize: 16 }]}>{sdt}</Text>
      </View>
      <View style={styles.containerContent}>
        <Text style={[styles.text, { fontSize: 16 }]}> Nội dung : </Text>
        <Text style={[styles.note, { fontSize: 16 }]}>{note}</Text>
      </View>
      <Button title='Thoát' onPress={fucClose} styleBtn={styles.styleBtn}/>
    </View>
  );
}
const styles = StyleSheet.create( {
  container: {
    padding: 20,
    justifyContent: 'center',
    width: width( 80 )
  },
  containerButton: {
    alignSelf: 'flex-end'
  },
  containerContent: {
    flexDirection: 'row',
    marginBottom: 10
  },
  title: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  name: {
    color: Colors.YELLOW
  },
  styleBtn: {
    width: width( 60 ),
    marginTop: 10
  }
} );
