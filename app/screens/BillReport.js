import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {BillReportAction} from '../redux/actions/QrcodeAction';

const BillReport = () => {
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const {billreport} = useSelector(state => state.qrState);

  console.log(billreport);

  // ************* from date ************** //

  const [fromdate, setfromDate] = useState(new Date());
  const [frommode, setfromMode] = useState('date');
  const [fromshow, setfromShow] = useState(false);
  const [fromtext, setfromText] = useState('Empty');

  useEffect(() => {
    FromOnChange();
  }, []);

  const FromOnChange = (event, selectedDate) => {
    const fromcurrentDate = selectedDate || fromdate;
    setfromShow(Platform.OS === 'ios');
    setfromDate(fromcurrentDate);

    const fromtempDate = new Date(fromcurrentDate);
    const fDate =
      fromtempDate.getFullYear() +
      '-' +
      (fromtempDate.getMonth() + 1) +
      '-' +
      fromtempDate.getDate();
    setfromText(fDate);
  };

  const fromshowMode = currentMode => {
    setfromShow(true);
    setfromMode(currentMode);
  };

  // ************* from date end ************** //

  // ************* to date start ************** //

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  useEffect(() => {
    OnChange();
  }, []);

  const OnChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    const tempDate = new Date(currentDate);
    const fDate =
      tempDate.getFullYear() +
      '-' +
      (tempDate.getMonth() + 1) +
      '-' +
      tempDate.getDate();
    setText(fDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  // ************* to date end ************** //

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <View
        style={{
          marginHorizontal: scale(10),
          marginVertical: verticalScale(10),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Cairo-Regular',
                fontSize: scale(12),
              }}>
              FROM
            </Text>
            <TouchableOpacity onPress={() => fromshowMode('date')}>
              <View
                style={{flexDirection: 'row', marginBottom: verticalScale(10)}}>
                <View
                  style={{
                    zIndex: 5,
                    flex: 0.2,
                    borderRadius: 5,
                    borderWidth: 1.2,
                    borderColor: '#bdbebf',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 7,
                    borderBottomLeftRadius: 7,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    paddingHorizontal: 5,
                  }}>
                  <MaterialIcons
                    name="date-range"
                    color={'#9ECED9'}
                    size={18}
                  />
                </View>

                <View
                  style={{
                    color: '#000000',
                    paddingVertical: verticalScale(10),
                    paddingHorizontal: scale(10),
                    borderTopLeftRadius: scale(0),
                    borderBottomLeftRadius: scale(0),
                    borderTopRightRadius: scale(7),
                    borderBottomRightRadius: scale(7),
                    borderWidth: 1.2,
                    borderColor: '#bdbebf',
                    flex: 0.9,
                    paddingLeft: scale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Cairo-Regular',
                      fontSize: scale(14),
                    }}>
                    {fromtext}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {fromshow && (
              <DateTimePicker
                testID="dateTimePicker1"
                value={fromdate}
                mode={frommode}
                is24Hour={true}
                display="default"
                onChange={FromOnChange}
              />
            )}
          </View>
          <View style={{justifyContent: 'center', marginHorizontal: scale(10)}}>
            <FontAwesome5 name="exchange-alt" size={scale(20)} />
          </View>
          <View style={{flex: 1}}>
            <Text
              style={{
                alignSelf: 'center',
                fontFamily: 'Cairo-Regular',
                fontSize: scale(12),
              }}>
              TO
            </Text>
            <TouchableOpacity onPress={() => showMode('date')}>
              <View
                style={{flexDirection: 'row', marginBottom: verticalScale(10)}}>
                <View
                  style={{
                    zIndex: 5,
                    flex: 0.2,
                    borderRadius: 5,
                    borderWidth: 1.2,
                    borderColor: '#bdbebf',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopLeftRadius: 7,
                    borderBottomLeftRadius: 7,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    paddingHorizontal: 5,
                  }}>
                  <MaterialIcons
                    name="date-range"
                    color={'#9ECED9'}
                    size={18}
                  />
                </View>

                <View
                  style={{
                    color: '#000000',
                    paddingVertical: verticalScale(10),
                    paddingHorizontal: scale(10),
                    borderTopLeftRadius: scale(0),
                    borderBottomLeftRadius: scale(0),
                    borderTopRightRadius: scale(7),
                    borderBottomRightRadius: scale(7),
                    borderWidth: 1.2,
                    borderColor: '#bdbebf',
                    flex: 0.9,
                    paddingLeft: scale(10),
                  }}>
                  <Text
                    style={{
                      color: '#000000',
                      fontFamily: 'Cairo-Regular',
                      fontSize: scale(14),
                    }}>
                    {text}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={OnChange}
              />
            )}
          </View>
        </View>

        <View>
          <CustomButton
            buttoncolor={'#9ECED9'}
            buttonwidth={scale(330)}
            buttonheight={verticalScale(35)}
            borderradius={scale(5)}
            text={'FETCH'}
            fontFamily={'Cairo-Regular'}
            fontcolor={'#333'}
            fontSize={scale(17)}
            onPress={() => dispatch(BillReportAction(Token, fromtext, text))}
          />
        </View>
        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{
              paddingHorizontal: scale(5),
              backgroundColor: '#F5F5F5',
              height: verticalScale(490),
            }}
            contentContainerStyle={{
              paddingBottom: verticalScale(10),
              paddingTop: verticalScale(10),
            }}
            data={billreport}
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
              console.log(item);
              //   const index = item?.productid;
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
                    paddingVertical: verticalScale(5),
                  }}>
                  <View>
                    <View
                      style={{
                        marginHorizontal: scale(10),
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: verticalScale(15),
                          color: '#E47946',
                          fontFamily: 'Cairo-Black',
                        }}>
                        {item?.customer}
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
                        Bill No. :-{item.bill_no}
                      </Text>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Invoice id :-{item.invoice_id}
                      </Text>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Qty :-{item.qty}
                      </Text>

                      <Text
                        style={{
                          fontSize: verticalScale(13),
                          color: 'black',
                          fontFamily: 'Cairo-Regular',
                          marginBottom: verticalScale(5),
                        }}>
                        Total :-{item.total}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BillReport;
