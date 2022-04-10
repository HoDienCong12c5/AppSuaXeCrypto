import React from 'react';
import {
  View, TouchableOpacity, Image, Text, ScrollView, FlatList, styleSheet
} from 'react-native';
import { IconButton } from 'react-native-paper';
import { Router, Actions, Scene } from 'react-native-router-flux';
import Emptydata from 'container/Loading/index';
import styles from './style';
import Img from '../../assets/index';
import In18 from '../../common/constants';
import OptionFunctions from './components/optionFunction';
import Images from 'components/Image/index'
import { height } from 'common/styles';

const page = ( p ) => {
  const { listQuality, listAll } = p.state;
  const {
    onPressViewWorkerSort,
    onPressViewList

  } = p.func;
  const renderQuality = ( { item } ) => (
    <TouchableOpacity  onPress={() => Actions.infoWorker( { item } )} >
      <View style={styles.containerQualityDetail}>
        <View style={styles.containerWorkerView}>
          <Images url={Img.Image.doing} http={item.image} style={styles.avatarWorkerView}/>
        </View>
        <Text style={styles.titleQuality}>{item.name}</Text>
        <Text style={styles.luotXemQuality}>{In18.User.numberView}: {item.luotXem}</Text>  
      </View>
    </TouchableOpacity>
  );

  const cacu = ( value ) => {
    if ( ( parseInt( value, 10 ) / 1000 ) >= 1 ) {
      // console.log( ( parseInt( value, 10 ) / 1000 ) );
      return `${value * 0.001} (km)`;
    }
    return `${value} (m)`;
  };
  const renderItemWorker = ( { item } ) => {
    const {
      image, name, sdt, distance, luotXem, address
    } = item;
    const urlImg  = image ? image : Img.Image.iconWorkerMap;
    return (
      <TouchableOpacity
        onPress={() => Actions.infoWorker( { item } )}
        style={styles.containerWorker}
      >
        <View>
          <View style={styles.containerWorkerDetail} >
            <View style={styles.imgAvatarWorker}>
              <View style={styles.containerImageWorker} >
                <Images http={image||null} url ={urlImg} style={styles.avatarWorker}  />
              </View>
              {/* <Image source={Img.Image.imgAvatar} style={styles.imgAvatarWorker} /> */}
            </View>
            <View style={{left:height( -3 )}}>
              <Text style={[styles.textAll, styles.titleContentWorker]}>{name} </Text>
              <Text style={[styles.textAll, styles.numberPhonetDetailWorker]}>{sdt}</Text>
              <Text style={[styles.textAll, styles.viewContentWorker]}>Lượt xem: {luotXem} </Text>
              <Text style={[styles.textAll, styles.addressContentWorker]}>ĐC: {address} </Text>
            </View>
            <View style={{ paddingRight:20, flexDirection:'row' , right:20}}>
              <Image source={Img.Image.icCall} style={styles.icCallQuality} /> 
            </View>

          </View> 
        </View>
       
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {/* <Text>Chức năng</Text>
        <View style={styles.containerOption}>
          {
            // eslint-disable-next-line max-len
            listOptions.map( ( items, index ) => <OptionFunctions items={items} func={() => {}} key={index} ></OptionFunctions> )
          }
        </View> */}
        <View style={styles.optionMenu}>
          <Text style={styles.titleOption}>{In18.Options.quality}</Text>
          <View style={styles.optionMenuDetail}>
            <Text >chi tết</Text>
            <IconButton
              icon="arrow-right-bold"
              onPress={() => onPressViewWorkerSort()}
            >
            </IconButton>

          </View>
        </View>
        <FlatList
          data={listQuality}
          contentContainerStyle={{
            flexDirection: 'row'
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderQuality}
          keyExtractor={( item ) => item.id}
          ListEmptyComponent={<Emptydata />}
        >
        </FlatList>
        <View style={styles.optionMenu}>
          <Text style={styles.titleOption}>{In18.List.listSearch}</Text>
          <View style={styles.optionMenuDetail}>
            <Text >chi tết</Text>
            <IconButton
              icon="arrow-right-bold"
              onPress={() => onPressViewList()}
            >
            </IconButton>

          </View>

        </View>

        <View style={{ flex: 1 }}>
          <FlatList
            data={listAll}

            renderItem={( item ) => renderItemWorker( item )}
            keyExtractor={( item ) => item.id}
            ListEmptyComponent={<Emptydata />}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          >
          </FlatList>
        </View>
      </ScrollView>
    </View>

  );
};
export default page;
