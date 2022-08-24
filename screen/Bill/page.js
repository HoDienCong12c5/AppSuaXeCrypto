import {
  View, FlatList
} from 'react-native';
import React from 'react';
import styles from './styles';
import Items from './Items';

export default function page( props ) {
  const { type, tempList, isWorker } = props.state;
  const { onPressOption, onPressSuccess } = props.func;
  const { user } = props.props;
  return (
    <View style={styles.container}>
      {/* <View style={styles.containerOptions}>
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
      </View> */}
      <View style={styles.containerBuild}>
        <FlatList
          data={tempList}
          keyExtractor={( item, index ) => index.toString()}
          renderItem={( { item } ) => <Items item={item} submit={() => onPressSuccess( item )} isWorker={isWorker}></Items>}

        />
      </View>

    </View>
  );
}
