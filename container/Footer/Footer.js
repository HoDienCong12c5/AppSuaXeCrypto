import React, { useState, Component } from 'react';
//import Component from './component';

import {
  View, Image, TouchableOpacity, Text
} from 'react-native';
import { Router, Actions, ActionConst } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Img from '../../assets/index';
import styles from './style';
import In18 from '../../common/constants';
import { EventRegister } from 'react-native-event-listeners'
// ADD REDUX
import ActionStore from '../../reduxs/Action/ActionStore';
class Footer extends Component {
  componentDidMount () {
    this.changeMenuEvent = EventRegister.addEventListener( 'changeMenu', ( input ) => {
      const { setMenuFooter } = this.props
      setMenuFooter && setMenuFooter( input )
    } )
  }

  componentWillUnmount () {
    EventRegister.removeEventListener( this.changeMenuEvent )
  }
  onClickOptionMenu= ( value ) => () => {
    const { menuFooterRedux, setMenuFooter } = this.props;

    if ( value !== menuFooterRedux ) {
      if ( value === In18.Menu.HOME ) {
        Actions.home( { type: ActionConst.RESET } );
      }
      if ( value === In18.Menu.MESSAGE ) {
        Actions.managerMess( { type: ActionConst.RESET } );
      }
      if ( value === In18.Menu.SEARCH ) {
        Actions.search( { type: ActionConst.RESET } );  
      }
      if ( value === In18.Menu.PRO_FILE ) {
        Actions.setting( { type: ActionConst.RESET } );
      }
      setMenuFooter( value );
    }
  }
  render() {
    const { calender, message } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.footerItem} onPress={this.onClickOptionMenu( In18.Menu.HOME )}>
          <View style={styles.boxMenuInActive}>
            <Image source={Img.Image.icHome} style={styles.img} />
            {/* <Text>dshjfghds</Text> */}
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={this.onClickOptionMenu( In18.Menu.MESSAGE )}>
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
        <TouchableOpacity style={styles.footerItem} onPress={this.onClickOptionMenu( In18.Menu.SEARCH )}>
          <View style={styles.boxMenuInActive}>
            <Image source={Img.Image.icSearch} style={styles.img}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem} onPress={this.onClickOptionMenu( In18.Menu.PRO_FILE )}>
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
  }
}
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


// const Footer = ( props ) => {
//   const { calender, message } = props;
//   const onClickOptionMenu = ( value ) => {
//     const { menuFooterRedux, setMenuFooter } = props;

//     if ( value !== menuFooterRedux ) {
//       if ( value === In18.Menu.HOME ) {
//         Actions.home( { type: ActionConst.RESET } );
//       }
//       if ( value === In18.Menu.MESSAGE ) {
//         Actions.managerMess( { type: ActionConst.RESET } );
//       }
//       if ( value === In18.Menu.SEARCH ) {
//         Actions.search( { type: ActionConst.RESET } );
//       }
//       if ( value === In18.Menu.PRO_FILE ) {
//         Actions.setting( { type: ActionConst.RESET } );
//       }
//       setMenuFooter( value );
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.HOME )}>
//         <View style={styles.boxMenuInActive}>
//           <Image source={Img.Image.icHome} style={styles.img} />
//           {/* <Text>dshjfghds</Text> */}
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.MESSAGE )}>
//         <View style={styles.boxMenuInActive}>
//           <Image source={Img.Image.icMess} style={styles.img} />
//           <View style={styles.calender}>
//             {
//               message > 0 ? (
//                 <Text style={{ padding: 0 }}>{message}</Text>
//               ) : null
//             }

//           </View>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.SEARCH )}>
//         <View style={styles.boxMenuInActive}>
//           <Image source={Img.Image.icSearch} style={styles.img}/>
//         </View>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.footerItem} onPress={() => onClickOptionMenu( In18.Menu.PRO_FILE )}>
//         <View style={styles.boxMenuInActive}>
//           <Image source={Img.Image.iconSetting} style={styles.img}/>
//           <View style={styles.calender}>
//             {
//               calender > 0 ? (
//                 <Text style={{ padding: 0 }}>{calender}</Text>
//               ) : null
//             }

//           </View>
//         </View>
//       </TouchableOpacity>
//     </View>
//   );
// };
// const mapStateToProps = ( state ) => ( {
//   menuFooterRedux: state.menuFooterRedux
// } );

// const mapDispatchToProps = ( dispatch ) => ( {
//   setMenuFooter: bindActionCreators( ActionStore.setMenuFooter, dispatch )
// } );
// export default connect( mapStateToProps, mapDispatchToProps )( Footer );
// // export default Footer
