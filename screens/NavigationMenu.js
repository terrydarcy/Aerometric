import React from 'react';
import {View, Button} from 'react-native';

function NavigationMenu({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

export default NavigationMenu;
