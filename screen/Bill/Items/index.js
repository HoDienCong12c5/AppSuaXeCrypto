import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import In18 from 'common/constants';
import Image from 'components/Image';
import Img from 'assets/index';
import { formatStringToDateTime } from 'modals/function';
import styles from './styles';

export default function index( props ) {
  const { item, submit, isWorker } = props;
  const isOnPress = item.status == 0;
  const date = formatStringToDateTime( item.date );
  return (
    <View>
      {
        isOnPress ? (
          <>
            <TouchableOpacity onPress={submit}>
              <View style={styles.containerItem}>
                <View>
                  <View style={styles.containerItemDetail}>
                    <Text>{isWorker ? In18.User.numberCustomer : In18.User.numberWorker}: {isWorker ? item.sdtCustomer : item.sdtWorker} </Text>
                  </View>
                  <View style={styles.containerItemDetail}>
                    <Text style={styles.dateAndStatus}>{In18.NormalTitle.dateCall} : {date} </Text>
                  </View>

                  <View style={styles.containerItemDetail}>
                    <Text style={styles.dateAndStatus}>{In18.NormalTitle.note} : {item.note} </Text>
                  </View>
                  <View style={styles.containerItemDetail}>
                    <Text>{In18.NormalTitle.statusWork} : </Text>
                    {item.status === '1' ? (
                      <Text style={[styles.dateAndStatus, styles.hoanThanh]}>
                        {In18.NormalTitle.success}
                      </Text>
                    ) : (
                      <Text style={[styles.dateAndStatus, styles.dangLam]}>
                        {In18.NormalTitle.doing}
                      </Text>
                    )}
                  </View>
                </View>
                <View>
                  {item.status == '0' ? (
                    <Image
                      style={styles.succes}
                      url={Img.Image.iconSuccess}
                    />
                  ) : null}
                </View>
              </View>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {
              !isOnPress ? (
                <>
                  <View style={styles.containerItem}>
                    <View>
                      <View style={styles.containerItemDetail}>
                        <Text>{isWorker ? In18.User.numberCustomer : In18.User.numberWorker}: {isWorker ? item.sdtCustomer : item.sdtWorker} </Text>
                      </View>
                      <View style={styles.containerItemDetail}>
                        <Text style={styles.dateAndStatus}>{In18.NormalTitle.dateCall} : {date} </Text>
                      </View>
                      <View style={styles.containerItemDetail}>
                        <Text style={styles.dateAndStatus}>{In18.NormalTitle.note} : {item.note} </Text>
                      </View>
                      <View style={styles.containerItemDetail}>
                        <Text>{In18.NormalTitle.statusWork} : </Text>
                        {item.status == '1' ? (
                          <Text style={[styles.dateAndStatus, styles.hoanThanh]}>
                            {In18.NormalTitle.success}
                          </Text>
                        ) : (
                          <Text style={[styles.dateAndStatus, styles.dangLam]}>
                            {In18.NormalTitle.doing}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View>
                      {item.status == '1' ? (
                        <Image
                          style={styles.succes}
                          url={Img.Image.iconSuccess}
                        />
                      ) : null}
                    </View>
                  </View>
                </>
              ) : null
            }

          </>
        )
      }

    </View>
  );
}
