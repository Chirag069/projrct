import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Modal from 'react-native-modal';
import CustomButton from './CustomButton';
import {
  CustomerListAction,
  qrdataAction,
  qrdataclearAction,
  SubmiBillAction,
  toggleCreateBillModelAction,
  defaultCustomerAction,
} from '../../redux/actions/QrcodeAction';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CheckBox} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';

const CreateBillModel = ({}) => {
  useEffect(() => {
    onChange();
  }, []);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    CreatebillModalShow,
    qrdata,
    billcolor,
    billproductid,
    billqty,
    billpieces,
    billprice,
    billtotal,
    getqrdata,
    defaultcustomer,
  } = useSelector(state => state.qrState);
  const {Token} = useSelector(state => state.authState);
  const {customerlist} = useSelector(state => state.qrState);

  const [isFocus, setIsFocus] = useState(false);

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const [check1, setCheck1] = useState(
    (async () => {
      const customerid = await AsyncStorage.getItem('@Customer_id');
      customerid === null ? setCheck1(false) : setCheck1(true);
    })(),
  );

  const [value, setValue] = useState(null);

  const onChange = (event, selectedDate) => {
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

  useEffect(() => {
    dispatch(CustomerListAction(Token));
    (async () => {
      const customerid = await AsyncStorage.getItem('@Customer_id');
      setValue(customerid);
    })();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      // return (
      //   <Text style={[styles.label, isFocus && {color: 'blue'}]}>
      //     Dropdown label
      //   </Text>
      // );
    }
    return null;
  };

  const defaultCustomer = () => {
    if (value) {
      setCheck1(!check1);

      (async () => {
        if (check1) {
          await AsyncStorage.removeItem('@Customer_id');
        } else {
          await AsyncStorage.setItem('@Customer_id', value);
        }
      })();
    } else {
      Toast.show({
        text1: 'please select customer',
        visibilityTime: 3000,
        autoHide: true,
        position: 'top',
        type: 'success',
      });
    }
  };

  return (
    <Modal animationIn="slideInUp" isVisible={CreatebillModalShow}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: scale(10),
          marginHorizontal: scale(10),
          paddingVertical: verticalScale(15),
          paddingHorizontal: scale(15),
          paddingBottom: scale(20),
          elevation: 2,
        }}>
        <TouchableOpacity onPress={() => showMode('date')}>
          <View style={{flexDirection: 'row', marginBottom: verticalScale(10)}}>
            <View
              style={{
                zIndex: 5,
                flex: 0.1,
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
              <MaterialIcons name="date-range" color={'#9ECED9'} size={18} />
            </View>

            <View
              style={{
                color: '#000000',
                paddingVertical: verticalScale(12),
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
              <Text style={{color: '#000000'}}>{text}</Text>
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
            onChange={onChange}
          />
        )}

        <View style={styles.container}>
          {renderLabel()}
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: '#9ECED9'}]}
            placeholderStyle={styles.placeholderStyle}
            itemTextStyle={{color: 'grey'}}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={customerlist}
            search
            maxHeight={300}
            labelField="customer_name"
            valueField="customer_id"
            placeholder={!isFocus ? 'Select Customer' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.customer_id);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <View
                style={{
                  marginRight: scale(10),
                  flexDirection: 'row',
                  height: verticalScale(40),
                }}>
                <FontAwesome5
                  style={styles.icon}
                  color={isFocus ? '#9ECED9' : '#9ECED9'}
                  name="user"
                  size={20}
                />
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#bdbebf',
                    marginHorizontal: scale(10),
                  }}
                />
              </View>
            )}
          />
        </View>

        <View style={{alignSelf: 'flex-start'}}>
          <CheckBox
            center
            title="Default Customer"
            checked={check1}
            fontFamily="Cairo-Regular"
            checkedColor="#9ECED9"
            onPress={() => defaultCustomer()}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',

            justifyContent: 'center',
          }}>
          <View style={{marginRight: scale(20)}}>
            <CustomButton
              borderWidth={scale(1)}
              borderColor={'#9ECED9'}
              buttoncolor={'white'}
              buttonwidth={scale(120)}
              buttonheight={verticalScale(35)}
              text={'CANCEL'}
              fontcolor={'#9ECED9'}
              fontSize={scale(15)}
              onPress={() => {
                dispatch(toggleCreateBillModelAction());
              }}
            />
          </View>
          <CustomButton
            buttoncolor={'#9ECED9'}
            buttonwidth={scale(120)}
            buttonheight={verticalScale(35)}
            text={'OK'}
            fontcolor={'white'}
            fontSize={scale(15)}
            onPress={() => {
              if (text && value) {
                (async () => {
                  await AsyncStorage.setItem('@Bill_Date', text);
                  await AsyncStorage.setItem('@Customer', value);
                })();
                dispatch(toggleCreateBillModelAction());
              }

              // if (text && value) {
              //   getqrdata.map(item =>
              //     dispatch(
              //       SubmiBillAction(
              //         Token,
              //         text,
              //         value,
              //         item.productid,
              //         item.qty,
              //         item.pieces,
              //         item.price,
              //         item.total,
              //         item.color,
              //       ),
              //     ),
              //   );
              //   dispatch(toggleCreateBillModelAction());
              // } else {
              //   Alert.alert('Please Select Customer');
              // }
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default CreateBillModel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    alignSelf: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    color: 'grey',
    fontSize: 16,
  },
  selectedTextStyle: {
    color: '#000000',
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
