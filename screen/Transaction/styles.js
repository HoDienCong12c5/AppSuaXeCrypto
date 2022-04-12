import { StyleSheet } from "react-native"
import Colors from "common/Colors"
import { width, height } from "common/styles"
const styles = StyleSheet.create( {
  container:{
    flex:1,
    width:width( 100 )  
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
    marginTop:28
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
  }
} )
export default styles