import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomButton from '../components/Custom/CustomButton';
import {useDispatch} from 'react-redux';
import {editPriceAction} from '../redux/actions/QrcodeAction';
import {color} from 'react-native-reanimated';

const ProductEdit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const [qrprice, setQrprice] = useState(String(route.params?.price));
  const [qrpieces, setQrpieces] = useState(String(route.params?.pieces));
  const [qrqty, setQty] = useState(String(route.params?.qty));
  const [updatepc, setUpdatepc] = useState('');

  console.log(qrpieces, updatepc);

  const qtyonchange = text => {
    setQty(text);
    if (text.length > 0) {
      if (updatepc) {
        setQrpieces(String(parseFloat(text) * parseFloat(updatepc)));
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F5F5F5'}}>
      <View
        style={{
          paddingLeft: scale(15),
          paddingVertical: verticalScale(10),
          backgroundColor: '#FFFFFF',
          borderBottomColor: '#9ECED9',
          borderBottomWidth: scale(0.2),
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row'}}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons
            name="caret-back"
            size={verticalScale(20)}
            color={'#9ECED9'}
          />
          <Text
            style={{
              color: '#9ECED9',
              fontWeight: 'normal',
              fontSize: 19,
              fontFamily: 'Cairo-Black',
            }}>
            EDIT
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{marginHorizontal: scale(10), flex: 1}}>
        <View style={{marginTop: scale(10)}}>
          <Text
            style={{
              fontSize: scale(20),
              color: '#000000',
              alignSelf: 'center',
              fontFamily: 'Cairo-Regular',
            }}>
            Edit Qty
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            selectionColor={'#9ECED9'}
            placeholder="Qty"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            style={{
              //   marginTop: verticalScale(5),
              color: '#000000',
              fontSize: scale(17),
              fontFamily: 'Cairo-Regular',
              borderWidth: 0,
            }}
            onChangeText={text => qtyonchange(text)}
            value={qrqty}
          />
          <View
            style={{
              marginTop: verticalScale(-5),
              elevation: 4,
              backgroundColor: '#9ECED9',
              paddingVertical:
                Dimensions.get('window').height < 600
                  ? verticalScale(0.7)
                  : verticalScale(0.6),
            }}
          />
        </View>

        <View style={{marginTop: scale(10)}}>
          <Text
            style={{
              fontSize: scale(20),
              color: '#000000',
              alignSelf: 'center',
              fontFamily: 'Cairo-Regular',
            }}>
            Edit Pieces
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            selectionColor={'#9ECED9'}
            placeholder="Price"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            style={{
              //   marginTop: verticalScale(5),
              color: '#000000',
              fontSize: scale(17),
              fontFamily: 'Cairo-Regular',
              borderWidth: 0,
            }}
            onChangeText={text => {
              setUpdatepc(text);
              setQrpieces(text);
            }}
            value={qrpieces}
          />
          <View
            style={{
              marginTop: verticalScale(-5),
              elevation: 4,
              backgroundColor: '#9ECED9',
              paddingVertical:
                Dimensions.get('window').height < 600
                  ? verticalScale(0.7)
                  : verticalScale(0.6),
            }}
          />
        </View>

        <View style={{marginTop: scale(10)}}>
          <Text
            style={{
              fontSize: scale(20),
              color: '#000000',
              alignSelf: 'center',
              fontFamily: 'Cairo-Regular',
            }}>
            Edit Price
          </Text>
          <TextInput
            underlineColorAndroid="transparent"
            selectionColor={'#9ECED9'}
            placeholder="Price"
            placeholderTextColor="#666666"
            keyboardType="numeric"
            style={{
              //   marginTop: verticalScale(5),
              color: '#000000',
              fontSize: scale(17),
              fontFamily: 'Cairo-Regular',
              borderWidth: 0,
            }}
            onChangeText={setQrprice}
            value={qrprice}
          />
          <View
            style={{
              marginTop: verticalScale(-5),
              elevation: 4,
              backgroundColor: '#9ECED9',
              paddingVertical:
                Dimensions.get('window').height < 600
                  ? verticalScale(0.7)
                  : verticalScale(0.6),
            }}
          />
        </View>

        <View style={{marginTop: verticalScale(10)}}>
          <Text
            style={{
              fontSize: scale(17),
              alignSelf: 'center',
              color: '#E47946',
              fontFamily: 'Cairo-Black',
            }}>
            Total
          </Text>
          <Text
            style={{
              fontSize: scale(17),
              alignSelf: 'center',
              color: '#000000',
            }}>
            {qrpieces * qrprice}
          </Text>
        </View>
      </View>

      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderTopColor: '#9ECED9',
          borderTopWidth: scale(0.2),
        }}>
        <View
          style={{
            marginVertical: verticalScale(10),
            alignSelf: 'center',
          }}>
          <CustomButton
            buttoncolor={'#9ECED9'}
            buttonwidth={scale(250)}
            buttonheight={verticalScale(35)}
            fontFamily={'Cairo-Regular'}
            text={'APPLY'}
            borderradius={scale(5)}
            fontcolor={'white'}
            fontSize={scale(17)}
            onPress={() => {
              if (qrprice && qrpieces && qrqty) {
                dispatch(
                  editPriceAction(
                    qrprice,
                    route.params?.editid,
                    qrpieces,
                    qrqty,
                  ),
                );
                navigation.navigate('Drawer');
              } else {
                alert('All feild required');
              }
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductEdit;
