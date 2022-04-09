import React from 'react';
import { StyleSheet } from 'react-native';
import TextInput from 'components/TextInput/index';
import { width, height } from 'common/styles';
import Colors from '../../common/Colors';

const styles = StyleSheet.create( {
  containerView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    padding: 200
    // flex:1
  },
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center'
  },
  containerBuild: {
    width: width( 90 ),
    marginTop: 10
  },
  styleBtnSetting: {
    width: width( 90 ),
    borderWidth: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: 'gainsboro',
    justifyContent: 'flex-start',
    paddingLeft: 0,
    marginTop: 20,
    paddingBottom: 20,
    height: height( 9 ),
    borderRadius: 0
  },
  iconButton: {
    height: height( 8 ),
    width: height( 8 )
  },
  containerCalender: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1.5,
    borderBottomColor: 'gainsboro'

  },
  styleBtnCalender: {
    borderWidth: 0,
    justifyContent: 'flex-start',
    paddingLeft: 0,
    marginTop: 20,
    width: width( 80 )
  },
  numberCalender: {
    backgroundColor: Colors.YELLOW,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 40
  }
} );
export default styles;
