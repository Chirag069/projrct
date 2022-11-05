import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
  LogBox,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {qrdataAction, qrListAction} from '../redux/actions/QrcodeAction';
import {LoggedAction} from '../redux/actions/authActons';
import {userLoginAction} from '../redux/actions/authActons';

const CreateBill = () => {
  const [qrcode, setQrcode] = useState('');
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {qrdata, qrLoading, qrrr} = useSelector(state => state.qrState);

  useEffect(() => {
    LogBox.ignoreLogs([' Encountered two children with the same key']);
  }, []);

  // console.log(Token);

  const newArray = qrdata.reduce((acc, dt) => {
    const formatedDate = dt.product_id;

    const dateAcc = acc[formatedDate];

    if (!dateAcc) {
      acc[formatedDate] = {
        productid: formatedDate,
        value: [dt],
      };
    } else {
      acc[formatedDate].value.push(dt);
    }
    return acc;
  }, {});

  const aaa = Object.values(newArray);

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
              data={aaa}
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

                const productlen = Object.keys(item.value).length;
                var a = item.value[0].pieces * productlen;
                var b = item.value[0].price;
                const c = a * b;

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
                        Product Name :- {item.value[0].pname}
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
                          Color :-{item.value[0].color}
                        </Text>

                        <Text
                          style={{
                            fontSize: verticalScale(13),
                            color: 'black',
                            fontWeight: 'bold',
                            marginBottom: verticalScale(5),
                          }}>
                          Piece :- {item.value[0].pieces * productlen}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          marginBottom: verticalScale(5),
                          fontWeight: 'bold',
                        }}>
                        Price :- {item.value[0].price}
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
