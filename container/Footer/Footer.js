import React, { useState } from 'react';
import {
  View, Image, TouchableOpacity, Text
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Img from '../../assets/index';
import styles from './style';
import In18 from '../../common/constants';
// ADD REDUX
import ActionStore from '../../reduxs/Action/ActionStore';

const Footer = ( props ) => {
  const { calender, message } = props;
  const onClickOptionMenu = ( value ) => {
    const { menuFooterRedux, setMenuFooter } = props;

    if ( value !== menuFooterRedux ) {
      if ( value === In18.Menu.HOME ) {
        Actions.home();
      }
      if ( value === In18.Menu.MESSAGE ) {
        Actions.managerMess();
      }
      if ( value === In18.Menu.SEARCH ) {
        Actions.search();
      }
      if ( value === In18.Menu.PRO_FILE ) {
        Actions.setting();
      }
      setMenuFooter( value );
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.HOME )}>
        <View style={styles.boxMenuInActive}>
          <Image source={Img.Image.icHome} style={styles.img} />
          {/* <Text>dshjfghds</Text> */}
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.MESSAGE )}>
        <View style={styles.boxMenuInActive}>
          <Image source={Img.Image.icMess} style={styles.img} />
          <View style={styles.calender}>
            {
              message > 0 ? (
                <Text style={{ padding: 0 }}>{message}</Text>
              ) : null
            }

          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.SEARCH )}>
        <View style={styles.boxMenuInActive}>
          <Image source={Img.Image.icSearch} style={styles.img}/>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.PRO_FILE )}>
        <View style={styles.boxMenuInActive}>
          <Image source={Img.Image.iconSetting} style={styles.img}/>
          <View style={styles.calender}>
            {
              calender > 0 ? (
                <Text style={{ padding: 0 }}>{calender}</Text>
              ) : null
            }

          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = ( state ) => ( {
  menuFooterRedux: state.menuFooterRedux,
  calender: state.calender,
  message: state.message
} );

const mapDispatchToProps = ( dispatch ) => ( {
  setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch ),
  setCalender: bindActionCreators( ActionStore.setCalender, dispatch ),
  setMessage: bindActionCreators( ActionStore.setMessage, dispatch )
} );
export default connect( mapStateToProps, mapDispatchToProps )( Footer );
// export default Footer
