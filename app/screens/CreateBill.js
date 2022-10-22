import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {qrdataAction, qrListAction} from '../redux/actions/QrcodeAction';

import {userLoginAction} from '../redux/actions/authActons';

const CreateBill = () => {
  const [qrcode, setQrcode] = useState('');
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {qrdata, qrLoading, qrrr} = useSelector(state => state.qrState);

  // console.log(qrdata);

  // const sameqrdata = qrdata.find(value => value.product_id===);
  // console.log(sameqrdata.product_id);

  // const data = qrdata
  //   .map
  //   // item => console.log(item.product_id, qrrr.product_id),
  //   // === qrrr.product_id
  //   //   ? {...item, pieces: item.pieces * 2}
  //   //   : item,
  //   ();
  // console.log(data);

  // const qrd = qrdata.map(function (item) {
  //   return item.product_id == qrrr.product_id ? item.pieces * 2 : item;
  // });

  qrdata.forEach(function (item, i) {
    if (qrdata.length == 0) {
      return item;
    } else {
      if (qrrr.product_id == item.product_id)
        qrdata[i].pieces = qrdata[i].pieces * 2;
    }
  });
  console.log(qrdata);
  // console.log(qrd);
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
          <ActivityIndicator
            animating={qrLoading}
            color={'#c79248'}
            size={scale(30)}
          />
        </View>
      ) : (
        <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
          <View
            style={{
              marginHorizontal: scale(10),
              marginVertical: verticalScale(10),
            }}>
            <TextInput
              label="Enter QR Code"
              style={{backgroundColor: 'white', fontSize: scale(13)}}
              onChangeText={setQrcode}
              value={qrcode}
            />
            <View style={{marginTop: verticalScale(10)}}>
              <CustomButton
                buttoncolor={'#c79248'}
                buttonwidth={scale(330)}
                buttonheight={verticalScale(35)}
                borderradius={scale(0)}
                text={'SUBMIT'}
                fontcolor={'white'}
                fontSize={scale(17)}
                onPress={() => {
                  dispatch(qrdataAction(Token, qrcode));
                  // setLiked([...liked, index]);
                }}
              />
            </View>
          </View>
          <View style={{}}>
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
                const index = item?.id;
                var a = item?.pieces;
                var b = item?.price;
                const c = a * b;

                // console.log(item.product_id, qrrr.product_id);
                // if (item.product_id === qrrr.product_id) {
                //   [...item, (pieces = item.pieces * 2)];
                // } else {
                // }

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
                      elevation: 5,
                      backgroundColor: 'white',
                      paddingLeft: scale(20),
                      marginVertical: verticalScale(5),
                      marginHorizontal: scale(10),
                      borderRadius: 5,
                    }}>
                    <View
                      style={{
                        marginVertical: verticalScale(5),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: verticalScale(16),
                          color: '#c79248',

                          fontWeight: 'bold',
                        }}>
                        Product Name :- {item?.pname}
                      </Text>
                    </View>

                    <View style={{}}>
                      <View style={{marginTop: 10}}>
                        <Text
                          style={{
                            fontSize: verticalScale(13),
                            color: 'black',
                            fontWeight: 'bold',
                            marginBottom: verticalScale(5),
                          }}>
                          Color :-{item?.color}
                        </Text>

                        <Text
                          style={{
                            fontSize: verticalScale(13),
                            color: 'black',
                            fontWeight: 'bold',
                            marginBottom: verticalScale(5),
                          }}>
                          Piece :- {item?.pieces}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          marginBottom: verticalScale(5),
                          fontWeight: 'bold',
                        }}>
                        Price :- {item?.price}
                      </Text>
                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          marginBottom: verticalScale(5),
                          fontWeight: 'bold',
                        }}>
                        Total :- {c}
                      </Text>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CreateBill;
