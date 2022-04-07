import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import In18 from 'common/constants';
import Image from 'components/Image/index';
import Img from 'assets/index';
import Colors from 'common/Colors';
import { height, width } from 'common/styles';

import styles from './styles';

export default function index( props ) {
  const {
    item, submit, isWorker, sdtUser, seenInfor
  } = props;
  const isOnPress = item.status == 0;
  const { date, dateEnd, status } = item;
  const person = sdtUser == item.sdtCustomer ? 'Thợ' : 'Khách';
  const sdt = sdtUser == item.sdtCustomer ? item.sdtWorker : item.sdtCustomer;
  // useState date

  return (
    <View>
      <View>
        {
          status == -1 ? null : (
            <View>
              {

                isOnPress ? (
                  <>
                    <View style={styles.containerItem}>
                      <View style={{ width: width( 68 ) }}>
                        <TouchableOpacity onPress={seenInfor}>
                          <View style={styles.containerItemDetail}>
                            <Image url={Img.Image.icCall} style={styles.icon }></Image>
                            <Text style={{ fontSize: 15, color: Colors.BLUE1 }}>{person} : {sdt} </Text>
                          </View>
                        </TouchableOpacity>

                        <View style={styles.containerItemDetail}>
                          <Image url={Img.Image.iconCalender2} style={styles.icon } ></Image>
                          <Text style={styles.dateAndStatus}> {date} </Text>
                        </View>
                        <View style={styles.containerItemDetail}>
                          <Image url={Img.Image.iconDateEnd} style={styles.icon } ></Image>
                          <Text style={styles.dateAndStatus}>{dateEnd || 'Chưa chọn ngày'}
                            {
                              dateEnd ? null : (
                                <View style={styles.containerItemDetail}>
                                  <Image url={Img.Image.iconQuestion} style={styles.iconQuestion } ></Image>

                                </View>
                              )
                            }

                          </Text>
                        </View>
                        <View style={styles.containerItemDetail}>
                          <Image url={Img.Image.iconAddress2} style={styles.icon }></Image>
                          <Text legacyImplementation style={styles.dateAndStatus}> {item.address} </Text>
                        </View>
                        <View style={styles.containerItemDetail}>
                          <Image url={Img.Image.iconNote2} style={styles.icon }></Image>
                          <Text style={styles.dateAndStatus}> {item.note} </Text>
                        </View>
                        <View style={styles.containerItemDetail}>
                        </View>
                      </View>
                      <View style={styles.right}>
                        <TouchableOpacity onPress={submit}>
                          {
                            item.status == '1' ? (
                              <View>
                                <Image
                                  style={styles.succes}
                                  url={Img.Image.iconSuccess}
                                />
                              </View>

                            ) : (
                              <View>
                                <Image
                                  style={styles.doing}
                                  url={Img.Image.iconQuestion}
                                />
                                <Text style={{ textAlign: 'center', color: Colors.BLUE1 }}> Duyệt</Text>

                              </View>

                            )}

                        </TouchableOpacity>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    {
                      !isOnPress ? (
                        <>
                          <View style={styles.containerItem}>
                            <View style={{ width: width( 68 ) }}>
                              <TouchableOpacity onPress={seenInfor}>
                                <View style={styles.containerItemDetail}>
                                  <Image url={Img.Image.icCall} style={styles.icon }></Image>
                                  <Text style={{ fontSize: 15, color: 'green' }}>{person}: {sdt} </Text>
                                </View>
                              </TouchableOpacity>
                              <View style={styles.containerItemDetail}>
                                <Image url={Img.Image.iconCalender2} style={styles.icon } ></Image>
                                <Text style={styles.dateAndStatus}> {date} </Text>
                              </View>
                              <View style={styles.containerItemDetail}>
                                <Image url={Img.Image.iconDateEnd} style={styles.icon } ></Image>
                                <Text style={styles.dateAndStatus}>{dateEnd || 'Chưa chọn ngày'}
                                  {
                                    dateEnd ? null : (
                                      <View style={styles.containerItemDetail}>
                                        <Image url={Img.Image.iconQuestion} style={styles.iconQuestion } ></Image>

                                      </View>
                                    )
                                  }

                                </Text>
                              </View>
                              <View style={styles.containerItemDetail}>
                                <Image url={Img.Image.iconAddress2} style={styles.icon }></Image>
                                <Text legacyImplementation style={styles.dateAndStatus}> {item.address} </Text>
                              </View>
                              <View style={styles.containerItemDetail}>
                                <Image url={Img.Image.iconNote2} style={styles.icon }></Image>
                                <Text style={styles.dateAndStatus}> {item.note} </Text>
                              </View>
                              <View style={styles.containerItemDetail}>

                              </View>
                            </View>
                            <View style={styles.right}>
                              {item.status == '1' ? (
                                <View>
                                  <Image
                                    style={styles.succes}
                                    url={Img.Image.iconSuccess}
                                  />
                                  <Text style={{ textAlign: 'center', color: 'green' }}>Hoàn thành</Text>

                                </View>

                              ) : (
                                <View>
                                  <Image
                                    style={styles.doing}
                                    url={Img.Image.doing}
                                  />
                                  <Text style={{ textAlign: 'center', color: item.status == '0' ? Colors.BLUE1 : null }}>Đang chờ</Text>
                                </View>

                              )}

                            </View>
                          </View>
                        </>
                      ) : null
                    }

                  </>
                )
              }
            </View>
          )
        }
      </View>

    </View>
  );
}
