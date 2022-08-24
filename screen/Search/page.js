import React, { useEffect, useState } from 'react';
import {
  View, FlatList, Text, TouchableOpacity, Alert, ScrollView
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import Geolocation from 'react-native-geolocation-service';
import TextInput from 'components/TextInput';
import MapView, { Marker, PROVIDER_GOOGLE, Callout } from 'react-native-maps';
import Img from 'assets';
import Image from 'components/Images';
import {Colors} from 'common/Colors';
import styles from './style';
import In18 from '../../common/constants';
import Button from '../../components/Buttons';
import Items from './components/Items';

const page = ( p ) => {
  const { list, currentIndex, isShowMap } = p.state;
  const { onPressInfoWorker, onChangeType } = p.func;
  const { user, listWorkerNearLimit } = p.props;
  console.log( 'listWorkerNearLimit', listWorkerNearLimit );
  const render = ( { item } ) => (
    <Items currentIndex={currentIndex} item={item} onPressInfoWorker={() => onPressInfoWorker( item )}/>
  );
  const listOptions = [
    {
      name: In18.Options.quality
    },
    {
      name: In18.Options.near
    },
    {
      name: 'Bản đồ'
    }
  ];
  const RenderOptions = ( props ) => {
    const { itemOptions, indexOptions } = props;
    return (
      <TouchableOpacity onPress={() => onChangeType( indexOptions )}>
        <View style={styles.containerOptions}>
          <Text style={currentIndex === indexOptions ? styles.nameOptions : styles.nameUnOptions}>{`${itemOptions.name}`}</Text>
          <View style={currentIndex === indexOptions ? styles.lineOptions : {}}/>
        </View>
      </TouchableOpacity>

    );
  };
  return (
    <View style={styles.container} >
      <View>
        <View style={styles.option}>
          {
            listOptions.map( ( item, index ) => <RenderOptions itemOptions={item} indexOptions={index} key ={index}></RenderOptions> )
          }
        </View>
      </View>
      {
        isShowMap ? (
          <>
            <MapView
              provider={PROVIDER_GOOGLE}
              showsUserLocation={true}
              initialRegion={{
                latitude: user.x,
                longitude: user.y,
                latitudeDelta: 0.5,
                longitudeDelta: 0.5
              }}
              style={styles.map}
            >
              {
                listWorkerNearLimit.map( ( item, index ) => (
                  <Marker
                    // onPress={() => onPressInfoWorker( item )}
                    onCalloutPress={() => onPressInfoWorker( item )}
                    key ={index}
                    coordinate={{
                      latitude: parseFloat( item.x ),
                      longitude: parseFloat( item.y )
                    }}
                    title={item.name}
                    description={item.sdt}
                  >
                    <Image url={ Img.Image.iconWorkerMap} http={item.image || null}
                      style={styles.avatarMapWorker}
                      stylesContainerImage={[styles.borderAvatarWorker, item.image ? { borderColor: Colors.YELLOW, borderWidth: 1 } : null]}
                    ></Image>
                  </Marker>
                ) )
              }
            </MapView>
          </>
        ) : (
          <>
            <View style={styles.flatList}>
              <FlatList
                data={list}
                keyExtractor={( item ) => item.id}
                renderItem={render}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              >
              </FlatList>
            </View>
          </>
        )
      }

    </View>
  );
};
export default page;
