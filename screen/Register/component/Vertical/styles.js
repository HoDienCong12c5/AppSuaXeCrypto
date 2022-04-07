import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';

const styles = StyleSheet.create( {
  container: {

  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  btnSubmit: {
    fontWeight: 'bold',
    width: width( 23 )
  },
  input: {
    width: width( 75 ),
    marginBottom: 20
  }
} );
export default styles;
