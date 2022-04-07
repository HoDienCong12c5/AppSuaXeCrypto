import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Image from 'components/Image';
import Img from 'assets/index';
import CheckBox from '@react-native-community/checkbox';
import In18 from 'common/constants';
import styles from './style';

const Index = ( props ) => {
  const {
    items, event, setUser
  } = props;
  let isNoteStatus = In18.StatusMess.noSeen;
  let isType = 0;
  if ( items.status == 0 ) {
    if ( items.sdtReceive == setUser ) {
      isNoteStatus = In18.StatusMess.new;
      console.log( In18.StatusMess.new );
      isType = 1;
    }
  }
  if ( items.status == 1 ) {
    if ( items.sdtSend == setUser ) {
      isNoteStatus = In18.StatusMess.seen;
      isType = 2;
    }
  }
  return (
    <View>
      <TouchableOpacity onPress={event}>
        <View style={[styles.container, styles[`container${items.status === 1 ? 'Read' : 'UnRead'}`]]}>
          <Image http={items.image ? items.image : null } url={Img.Image.imgAvatar} style={styles.avatar}></Image>
          <View style={styles.body}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.name}>{items.sdtSend == setUser ? items.sdtReceive : items.sdtSend }</Text>
              <Text style={styles.date}>{items.date}</Text>
            </View>
            <View style={styles.containerNote}>
              <Text style={styles.content}>{items.note}</Text>
              <Text style={[styles.status, styles[`status${isType}`]]}>{isNoteStatus}</Text>
            </View>

          </View>

        </View>
      </TouchableOpacity>
    </View>

  );
};
export default Index;
