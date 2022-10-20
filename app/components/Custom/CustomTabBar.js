import {View, Text, TabBarIOSItem} from 'react-native';
import React from 'react';
import {scale, verticalScale} from 'react-native-size-matters';

const CustomTabBar = props => {
  return (
    <View style={{height: verticalScale(50)}} {...props}>
      <Text>gg</Text>
      <View></View>
    </View>
  );
};

export default CustomTabBar;
