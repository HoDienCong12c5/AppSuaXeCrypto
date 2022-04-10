import React from 'react';
import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';
import Colors from '../../common/Colors';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    width: width( 90 )
  },
  containerQuality: {
    flexDirection: 'row',
    // width: width( 75 ),
    // height: height( 18 ),
    backgroundColor: '#BEDFFF',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
    marginRight: width( 3 ),
    marginTop: 5,
    marginBottom: width( 1 ),
    padding: 10
  },
  containerOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width( 50 ),
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1
  },
  optionMenu: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 2,
    // backgroundColor:Colors.GRAY,
    // opacity:0.5,
    borderRadius: 10
  },
  optionMenuDetail: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  titleOption: {
    fontSize: height( 2.5 ),
    fontWeight: 'bold'
  },
  detailQuality: {
    width: width( 58 ),
    elevation: 10,
    paddingLeft: 10
    // alignItems: 'center',

  },
  containerQualityDetail: {  
    alignItems: 'center',
    borderColor:Colors.YELLOW,
    backgroundColor:Colors.ORANGE2,
    borderRadius:10,
    marginRight:10,
    paddingBottom:20,
    shadowColor: Colors.YELLOW,
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity:1,
    shadowRadius: 20,
    elevation: 3
  },
  callQuantity: {
    borderColor: 'red',
    justifyContent: 'center'
  },
  titleQuality: {
    fontWeight: 'bold',
    fontSize: height( 2.2 ),
    flexWrap:'wrap'
  },
  luotXemQuality: {
    color: 'red'
  },
  addressQuality: {
    width: width( 54 ),
    // numberLines: 3,
    // textAlign: 'center',
    paddingRight: 10
  },
  icCallQuality: {
    height: 30,
    width: 30,
    padding: 10
  },
  // list worker
  containerWorkerDetail: {
    flexDirection: 'row',
    // marginTop: 5, 
    paddingVertical: 5,
    paddingBottom: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 4,
    alignItems: 'center',
    marginTop:height( 3 ),
    marginLeft:height( 2 ),
    borderColor: Colors.ORANGE,
    backgroundColor: '#FFFFFF',
    borderWidth:1
  },
  imgAvatarWorker: {
    height: height( 12 ),
    padding: 5,
    width: width( 15 ),
    alignItems: 'center',
    resizeMode: 'contain',
    marginHorizontal: 12,
    justifyContent: 'center'
  },
  // setup All
  textAll: {
    paddingVertical: 5
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
    color: Colors.RED,
    fontSize: height( 1.5 ),
    width: width( 55 ),
    flexWrap: 'wrap'
    // textAlign:'right'
  },
  callAll: {
    justifyContent: 'center',
    paddingRight: 40,
    width: width( 65 ),
    backgroundColor: 'red'
  },
  containerImageWorker:{ 
    top:height( -6 ),
    padding:5
  },
  avatarWorker: { 
    height: height( 8 ),
    width: height( 8 ),
    borderRadius: 5,
    borderColor: Colors.YELLOW,
    borderWidth: 1,
    left:height( -3 ),
    backgroundColor: Colors.ORANGE,
    padding:5
  },
  avatarWorkerView: { 
    height: height( 15 ),
    width: height( 18 ),
    borderColor:Colors.YELLOW,
    backgroundColor:Colors.ORANGE2,
    borderRadius:15
  },
  containerWorkerView: {
    padding:10,
    borderColor:Colors.YELLOW,
    backgroundColor:Colors.ORANGE2,
    borderRadius:10
  }
} );
export default styles;
