import { Alert } from 'react-native';
import store from 'react-native-simple-store';
import firestore from '@react-native-firebase/firestore';
import In18 from 'common/constants';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { isBuffer } from '@walletconnect/utils';

const firestores = firestore().collection( 'User' );
const firestoresBill = firestore().collection( 'Build' );
const firestoreCall = firestore().collection( 'Call' );
const referenceUser = database().ref( '/User' );
export const checkStore = async ( key, data ) => {
  if ( store.get( key ) ) {
    await store.delete( key );
    await store.push( key, data );
  } else {
    await store.push( key, data );
  }
};
export const setStoreLocal = async ( user ) => {
  await store.delete( 'user' );
  await store.push( 'user', user );
};
export const getStoreLocal = async ( key ) => {
  return new Promise( async ( resolve, reject ) => {
    store.get( key ).then( ( res ) => { 
      resolve( res[0] ||null );
      reject( null )
    } );
  } ) 
};
export const setStoreLocalDetails = async ( type, data ) => {
  const datas = await getStoreLocal( 'user' );
  const user = datas[0];
  if ( type === 1 ) {
    user.name = data;
  }
  if ( type === 2 ) {
    user.sdt = data;
  }
  if ( type === 3 ) {
    user.pass = data;
  }
  if ( type === 4 ) {
    user.address = data;
  }
  if ( type === 5 ) {
    user.x = data;
  }
  if ( type === 6 ) {
    user.y = data;
  }
  if ( type === 7 ) {
    user.image = data;
  }
  if ( type === 9 ) {
    user.checkWorker = !user.checkWorker;
  }
  await checkStore( 'user', user );
};
export const updatePriavteKey = async ( idUser, privateKey ) => {
  return new Promise( async ( resolve, reject ) => {
    await firestores.doc( idUser )
      .update( {
        privateKey: privateKey
      } )
      .then( () => {
        Alert.alert( In18.Notification.successMessage );
      } ).catch( ( err ) => console.log( { err } ) );
    resolve( true );
  } )
}
export const Register = async ( _sdt, _name, _address, _checkWorker = 0, _pass, _token, x = '0', y = '0' ) => {
  const users = {
    name: _name,
    sdt: _sdt,
    address: _address,
    checkWorker: `${_checkWorker}`,
    x: x,
    y: y,
    image: '',
    pass: _pass,
    luotXem: '0',
    token: _token,
    privateKey:'',
    addressWallet:''
  };
  await firestores
    .add( {
      name: _name,
      sdt: _sdt,
      address: _address,
      checkWorker: _checkWorker,
      x: x,
      y: y,
      image: '',
      pass: _pass,
      luotXem: '0',
      token: _token,
      privateKey:'',
      addressWallet:''
    } )
    .then( async ( ) => {
      setStoreLocal( users );
      Alert.alert( '????ng k?? th??nh c??ng' );
      referenceUser.push( {
        sdt: _sdt
      } )
        .then( () => console.log( 'resgiter realtime data' ) );
      await auth().verifyPhoneNumber( _sdt );
    } );
};
export const getDistance = ( xUser = '0', yUser = '0', xWoker, yWoker ) => {
  const x1 = parseFloat( xUser );
  const x2 = parseFloat( xWoker );
  const y1 = parseFloat( yUser );
  const y2 = parseFloat( yWoker );

  const reslt = ( ( Math.sqrt( ( x1 - x2 ) ** 2 + ( y1 - y2 ) ** 2 ) ) * 100 ).toFixed( 5 );

  return reslt;
};
export const SaveProfile = async ( idUser, type, text ) => {
  // eslint-disable-next-line no-shadow
  const getNameType = ( type, text ) => {
    if ( type === 1 ) {
      return { name: text };
    }
    if ( type === 2 ) {
      return { sdt: text };
    }
    if ( type === 3 ) {
      return { pass: text };
    }
    if ( type === 4 ) {
      return { address: text };
    }
    if ( type === 5 ) {
      return { x: text };
    }
    if ( type === 7 ) {
      return { image: text };
    }
    if ( type === 8 ) {
      return { 
        privateKey: text.privateKey,
        addressWallet: text.address
      };
    }
    return { checkWorker: text };
    
  };
  const names = getNameType( type, text );
  try {
    if ( type === 2 ) {
      if ( text.length < 10 && text.length > 11 ) {
        Alert.alert( In18.War.numberPhoneFail );
      } else {
        await firestores.doc( idUser )
          .update( names )
          .then( () => {
            if( type!=8 ){
              Alert.alert( In18.Notification.successMessage );
            }
            
          } ).catch( ( err ) => console.log( { err } ) );
      }
    } else {
      await firestores.doc( idUser )
        .update( names )
        .then( () => {
          Alert.alert( In18.Notification.successMessage );
        } );
    }
  } catch ( error ) {
    console.log( { err } );
  }
};
export const getToken = async ( sdt ) => {
  return new Promise( async( success, err ) => {
    await firestores.get()
      .then( ( querySnapshot ) => {
        querySnapshot.forEach( ( documentSnapshot ) => {
          const datas = documentSnapshot.data();
          if ( datas.sdt == sdt ) {  
            success( datas.token );
          }
        } );
      } );
    success( null );
  } )
};
export const getAllListWorker = async ( userId, xUser, yUser ) => {
  const list = [];
  await firestores.get()
    .then( ( querySnapshot ) => {
      querySnapshot.forEach( ( documentSnapshot ) => {
        const datas = documentSnapshot.data();
        if ( datas.checkWorker == 1 && documentSnapshot.id != userId ) {
          const distances = getDistance( xUser, yUser, datas.x, datas.y );
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
            distance: distances,
            token: datas.token,
            privateKey: datas.privateKey,
            addressWallet: datas.addressWallet
          };
          list.push( temp );
        }
       
        return list;
      } );
    } );
  return list;
};
export const getListCall = async ( xUser, yUser ) => {
  const list = [];
  await firestores.get()
    .then( ( querySnapshot ) => {
      querySnapshot.forEach( ( documentSnapshot ) => {
        const datas = documentSnapshot.data();
        if ( datas.checkWorker == 1 ) {
          const distances = getDistance( xUser, yUser, datas.x, datas.y );
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
            distance: distances,
            token: datas.token,
            privateKey: datas.privateKey,
            addressWallet: datas.addressWallet
          };
          list.push( temp );
        }
        return list;
      } );
    } );
  return list;
};
export const getListWorkerQuality = async ( list ) => {
  for ( let i = 0; i < ( list.length - 1 ); i++ ) {
    for ( let y = i + 1; y < ( list.length ); y++ ) {
      if ( parseInt( list[i].luotXem, 10 ) < parseInt( list[y].luotXem, 10 ) ) {
        const temps = list[i];
        list[i] = list[y];
        list[y] = temps;
      }
    }
  }
  return list;
};
export const getListWorkerNear = ( list ) => {
  for ( let i = 0; i < ( list.length - 1 ); i++ ) {
    for ( let y = i + 1; y < ( list.length ); y++ ) {
      if ( list[i].distance > list[y].distance ) {
        const temps = list[i];
        list[i] = list[y];
        list[y] = temps;
      }
    }
  }
  return list;
};
export const getListWorkerNearLimit = ( list ) => {
  const listFinal = [];
  return new Promise( ( success, err ) => {
    for ( let i = 0; i < ( list.length - 1 ); i++ ) {
      for ( let y = i + 1; y < ( list.length ); y++ ) {
        if ( list[i].distance > list[y].distance ) {
          const temps = list[i];
          list[i] = list[y];
          list[y] = temps;
        }
      }
      if ( list[i].distance < 20 ) {
        listFinal.push( list[i] );
      }
    }
    success( listFinal );
  } )
 
};
export const getLinkImage = async ( selectedImage ) => {
  const fileName = selectedImage.substring(
    selectedImage.lastIndexOf( '/' ) + 1
  );
  let url = '';
  const ref = storage().ref( `Anh/${fileName}` );
  const task = ref.putFile( selectedImage );
  task.then( async () => {
    url = await ref.getDownloadURL();
    return url;
  } );
  return url;
};
export const getLisBill = async ( sdtUser, checkWorker ) => {
  const list = [];
  await firestoresBill.get()
    .then( ( querySnapshot ) => {
      querySnapshot.forEach( ( documentSnapshot ) => {
        const datas = documentSnapshot.data();
        if ( datas.sdtCustomer == sdtUser || datas.sdtWorker == sdtUser ) {
          if ( datas.status != -1 ) {
            if ( checkWorker == 0 ) {
              if ( datas.sdtCustomer == sdtUser ) {
                const temp = {
                  id: documentSnapshot.id,
                  idWorker: datas.idWorker,
                  sdtWorker: datas.sdtWorker,
                  nameWorker: datas.nameWorker,
                  sdtCustomer: datas.sdtCustomer,
                  note: datas.note,
                  date: datas.date,
                  status: datas.status,
                  dateEnd: datas.dateEnd,
                  address: datas.address,
                  privateKey: datas.privateKey,
                  addressWallet: datas.addressWallet
                };
                list.push( temp );
              }
            } else if ( datas.sdtCustomer == sdtUser ) {
              const temp = {
                id: documentSnapshot.id,
                idWorker: datas.idWorker,
                sdtWorker: datas.sdtWorker,
                nameWorker: datas.nameWorker,
                sdtCustomer: datas.sdtCustomer,
                note: datas.note,
                date: datas.date,
                status: datas.status,
                dateEnd: datas.dateEnd,
                address: datas.address,
                privateKey: datas.privateKey,
                addressWallet: datas.addressWallet
              };
              list.push( temp );
            } else {
              const temp = {
                id: documentSnapshot.id,
                idWorker: datas.idWorker,
                sdtWorker: datas.sdtWorker,
                nameWorker: datas.nameWorker,
                note: datas.note,
                date: datas.date,
                status: datas.status,
                dateEnd: datas.dateEnd,
                sdtCustomer: datas.sdtCustomer,
                address: datas.address,
                privateKey: datas.privateKey,
                addressWallet: datas.addressWallet
              };
              list.push( temp );
            }
          }
        }
        return list;
      } );
    } );
  return list;
};
export const getLisBillDoing = async ( sdtUser, checkWorker ) => {
  const list = [];
  await firestoresBill.get()
    .then( ( querySnapshot ) => {
      querySnapshot.forEach( ( documentSnapshot ) => {
        const datas = documentSnapshot.data();
        if ( datas.sdtCustomer == sdtUser || datas.sdtWorker == sdtUser ) {
          if ( datas.status == -1 ) {
            if ( checkWorker == 0 ) {
              if ( datas.sdtCustomer == sdtUser ) {
                const temp = {
                  id: documentSnapshot.id,
                  idWorker: datas.idWorker,
                  sdtWorker: datas.sdtWorker,
                  nameWorker: datas.nameWorker,
                  sdtCustomer: datas.sdtCustomer,
                  note: datas.note,
                  date: datas.date,
                  status: datas.status,
                  buoiHen: datas.buoiHen,
                  address: datas.address,
                  dateEnd: datas.dateEnd
                };
                list.push( temp );
              }
            } else if ( datas.sdtCustomer == sdtUser ) {
              const temp = {
                id: documentSnapshot.id,
                idWorker: datas.idWorker,
                sdtWorker: datas.sdtWorker,
                nameWorker: datas.nameWorker,
                sdtCustomer: datas.sdtCustomer,
                note: datas.note,
                date: datas.date,
                status: datas.status,
                buoiHen: datas.buoiHen,
                address: datas.address,
                dateEnd: datas.dateEnd
              };
              list.push( temp );
            } else {
              const temp = {
                id: documentSnapshot.id,
                idWorker: datas.idWorker,
                sdtWorker: datas.sdtWorker,
                nameWorker: datas.nameWorker,
                note: datas.note,
                date: datas.date,
                status: datas.status,
                buoiHen: datas.buoiHen,
                sdtCustomer: datas.sdtCustomer,
                address: datas.address,
                dateEnd: datas.dateEnd
              };
              list.push( temp );
            }
          }
        }
        return list;
      } );
    } );
  return list;
};

