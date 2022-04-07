import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { width } from 'common/styles';

const Images = ( props ) => {
  const {
    url,
    style,
    http = null,
    stylesContainerImage
  } = props;
  const urlHttp = http || null;
  return (
    <View style={stylesContainerImage}>
      {
        urlHttp
          ? <Image style={[styles.styleImage, style]} source={{ uri: http }} />
          : <Image style={[styles.styleImage, style]} source={url} />
      }
    </View>

  );
};
const styles = StyleSheet.create( {
  container: {
    padding: 10
  },
  styleImage: {
    width: width( 10 ),
    height: width( 10 )
  }
} );
// eslint-disable-next-line no-undef
export default Images;
