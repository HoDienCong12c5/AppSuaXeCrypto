import React, { PureComponent, Component } from 'react';
import {
  View, Keyboard, StatusBar, TouchableOpacity
} from 'react-native';
// import {
//   Modal,
// } from 'react-native-modal';
import {
  ModalPortal, Modal, ModalContent, ModalTitle
} from 'react-native-modals';
import Header from './Header/Header';
import styles from './style';
import Footer from './Footer/Footer';

class BaseContainer extends PureComponent {
  constructor( props, context ) {
    super( props, context );
    this.page = null;
    this.popup = null;
    this.backdropPressToClose = false;
    this.swipeToClose = false;
    this.positionPopup = 'center';
    this.swipeArea = null;
    this.state = {
      openPopupss: true
    };
    this.view = ( props ) => this.renderPage( props );
  }

  dismissKeyboard = () => Keyboard.dismiss()

  setRefsPopup = ( ref ) => { this.refPopup = ref; }

  setRefsAlert = ( ref ) => { this.pushAlert = ref; }

  setRefsSheet = ( ref ) => { this.refSheet = ref; }

  setRefsIndicator = ( ref ) => { this.pushIndicator = ref; }

  closeModal = () => {
    this.refPopup && this.refPopup.close();
  }

  openModal = () => {
    this.setState( {
      openPopupss: true
    } );
  }

  closeModal = () => {
    this.setState( {
      openPopupss: false
    } );
  }

  renderPage = ( props ) => {
    const Page = this.page;
    const { noHeader = false, noFooter = false } = props;
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {noHeader && <View style={styles.noHeader}/>}
        {!noHeader && <Header {...props} />}
        <View style={styles.content}>
          <Page {...props} />
        </View>
        {/* {!noHeader && <Header {...props}></Header>} */}
        {!noFooter && <Footer {...props} func={this} />}
        <Modal
          // useNativeDriverForBackdrop
          // swipeDirection={['down']}
          visible={this.state.openPopupss}
          onTouchOutside={() => {
            this.setState( { openPopupss: false } );
          }}
          style={{ padding: 0 }}
          modalStyle={{ padding: 0 }}
        >
          {/* <View style={styles.containerModals}>
            {this.popup || null}
          </View> */}
          <ModalContent style={{ padding: 0 }}>
            <View style={styles.containerModals}>
              {this.popup || null}
            </View>

          </ModalContent>
        </Modal>
        {/* <ModalPortal /> */}
      </View>
    );
  };
}
export default BaseContainer;
