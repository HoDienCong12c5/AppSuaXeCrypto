import { StyleSheet } from 'react-native';
import { Colors, width, height } from 'common/styles';
// import Colors from '../../common/Colors';
const styles = StyleSheet.create( {
  container: {
    // flexDirection: 'row',
    marginHorizontal: height( 2 ),
    alignSelf: 'center',
    shadowColor: 'Black',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 6
  },
  styleImage: {
    width: width( 10 ),
    height: width( 10 )
  },
  containerOption: {

  }
} );
export default styles;
