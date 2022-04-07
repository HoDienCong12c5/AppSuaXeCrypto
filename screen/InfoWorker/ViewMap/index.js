import { View, Text } from 'react-native';
import React, { useState } from 'react';
import MapView, {
  Marker, PROVIDER_GOOGLE
} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Img from 'assets/index';
import Image from 'components/Image/index';
import Colors from 'common/Colors';
import styles from './styles';

export default function index( props ) {
  const { user, worker } = props;
  const [coordinates] = useState( [
    {
      latitude: user.x,
      longitude: user.y
    },
    {
      latitude: parseFloat( worker.x ),
      longitude: parseFloat( worker.y )
    }
  ] );
  return (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
          latitude: user.x,
          longitude: user.y,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3
        }}
        style={styles.container}
      >
        {/* <MapViewDirections
          origin={coordinates[0]}
          destination={coordinates[1]}
          apikey='AIzaSyBcDkHI6bApA-Q7rmIGVOu61Rtb8PO2Cgs' // insert your API Key here
          strokeWidth={4}
          strokeColor="#111111"
        /> */}
        <Marker
          key ={index}
          coordinate={{
            latitude: parseFloat( worker.x ),
            longitude: parseFloat( worker.y )
          }}
          title={worker.name}
          description={worker.sdt}
        >
          <Image url={ Img.Image.iconWorkerMap} http={worker.image || null}
            style={styles.avatarMapWorker}
            stylesContainerImage={[styles.borderAvatarWorker, worker.image ? { borderColor: Colors.YELLOW, borderWidth: 1 } : null]}
          ></Image>
        </Marker>
        {/* <Polyline
          coordinates={coordinates}
          strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
          strokeColors={['#7F0000']}
          strokeWidth={6}
        /> */}
      </MapView>
    </View>
  );
}
