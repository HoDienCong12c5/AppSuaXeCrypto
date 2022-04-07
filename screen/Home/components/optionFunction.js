import React, { useState, useCallback, useEffect } from 'react';
import {
  View, TouchableOpacity, Text, styleSheet, FlatList
} from 'react-native';
import Image from 'components/Image/index';
import styles from './style';

const OptionFunctions = ( props ) => {
  const { items, func } = props;

  return (
    <TouchableOpacity style={styles.container} onPress={func}>
      <Image url={items.image} styleImage={styles.styleImage}/>
      <Text>
        {items.title}
      </Text>
    </TouchableOpacity>
  );
};
export default OptionFunctions;
