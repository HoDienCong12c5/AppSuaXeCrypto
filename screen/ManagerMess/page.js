import React, { useState, useEffect, useRef } from 'react';
import {
  View

} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
// import Modal from 'react-native-modal';
import { IconButton } from 'react-native-paper';
import TextInput from 'components/TextInput/index';
import { connect } from 'react-redux';
import { height, width } from 'common/styles';
import Img from 'assets/index';
import In18 from 'common/constants';
import { formatStringToDateTime } from 'modals/function';
import database from '@react-native-firebase/database';
import { FlatList } from 'react-native-gesture-handler';
import { log } from 'react-native-reanimated';
import Emptydata from 'container/Loading/index';
import { load } from 'npm';
import styles from './style';
import Item from './component/item';

const referenceChat = database().ref( '/chats' );

const page = ( p ) => {
  const { user, message, setMessage } = p.props;
  const { onSearch, updateNotiMess } = p.func;
  const [listMess, setLisMess] = useState( [] );
  const getDataMess = () => {
    const listTemp = [];
    referenceChat.once( 'value' )
      .then( ( snapshot ) => {
        snapshot.forEach( ( element ) => {
          if ( element.val().sdtReceive == user.sdt || element.val().sdtSend === user.sdt ) {
            if ( listTemp.length < 1 ) {
              const getDate = formatStringToDateTime( parseFloat( element.val().date ) );
              const temp = {
                key: element.key,
                sdtSend: element.val().sdtSend,
                tokenSend: element.val().tokenSend,
                date: getDate,
                sdtReceive: element.val().sdtReceive,
                tokenReceive: element.val().tokenReceive,
                note: element.val().note,
                status: element.val().status,
                image: element.val().image
              };
              listTemp.push( temp );
            } else {
              let isNull = true;
              for ( let i = 0; i < listTemp.length; i++ ) {
                if ( listTemp[i].sdtReceive == element.val().sdtReceive && user.sdt == element.val().sdtSend ) {
                  listTemp[i].note = element.val().note;
                  listTemp[i].sdtSend = user.sdt;
                  listTemp[i].tokenSend = element.val().tokenSend;
                  listTemp[i].sdtReceive = element.val().sdtReceive;
                  listTemp[i].tokenReceive = element.val().tokenReceive;
                  listTemp[i].status = element.val().status;
                  listTemp[i].key = element.key;
                  isNull = false;
                  console.log( 'upodate1' );
                } else if ( listTemp[i].sdtReceive == element.val().sdtSend && user.sdt == element.val().sdtReceive ) {
                  listTemp[i].note = element.val().note;
                  listTemp[i].sdtSend = element.val().sdtSend;
                  listTemp[i].tokenSend = element.val().tokenSend;
                  listTemp[i].sdtReceive = user.sdt;
                  listTemp[i].tokenReceive = element.val().tokenReceive;
                  listTemp[i].status = element.val().status;
                  listTemp[i].key = element.key;
                  isNull = false;

                  console.log( 'upodate2' );
                } else if ( listTemp[i].sdtSend == element.val().sdtReceive && user.sdt == element.val().sdtSend ) {
                  listTemp[i].note = element.val().note;
                  listTemp[i].sdtSend = element.val().sdtSend;
                  listTemp[i].tokenSend = element.val().tokenSend;
                  listTemp[i].sdtReceive = element.val().sdtReceive;
                  listTemp[i].tokenReceive = element.val().tokenReceive;
                  listTemp[i].status = element.val().status;
                  listTemp[i].key = element.key;
                  isNull = false;
                  console.log( 'upodate3' );
                } else if ( listTemp[i].sdtSend == element.val().sdtSend && user.sdt == element.val().sdtReceive ) {
                  listTemp[i].note = element.val().note;
                  listTemp[i].sdtSend = element.val().sdtSend;
                  listTemp[i].tokenSend = element.val().tokenSend;
                  listTemp[i].sdtReceive = user.sdt;
                  listTemp[i].tokenReceive = element.val().sdtReceive;
                  listTemp[i].status = element.val().status;
                  listTemp[i].key = element.key;
                  isNull = false;
                  console.log( 'upodate4' );
                }
              }
              if ( isNull ) {
                const getDate = formatStringToDateTime( parseFloat( element.val().date ) );
                const temp = {
                  key: element.key,
                  sdtSend: element.val().sdtSend,
                  tokenSend: element.val().tokenSend,
                  date: getDate,
                  sdtReceive: element.val().sdtReceive,
                  tokenReceive: element.val().tokenReceive,
                  note: element.val().note,
                  status: element.val().status,
                  image: element.val().image
                };
                listTemp.push( temp );
              }
            }
          }
        } );
        setLisMess( listTemp );
      } );
  };
  useEffect( () => {
    // addNew();
    getDataMess();
  }, [] );
  const searchNumberPhone = ( number ) => {
    onSearch( number );
  };
  const actionPageNext = ( item ) => {
    const sdt = user.sdt == item.sdtReceive ? item.sdtSend : item.sdtReceive;
    const userOther = item;
    if ( item.sdtReceive == user.sdt ) {
      updateNotiMess();
      updateStatusMess( item.key, 1 );
    }
    // iff(us)
    if ( message > 0 ) { setMessage( message - 1 ); }
    Actions.messPage( { sdt, userOther } );
  };
  const updateStatusMess = ( id, status ) => {
    database()
      .ref( `/chats/${id}` )
      .update( {
        status: status
      } )
      .then( () => console.log( 'Data updated.' ) );
  };
  const renderItem = ( { item } ) => (
    <View>
      <Item items={item} event ={() => actionPageNext( item )} setUser={user.sdt}></Item>
    </View>
  );

  const flatList = useRef( null );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder={In18.NormalTitle.searchNumberPhone}
          icon={Img.Image.icSearch}
          onChangeText={( text ) => searchNumberPhone( text )}
        >
        </TextInput>

      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={listMess}
          renderItem={renderItem}
          ref= {flatList}
          // inverted
          keyExtractor={( item, index ) => index}
          ListEmptyComponent={<Emptydata />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />

      </View>

    </View>
  );
};
const mapStateToProps = ( state ) => ( {
  user: state.user
} );
export default connect( mapStateToProps )( page );
