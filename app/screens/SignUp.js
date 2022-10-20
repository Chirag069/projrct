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
import React, {useState} from 'react';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {userLoginAction} from '../redux/actions/authActons';
import Toast from 'react-native-toast-message';

const Screen_Width = Dimensions.get('window').width;

const SignUp = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [userNameInput, setUserNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [passwordConfirmInput, setPasswordConfirmInput] = useState('');

  const signUpUser = () => {
    if (userNameInput && emailInput && passwordInput && passwordConfirmInput) {
      if (
        !String(emailInput)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          )
      ) {
        Toast.show({
          text1: 'please enter a valid email address',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });

        return;
      }
      if (!(passwordInput == passwordConfirmInput)) {
        Toast.show({
          text1: 'password and password confirm is not same',
          visibilityTime: 3000,
          autoHide: true,
          position: 'top',
          type: 'error',
        });

        return;
      }

      dispatch(userLoginAction(emailInput, passwordInput));
    } else {
      Toast.show({
        text1: 'You Forgot to enter something',
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
        <View style={{alignItems: 'center'}}>
          <Image
            style={{height: 250, width: Screen_Width - 100}}
            source={require('../assets/Images/logo.png')}
          />
        </View>
        <View style={{marginHorizontal: 20}}>
          <View style={{alignItems: 'center', marginVertical: 10}}>
            <Text style={{fontSize: 20, color: 'black'}}>Customer Sign In</Text>
          </View>
          <TextInput
            label="Name"
            style={{backgroundColor: 'white'}}
            onChangeText={setUserNameInput}
            value={userNameInput}
          />
          <TextInput label="Mobile No." style={{backgroundColor: 'white'}} />
          <TextInput
            label="Email Id"
            style={{backgroundColor: 'white'}}
            onChangeText={setEmailInput}
            value={emailInput}
          />
          <TextInput
            label="Password"
            style={{backgroundColor: 'white'}}
            onChangeText={setPasswordInput}
            value={passwordInput}
            secureTextEntry={true}
          />
          <TextInput
            label="Confirm Password"
            style={{backgroundColor: 'white'}}
            onChangeText={setPasswordConfirmInput}
            value={passwordConfirmInput}
          />
          <View style={{marginBottom: 30, marginTop: 50}}>
            <Button
              contentStyle={{height: 70}}
              labelStyle={{fontSize: 20}}
              style={{borderRadius: 50}}
              buttonColor="#c79248"
              textColor="white"
              onPress={() => {
                Keyboard.dismiss();
                signUpUser();
              }}>
              SIGN Up
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <View style={{flex: 1, height: 1, backgroundColor: 'darkgrey'}} />
          </View>
          <Pressable onPress={() => navigation.navigate('SignIn')}>
            <Text style={{color: 'black', alignSelf: 'center'}}>
              You are not a registered use click here
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
