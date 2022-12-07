import {View, Text, TextInput, Dimensions} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from './CustomButton';
import {
  toggleQtyModelAction,
  UpdateQrdataAction,
} from '../../redux/actions/QrcodeAction';

const QtyModel = () => {
  const dispatch = useDispatch();
  const {QtyModalShow} = useSelector(state => state.qrState);
  const [qrqty, setQrqty] = useState('');

  return (
    <Modal animationIn="slideInUp" isVisible={QtyModalShow}>
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
          selectionColor={'#c79248'}
          placeholder="Enter qty"
          placeholderTextColor="#666666"
          keyboardType="numeric"
          style={{
            color: '#000000',
            fontSize: scale(17),
            fontFamily: 'Cairo-Regular',
            borderWidth: 0,
          }}
          onChangeText={setQrqty}
          value={qrqty}
        />
        <View
          style={{
            marginTop: verticalScale(0),
            elevation: 4,
            backgroundColor: '#c79248',
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
              borderColor={'#c79248'}
              buttoncolor={'white'}
              buttonwidth={scale(120)}
              fontFamily={'Cairo-Regular'}
              buttonheight={verticalScale(35)}
              text={'CANCEL'}
              fontcolor={'#c79248'}
              fontSize={scale(15)}
              onPress={() => {
                dispatch(toggleQtyModelAction());
              }}
            />
          </View>
          <CustomButton
            buttoncolor={'#c79248'}
            buttonwidth={scale(120)}
            buttonheight={verticalScale(35)}
            fontFamily={'Cairo-Regular'}
            text={'SUBMIT'}
            fontcolor={'white'}
            fontSize={scale(15)}
            onPress={() => {
              dispatch(UpdateQrdataAction(qrqty));
              dispatch(toggleQtyModelAction());
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default QtyModel;
