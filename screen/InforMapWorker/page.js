import React from 'react';
import {
  View, TouchableOpacity, Image, TextInput, Text
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Img from 'assets';
import styles from './style';

const page = ( p ) => {
  const { infoUserWorker, user } = p.props;
  const caulat = ( lat, lng ) => {
  };
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: parseFloat( user.x ),
          longitude: parseFloat( user.y ),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.map}
      >

        <Marker 
          coordinate={{
            latitude: parseFloat( infoUserWorker.x ),
            longitude: parseFloat( infoUserWorker.y )
          }}
        >
        </Marker>

      </MapView>
      <Text>sdgfhsgdfh</Text>
    </View>
  );
};
export default page;
