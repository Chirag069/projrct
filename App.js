import {View, Text, StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './app/redux/store';
import Toast from 'react-native-toast-message';
import 'react-native-gesture-handler';
import AppNav from './app/Navigation/AppNav';
import {NavigationContainer} from '@react-navigation/native';
import Index from './app/Navigation/Index';

const App = () => {
  return (
    <Provider store={store}>
      <Index />
      <Toast />
    </Provider>
  );
};

export default App;
