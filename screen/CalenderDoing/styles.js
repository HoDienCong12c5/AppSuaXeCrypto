import { StyleSheet } from 'react-native';
import { width, height } from 'common/styles';
import {Colors} from 'common/Colors';

const styles = StyleSheet.create( {
  container: {
    flex: 1
  },
  containerOptions: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  btnOption: {
    // width: width( 30 ),
    borderWidth: 0,
    borderRadius: 0,
    paddingHorizontal: 15
  },
  containerBuild: {
    flex: 1
  }
} );
export default styles;
