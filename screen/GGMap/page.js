import React from 'react';
import {
  View, TouchableOpacity, Image, TextInput, Text
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Img from 'assets';
import styles from './style';

const page = ( p ) => {
  const { listWorkerNearLimit } = p.props;
  console.log( '====================================' );
  console.log( { listWorkerNearLimit } );
  console.log( '====================================' );
  const caulat = ( lat, lng ) => {
  };
  return (
    <View>
      <Text>sdgfhsgdfh</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        style={styles.map}
      >

        <Marker
          style={{ backgroundColor: 'blue' }}
          description='sdjfghdsgfhs'
          coordinate={{
            latitude: 10.813925814727963,
            longitude: 106.6625496006505
          }}
        >
        </Marker>
        <Marker
          tyle={{ backgroundColor: 'blue', with: 30, height: 30 }}
          description='sdjfghdsgfhs'
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324
          }}
        >
        </Marker>

      </MapView>
      <Text>sdgfhsgdfh</Text>
    </View>
  );
};
export default page;
