import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import store from 'react-native-simple-store';
import database from '@react-native-firebase/database';

class Users {
  static user = null

  id = '';

  sdt = '';

  name = '';

  pass = '';

  image = '';

  address = '';

  luotXem = 0;

  checkWorker = 0;

  x = 0;

  y = 0;

  addressNow = '';

  static getInStance() {
    if ( !this.user ) {
      this.user = new Users();
    }
    return this.user;
  }

  async getReduxLocal() {
    if ( await store.get( 'user' ) ) {
      await store.get( 'user' ).then( ( user ) => { this.user = user; } );
    }
  }

  Login( sdt, pass ) {
    const firebase = database().ref( '/User/' );
    firebase.on( 'value', ( snapshot ) => {
      snapshot.forEach( ( item ) => {
        if ( item.val().sdt === sdt && item.val().pass === pass ) {
          this.setID( item.key ),
          this.setPass( item.val().pass ),
          this.setSDT( item.val().sdt ),
          this.setName( item.val().name ),
          this.setLuotXem( item.val().luotXem ),
          this.setImg( item.val().img ),
          this.setAddress( item.val().address ),
          this.setX( item.val().x ),
          this.setY( item.val().y );
        }
      } );
    } );
  }

  setReduxLocal = async ( user ) => {
    if ( await store.get( 'user' ) ) {
      console.log( '==setReduxLocal=======' );
      store.update( 'user', {
        user,
      } );
    } else {
      store.push( 'user', user );
    }
  }

  async regitster( name = '', std = '', pass = '', address = '', checkWorker = 0 ) {
    const firebase = await database().ref( '/User/' );
    const i = 0;
    await firebase.on( 'value', ( snapshot ) => {
      console.log( 'User data: ', snapshot.val() );
    } );
    // await firebase.push( {
    //   name,
    //   sdt: std,
    //   pass,
    //   address,
    //   checkWorker,
    //   x: '0',
    //   y: '0',
    //   luotXem: '0',
    //   img: '',
    //   luotGoi: '0',
    // } );
  }

  // async Regitster( name, SDT, pass, address, checkWorker ) {
  //   if ( address == null ) { address = 'Việt nam'; }
  //   const check = checkWorker == true ? '1' : '0';
  //   const firestores = firestore().collection( 'User' );
  //   let i = 0;
  //   await firestores.get()
  //     .then( ( querySnapshot ) => {
  //       querySnapshot.forEach( ( documentSnapshot ) => {
  //         const datas = documentSnapshot.data();
  //         if ( datas.sdt === SDT ) {
  //           // eslint-disable-next-line no-plusplus
  //           i++;
  //           Alert.alert( 'Số điện thoại đã đăng ký !' );
  //         }
  //       } );
  //     } );
  //   if ( i === '0' ) {
  //     await firestores.add( {
  //       name,
  //       sdt: SDT,
  //       pass,
  //       image: '',
  //       x: '-1',
  //       y: '-1',
  //       checkWorker: check,
  //       luotXem: '0',
  //       address,
  //     } )
  //       .then( () => {
  //         Alert.alert( 'Đăng ký thành công' );
  //       } );
  //   }
  // }
  static async getAllListWorker( ) {
    const list = [];
    const firestores = firestore().collection( 'User' );
    await firestores.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( ( documentSnapshot ) => {
          const datas = documentSnapshot.data();
          if ( datas.checkWorker === '1' ) {
            const temp = {
              id: documentSnapshot.id,
              name: datas.name,
              sdt: datas.sdt,
              luotXem: datas.luotXem,
              x: datas.x,
              y: datas.y,
              address: datas.address,
              image: datas.image,
              pass: datas.pass,
              checkWorker: datas.checkWorker,
            };
            list.push( temp );
          }
          return list;
        } );
      } );
    return list;
  }

  static async Read( ) {
    const firestores = firestore().collection( 'User' );
    let i = 0;
    await firestores.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( ( documentSnapshot ) => {
          const datas = documentSnapshot.data();
          if ( datas.sdt === '0392225405s' ) {
            i = 10;
          }
          // console.log( '====================================' );
          // console.log( { datas } );
          // console.log( '====================================' );
        } );
        console.log( { i } );
        return i;
      } );
    console.log( '====================================' );
    console.log( { i } );
    return i;
  }

  async write() {
    // await console.log( '====================================' );
    // await console.log( 'đag thêmzxczx' );
    // await console.log( '====================================' );
    const firebase = await database().ref( '/User/' );
    await firebase.push( {
      sdt: '0123456789 ',
      pass: '123',
      address: 'Bình Dương',
      img: '',
      luotXem: '10',
      x: '0',
      y: '0',
      checkWorker: '1',
      luotGoi: '30',
    } ).then( ( data ) => {

    } ).catch( ( error ) => {

    } );
  }

  static getListWorkers() {
    const list = [];
    const firebase = database().ref( '/User/' );
    firebase.on( 'value', ( snapshot ) => {
      snapshot.forEach( ( item ) => {
        if ( item.val().checkWorker === '1' ) {
          const temp = {
            id: item.key,
            sdt: item.val().sdt,
            name: item.val().name,
            x: item.val().x,
            y: item.val().y,
            address: item.val().address,
            luotXem: item.val().luotXem,
            luotGoi: item.val().luotGoi,
            pass: item.val().pass,
            img: item.val().img,
            checkWorker: item.val().checkWorker,
          };
          list.push( temp );
          console.log( '=======list.push( item )======================' );
          console.log( list );
          console.log( '====================================' );
        }
      } );
    } );

    return list;
  }

  getListWorker() {
    const list = [];
    const firebase = database().ref( '/User/' );
    firebase.on( 'value', ( snapshot ) => {
      snapshot.forEach( ( item ) => {
        if ( item.val().checkWorker === '1' ) {
          const temp = {
            id: item.key,
            sdt: item.val().sdt,
            name: item.val().name,
            x: item.val().x,
            y: item.val().y,
            address: item.val().address,
            luotXem: item.val().luotXem,
            luotGoi: item.val().luotGoi,
            pass: item.val().pass,
            img: item.val().img,
            checkWorker: item.val().checkWorker,
          };
          list.push( temp );
          console.log( '=======list.push( item )======================' );
          console.log( list );
          console.log( '====================================' );
        }
      } );
    } );

    return list;
  }

  setID( id ) {
    this.id = id;
  }

  getID() { return this.id; }

  setCheckWorker( checkWorker ) {
    this.checkWorker = checkWorker;
  }

  getCheckWorker() { return this.checkWorker; }

  async setName( name ) {
    this.name = name;
  }

  getName() { return this.name; }

  setSDT( sdt ) {
    this.sdt = sdt;
  }

  getSDT() { return this.sdt; }

  setPass( pass ) {
    this.pass = pass;
  }

  getPass() { return this.pass; }

  setImg( img ) {
    this.image = img;
  }

  getImg() { return this.image; }

  setAddress( address ) {
    this.address = address;
  }

  getAddress() {
    return this.address;
  }

  setAddressNow( addressNow ) {
    this.addressNow = addressNow;
  }

  getAddressNow() { return this.addressNow; }

  setX( x ) {
    this.x = x;
  }

  getX() { return this.x; }

  setY( y ) {
    this.y = y;
  }

  getY() { return this.y; }

  setLuotXem( lx ) {
    this.luotXem = lx;
  }

  getLuotXem() { return this.luotXem; }
}
export default Users;
