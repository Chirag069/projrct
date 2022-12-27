import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
  LogBox,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  TextInput,
  Pressable,
  Keyboard,
  refreshControl,
  Switch,
  ImageBackground,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  afterEditAction,
  billArrayAction,
  CustomerListAction,
  deleteqrdataAction,
  editPriceAction,
  editpricepidAction,
  getqrdataAction,
  qrAction,
  qrdataAction,
  qrdataclearAction,
  qrdatadeleteAction,
  qrListAction,
  qtyincrimentAction,
  restartBillAction,
  SubmiBillAction,
  toggleCreateBillModelAction,
  togglepriceModelAction,
  toggleQtyModelAction,
} from '../redux/actions/QrcodeAction';
import {LoggedAction} from '../redux/actions/authActons';
import {userLoginAction} from '../redux/actions/authActons';
import CreateBillModel from '../components/Custom/CreateBillModel';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import QtyModel from '../components/Custom/QtyModel';
import PriceModel from '../components/Custom/PriceModel';
import Feather from 'react-native-vector-icons/Feather';
import {useFocusEffect} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateBill = ({navigation}) => {
  const [qrcode, setQrcode] = useState(null);

  const dispatch = useDispatch();
  const {Token, userdata} = useSelector(state => state.authState);
  const {
    qrdata,
    qrLoading,
    billsubmitloading,
    updateloading,
    getqrdata,
    deleteloading,
    restartloading,
  } = useSelector(state => state.qrState);
  const refInput = useRef();
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  // const selectcustomer = () => {
  //   if (getqrdata.length > 0) {
  //     dispatch(toggleCreateBillModelAction());
  //     dispatch(CustomerListAction(Token));
  //   } else {
  //     Toast.show({
  //       text1: 'Please Scan QR',
  //       visibilityTime: 2000,
  //       autoHide: true,
  //       position: 'top',
  //       type: 'success',
  //     });
  //   }
  // };

  const selectcustomer = () => {
    (async () => {
      const billdate = await AsyncStorage.getItem('@Bill_Date');
      const customerid = await AsyncStorage.getItem('@Customer');

      if (billdate && customerid) {
        getqrdata.map(item =>
          dispatch(
            SubmiBillAction(
              Token,
              billdate,
              customerid,
              item.productid,
              item.qty,
              item.pieces,
              item.price,
              item.total,
              item.color,
            ),
          ),
        );
        dispatch(toggleCreateBillModelAction());
      } else {
        Alert.alert('Please Select Customer');
      }
    })();
  };

  const onchange = async text => {
    setQrcode(text);
    if (text?.length >= 6) {
      dispatch(qrdataAction(Token, text));
      setQrcode([]);
    }
  };

  useEffect(() => {
    isEnabled ? refInput.current?.focus() : false;
  }, [onchange]);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getqrdataAction(Token));
      (async () => {
        const billdate = await AsyncStorage.getItem('@Bill_Date');
        const customerid = await AsyncStorage.getItem('@Customer');
        dispatch(toggleCreateBillModelAction());
        // if (billdate && customerid) {
        // } else {
        //   dispatch(toggleCreateBillModelAction());
        // }
      })();
    }, []),
  );

  return (
    <>
      {billsubmitloading || restartloading ? (
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
            paddingVertical: verticalScale(20),
          }}>
          <StatusBar backgroundColor={'#9ECED9'} barStyle="dark-content" />
          <ActivityIndicator
            animating={billsubmitloading || restartloading}
            color={'#9ECED9'}
            size={scale(30)}
          />
        </View>
      ) : (
        <SafeAreaView style={{backgroundColor: '#F5F5F5', flex: 1}}>
          <StatusBar backgroundColor={'#9ECED9'} barStyle="dark-content" />
          <CreateBillModel navigation={navigation} />
          <QtyModel navigation={navigation} />
          <PriceModel navigation={navigation} />

          <View
            style={{
              paddingLeft: scale(15),
              paddingVertical: verticalScale(7),
              backgroundColor: '#FFFFFF',
              borderBottomColor: '#9ECED9',
              borderBottomWidth: scale(0.2),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                color: '#9ECED9',
                fontWeight: 'normal',
                fontSize: scale(20),
                fontFamily: 'Cairo-Black',
              }}>
              SCANNER
            </Text>

            <TouchableOpacity
              onPress={async () => {
                const userid = await AsyncStorage.getItem('@user_id');
                Alert.alert(
                  'Restart',
                  'Are you sure you want to restart bill',
                  [
                    {
                      text: 'OK',
                      onPress: () => dispatch(restartBillAction(Token, userid)),
                    },
                    {text: 'Cancel'},
                  ],
                );
              }}>
              <FontAwesome
                name="power-off"
                size={scale(27)}
                color={'#9ECED9'}
              />
            </TouchableOpacity>

            <View
              style={{
                marginRight: scale(5),
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: 'Cairo-Black',
                    fontSize: scale(17),
                    color: '#9ECED9',
                  }}>
                  FOCUS{' '}
                </Text>
                <Text
                  style={{
                    fontFamily: 'Cairo-Black',
                    fontSize: scale(17),
                    color: isEnabled ? 'green' : '#E47946',
                  }}>
                  {isEnabled ? 'ON' : 'OFF '}
                </Text>
              </View>
              <Switch
                trackColor={{false: '#767577', true: '#9ECED9'}}
                thumbColor={isEnabled ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>

          <View
            style={{
              marginHorizontal: scale(10),
            }}>
            <TextInput
              placeholder="Enter QR Code"
              placeholderTextColor={'#666666'}
              activeUnderlineColor={'#9ECED9'}
              underlineColor="black"
              keyboardType="numeric"
              onBlur={() => {
                isEnabled ? refInput.current.focus() : null;
              }}
              ref={refInput}
              style={{
                color: '#000000',
                backgroundColor: '#F5F5F5',
                fontSize: scale(15),
                borderBottomWidth: 1,
              }}
              onChangeText={text => onchange(text)}
              // onSubmitEditing={() => qrcallfunction(qrcode)}
              value={qrcode}
            />
            <View
              style={{
                marginTop: verticalScale(10),
                marginBottom: verticalScale(10),
              }}>
              <CustomButton
                buttoncolor={'#9ECED9'}
                buttonwidth={scale(330)}
                buttonheight={verticalScale(35)}
                borderradius={scale(5)}
                text={'SUBMIT'}
                fontFamily={'Cairo-Regular'}
                fontcolor={'#333'}
                fontSize={scale(17)}
                onPress={() => dispatch(getqrdataAction(Token))}
              />
            </View>

            {qrLoading || updateloading || deleteloading ? (
              <View
                style={{
                  backgroundColor: '#f5f5f5',
                  alignItems: 'center',
                  paddingVertical: verticalScale(5),
                }}>
                <StatusBar
                  backgroundColor={'#9ECED9'}
                  barStyle="dark-content"
                />
                <ActivityIndicator
                  animating={qrLoading || updateloading || deleteloading}
                  color={'#9ECED9'}
                  size={scale(30)}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
          {getqrdata?.length === 0 ? (
            <View
              style={{
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                paddingVertical: verticalScale(120),
                paddingBottom: 'auto',
              }}>
              <Image
                style={{width: scale(250), height: scale(200)}}
                source={require('../assets/Images/nodata1.png')}
              />
              <Text
                style={{
                  fontFamily: 'Cairo-Regular',
                  fontSize: scale(15),
                  color: 'grey',
                }}>
                Bill not found
              </Text>
            </View>
          ) : (
            <FlatList
              style={{
                paddingHorizontal: scale(5),
                backgroundColor: '#F5F5F5',
                height: verticalScale(490),
              }}
              contentContainerStyle={{
                paddingBottom: verticalScale(10),
                paddingTop: verticalScale(10),
              }}
              data={getqrdata}
              horizontal={false}
              numColumns={1}
              keyExtractor={item => {
                return item?.product_id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={{marginVertical: verticalScale(1)}} />;
              }}
              renderItem={post => {
                const item = post?.item;

                return (
                  <View
                    style={{
                      flex: 1,
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: verticalScale(2),
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 7,
                      backgroundColor: '#FFFFFF',
                      // paddingHorizontal: scale(10),
                      marginVertical: verticalScale(5),
                      marginHorizontal: scale(10),
                      borderRadius: 5,
                      flexDirection: 'row',
                    }}>
                    <Pressable
                      style={{
                        position: 'absolute',
                        right: scale(5),
                        top: verticalScale(5),
                      }}
                      onPress={() => {
                        Alert.alert(
                          'Delete',
                          'Are you sure you want to delete item',
                          [
                            {
                              text: 'OK',
                              onPress: () =>
                                dispatch(deleteqrdataAction(Token, item.id)),
                            },
                            {text: 'Cancel'},
                          ],
                        );
                      }}>
                      <AntDesign name="close" size={scale(20)} color={'grey'} />
                    </Pressable>

                    <View>
                      <ImageBackground
                        style={{
                          height: scale(140),
                          width: scale(130),
                          resizeMode: 'cover',
                          borderTopLeftRadius: scale(5),
                          borderBottomLeftRadius: scale(5),
                        }}
                        source={{
                          uri: item?.image
                            ? item?.image
                            : 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ad5c7e77765075.5c913c90093ec.jpg',
                        }}>
                        <View
                          style={{
                            backgroundColor: '#9ECED9',
                            width: scale(25),
                            height: scale(23),
                            borderBottomRightRadius: verticalScale(17),
                            justifyContent: 'center',
                            // alignItems: 'center',
                          }}>
                          <Text
                            style={{
                              position: 'absolute',
                              color: '#000000',
                              top: 0,
                              left: 0,
                              fontSize: scale(13),
                              marginLeft: scale(5),
                            }}>
                            {item.seq_no}
                          </Text>
                        </View>
                      </ImageBackground>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        marginHorizontal: scale(5),
                      }}>
                      <Pressable
                        style={{
                          position: 'absolute',
                          left: scale(5),
                          top: verticalScale(5),
                        }}
                        onPress={() => {
                          navigation.navigate('ProductEdit', {
                            price: item.price,
                            pieces: item.pieces,
                            qty: item?.qty,
                            editid: item?.id,
                            item: item,
                          });
                        }}>
                        <Feather
                          name="settings"
                          size={scale(20)}
                          color={'grey'}
                        />
                      </Pressable>

                      <View style={{alignItems: 'center'}}>
                        <Text
                          style={{
                            width: scale(120),
                            marginTop: verticalScale(5),
                            lineHeight: verticalScale(20),
                            marginBottom: verticalScale(5),
                            textAlign: 'center',
                            fontSize: verticalScale(15),
                            color: '#E47946',
                            fontFamily: 'Cairo-Regular',
                          }}>
                          {item?.pname}
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text
                            style={{
                              fontSize: verticalScale(13),
                              color: 'black',
                              fontFamily: 'Cairo-Regular',
                              marginBottom: verticalScale(2),
                            }}>
                            Qty :- {item?.qty}
                          </Text>

                          <Text
                            style={{
                              fontSize: verticalScale(13),
                              color: 'black',
                              fontFamily: 'Cairo-Regular',
                              marginBottom: verticalScale(2),
                            }}>
                            Price :- {item?.price}
                          </Text>
                        </View>

                        <View>
                          <Text
                            style={{
                              fontSize: verticalScale(13),
                              color: 'black',
                              fontFamily: 'Cairo-Regular',
                              marginBottom: verticalScale(2),
                            }}>
                            Pc :- {item?.pieces}
                          </Text>
                          <Text
                            style={{
                              fontSize: verticalScale(13),
                              color: 'black',
                              fontFamily: 'Cairo-Regular',
                              marginBottom: verticalScale(2),
                            }}>
                            Total :- {item?.total}
                          </Text>
                        </View>
                      </View>

                      <View>
                        <Text
                          style={{
                            fontSize: verticalScale(13),
                            color: 'black',
                            fontFamily: 'Cairo-Regular',

                            marginBottom: verticalScale(5),
                          }}>
                          Colour :-{item?.color}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          )}

          <View
            style={{alignItems: 'center', marginVertical: verticalScale(10)}}>
            <CustomButton
              buttoncolor={'#9ECED9'}
              buttonwidth={scale(330)}
              buttonheight={verticalScale(35)}
              borderradius={scale(5)}
              text={'CREATE BILL'}
              fontFamily={'Cairo-Regular'}
              fontcolor={'#333'}
              fontSize={scale(17)}
              onPress={() => selectcustomer()}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CreateBill;
