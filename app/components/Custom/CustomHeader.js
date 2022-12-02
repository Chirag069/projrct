import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  Keyboard,
} from 'react-native';
import {Input} from 'native-base';
import {Button} from 'react-native-paper';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import CustomButton from './CustomButton';

//icon
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';

const CustomHeader = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View
      style={{
        backgroundColor: '#c79248',
        paddingHorizontal: scale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View style={{flexDirection: 'row'}}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.6)',
            }}>
            <View
              style={{
                backgroundColor: 'white',
                borderRadius: scale(15),
                paddingHorizontal: scale(40),
                paddingVertical: verticalScale(20),
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: scale(2),
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Text
                style={{
                  fontSize: moderateScale(17),
                  color: 'black',
                  fontWeight: 'bold',
                  marginBottom: verticalScale(5),
                }}>
                Serch Any Product
              </Text>
              <Input
                autoFocus={true}
                width={scale(220)}
                variant="underlined"
                _focus={{borderColor: '#c79248'}}
                _input={{
                  fontSize: verticalScale(15),
                  placeholderTextColor: 'black',
                }}
                placeholder="Serch Product"
              />
              <View style={{flexDirection: 'row', marginTop: scale(20)}}>
                <View style={{marginRight: scale(20)}}>
                  <CustomButton
                    borderWidth={scale(1)}
                    borderColor={'#c79248'}
                    buttoncolor={'white'}
                    buttonwidth={scale(100)}
                    buttonheight={verticalScale(40)}
                    text={'CANCEL'}
                    fontcolor={'#c79248'}
                    fontSize={scale(20)}
                    onPress={() => {
                      Keyboard.dismiss();
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
                <CustomButton
                  buttoncolor={'#c79248'}
                  buttonwidth={scale(100)}
                  buttonheight={verticalScale(40)}
                  text={'SERCH'}
                  fontcolor={'white'}
                  fontSize={scale(20)}
                  onPress={() => {
                    Keyboard.dismiss();
                    navigation.navigate('ProductList');
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Entypo name="list" size={scale(30)} color={'white'} />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: scale(20),
              color: '#000000',
              marginLeft: scale(10),
              fontFamily: 'Cairo-Regular',
            }}>
            Qr Scanner
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CustomHeader;
