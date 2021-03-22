import React, {useRef} from 'react';
import {View} from 'react-native';
import ViewPager from '@react-native-community/viewpager';

import Page from '../components/Page';
import {useNavigation} from '@react-navigation/native';
import Footer from '../components/Footer';

const Onboarding = () => {
  const navigation = useNavigation();
  const pagerRef = useRef(null);

  const handlePageChange = (pageNumber) => {
    pagerRef.current.setPage(pageNumber);
  };

  return (
    <View style={{flex: 1}}>
      <ViewPager style={{flex: 1}} initialPage={0} ref={pagerRef}>
        <View key="1">
          <Page
            backgroundColor="#2B59C3"
            icon={'plane'}
            title="Welcome to the Aerometric app"
          />
          <Footer
            backgroundColor="#557acf"
            rightButtonLabel="Next"
            rightButtonPress={() => handlePageChange(1)}
          />
        </View>
        <View key="2">
          <Page
            backgroundColor="#ffc93c"
            icon={'map-pin'}
            title="Live flights map"
          />
          <Footer
            backgroundColor="#ffd463"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(0);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => handlePageChange(2)}
          />
        </View>
        <View key="3">
          <Page
            backgroundColor="#cf0c3a"
            icon={'plane-departure'}
            title="Flight Tracker"
          />
          <Footer
            backgroundColor="#d93d61"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(1);
            }}
            rightButtonLabel="Next"
            rightButtonPress={() => handlePageChange(3)}
          />
        </View>
        <View key="4">
          <Page
            backgroundColor="#09b80c"
            icon={'viruses'}
            title="Covid-19 Checker"
          />
          <Footer
            backgroundColor="#3ac63d"
            leftButtonLabel="Back"
            leftButtonPress={() => {
              handlePageChange(2);
            }}
            rightButtonLabel="Continue"
            rightButtonPress={() => {
              navigation.navigate('Login');
            }}
          />
        </View>
      </ViewPager>
    </View>
  );
};

export default Onboarding;
