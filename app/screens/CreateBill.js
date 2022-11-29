import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  ScrollView,
  LogBox,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {
  billArrayAction,
  qrdataAction,
  qrListAction,
  toggleCreateBillModelAction,
} from '../redux/actions/QrcodeAction';
import {LoggedAction} from '../redux/actions/authActons';
import {userLoginAction} from '../redux/actions/authActons';
import CreateBillModel from '../components/Custom/CreateBillModel';
import AntDesign from 'react-native-vector-icons/AntDesign';

const CreateBill = ({navigation}) => {
  const [qrcode, setQrcode] = useState('');
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {qrdata, qrLoading, createbillstatus} = useSelector(
    state => state.qrState,
  );

  const removebillitem = index => {
    const removeitem = qrdata.filter(item => item.product_id === index);
    console.log(removeitem);
  };

  var obj = {
    results: [
      {
        id: '460',
        name: 'Widget 1',
        loc: 'Shed',
      },
      {
        id: '461',
        name: 'Widget 2',
        loc: 'Kitchen',
      },
      {
        id: '462',
        name: 'Widget 3',
        loc: 'bath',
      },
    ],
  };

  function removeFunction(myObjects, prop, valu) {
    return myObjects.filter(function (val) {
      return val[prop] !== valu;
    });
  }

  console.log(removeFunction(obj.results, 'id', '460'));

  // console.log(obj.results);

  useEffect(() => {
    LogBox.ignoreLogs([' Encountered two children with the same key']);
  }, []);

  let newArray = qrdata.reduce((acc, dt) => {
    const formatedDate = dt?.product_id;

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

  const selectcustomer = aaa => {
    dispatch(billArrayAction(aaa));
    dispatch(toggleCreateBillModelAction());
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
          <ActivityIndicator
            animating={qrLoading}
            color={'#c79248'}
            size={scale(30)}
          />
        </View>
      ) : (
        <SafeAreaView style={{backgroundColor: '#FFF', flex: 1}}>
          <CreateBillModel navigation={navigation} />
          <View
            style={{
              marginHorizontal: scale(10),
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
              const index = item.productid;

              const productlen = Object.keys(item.value).length;
              var a = item.value[0]?.pieces * productlen;
              var b = item.value[0]?.price;
              const c = a * b;
              const total = c.toFixed(2);

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
                        color: '#c79248',
                        fontWeight: 'bold',
                      }}>
                      {item.value[0]?.pname}
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
                        marginBottom: verticalScale(5),
                        fontWeight: 'bold',
                      }}>
                      Price :- {item.value[0]?.price}
                    </Text>
                    <Text
                      style={{
                        fontSize: verticalScale(13),
                        color: 'black',
                        fontWeight: 'bold',
                        marginBottom: verticalScale(5),
                      }}>
                      Pc :- {item.value[0]?.pieces}
                    </Text>
                    <Text
                      style={{
                        fontSize: verticalScale(13),
                        color: 'black',
                        fontWeight: 'bold',
                        marginBottom: verticalScale(5),
                      }}>
                      Qty :- {item.value[0]?.pieces * productlen}
                    </Text>

                    <Text
                      style={{
                        fontSize: verticalScale(13),
                        color: 'black',
                        marginBottom: verticalScale(5),
                        fontWeight: 'bold',
                      }}>
                      Total :- {total}
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: verticalScale(13),
                        color: 'black',
                        fontWeight: 'bold',
                        marginBottom: verticalScale(5),
                      }}>
                      Colour :-{item.value[0]?.color}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          <View
            style={{alignItems: 'center', marginVertical: verticalScale(10)}}>
            <CustomButton
              buttoncolor={'#c79248'}
              buttonwidth={scale(330)}
              buttonheight={verticalScale(35)}
              borderradius={scale(20)}
              text={'SELECT CUSTOMER'}
              fontcolor={'white'}
              fontSize={scale(17)}
              onPress={() => selectcustomer(aaa)}
            />
          </View>
        </SafeAreaView>
      )}
    </>
  );
};

export default CreateBill;
