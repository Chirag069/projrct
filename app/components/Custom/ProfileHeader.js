import { View, Text ,TouchableOpacity} from 'react-native'
import React from 'react'
import Entypo from 'react-native-vector-icons/Entypo';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';



const ProfileHeader = () => {
    const navigation=useNavigation()
  return (
    <View
    style={{
      backgroundColor: '#c79248',
      flexDirection: 'row',
      alignItems: 'center',
    }}>
    <TouchableOpacity onPress={()=> navigation.goBack()}>
      <Entypo name="chevron-left" size={scale(40)} color="white" />
    </TouchableOpacity>
    <Text
      style={{
        fontSize: scale(25),
        color: 'white',
        paddingLeft: scale(90),
      }}>
      PROFILE
    </Text>
  </View>
  )
}

export default ProfileHeader