import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Pressable,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {userLoginAction, LoggedAction} from '../redux/actions/authActons';
import {sha1} from 'react-native-sha1';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
const Screen_Width = Dimensions.get('window').width;

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmailInput('');
      setPasswordInput('');
    });
    return unsubscribe;
  }, [navigation]);

  const userSignIn = () => {
    if (emailInput && passwordInput) {
      dispatch(userLoginAction(emailInput, passwordInput));
    } else {
      Toast.show({
        text1: 'you forgot to enter something',
        visibilityTime: 3000,
        autoHide: true,
        position: 'top',
        type: 'error',
      });
    }
  };

  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <ScrollView>
        <View style={{alignItems: 'center', marginTop: verticalScale(20)}}>
          <Image
            style={{height: verticalScale(200), width: scale(180)}}
            source={require('../assets/Images/Logo1.png')}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: scale(20)}}>
          <Text style={{fontSize: scale(20), color: 'black'}}>
            Customer Sign In
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginVertical: 30}}>
          <TextInput
            label="User Name"
            style={{backgroundColor: 'white', fontSize: scale(13)}}
            onChangeText={setEmailInput}
            value={emailInput}
          />
          <TextInput
            label="Password"
            style={{backgroundColor: 'white', fontSize: scale(13)}}
            secureTextEntry={true}
            onChangeText={setPasswordInput}
            value={passwordInput}
          />
        </View>
        <View style={{paddingHorizontal: scale(35)}}>
          <CustomButton
            buttoncolor={'#c79248'}
            buttonwidth={scale(270)}
            buttonheight={verticalScale(50)}
            borderradius={scale(30)}
            text={'SIGN IN'}
            fontcolor={'white'}
            fontSize={scale(20)}
            onPress={() => {
              Keyboard.dismiss();
              userSignIn();
            }}
          />
        </View>
        <Pressable style={{alignItems: 'center', marginVertical: 10}}>
          <Text style={{fontSize: scale(12)}}>Forget Password?</Text>
        </Pressable>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 20,
          }}>
          <View style={{flex: 1, height: 1, backgroundColor: 'darkgrey'}} />
        </View>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Pressable
            onPress={() => navigation.navigate('SignUp')}
            style={{flexDirection: 'row'}}>
            <Text style={{color: 'black', fontSize: scale(12)}}>
              You are not a registered use click{' '}
            </Text>
            <Text
              style={{
                textDecorationLine: 'underline',
                color: 'black',
                fontSize: scale(12),
              }}>
              here
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
