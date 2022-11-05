import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppNav from './AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {LoggedAction} from '../redux/actions/authActons';
import SplashScreen from 'react-native-splash-screen';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem('@user_token');
      try {
        dispatch(LoggedAction(userToken));
        setTimeout(() => {
          SplashScreen.hide();
        }, 1000);
      } catch (e) {
        SplashScreen.hide();
      }
    })();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};

export default Index;
