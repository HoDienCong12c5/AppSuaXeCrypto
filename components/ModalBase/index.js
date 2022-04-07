import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Button from 'components/Button';
import In18 from 'common/constants';
import { width, height } from 'common/styles';
import Image from 'components/Image';
import Img from 'assets/index';

export default function index( props ) {
  const {
    title, description, onPressSuccess, onPressClose, titleBtnSuccess, titleBtnClose,
    noIcon = false, isBtnSuccess = true, customView = null, customViewButton = null
  } = props;
  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        {
          customView || (
            <View>
              {
                noIcon === true ? null : (
                  <Image url={Img.Image.iconWarning} style={styles.iconWarning}></Image>
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
        customViewButton || (
          <View style={styles.containerBtn}>
            {
              isBtnSuccess ? (
                <Button styleBtn={styles.styleBtn} title={titleBtnSuccess || In18.NormalTitle.success } onPress={onPressSuccess}></Button>

              ) : null
            }
            <Button styleBtn={styles.styleBtn} title={titleBtnClose || In18.TitleBtn.close} onPress={onPressClose}></Button>
          </View>
        )
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
    marginLeft: width( 5 )
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
