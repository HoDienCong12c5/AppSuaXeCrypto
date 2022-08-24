import { StyleSheet } from 'react-native';
import {Colors} from '../common/Colors';
import { height, width } from '../common/styles';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  containerModals: {
    width: width( 80 ),
  },
  styleImage: {
    width: width( 5 ),
    height: width( 5 ),
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
    // paddingTop:25,
    // justifyContent: 'center',
    alignItems: 'center',
    // position:'absolute'
  },
  modalButtonClose: {
    alignItems: 'flex-end',
    width: width( 80 ),
  },
  noHeader: {
    marginTop: height( 5 ),
  },
} );
export default styles;
