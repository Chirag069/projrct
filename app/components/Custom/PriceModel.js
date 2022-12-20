import {View, Text, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from './CustomButton';
import {
  editPriceAction,
  togglepriceModelAction,
  toggleQtyModelAction,
  UpdateQrdataAction,
} from '../../redux/actions/QrcodeAction';
import {useRoute} from '@react-navigation/native';

const PriceModel = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {priceModalShow, editpricepid, price, pieces} = useSelector(
    state => state.qrState,
  );

  const [qrprice, setQrprice] = useState(price);
  const [qrpieces, setQrpieces] = useState(pieces);

  return (
    <Modal animationIn="slideInUp" isVisible={priceModalShow}>
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
        <TextInput
          underlineColorAndroid="transparent"
          selectionColor={'#9ECED9'}
          placeholder="Enter Pieces"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          autoFocus={true}
          style={{
            color: '#000000',
            fontSize: scale(17),
            fontFamily: 'Cairo-Regular',
            borderWidth: 0,
          }}
          onChangeText={setQrpieces}
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
        <TextInput
          underlineColorAndroid="transparent"
          selectionColor={'#9ECED9'}
          placeholder="Enter Price"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          autoFocus={true}
          style={{
            marginTop: verticalScale(5),
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
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
            justifyContent: 'center',
          }}>
          <View style={{marginRight: scale(20)}}>
            <CustomButton
              borderWidth={scale(1)}
              borderColor={'#9ECED9'}
              buttoncolor={'white'}
              buttonwidth={scale(120)}
              fontFamily={'Cairo-Regular'}
              buttonheight={verticalScale(35)}
              text={'CANCEL'}
              fontcolor={'#9ECED9'}
              fontSize={scale(15)}
              onPress={() => {
                dispatch(togglepriceModelAction());
              }}
            />
          </View>
          <CustomButton
            buttoncolor={'#9ECED9'}
            buttonwidth={scale(120)}
            buttonheight={verticalScale(35)}
            fontFamily={'Cairo-Regular'}
            text={'SUBMIT'}
            fontcolor={'white'}
            fontSize={scale(15)}
            onPress={() => {
              dispatch(editPriceAction(qrprice, editpricepid, qrpieces));
              dispatch(togglepriceModelAction());
              setQrprice([]);
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default PriceModel;