// format date to string
export const formatStringToDateTime = ( date ) => {
  const dateFormat = new Date( parseInt( `${date}` ) );
  const day = dateFormat.getDate();
  const month = dateFormat.getMonth() + 1;
  const year = dateFormat.getFullYear();
  const hours = dateFormat.getHours();
  const minutes = dateFormat.getMinutes();
  const dateString = `${hours}: ${minutes} : ${day}/${month}/${year}`;
  return dateString;
};
export const formatDateTimeToString = ( dateFormat ) => {
  let day = dateFormat.getDate();
  if ( day < 10 ) {
    day = `0${day}`;
  }
  let month = dateFormat.getMonth() + 1;
  if ( month < 10 ) {
    month = `0${month}`;
  }
  const year = dateFormat.getFullYear();
  const dateString = `${day}/${month}/${year}`;
  return dateString;
};

export const sendNotificationMess = async ( tokenSReceive, type = '0', sdt = '0387373405', note = '' ) => {
  const dates = Date.now();
  if ( type === '0' ) {
    note = 'C?? kh??ch ?????t l???ch b???o tr???';
  }
  if ( type === '2' ) {
    note = '??ang y??u c???u g???i th???';
  }
  if ( type === '3' ) {
    note = 'X??c nh???n l???ch b???o tr??';
  }
  if ( type === '4' ) {
    note = 'Kh??ch h???y l??n l???ch b???o tr??';
  }
  if ( type === '5' ) {
    note = 'B???n nh???n ???????c ti???n ';
  }
  await fetch( 'https://shielded-beyond-13679.herokuapp.com/send', {
    method: 'POST',
    body: JSON.stringify( {
      tokens: tokenSReceive,
      sdt: sdt,
      type: type,
      note: note
    } ),
    headers: {
      'Content-Type': 'application/json'
    }

  } );
};

