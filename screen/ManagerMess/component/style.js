import { StyleSheet } from 'react-native';
import { height, width } from 'common/styles';
import Colors from 'common/Colors';

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderColor: Colors.BLUE1

  },
  containerRead: {

  },
  containerUnRead: {
    // backgroundColor: Colors.GRAY6
  },
  avatar: {
    resizeMode: 'contain',
    height: height( 7 ),
    width: height( 7 ),
    alignSelf: 'center',
    borderRadius: 50

  },
  containerNote: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  body: {
    paddingHorizontal: 20,
    paddingLeft: 15,
    width: width( 75 ),
    justifyContent: 'center',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: Colors.YELLOW

  },
  right: {

  },
  name: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  content: {
    fontSize: 14,
    marginTop: 2
  },
  date: {
    fontSize: 10,
    alignSelf: 'flex-end',
    top: -5
  },
  status: {
    fontSize: 10,
    alignSelf: 'center'
  },
  status0: {
    color: Colors.GREEN1
  },
  status1: {
    color: Colors.GREEN1
  }
} );
export default styles;
