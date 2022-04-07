import { height, width } from 'common/styles';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create( {
  containerTest: {
    flex: 1
    // width: width( 50 )
  },
  iconLoading: {
    resizeMode: 'contain',
    height: height( 15 ),
    width: width( 90 )
  }
} );
export default styles;
