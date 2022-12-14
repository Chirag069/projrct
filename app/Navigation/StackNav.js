import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Drawer from '../Navigation/Drawer';
import Index from './Index';
import PDFExample from '../screens/pdf';

const Stack = createNativeStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={Drawer} />
      <Stack.Screen name="PDF" component={PDFExample} />
    </Stack.Navigator>
  );
};

export default StackNav;
