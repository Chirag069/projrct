import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  TouchableOpacity,
  Text,
  Alert,
  Linking,
  PermissionsAndroid,
  ToastAndroid,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {scale, verticalScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import {billpdfAction} from '../redux/actions/QrcodeAction';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import RNFetchBlob from 'rn-fetch-blob';
import Share from 'react-native-share';

const PDFExample = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);
  const [download, setDownload] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          setDownload(true);
        } else {
          Alert.alert(
            'Permission Denied!',
            'You need to give storage permission to download the file',
          );
        }
      } catch (err) {}
    })();
  }, []);

  const actualDownload = () => {
    if (download) {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          setLoading(true);
          const {dirs} = RNFetchBlob.fs;

          var downaldoFileString =
            route.params && route.params.invoice_id
              ? route.params.invoice_id
              : route.params &&
                route.params.billdata &&
                route.params.billdata.bill_no
              ? route.params.billdata.bill_no
              : 'Invoice';

          var downalodFileName = `Estimate Shreeji_${downaldoFileString}.pdf`;

          RNFetchBlob.config({
            fileCache: true,
            addAndroidDownloads: {
              useDownloadManager: true,
              notification: true,
              mediaScannable: true,
              title: downalodFileName,
              path: `${dirs.DownloadDir}/${downaldoFileString}.pdf`,
            },
          })
            .fetch(
              'GET',
              `https://nts.dhyaravi.com/outward_ipa/home/get_sales_pdf/${route.params.invoiceId}`,
              {
                Authorization: `Bearer ${Token}`,
              },
            )
            .then(res => {
              setLoading(false);
              ToastAndroid.show(
                `${downalodFileName} PDF successfully downloaded`,
                ToastAndroid.SHORT,
              );
            })
            .catch(e => {
              setLoading(false);
              NetInfo.fetch().then(state => {
                if (state.isConnected) {
                  Toast.show({
                    text1: 'Something went wrong try again',
                    visibilityTime: 3000,
                    autoHide: true,
                    position: 'bottom',
                    type: 'error',
                  });
                } else {
                  Toast.show({
                    text1: 'Check your Internet Connection',
                    visibilityTime: 3000,
                    autoHide: true,
                    position: 'bottom',
                    type: 'error',
                  });
                }
              });
            });
        } else {
          Toast.show({
            text1: 'Check your Internet Connection',
            visibilityTime: 3000,
            autoHide: true,
            position: 'bottom',
            type: 'error',
          });
        }
      });
    } else {
      Alert.alert(
        'Permission Denied!',
        'You need to give storage permission to download the file',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => Linking.openSettings()},
        ],
      );
    }
  };

  return (
    <>
      {loading ? (
        <View
          style={{
            marginTop: 'auto',
            marginBottom: 'auto',
            alignItems: 'center',
            paddingVertical: verticalScale(20),
          }}>
          <StatusBar backgroundColor={'#9ECED9'} barStyle="dark-content" />
          <ActivityIndicator
            animating={loading}
            color={'#9ECED9'}
            size={scale(30)}
          />
        </View>
      ) : (
        <View style={styles.container}>
          <View
            style={{
              paddingLeft: scale(15),
              paddingVertical: verticalScale(10),
              backgroundColor: '#FFFFFF',
              borderBottomColor: '#9ECED9',
              borderBottomWidth: scale(0.2),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Ionicons
                name="caret-back"
                size={verticalScale(20)}
                color={'#9ECED9'}
              />

              <View>
                <Text
                  style={{
                    color: '#9ECED9',
                    fontWeight: 'normal',
                    fontSize: scale(17),
                  }}>
                  ORDER PDF
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{marginRight: scale(15)}}
                onPress={() => {
                  actualDownload();
                }}>
                <MaterialIcons
                  color="#9ECED9"
                  name="file-download"
                  size={scale(30)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginRight: scale(15), marginLeft: scale(10)}}
                onPress={() => {
                  NetInfo.fetch().then(state => {
                    if (state.isConnected) {
                      const {dirs} = RNFetchBlob.fs;

                      RNFetchBlob.config({
                        fileCache: true,
                      })
                        .fetch(
                          'GET',
                          `https://nts.dhyaravi.com/outward_ipa/home/get_sales_pdf/${route.params.invoiceId}`,
                          {
                            Authorization: `Bearer ${Token}`,
                          },
                        )
                        .then(res => {
                          res.readFile('base64').then(basepdf => {
                            let shareOptionsUrl = {
                              title: 'App Pdf',
                              message: 'PDF',
                              url: `data:application/pdf;base64,${basepdf}`,
                              subject:
                                'Share information from your application',
                            };
                            Share.open(shareOptionsUrl);
                          });
                        })
                        .catch(e => {
                          setLoading(false);
                          NetInfo.fetch().then(state => {
                            if (state.isConnected) {
                              Toast.show({
                                text1: 'Something went wrong try again',
                                visibilityTime: 2000,
                                autoHide: true,
                                position: 'top',
                                type: 'error',
                              });
                            } else {
                              Toast.show({
                                text1: 'Check your Internet Connection',
                                visibilityTime: 2000,
                                autoHide: true,
                                position: 'top',
                                type: 'error',
                              });
                            }
                          });
                        });
                    } else {
                      Toast.show({
                        text1: 'Check your Internet Connection',
                        visibilityTime: 2000,
                        autoHide: true,
                        position: 'top',
                        type: 'error',
                      });
                    }
                  });
                }}>
                <MaterialCommunityIcons
                  color="#9ECED9"
                  name="share"
                  size={scale(30)}
                />
              </TouchableOpacity>
            </View>
          </View>

          <Pdf
            trustAllCerts={false}
            source={{
              uri: `https://nts.dhyaravi.com/outward_ipa/home/get_sales_pdf/${route.params.invoiceId}`,
              headers: {
                Authorization: `Bearer ${Token}`,
              },
            }}
            onLoadComplete={(numberOfPages, filePath) => {}}
            onPageChanged={(page, numberOfPages) => {}}
            onError={error => {}}
            onPressLink={uri => {}}
            style={styles.pdf}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    // marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFExample;
