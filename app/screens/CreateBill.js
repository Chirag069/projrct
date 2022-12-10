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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
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

const CreateBill = ({navigation}) => {
  const [qrcode, setQrcode] = useState('103');
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {qrdata, qrLoading} = useSelector(state => state.qrState);

  useEffect(() => {
    LogBox.ignoreLogs([' Encountered two children with the same key']);
    onchange();
  }, []);

  const removebillitem = index => {
    dispatch(qrdatadeleteAction(index));
  };

  const selectcustomer = () => {
    if (qrdata.length > 0) {
      // dispatch(billArrayAction(qrdata));
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
    if (qrdata.length == 0) {
      dispatch(qrdataAction(Token, qrcode));
    } else {
      var len = qrdata.length;
      var duplicate = 0;

      for (let i = 0; i < len; i++) {
        let item = qrdata[i];
        if (item.key === qrcode) {
          duplicate = +1;
        }
      }

      if (duplicate === 1) {
        dispatch(qtyincrimentAction(qrcode));
      } else {
        dispatch(qrdataAction(Token, qrcode));
      }
    }
  };

  return (
    <>
      {qrLoading ? (
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
            paddingVertical: verticalScale(20),
          }}>
          <StatusBar backgroundColor={'#9ECED9'} barStyle="dark-content" />
          <ActivityIndicator
            animating={qrLoading}
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
              style={{
                backgroundColor: 'white',
                fontSize: scale(15),
                borderBottomWidth: 1,
              }}
              onChangeText={text => onchange(text)}
              value={qrcode}
              onSubmitEditing={() => onchange()}
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
                onPress={() => {
                  if (qrdata.length == 0) {
                    dispatch(qrdataAction(Token, qrcode));
                  } else {
                    var len = qrdata.length;
                    var duplicate = 0;

                    for (let i = 0; i < len; i++) {
                      let item = qrdata[i];
                      if (item.key === qrcode) {
                        duplicate = +1;
                      }
                    }

                    if (duplicate === 1) {
                      dispatch(qtyincrimentAction(qrcode));
                    } else {
                      dispatch(qrdataAction(Token, qrcode));
                    }
                  }
                }}
              />
            </View>
          </View>
          {qrdata.length === 0 ? (
            <View
              style={{
                backgroundColor: '#f5f5f5',
                alignItems: 'center',
                paddingVertical: verticalScale(130),
                paddingBottom: 'auto',
              }}>
              <Image
                style={{width: scale(250), height: scale(250)}}
                source={require('../assets/Images/nodata.png')}
              />
            </View>
          ) : (
            <FlatList
              style={{
                paddingHorizontal: scale(5),
                backgroundColor: '#F5F5F5',
                height: verticalScale(490),
              }}
              contentContainerStyle={{}}
              data={qrdata}
              horizontal={false}
              numColumns={1}
              keyExtractor={item => {
                return item?.product_id;
              }}
              ItemSeparatorComponent={() => {
                return <View style={{marginTop: scale(10)}} />;
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
                    <TouchableOpacity
                      style={{
                        position: 'absolute',
                        right: scale(5),
                        top: verticalScale(5),
                      }}
                      onPress={() => {
                        removebillitem(index);
                      }}>
                      <AntDesign name="close" size={scale(20)} />
                    </TouchableOpacity>
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
                          // fontWeight: 'bold',
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
                      {/* <TouchableOpacity
                        onPress={() => {
                          dispatch(togglepriceModelAction());
                          dispatch(editpricepidAction(item.productid));
                        }}> */}
                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                          // fontWeight: 'bold',
                        }}>
                        Price :- {item?.price}
                      </Text>
                      {/* </TouchableOpacity> */}
                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          // fontWeight: 'bold',
                          marginBottom: verticalScale(5),
                        }}>
                        Pc :- {item?.pieces}
                      </Text>
                      {/* <TouchableOpacity
                        onPress={() => {
                          dispatch(toggleQtyModelAction());
                        }}> */}
                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          // fontWeight: 'bold',
                          marginBottom: verticalScale(5),
                        }}>
                        Qty :- {item?.qty}
                      </Text>
                      {/* </TouchableOpacity> */}

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                          // fontWeight: 'bold',
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
                          // fontWeight: 'bold',
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
