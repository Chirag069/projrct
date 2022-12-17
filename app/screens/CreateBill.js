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
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  billArrayAction,
  editPriceAction,
  editpricepidAction,
  qrdataAction,
  qrdataclearAction,
  qrdatadeleteAction,
  qrListAction,
  qtyincrimentAction,
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
import {validatePathConfig} from '@react-navigation/native';
import {qrLoadingAction} from '../redux/actions/QrcodeAction';

const CreateBill = ({navigation}) => {
  const [qrcode, setQrcode] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {qrdata, qrLoading, billsubmitloading, updateloading} = useSelector(
    state => state.qrState,
  );
  const refInput = useRef();
  const [focus, setFocus] = useState(false);

  const removebillitem = index => {
    dispatch(qrdatadeleteAction(index));
  };

  const selectcustomer = () => {
    if (qrdata.length > 0) {
      dispatch(toggleCreateBillModelAction());
    } else {
      Toast.show({
        text1: 'Please Scan QR',
        visibilityTime: 2000,
        autoHide: true,
        position: 'top',
        type: 'success',
      });
    }
  };

  const onchange = text => {
    setQrcode(text);

    if (text?.length >= 6) {
      qrcallfunction(text);
    }
  };

  const qrcallfunction = text => {
    if (qrdata?.length == 0) {
      dispatch(qrdataAction(Token, text));
      setQrcode(null);
    } else {
      var len = qrdata.length;
      var duplicate = 0;

      for (let i = 0; i < len; i++) {
        let item = qrdata[i];
        if (item.key === text) {
          duplicate = +1;
        }
      }

      if (duplicate == 1) {
        dispatch(qtyincrimentAction(text));
        setQrcode(null);
      } else {
        dispatch(qrdataAction(Token, text));
        setQrcode(null);
      }
    }
  };

  useEffect(() => {
    refInput.current.focus();
  }, [qrcallfunction]);

  return (
    <>
      {billsubmitloading ? (
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
            paddingVertical: verticalScale(20),
          }}>
          <StatusBar backgroundColor={'#9ECED9'} barStyle="dark-content" />
          <ActivityIndicator
            animating={billsubmitloading}
            color={'#9ECED9'}
            size={scale(30)}
          />
        </View>
      ) : (
        <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
          <StatusBar backgroundColor={'#9ECED9'} barStyle="dark-content" />
          <CreateBillModel navigation={navigation} />
          <QtyModel navigation={navigation} />
          <PriceModel navigation={navigation} />
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
              autoFocus={true}
              onBlur={() => {
                refInput.current.focus(), Keyboard.dismiss;
              }}
              ref={refInput}
              style={{
                backgroundColor: 'white',
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
                onPress={() => qrcallfunction(qrcode)}
              />
            </View>
            {qrLoading || updateloading ? (
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
                  animating={qrLoading || updateloading}
                  color={'#9ECED9'}
                  size={scale(30)}
                />
              </View>
            ) : (
              <View />
            )}
          </View>
          {qrdata.length === 0 ? (
            <View
              style={{
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                paddingVertical: verticalScale(140),
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
              data={qrdata}
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
                const index = item?.productid;

                return (
                  <View
                    style={{
                      shadowColor: '#000',
                      shadowOffset: {
                        width: 0,
                        height: verticalScale(2),
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 4,
                      elevation: 7,
                      backgroundColor: '#FFFFFF',
                      paddingHorizontal: scale(10),
                      marginVertical: verticalScale(5),
                      marginHorizontal: scale(10),
                      borderRadius: 5,
                    }}>
                    <Pressable
                      style={{
                        position: 'absolute',
                        right: scale(5),
                        top: verticalScale(5),
                      }}
                      onPress={() => {
                        removebillitem(index);
                      }}>
                      <AntDesign name="close" size={scale(20)} />
                    </Pressable>
                    <View
                      style={{
                        marginHorizontal: scale(10),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: verticalScale(16),
                          color: '#E47946',
                          fontFamily: 'Cairo-Black',
                        }}>
                        {item?.pname}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Price :- {item?.price}
                      </Text>
                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Pc :- {item?.pieces}
                      </Text>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Qty :- {item?.qty}
                      </Text>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Total :- {item?.total}
                      </Text>
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
              text={'SELECT CUSTOMER'}
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
