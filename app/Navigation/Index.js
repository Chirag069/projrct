import {View, Text} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import AppNav from './AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector, useDispatch} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import {LoggedAction} from '../redux/actions/authActons';
import SplashScreen from 'react-native-splash-screen';
import NoNetwork from '../components/Custom/NoNetwork.Component';
import NetInfo from '@react-native-community/netinfo';

const Index = () => {
  const dispatch = useDispatch();

  const [isOffline, setOfflineStatus] = useState(false);
  const refIsOffline = useRef(false);
  const refOfflineUpdate = useRef(0);

  useEffect(() => {
    NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      if (refOfflineUpdate.current === 0 || refIsOffline.current) {
        refOfflineUpdate.current = 1;
        refIsOffline.current = offline;
        setOfflineStatus(offline);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  if (isOffline) {
    return <NoNetwork />;
  }

  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
};

export default Index;
