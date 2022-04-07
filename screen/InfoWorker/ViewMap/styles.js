import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';

const styles = StyleSheet.create( {
  container: {

    width: width( 80 ),
    height: height( 70 )
  },
  avatarMapWorker: {
    height: height( 5 ),
    width: height( 5 ),
    borderRadius: 30
  },
  borderAvatarWorker: {
    borderRadius: 30
    // borderColor: Colors.YELLOW
  }
} );
export default styles;
