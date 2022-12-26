import React from 'react';
import {View, Text, Modal, Image, Dimensions, StyleSheet} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';

const NoNetwork = () => {
  return (
    <Modal>
      <View style={noNetworkStyles.noNetWorkContainer}>
        <Image
          style={noNetworkStyles.noNetworkImageStyle}
          source={require('../../assets/Images/nointernet.jpg')}
        />
        <View style={noNetworkStyles.noNetworkTextContianer}>
          <Text style={noNetworkStyles.nonetworkTextStyle}>
            No Internet Connection
          </Text>
        </View>
        <View style={noNetworkStyles.nonetworkInfoContianer}>
          <Text style={noNetworkStyles.nonetworkInfoText}>
            Please check your internet connection and try again
          </Text>
        </View>
        <View style={noNetworkStyles.noNetworkTryAgainContainer}>
          <Text style={noNetworkStyles.tryAgainText}>Try again</Text>
        </View>
      </View>
    </Modal>
  );
};

export default NoNetwork;

const noNetworkStyles = StyleSheet.create({
  headerComponentStyle: {
    marginHorizontal: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(
      Dimensions.get('window').height * 0.027285129604365622,
    ),
    marginBottom: verticalScale(
      Dimensions.get('window').height * 0.0068212824010914054,
    ),
  },
  noNetWorkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  noNetworkImageContainer: {
    backgroundColor: '#fff2f2',
    paddingVertical: verticalScale(30),
    paddingHorizontal: scale(30),
    borderRadius: scale(30 * 2),
  },
  noNetworkImageStyle: {
    zIndex: 1,
    width: scale(300),
    height: scale(300),
  },
  noNetworkTextContianer: {
    marginTop: verticalScale(30),
    marginHorizontal: scale(30),
  },
  nonetworkTextStyle: {
    textAlign: 'center',
    color: '#000000',
    fontSize: verticalScale(28),
    fontWeight: 'bold',
  },
  nonetworkInfoContianer: {
    marginHorizontal: scale(30),
    marginTop: scale(5),
  },
  nonetworkInfoText: {
    textAlign: 'center',
    color: '#000000',
    fontSize: verticalScale(16),
  },
  noNetworkTryAgainContainer: {
    marginTop: verticalScale(30),
    backgroundColor: '#000000',
    paddingVertical: verticalScale(13),
    paddingHorizontal: scale(40),
    borderRadius: scale(4),
  },
  tryAgainText: {
    color: '#FFFFFF',
    fontSize: verticalScale(18),
  },
});
