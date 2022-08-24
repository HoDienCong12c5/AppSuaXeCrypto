import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from 'components/Buttons';
import In18 from 'common/constants';
import { width, height } from 'common/styles';
import Image from 'components/Images';
import Img from 'assets';

export default function index( props ) {
  const {
    title, description, onPressSuccess, onPressClose, titleBtnSuccess, titleBtnClose,
    noIcon = false, isBtnSuccess = true, customView = null, customViewButton = null, isShowBtn=false,
    icon=null
  } = props;
  console.log( isShowBtn );
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {
          customView || (
            <View>
              {
                noIcon === true ? null : (
                  <Image url={icon||Img.Image.iconWarning} style={styles.iconWarning}></Image>
                )
              }
              <View style={styles.content}>
                {
                  title ? (
                    <Text style={styles.title}>{title}</Text>
                  ) : null
                }
                <Text style={styles.description}>{description} ?</Text>
              </View>

            </View>

          )
        }
      </View>
      {
        !isShowBtn ?  customViewButton || (
          <View style={styles.containerBtn}>
            {
              isBtnSuccess ? (
                <Button styleBtn={styles.styleBtn} title={titleBtnSuccess || In18.NormalTitle.success } onPress={onPressSuccess}></Button>

              ) : null
            }
            <Button styleBtn={styles.styleBtn} title={titleBtnClose || In18.TitleBtn.close} onPress={onPressClose}></Button>
          </View>
        ):null
      }

    </View>
  );
}
const styles = StyleSheet.create( {
  container: {
  },
  content: {
    marginBottom: 30,
    alignItems: 'center'
  },
  containerBtn: {
    justifyContent: 'space-around',
    flexDirection: 'row'
  },
  iconWarning: {
    height: height( 10 ),
    width: height( 10 ), 
    alignSelf: 'center'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'

  },
  description: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20
  },
  styleBtn: {
    width: width( 35 ),
    paddingHorizontal: 0
  }
} );
