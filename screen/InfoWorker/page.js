import React from 'react';
import {
  View, TouchableOpacity, Image, TextInput, ScrollView, Text
} from 'react-native';
import Img from 'assets/index';
import In18 from 'common/constants';
import Buttons from 'components/Button/index';
import styles from './style';

const page = ( p ) => {
  // const { onPressSetup onPressCall } = p.func;

  const { item } = p.props;
  const { onActionScreen } = p.func;
  const {
    name, sdt, img, address, luotXem
  } = item;
  const isWorker = item.checkWorker == 1;
  return (
    <View style={styles.container}>
      <ScrollView showsHorizontalScrollIndicator={ false }
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
        <View style={styles.containerTest}>

          <View style={styles.containerAvatar}>
            <Image style={styles.imgAvatar} source={img || Img.Image.imgAvatar} />
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.titleContent}>{In18.User.name} : </Text>
            <Text style={styles.contentDetail}>{name}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.titleContent}>{In18.User.numberPhone} : </Text>
            <Text style={styles.contentDetail}>{sdt}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.titleContent}>{In18.User.fixedAddress} : </Text>
            <Text style={styles.contentDetailAddress}>{address}</Text>
          </View>
          <View style={styles.containerInfo}>
            <Text style={styles.titleContent}>{In18.User.numberView} : </Text>
            <Text style={styles.contentDetailLuotXem}>{luotXem}</Text>
          </View>
          <View>
            <View style={styles.containerTestBtn}>

              <Buttons
                title={In18.TitleBtn.setUpCalendar}
                onPress={() => onActionScreen( 0 )}
                styleBtn={styles.styleBtn}
                icon={ Img.Image.iconCalender }
                styleText={styles.styleTextBtn}
              ></Buttons>
              <Buttons
                title={In18.NormalTitle.message}
                onPress={() => onActionScreen( 1 )}
                styleBtn={styles.styleBtn}
                icon={ Img.Image.icMess}
                styleText={styles.styleTextBtn}
              />
            </View>
            <View style={styles.containerTestBtn}>
              <Buttons
                title={In18.TitleBtn.callNow}
                onPress={() => onActionScreen( 2 )}
                styleBtn={styles.styleBtn}
                icon={ Img.Image.icCall}
                styleText={styles.styleTextBtn}
              ></Buttons>
              <Buttons
                title={In18.TitleBtn.viewMap}
                onPress={() => onActionScreen( 3 )}
                styleBtn={styles.styleBtn}
                icon={ Img.Image.iconMap}
                styleText={styles.styleTextBtn}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default page;
