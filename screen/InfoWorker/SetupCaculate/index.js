import React, { useState } from 'react';
import { View, Text } from 'react-native';
import Button from 'components/Button';
import CheckBox from '@react-native-community/checkbox';
import DatePicker from 'react-native-date-picker';
import { formatDateTimeToString } from 'modals/function';
import TextInputs from 'components/TextInput';
import { height, width } from 'common/styles';
import Img from 'assets/index';
import Image from 'components/Image';
import { TextInput } from 'react-native-paper';
import Colors from 'common/Colors';
import styles from './style';

export default function SetupCaculate( props ) {
  const {
    onChangeNote, onChangeAddress, onSubMit, sdtWorker, close, address
  } = props;
  // useState
  const [iCheck, setIsCheck] = useState( 0 );
  const [dateNow, setDate] = useState( new Date() );
  const [open, setOpen] = useState( false );
  const [dateFormat, setdateFormat] = useState( formatDateTimeToString( new Date() ) );
  const changeDate = ( date ) => {
    setDate( date );
    setdateFormat( formatDateTimeToString( date ) );
  };
  return (
    <View>
      <View>
        <Text style={styles.title}>Lên Lịch bảo trì</Text>

      </View>
      <View style={styles.containerContent}>
        <Text style={styles.textSTD}>SDT thợ : </Text>
        <Text style={styles.textSTD}>{sdtWorker}</Text>
      </View>

      <View style={styles.containerContent}>
        <Button
          styleText={styles.styleTextChangDate}
          icon={Img.Image.iconCalender}
          title={ dateFormat}
          styleBtn={styles.styleBtnDate}
          onPress={() => setOpen( !open )}
        ></Button>
        <DatePicker
          mode='date'
          modal
          open={open}
          date={dateNow}
          onConfirm={( date ) => {
            setOpen( false );

            changeDate( date );
          }}
          onCancel={() => {
            setOpen( false );
          }}
        />
      </View>
      <View style={styles.containerContent}>
        <Button
          styleText={styles.styleTextChangDate}
          icon={Img.Image.iconDateEnd}
          // title={ dateFormat}
          styleBtn={styles.styleBtnDate}
          // onPress={() => setOpen( !open )}
        ></Button>
        <Text style={styles.enterWorker}>Thợ sẽ điền ngày kết thúc </Text>
      </View>
      <View style={styles.containerContent}>
        <TextInput
          mode="outlined"
          label="Đại chỉ Cần tới :"
          value={address}
          activeOutlineColor={Colors.YELLOW}
          outlineColor={Colors.YELLOW}
          activeUnderlineColor={Colors.YELLOW}
          onChangeText={( text ) => onChangeAddress( text )}
          style={styles.address}
          multiline
        />
      </View>
      <View style={styles.containerContent}>
        <Text>
          Nội dung :
        </Text>
      </View>
      <TextInputs
        style={{ justifyContent: 'flex-start' }}
        noIcon styleInput={styles.styleNote}
        style={{ width: width( 80 ) }}
        numberOfLines={4}
        onChangeText={( text ) => onChangeNote( text )}
      >
      </TextInputs>
      <View style={styles.containerButton}>
        <Button
          styleText={styles.styleTextChangDate}
          // icon={Img.Image.iconCalender}
          title={ 'Xác nhận '}
          styleBtn={styles.styleBtnSubmit}
          onPress={() => onSubMit( dateFormat, iCheck )}
        ></Button>
        <Button
          styleText={styles.styleTextChangDate}
          // icon={Img.Image.iconCalender}
          title={ 'Thoát'}
          styleBtn={styles.styleBtnClose}
          onPress={close}
        ></Button>
      </View>
    </View>
  );
}
