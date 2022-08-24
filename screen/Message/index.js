import {
  View, Text, FlatList, TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';
import Emptydata from 'container/Loading';
import React, { useState, useEffect } from 'react';
import database from '@react-native-firebase/database';
import In18 from 'common/constants';
import { formatStringToDateTime, sendNotificationMess } from 'modals/functions';
import Image from 'components/Images';
import Img from 'assets';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import firestore from '@react-native-firebase/firestore';
import styles from './style';
import Item from './item';

const reference = database().ref( '/chats' );
const firestores = firestore().collection( 'User' );
const Index = ( props ) => {
  const {
    sdt, user, userOther, message
  } = props;
  console.log( message );
  const [listMess, setLisMess] = useState( [] );
  const [note, setNote] = useState( '' );
  useEffect( () => {
    reference
      .on( 'value', async ( snapshot ) => {
        const listTemp = [];
        await snapshot.forEach( async ( element ) => {
          if ( element.val().sdtReceive === user.sdt && element.val().sdtSend === sdt || element.val().sdtReceive === sdt && element.val().sdtSend === user.sdt ) {
            const getDate = formatStringToDateTime( parseFloat( element.val().date ) );
            const temp = {
              key: element.key,
              sdtSend: element.val().sdtSend,
              tokenSend: element.val().tokenSend,
              date: getDate,
              sdtReceive: element.val().sdtReceive,
              tokenReceive: element.val().tokenReceive,
              note: element.val().note,
              image: element.val().image
            };
            listTemp.push( temp );
          }
        } );
        await setLisMess( listTemp.reverse() );
      } );
  }, [] );
  const sentMess = async () => {
    const sdtReceive = user.sdt == userOther.sdtSend ? userOther.sdtReceive : userOther.sdtSend;
    if ( note.length > 0 ) {
      await firestores.get()
        .then( ( querySnapshot ) => {
          querySnapshot.forEach( async ( documentSnapshot ) => {
            const data = documentSnapshot.data();
            if ( data.sdt == sdtReceive ) {
              reference.push( {
                sdtSend: user.sdt,
                tokenSend: user.token,
                sdtReceive: sdt,
                tokenReceive: data.token,
                note: note,
                date: Date.now(),
                image: user.image || '',
                image2: data?.image || '',
                status: 0
              } );
              setNote( '' );
              sendNotificationMess( data.token, '1', user.sdt, note );
            }
          } );
        } );
    }
  };
  const renderItem = ( { item } ) => (
    <Item items={item} sdtUser={user.sdt}></Item>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => Actions.pop()} >
          <View style={styles.btnSubmit}>
            <Image
              url={Img.Image.iconBack2}
              style={styles.iconClose}
            ></Image>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{ alignSelf: 'center', flexDirection: 'row' }}>
            <Image http={userOther?.image ? userOther?.image : null } url={Img.Image.imgAvatar} style={styles.avatar}></Image>
            <View style={{ alignSelf: 'center' }}>
              <Text style={styles.nameCustomer}> {user.sdt == userOther?.sdtSend ? userOther?.sdtReceive : userOther?.sdtSend }</Text>
            </View>

          </View>
        </TouchableOpacity>

      </View>
      <View style={styles.body}>
        <FlatList
          renderItem={renderItem}
          keyExtractor={( item, index ) => index.toString()}
          data={listMess}
          inverted
          ListEmptyComponent={<Emptydata isOnDown/>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
        </FlatList>
      </View>
      <View style={styles.footer}>
        <TextInput
          placeholder='Nhập tin nhắn'
          style={styles.input}
          multiline
          value={note}
          onChangeText={( text ) => setNote( text )}
        ></TextInput>
        <TouchableOpacity onPress={sentMess}>
          <View style={styles.btnSubmit}>
            <Image
              url={Img.Image.iconSend}
              style={styles.iconSend}
            ></Image>
          </View>
        </TouchableOpacity>
      </View>

    </View>
  );
};
const mapStateToProps = ( state ) => ( {
  user: state.user,
  listWorker: state.listWorker,
  listQualityWorker: state.listQualityWorker,
  message: state.message
} );
export default connect( mapStateToProps )( Index );
