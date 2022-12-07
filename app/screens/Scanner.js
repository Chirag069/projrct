import {View, Text, Button, Linking} from 'react-native';
import React, {useEffect} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {useCallback} from 'react';
import {Svg, Defs, Rect, Mask} from 'react-native-svg';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {useState} from 'react';

const Scanner = () => {
  const [barcode, setBarcode] = useState('');
  const [isScanned, setIsScanned] = useState(false);
  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE]);
  const devices = useCameraDevices();
  const device = devices.back;

  useEffect(() => {
    requestCameraPermission();
  }, []);

  console.log(barcodes);

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission();

    if (permission == 'denied') await Linking.openSettings();
  }, []);

  const renderCamera = () => {
    if (device == null) {
      return <View style={{flex: 1}}></View>;
    } else {
      return (
        <View style={{flex: 1}}>
          <Camera
            style={{
              flex: 1,
            }}
            device={device}
            isActive={true}
            enableZoomGesture
            frameProcessor={frameProcessor}
            frameProcessorFps={5}
          />
        </View>
      );
    }
  };

  return <View style={{flex: 1}}>{renderCamera()}</View>;
};

export default Scanner;
