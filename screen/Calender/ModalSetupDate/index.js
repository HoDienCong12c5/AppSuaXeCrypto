import {
  View, Text, StyleSheet, TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import Image from 'components/Image/index';
import In18 from 'common/constants';
import Button from 'components/Button';
import Img from 'assets/index';
import { height, width } from 'common/styles';
import DatePicker from 'react-native-date-picker';
import { formatDateTimeToString } from 'modals/function';

export default function index( props ) {
  const {
    isWorker, onChangeDateEnd, dateEnd, submit
  } = props;
  const [dateNow, setDate] = useState( new Date() );
  const [open, setOpen] = useState( false );
  const [dateFormat, setdateFormat] = useState( formatDateTimeToString( new Date() ) );

  const changeDate = ( date ) => {
    setDate( date );
    setdateFormat( formatDateTimeToString( date ) );
    onChangeDateEnd( formatDateTimeToString( date ) );
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Ngày hoàn thành </Text>

        <TouchableOpacity onPress={() => setOpen( !open )}>
          <View style={styles.containerButton}>
            <Image url={Img.Image.iconDateEnd} style={styles.dateEnd} />
            <Text style={{ fontWeight: 'bold' }} >{dateFormat}</Text>
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
        </TouchableOpacity>
      </View>

    </View>
  );
}
const styles = StyleSheet.create( {
  container: {
    justifyContent: 'center'
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15
  },
  dateEnd: {
    height: height( 8 ),
    width: height( 8 ),
    marginRight: 10
  }

} );
