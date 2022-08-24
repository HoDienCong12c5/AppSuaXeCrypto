import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput from 'components/TextInput';
import { height, width } from 'common/styles';
import {Colors} from '../../common/Colors';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    alignItems: 'center',
    width: width( 90 ),
    alignSelf: 'center'
  },
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
  },
  containerAvatar: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgAvatart: {
    height: width( 30 ),
    width: width( 30 ),
    marginTop: 20
  },
  iconEditAvatar: {
    position: 'absolute',
    bottom: 5,
    height: width( 13 ),
    width: width( 13 ),
    marginLeft: width( 13 )
  },
  containerViewWorker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  containerEdit: {
    paddingVertical: 10
  },
  contentDetails: {
    backgroundColor: 'gainsboro',
    paddingHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width( 85 )
  },
  titleModals: {
    textAlign: 'center',
    fontSize: height( 3.5 ),
    fontWeight: 'bold',
    marginBottom: height( 2 )
  },
  modals: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    // alignItems: 'center',
    width: width( 90 )
  },
  nameOld: {
    fontSize: height( 2 )
  },
  txtEdit: {
    // borderWidth:0,
    borderColor: 'white',
    borderBottomColor: 'orange',
    borderRadius: 0,
    width: width( 75 ),
    backgroundColor: 'red'
  },
  btnModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height( 2 )
  },
  styleBtnModal: {
    marginLeft: height( 1 )
  },
  styleBtnModalSave: {
    marginLeft: height( 1 ),
    backgroundColor: 'orange'
  },
  txtAddress: {
    width: width( 60 )
  },
  btnOption: {
    marginBottom: 10
  }
} );
export default styles;
