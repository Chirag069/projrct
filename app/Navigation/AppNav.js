import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import {LoggedAction} from '../redux/actions/authActons';
import {ActivityIndicator} from 'react-native-paper';
import {LoggedLoadingAction} from '../redux/actions/authActons';
import Home from '../screens/Home';
import StackNav from './StackNav';
import Drawer from '../Navigation/Drawer';
import AuthStack from './AuthStack';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNav = () => {
  const dispatch = useDispatch();
  const {loggedLoading, authLoading, Token} = useSelector(
    state => state.authState,
  );

  console.log(Token);

  useEffect(() => {
    (async () => {
      const userToken = await AsyncStorage.getItem('@user_token');
      console.log(userToken);
      try {
        dispatch(LoggedAction(userToken));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [dispatch]);

  return (
    <>
      {loggedLoading || authLoading ? (
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
            paddingVertical: verticalScale(20),
          }}>
          <ActivityIndicator
            animating={loggedLoading || authLoading}
            color={'#c79248'}
            size={scale(30)}
          />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {Token !== null ? <StackNav /> : <AuthStack />}
        </View>
      )}
    </>
  );
};

export default AppNav;
