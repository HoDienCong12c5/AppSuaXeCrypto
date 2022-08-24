import { StyleSheet } from "react-native"
import {Colors} from "common/Colors"
import { width, height } from "common/styles"
const styles = StyleSheet.create( {
  container:{
    flex:1,
    width:width( 100 )  ,
    marginTop:20
    // paddingHorizontal:15,
    // paddingVertical:5
  },  
  body:{
    flex:1,
    paddingHorizontal:15,
    paddingVertical:5
  },
  containerHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
   
    borderBottomWidth:1,
    paddingBottom:15,
    paddingHorizontal:10,
    width:width( 100 ),
    borderColor:Colors.YELLOW
  },
  iconBack:{
    padding:0,
    margin:0,
    height: height( 3 ),
    width: height( 3 ),
    alignSelf:'center'
  },
  midHeader:{
    marginLeft:width( -5 ),
    alignItems:'center'
  },
  textHeader:{
    fontSize: 20,
    fontWeight:'bold'
  },
  containerToAddress:{
    flexDirection: 'row',
    borderBottomWidth:1,
    borderBottomColor:Colors.ORANGE,
    marginTop:20
  },
  containerInput:{
    flex: 7,
    justifyContent:'flex-start'
  },
  inputToAddress:{
    borderWidth:0,
    width:width( 76 ),
    alignSelf:'flex-start',
    paddingHorizontal:0
  },
  inputToAddressText:{
    padding:0,
    margin:0
  },  
  qr:{
    borderWidth:0,
    paddingHorizontal:0
  },
  textTitle:{
    fontSize:16
  },
  btnSend:{
    width:width( 60 ),
    height:height( 9 ),
    backgroundColor:Colors.ORANGE2
  },
  textBtnSend:{
    fontSize:16,
    fontWeight:'bold'
    // marginLeft:10
  },
  containerBalance:{
    flexDirection:'row',
    borderBottomWidth:1,
    paddingBottom:10, 
    // width:width( 100 ),
    borderColor:Colors.YELLOW
  },
  textBalance:{
    fontSize:18
  }
} )
export default styles
