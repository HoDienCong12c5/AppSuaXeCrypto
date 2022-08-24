import { View, ActivityIndicator, Text } from 'react-native';
import React, { useState } from 'react';
import Images from 'components/Images';
import Img from 'assets';
import {Colors} from 'common/Colors';
import styles from './style';

const Loading = ( props ) => {
  const { isOnDown = false, icon , isFinish=false, isWatting=false} = props;
  const [isStop, setisStop] = useState( false );
  const isStopLoading = () => {
    if( !isWatting )
      setTimeout( () => {
        setisStop( true );
      }, 2500 );
  };
  isStopLoading();
  return (
    <View style={styles.containerTest}>

      {
        isStop ? (
          <View>
            {
              isOnDown ? (
                <Images
                  url={icon || Img.Image.iconEmpty}
                  style={styles.iconLoading}
                >
                </Images>
              ) : (
                <Images
                  url={icon || Img.Image.iconEmpty2}
                  style={styles.iconLoading}
                >
                </Images>
              )
            }
          </View>

        ) : (
          <ActivityIndicator size={60} color={Colors.YELLOW} />
        )
      }

    </View>
  );
};
export default Loading;