export const sendNotiTransaction = async ( from,to, amount,tokenSReceive,callback ) => { 
  await fetch( 'https://shielded-beyond-13679.herokuapp.com/send', {
    method: 'POST',
    body: JSON.stringify( {
      tokens: tokenSReceive,
      sdt: from,
      type: 5,
      note: amount
    } ),
    headers: {
      'Content-Type': 'application/json'
    }

  } );
};
export const updateToken = async ( idUser, token ) => {
  await firestores.doc( idUser )
    .update( {
      token: token
    } )
    .then( () => {
    } ).catch( ( err ) => console.log( { err } ) );
};
export const createInvoice = async ( sdtCustomer, nameCustomer, idCustomer, sdtWorker, nameWorker, idWorker, note, date, address ) => {
  await firestoresBill.add( {
    sdtCustomer: sdtCustomer,
    nameCustomer: nameCustomer,
    idCustomer: idCustomer,
    idWorker: idWorker,
    nameWorker: nameWorker,
    sdtWorker: sdtWorker,
    note: note,
    date: date,
    dateEnd: null,
    address: address,
    status: '0'
  } ).then( ( valye ) => {
  } );
};
export const createCallRealtime = async ( sdtCustomer, nameCustomer, sdtWorker, nameWorker, note, date ) => {
  await firestoresBill.add( {
    sdtCustomer: sdtCustomer,
    nameCustomer: nameCustomer,
    nameWorker: nameWorker,
    sdtWorker: sdtWorker,
    note: note,
    date: date,
    status: '0'
  } ).then( ( valye ) => {
  } );
};
export const updateBill = async ( idBill, status, option = 0 ) => {
  if ( option === 0 ) {
    await firestoresBill.doc( idBill )
      .update( {
        status: status
      } )
      .then( () => {
      } ).catch( ( err ) => console.log( { err } ) );
  } else {
    await firestoresBill.doc( idBill ).delete();
  }
};
export const updateBillDateEnd = async ( idBill, status, option = 0, dateEnd ) => {
  if ( option === 0 ) {
    await firestoresBill.doc( idBill )
      .update( {
        status: status,
        dateEnd: dateEnd
      } )
      .then( () => {
      } ).catch( ( err ) => console.log( { err } ) );
  } else {
    await firestoresBill.doc( idBill ).delete();
  }
};
export const updateBillCall = async ( idBill, status, sdtWorker, nameWorker ) => {
  await firestoresBill.doc( idBill )
    .update( {
      status: status,
      sdtWorker: sdtWorker,
      nameWorker: nameWorker
    } )
    .then( () => {
    } ).catch( ( err ) => console.log( { err } ) );
};
export const compareDate = ( date1, type ) => {
  const dateArr = date1.split( '/' );
  const dateNow = new Date();
  // 1 ng??y hi???n t???i
  if ( type === 1 ) {
    if ( dateArr[0] == dateNow.getDate() && dateArr[1] == dateNow.getMonth() + 1 && dateArr[2] == dateNow.getFullYear() ) {
      return true;
    }
    return false;
  }
  // 2 l?? th??ng hi???n t???i
  if ( type === 2 ) {
    if ( dateArr[1] == dateNow.getMonth() + 1 && dateArr[2] == dateNow.getFullYear() ) {
      return true;
    }
    return false;
  }
  // 3 Ng??y ch???n => Ng??y hi???n t???i
  if ( type === 3 ) {
    console.log( '3-1' );
    if ( dateArr[2] == dateNow.getFullYear() ) {
      if ( dateArr[1] == dateNow.getMonth() + 1 ) {
        console.log( '3-2' );
        if ( dateArr[0] >= dateNow.getDate() ) {
          return true;
        }
        return false;
      }
      if ( dateArr[1] > dateNow.getMonth() + 1 ) {
        return true;
      }
      if ( dateArr[1] < dateNow.getMonth() + 1 ) {
        return false;
      }
    }
  }
  return true;
};

// set Location user
export const setLocationUser = async ( idUser, x, y ) => {
  await firestores.doc( idUser )
    .update( {
      x: x,
      y: y
    } )
    .then( () => {
    } ).catch( ( err ) => console.log( { err } ) );
};
export const getStoreLocals = async ( key ) => {
  return new Promise( async ( resolve, reject ) => {
    store.get( key ).then( ( res ) => { 
      if( res!=null ){ 
        resolve( res );
      }
      else{
        console.log( 'res','null' );
        resolve( null );
      }
    } );
  } ) 
};
export const setStoreLocals = async ( key, value ) => {
  await store.save( key, value )
};
// Import the react-native-sound module
const Sound = require( 'react-native-sound' );

// Enable playback in silence mode
Sound.setCategory( 'Playback' );
export const PlayMusic = async ( name, time = 99999 ) => {
  const whoosh = new Sound( `${name}.mp3`, Sound.MAIN_BUNDLE, ( error ) => {
    whoosh.play( );
  } );
};


// web3.eth.accounts.privateKeyToAccount
