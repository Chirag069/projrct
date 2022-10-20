import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  TouchableNativeFeedback,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {authLogOutAction, LoggedAction} from '../../redux/actions/authActons';

const CustomDrawer = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {}, []);

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: '', marginTop: scale(-4)}}>
        {/* <ImageBackground
          source={require('../../../assets/Images/background1.jpg')}
          style={{padding: verticalScale(10)}}>
          <Image
            source={{
              uri: 'https://www.disneyplusinformer.com/wp-content/uploads/2022/03/Moon-Knight-Profile-Avatar.png',
            }}
            style={{
              height: scale(80),
              width: scale(80),
              borderRadius: scale(40),
              marginBottom: verticalScale(10),
            }}
          />
          <Text
            style={{
              color: '#fff',
              fontSize: verticalScale(13),
              fontFamily: 'Roboto-Medium',
              marginBottom: verticalScale(5),
            }}>
            Chirag Ramani
          </Text>
        </ImageBackground> */}

        <View style={{backgroundColor: '#fff'}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          padding: verticalScale(10),
          borderTopWidth: scale(1),
          borderTopColor: '#ccc',
        }}>
        <TouchableOpacity
          onPress={() => {
            dispatch(authLogOutAction());
            props.navigation.reset({
              index: 0,
              routes: [{name: 'Home'}],
            });
          }}
          style={{}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="exit-outline" size={scale(22)} color="#333" />
            <Text
              style={{
                fontSize: scale(15),
                marginLeft: scale(5),
                color: '#333',
                fontWeight: 'bold',
              }}>
              log Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;
