import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {qrdataAction} from '../redux/actions/QrcodeAction';
import {ScrollView} from 'react-native-gesture-handler';
import {userLoginAction} from '../redux/actions/authActons';

const CreateBill = () => {
  const [qrcode, setQrcode] = useState('');
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {qrdata, qrLoading, qrdatalist} = useSelector(state => state.qrState);
  const {userToken} = useSelector(state => state.authState);
  const [liked, setLiked] = useState([]);

  const qr = [qrdata.data];

  // useEffect(() => {
  //   dispatch(userLoginAction(Token, qrcode));
  // }, []);

  console.log('normal tokan', userToken);
  console.log('async tokan', Token);

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
              <FlatList
                data={qr}
                keyExtractor={item => item?.id}
                renderItem={({item}) => {
                  var a = item?.pieces;
                  var b = item?.price;
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
                        marginVertical: verticalScale(20),
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
              <View style={{}}>
                <CustomButton
                  buttoncolor={'#c79248'}
                  buttonwidth={scale(330)}
                  buttonheight={verticalScale(35)}
                  borderradius={scale(0)}
                  text={'Add'}
                  fontcolor={'white'}
                  fontSize={scale(17)}
                  onPress={() => {
                    qrdata ? setLiked([...liked, qrdata.data]) : null;
                  }}
                />
              </View>
            </View>

            <FlatList
              data={liked}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item?.id}
              renderItem={({item}) => {
                var a = item?.pieces;
                var b = item?.price;
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
                      marginVertical: verticalScale(20),
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
