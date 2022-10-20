import {View, Image, SafeAreaView, ScrollView, Dimensions} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../Custom/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {LoggedLoadingAction} from '../../../redux/actions/authActons';

const Screen_Width = Dimensions.get('window').width;

const CustomerOption = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoggedLoadingAction(false));
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{alignItems: 'center', marginVertical: verticalScale(50)}}>
          <Image
            style={{height: verticalScale(200), width: scale(180)}}
            source={require('../../../assets/Images/Logo1.png')}
          />
        </View>
        <View style={{marginVertical: verticalScale(30)}}>
          <View style={{marginHorizontal: scale(40)}}>
            <CustomButton
              borderWidth={scale(1.5)}
              borderColor={'#c79248'}
              buttoncolor={'white'}
              buttonwidth={scale(270)}
              buttonheight={verticalScale(50)}
              borderradius={scale(30)}
              text={'ARE YOU BUYER'}
              fontcolor={'grey'}
              fontSize={scale(20)}
            />
          </View>
          <View
            style={{
              marginHorizontal: scale(40),
              marginVertical: verticalScale(30),
            }}>
            <CustomButton
              buttoncolor={'#c79248'}
              buttonwidth={scale(270)}
              buttonheight={verticalScale(50)}
              borderradius={scale(30)}
              text={'ARE YOU CUSTOMER'}
              fontcolor={'white'}
              fontSize={scale(20)}
              onPress={() => navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CustomerOption;
