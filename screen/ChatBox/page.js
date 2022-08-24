import React from 'react';
import {
  View, StyleSheet, TouchableOpacity, Image, Text, FlatList
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
import CheckBox from '@react-native-community/checkbox'; 
import In18 from 'common/constants';
import TextInput from 'components/TextInput';
import { height, width } from 'common/styles';
import styles from './styles';
import Img from '../../assets';
import Buttons from 'components/Buttons';
import Emptydata from 'container/Loading';
const page = ( p ) => {
  const {
    changeText,
    onPressSelect

  } = p.func; 
  const { list, listRecommend, text } = p.state;
  const { calender } = p.props;
  const renderItem = ( { item } ) => {
    
    return(
      !item.isUser?(
        <View style={styles.left} >
          <Text style={styles.textLeft} > {item.connect ?? 'giá khoảng 50  - 1 triệu'}</Text>
        </View>
      ):(
        <View style={styles.right}>
          <Text style={styles.textRight} >  {item.connect}</Text>
        </View>
      )
    )
  }
  const renderListComend = ( { item, index } ) => { 
    return(
      <Buttons styleBtn={{marginHorizontal:2 }}title={item} onPress={()=>onPressSelect( item )} />
    )
  }
  return (
    <View style={styles.container} >
      <View style={styles.body}> 
        <FlatList
          renderItem={renderItem}
          keyExtractor={( item, index ) => index.toString()}
          data={list}
          inverted
          ListEmptyComponent={<Emptydata isOnDown/>}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
        </FlatList>
      </View>
      <View style={{flexDirection:'row'}}>
        {/* {
          listRecommend.map( ( item, index ) => (
            <Text key={index}>sdgfhsdghf</Text>
          ) )
        } */}
        <FlatList
          data={listRecommend} 
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={renderListComend}
          keyExtractor={( item ) => item.id}
          ListEmptyComponent={<Emptydata />}
        ></FlatList>
      </View>
      <View style={styles.containerSend}>
        <TextInput
          style={styles.input}
          noIcon
          value={text}
          onChangeText={( text )=>changeText( text )}
        />
        <TouchableOpacity
          onPress={()=>onPressSelect( text )}
        >
          <View style={styles.iconButton}>
            <Image 
              source={Img.Image.iconSend} 
              style={styles.iconSend}/>

          </View>
        </TouchableOpacity>
        
      </View>
    </View>
  );
};
export default page;
