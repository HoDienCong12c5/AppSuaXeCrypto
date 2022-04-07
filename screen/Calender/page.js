import {
  View, Text, ScrollView, FlatList
} from 'react-native';
import React, { useState } from 'react';
import { height, width, Colors } from 'common/styles';
import Image from 'components/Image';
import Img from 'assets/index';
import In18 from 'common/constants';
import Button from 'components/Button';
import styles from './styles';
import Items from './Items';

export default function page( props ) {
  const { type, tempList, isWorker } = props.state;
  const { onPressOption, onPressSuccess, seenInfor } = props.func;
  const { user } = props.props;
  const [items] = useState( [
    { label: 'Tất cả', value: 0 },
    {
      label: 'Hoàn thành',
      value: 1

    },
    {
      label: 'Chờ duyệt',
      value: -1

    }
  ] );

  return (
    <View style={styles.container}>
      <View style={styles.containerOptions}>
        {
          items.map( ( item, index ) => (
            <Button
              onPress={() => onPressOption( index )}
              title={item.label}
              styleText={[type === index ? { fontWeight: 'bold' } : null]}
              styleBtn={[styles.btnOption, type === index ? {
                borderBottomWidth: 2
              } : null]}
              key={index} />
          ) )
        }
      </View>
      <View style={styles.containerBuild}>
        <FlatList
          data={tempList}
          keyExtractor={( item, index ) => index.toString()}
          renderItem={( { item } ) => <Items item={item} seenInfor={() => seenInfor( item )} submit={() => onPressSuccess( item )} sdtUser={user.sdt} ></Items>}

        />
      </View>

    </View>
  );
}
