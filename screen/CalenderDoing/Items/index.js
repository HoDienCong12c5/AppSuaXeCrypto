import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import In18 from 'common/constants';
import Image from 'components/Image/index';
import Img from 'assets/index';
import Colors from 'common/Colors';
import { height, width } from 'common/styles';
import styles from './styles';

export default function index( props ) {
  const {
    item, submit, isWorker, sdtUser, seenInfor
  } = props;
  const { date , dateEnd} = item;
  const person = sdtUser == item.sdtCustomer ? 'Thợ' : 'Khách';
  const sdt = sdtUser == item.sdtCustomer ? item.sdtWorker : item.sdtCustomer;
  console.log( isWorker );
  return (
    <View style={styles.containerItem}>
      <View style={{ width: width( 68 ) }}>
        <TouchableOpacity onPress={seenInfor}>
          <View style={styles.containerItemDetail}>
            <Image url={Img.Image.icCall} style={styles.icon }></Image>
            <Text style={{ fontSize: 15, color: Colors.BLUE1 }}>{person} : {sdt} </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.containerItemDetail}>
          <Image url={Img.Image.iconCalender2} style={styles.icon } ></Image>
          <Text style={styles.dateAndStatus}> {date} </Text>
        </View>
        <View style={styles.containerItemDetail}>
          <Image url={Img.Image.iconDateEnd} style={styles.icon } ></Image>
          <Text style={[styles.dateAndStatus, {fontWeight:'bold'}]}> {dateEnd} </Text>
        </View>
        <View style={styles.containerItemDetail}>
          <Image url={Img.Image.iconAddress2} style={styles.icon }></Image>
          <Text legacyImplementation style={styles.dateAndStatus}> {item.address} </Text>
        </View>
        <View style={styles.containerItemDetail}>
          <Image url={Img.Image.iconNote2} style={styles.icon }></Image>
          <Text style={styles.dateAndStatus}> {item.note} </Text>
        </View>
        <View style={styles.containerItemDetail}>
        </View>
      </View>
      <View style={styles.right}>
        <TouchableOpacity onPress={isWorker ? submit : null}>
          <View>
            <Image
              style={styles.doing}
              url={Img.Image.iconQuestion}
            />
            <Text style={{ textAlign: 'center', color: Colors.BLUE1 }}> Hoàn thành</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
