import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomDrawer from '../components/Custom/CustomDrawer';
import Home from '../screens/Home';
import CustomHeader from '../components/Custom/CustomHeader';
import StackNav from './StackNav';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
import CreateBill from '../screens/CreateBill';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Drawer.Navigator
      initialRouteName="CreateBill"
      drawerContent={props => <CustomDrawer {...props} />}
      screenOptions={{
        drawerItemStyle: {
          marginVertical: scale(0),
          marginHorizontal: scale(0),
          padding: scale(0),
          borderRadius: scale(0),
          borderBottomColor: 'lightgrey',
          borderBottomWidth: scale(1),
        },
        drawerActiveBackgroundColor: 'white',
        drawerInactiveBackgroundColor: 'white',
        drawerActiveTintColor: '#333',
        drawerInactiveTintColor: '#333',
        drawerStyle: {width: scale(280)},
        drawerLabelStyle: {},
        headerShown: false,
      }}>
      {/* <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
        name="Home"
        component={Home}
      /> */}
      <Drawer.Screen
        options={{
          headerShown: true,
          header: () => <CustomHeader />,
        }}
        name="CreateBill"
        component={CreateBill}
      />
    </Drawer.Navigator>
  );
}
