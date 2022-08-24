import React from 'react';
import { StyleSheet } from 'react-native';
import {Colors} from 'common/Colors';
import TextInput from 'components/TextInput';
import { height, width } from 'common/styles';

const styles = StyleSheet.create( {
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue'
    // flex:1
  },
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  flatList: {
    marginTop: height( 5 ),
    height: height( 65 ),
    width: width( 90 )
  },
  option: {
    justifyContent: 'center',
    flexDirection: 'row'

  },
  textAll: {
    paddingVertical: 5
  },
  containerWorkerDetail: {
    flexDirection: 'row',
    // marginTop: 5,
    backgroundColor: Colors.WHITE,
    paddingVertical: 5,
    paddingBottom: 10,
    borderRadius: 20,
    marginBottom: 10,
    flex: 1
  },
  imgAvatarWorker: {
    width: width( 20 ),
    height: height( 10 ),
    alignItems: 'center',
    resizeMode: 'contain',
    alignSelf: 'center',
    marginHorizontal: 10,
    flex: 2

  },
  contentDetailDistance: {
    flex: 6,
    paddingLeft: 5
  },
  containerFunction: {
    flex: 2,
    alignItems: 'center',
    alignSelf: 'center'
  },
  titleContentWorker: {
    fontWeight: 'bold',
    color: Colors.BLACK
  },
  viewContentWorker: {
    color: Colors.BORDER_BOX,
    fontSize: height( 1.5 )
  },
  addressContentWorker: {
    fontSize: height( 1.5 ),
    flexWrap: 'wrap'
  },
  distanceContentWorker: {
    color: Colors.GREEN
  },
  image: {
    resizeMode: 'contain',
    height: height( 6 ),
    width: height( 6 )
  }
} );
export default styles;
