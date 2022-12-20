import {
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Pressable,
  Keyboard,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import {userLoginAction, LoggedAction} from '../redux/actions/authActons';
import {sha1} from 'react-native-sha1';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from '../components/Custom/CustomButton';
import {Formik} from 'formik';
import * as Yup from 'yup';

const Screen_Width = Dimensions.get('window').width;

const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Please enter username'),
  password: Yup.string().required('Please enter your password'),
});

const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setEmailInput('');
  //     setPasswordInput('');
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const userSignIn = values => {
    if (values.username && values.password) {
      dispatch(userLoginAction(values.username, values.password));
    } else {
      Toast.show({
        text1: 'please Enter username and password',
        visibilityTime: 3000,
        autoHide: true,
        position: 'top',
        type: 'error',
      });
    }
  };

  return (
    <Formik
      initialValues={{
        password: '',
        username: '',
      }}
      validationSchema={SignupSchema}>
      {({
        values,
        errors,
        touched,
        handlesubmit,
        handleChange,
        setFieldTouched,
        isValid,
      }) => (
        <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
          <StatusBar backgroundColor={'#FFFFFF'} barStyle="dark-content" />
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
            <View
              style={{
                marginHorizontal: scale(20),
                marginTop: verticalScale(30),
                marginBottom: verticalScale(5),
              }}>
              <TextInput
                placeholder="Enter Username"
                placeholderTextColor={'#666666'}
                activeUnderlineColor={'#000000'}
                underlineColor="black"
                autoCapitalize="none"
                style={{
                  color: '#000000',
                  backgroundColor: 'white',
                  fontSize: scale(15),
                  borderBottomWidth: 1,
                  borderBottomColor: '#000000',
                }}
                onChangeText={handleChange('username')}
                value={values.username}
                onBlur={() => setFieldTouched('username')}
              />
              {touched.username && errors.username && (
                <Text style={{color: 'red'}}>{errors.username}</Text>
              )}
            </View>
            <View
              style={{
                marginHorizontal: scale(20),
                marginBottom: verticalScale(30),
              }}>
              <TextInput
                placeholder="Password"
                placeholderTextColor={'#666666'}
                activeUnderlineColor={'#000000'}
                underlineColor="black"
                keyboardType="numeric"
                secureTextEntry={true}
                style={{
                  color: '#000000',
                  backgroundColor: 'white',
                  fontSize: scale(15),
                  borderBottomWidth: 1,
                  borderBottomColor: '#000000',
                }}
                onChangeText={handleChange('password')}
                value={values.password}
                onBlur={() => setFieldTouched('password')}
              />
              {touched.password && errors.password && (
                <Text style={{color: 'red'}}>{errors.password}</Text>
              )}
            </View>
            <View style={{paddingHorizontal: scale(35)}}>
              <CustomButton
                buttoncolor={'#9ECED9'}
                buttonwidth={scale(270)}
                buttonheight={verticalScale(50)}
                borderradius={scale(30)}
                text={'SIGN IN'}
                fontcolor={'white'}
                fontSize={scale(20)}
                onPress={() => {
                  Keyboard.dismiss();
                  userSignIn(values);
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
              {/* <Pressable
            onPress={() => navigation.navigate('SignUp')}
            style={{flexDirection: 'row'}}> */}
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
              {/* </Pressable> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </Formik>
  );
};

export default SignIn;
