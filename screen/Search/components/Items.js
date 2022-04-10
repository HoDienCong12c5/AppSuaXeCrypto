import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Image from 'components/Image';
import Img from 'assets/index';
import In18 from 'common/constants';
import styles from './styles';

export default function Items( p ) {
  const { item, onPressInfoWorker, currentIndex } = p;
  const url = item.image ? item.image : Img.Image.imgAvatar;
  return (
    <TouchableOpacity onPress={onPressInfoWorker}>
      <View style={styles.containerWorkerDetail}>
        <Image url={url} http={item.image} style={styles.imgAvatarWorker} />

        <View style={styles.contentDetailDistance}>
          <Text style={[styles.textAll, styles.titleContentWorker]}>{item.name} </Text>
          <Text style={[styles.textAll, styles.numberPhoneDetailWorker]}>{item.sdt}</Text>
          <Text style={[styles.textAll, styles.addressContentWorker]}>ĐC: {item.address}</Text>

          {
            currentIndex === 1 ? (
              <Text style={[styles.textAll, styles.distanceContentWorker]}>{item.distance} km </Text>

            ) : (
              <Text style={[styles.textAll, styles.distanceContentWorker]}>{In18.User.numberView}: {item.luotXem} </Text>

            )
          }

        </View>
        <View style={styles.containerFunction}>
          <Image url={Img.Image.icCall} style={styles.image} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
