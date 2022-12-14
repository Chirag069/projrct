import {useRoute} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {useDispatch, useSelector} from 'react-redux';
import {billpdfAction} from '../redux/actions/QrcodeAction';

const PDFExample = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const {Token} = useSelector(state => state.authState);

  // const pdfurl = route.params.invoiceId;

  // console.log(pdfurl);

  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={{
          uri: `https://nts.dhyaravi.com/outward_ipa/home/get_sales_pdf/${route.params.invoiceId}`,
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {}}
        onError={error => {
          console.log(error);
        }}
        onPressLink={uri => {}}
        style={styles.pdf}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PDFExample;
