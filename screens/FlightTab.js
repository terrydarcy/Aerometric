import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import SearchBox from '../components/SearchBox';

const mainColor = '#070707';

const FlightTab = ({navigation}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Flight 0',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Flight 1',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Flight 2',
    },
    {
      id: '58694a0f-3da1-431f-bd96-145571e29d72',
      title: 'Flight 3',
    },
    {
      id: '58634a0f-3da1-431f-bd96-145571e29d72',
      title: 'Flight 4',
    },
    {
      id: '58694a1f-3da1-431f-bd96-145571e29d72',
      title: 'Flight 5',
    },
  ];

  const Item = ({title}) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  const renderItem = ({item}) => <Item title={item.title} />;

  return (
    <View style={styles.container}>
      <View
        style={{
          marginTop: 40,
          marginHorizontal: 20,
        }}>
        <Text style={styles.header}>Flights</Text>
        <Text style={styles.body}>Search for a flight below</Text>
      </View>
      <View style={{marginTop: 30}}>
        <SearchBox navigation={navigation} />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bg: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    maxHeight: windowHeight + 50,
    maxWidth: windowWidth,
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
  item: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 30,
  },
  title: {
    fontFamily: 'Roboto-Regular',
    fontSize: 20,
  },
});

export default FlightTab;
