import {
  View, Text, TouchableOpacity, StyleSheet
} from 'react-native';
import React from 'react';
import Image from 'components/Image';
import Img from 'assets/index';
import CheckBox from '@react-native-community/checkbox';
import { height, width } from 'common/styles';
import Colors from 'common/Colors';

const Index = ( props ) => {
  const { items, sdtUser, userOther } = props;
  const isRight = items.sdtSend == sdtUser;
  return (
    <View style={[styles.container, styles[`container${isRight == true ? 'Right' : {}}`]]}>
      <View style={{ flexDirection: 'row' }}>
        {
          isRight ? null : <Image http={items.image ? items.image : null } url={Img.Image.imgAvatar} style={styles.avatar}></Image>

        }
        <View style={[styles.body, styles[`body${isRight == true ? 'Right' : {}}`]]}>
          <View style={isRight ? { alignItems: 'flex-end' } : {}}>
            <Text style={styles.content} multiline>{items.note}</Text>
          </View>
          <View style={isRight ? { alignItems: 'flex-end' } : {}}>
            <Text style={styles.date}>{items.date}</Text>

          </View>

        </View>
        {
          items.status === 0 ? (
            <View style={styles.right}>
              <CheckBox
                onValueChange={() => {}}

                value={true}
              ></CheckBox>
            </View>
          ) : null
        }
      </View>

    </View>

  );
};
const styles = StyleSheet.create( {
  container: {
    flex: 1,
    width: width( 92 ),
    alignItems: 'flex-start',
    marginVertical: 5
  },
  containerRight: {
    alignItems: 'flex-end'
  },
  body: {
    justifyContent: 'center',
    backgroundColor: Colors.GRAY2,
    padding: 5,
    borderRadius: 12,
    borderBottomLeftRadius: 0,
    paddingHorizontal: 10
  },
  bodyRight: {
    alignItems: 'flex-end',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 0,

    backgroundColor: '#ffdab9'
  },
  avatar: {
    height: height( 9 ),
    width: height( 9 ),
    marginRight: 10,
    borderRadius: 50
    // resizeMode: 'contain'
  },
  textRight: {
    alignSelf: 'flex-end',
    width: width( 70 ),
    flexWrap: 'wrap'
  },
  textLeft: {
    width: width( 70 ),
    flexWrap: 'wrap'
  },
  content: {
    fontSize: 16,
    color: 'black'
  },
  date: {
    fontSize: 10,
    margin: 2
  }
} );
export default Index;
