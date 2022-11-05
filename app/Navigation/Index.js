import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import AppNav from './AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {LoggedAction} from '../redux/actions/authActons';

const Index = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem('@user_token');
      dispatch(LoggedAction(userToken));
    })();
  }, [dispatch]);

  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};

export default Index;
