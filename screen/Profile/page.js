import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Router, Actions, Scene } from 'react-native-router-flux';
// import Modal from 'react-native-modal';
import { IconButton } from 'react-native-paper';
import TextInput from 'components/TextInput/index';

import { height, width } from 'common/styles';
import styles from './style';
import Img from '../../assets/index';
import In18 from '../../common/constants';
import Buttons from '../../components/Button/index';

const page = ( p ) => {
  const {
    sdt, pass, names, address, img, isWorker
  } = p.state;

  const {
    onChangeTexts, onChangeImgAvatar, closePopups, onPressLogOut, onOpenEdit
  } = p.func;
  const { user } = p.props;
  const subMit = ( types, nameTextOld, textOld ) => {
    onOpenEdit( types, nameTextOld, textOld );
  };

  const Texts = ( props ) => {
    const txt = props.state;
    const {
      image, hideLeftIcon = true, textRight = null, styleContainer = null
    } = props;
    const icon = props.icon ? props.icon : null;
    return (
      <View style={styles.containerEdit}>
        <View style={[styles.contentDetails, styleContainer || null]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {
              image ? (
                <Image style={styles.iconName} source={image} />
              ) : null
            }
            <Text style={props.style}>
              <Text style={{ fontWeight: 'bold' }}>
                {
                  icon == null ? props.nameConent : (
                    <Text></Text>
                  )
                }
                {/* {props.nameConent} */}
              </Text> : {props.state}</Text>
          </View>

          {
            hideLeftIcon === true ? (
              <IconButton
                icon="arrow-right-bold"
                onPress={() => subMit( props.type, props.nameConent, props.state )}
              >
              </IconButton>
            ) : textRight && <View ><Text style={{ fontWeight: 'bold' }}>{textRight}</Text></View>
          }
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        {
          isWorker ? (
            <View style={{
              position: 'absolute', alignItems: 'flex-end', right: 0
            }}>
              <Text style={ { textAlign: 'right', color: 'green', lineHeight: 50 }}> <Image style={styles.isWorker} source={Img.Image.iconSuccess} /> thợ</Text>

            </View>
          ) : null
        }
        <View style={styles.containerAvatar}>
          {img ? (
            <Image style={styles.imgAvatart} source={Img.Image.img} />
          ) : (
            <Image style={styles.imgAvatart} source={Img.Image.imgAvatar} />
          )}
          <TouchableOpacity
            style={styles.iconEditAvatar}
            onPress={onChangeImgAvatar}>
            <Image style={styles.iconEditAvatar} source={Img.Image.iconEditImg} />
          </TouchableOpacity>
        </View>

        <View style={styles.containerAccount}>
          <Texts nameConent='Tên' state={`${names}`} type={'0'} image={Img.Image.iconUserName} ></Texts>
          <Texts nameConent='SDT' state={sdt} type={'1'} image={Img.Image.icCall} ></Texts>
          <Texts nameConent='Mật khẩu' state={pass} type={'2'} image={Img.Image.iconPass} ></Texts>
          {
            isWorker ? ( <View>
              <Texts nameConent='Địa chỉ' state={address} type={'3'} style={styles.txtAddress} image={Img.Image.iconAddress} ></Texts>
              <Texts nameConent='Lượt xem'
                type={'3'} style={styles.txtAddress}
                image={Img.Image.iconPoint}
                hideLeftIcon={false}
                textRight={user.luotXem}
                styleContainer={{ paddingRight: 20 }}
              ></Texts>
            </View> ) : null
          }
        </View>
      </ScrollView>
    </View>
  );
};
export default page;
