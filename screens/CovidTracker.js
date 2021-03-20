import React, {useState} from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const mainColor = '#070707';
const CovidTracker = ({}) => {
  const [textVal, setText] = useState('');

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 40,
          marginHorizontal: 20,
        }}>
        <Text style={styles.header}>Covid-19 Check</Text>
        <Text style={styles.body}>Search for a country below</Text>
      </View>
      <View style={{marginTop: 30}}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#fff',
            borderRadius: 40,
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 20,
            margin: 20,
          }}>
          <Icon name="search" size={20} color={mainColor} />
          <TextInput
            style={{
              fontFamily: 'Roboto-Regular',
              fontSize: 15,
              paddingHorizontal: 20,
              color: mainColor,
            }}
            onChangeText={(text) => setText({text})}
            placeholder="Search country"
            placeholderTextColor={mainColor}
            onSubmitEditing={() => console.log(textVal)}
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontFamily: 'Roboto-Black',
    fontSize: 45,
    color: mainColor,
  },
  body: {
    fontFamily: 'Roboto-Regular',
    fontSize: 17,
    color: mainColor,
  },
});

export default CovidTracker;
