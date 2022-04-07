import {StyleSheet} from 'react-native';
import Colors from '../../common/Colors'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    justifyContent: 'space-between',
    padding:10,
    paddingTop:30
  },
  title:{
    color: Colors.TEXT_SECONDARY,
    textAlign: 'center',
    fontSize:20,
    fontWeight: 'bold',
    // padding:10
  },
  rightBTN: {
    height:20,
    width:20
  },
}); 
export default styles