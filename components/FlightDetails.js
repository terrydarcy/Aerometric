import React, {useState, useEffect} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Subheading,
} from 'react-native-paper';

const FlightDetails = ({navigation, props}) => {
  const [flightCode, setFlightCode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [altitude, setAltitude] = useState('');

  useEffect(() => {
    setFlightCode(props.flightCode);
    setLatitude(props.latitude);
    setLongitude(props.longitude);
    setAltitude(props.altitude);
  });
  const leftContent = () => {
    return (
      <Image
        source={require('../res/plane.png')}
        style={{
          flex: 1,
          width: 55,
          height: null,
          resizeMode: 'contain',
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Card style={styles.flightContainer}>
        <Card.Title
          style={{paddingLeft: 10}}
          title={'Flight ' + flightCode}
          subtitle="ICAO 24-BIT ADDRESS"
          left={leftContent}
        />
        <Card.Content>
          <Subheading>
            Longitude:
            <Text style={styles.apiDataTextColor}> {longitude}</Text>
          </Subheading>
          <Subheading>
            Latitude:
            <Text style={styles.apiDataTextColor}> {latitude}</Text>
          </Subheading>
          <Subheading>
            Altitude:
            <Text style={styles.apiDataTextColor}> {altitude}m</Text>
          </Subheading>
          <Subheading>
            {'\n'}
            Flight <Text style={styles.apiDataTextColor}>{flightCode}</Text> is
            cruising at an altitude of{' '}
            <Text style={styles.apiDataTextColor}>{altitude}m</Text>, with a
            longitude of{' '}
            <Text style={styles.apiDataTextColor}>{longitude}</Text> and a
            latitude of <Text style={styles.apiDataTextColor}>{latitude}</Text>.
          </Subheading>
        </Card.Content>

        <Card.Actions></Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    height: 200,
    flexDirection: 'column',
    marginTop: 50,
    justifyContent: 'center',
  },
  detailsContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    minHeight: 200,
  },
  flightContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    borderRadius: 30,
  },
  flight_title: {
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  text: {
    color: 'black',
    fontFamily: 'Roboto-Regular',
    fontSize: 15,
  },
  imageArea: {
    flex: 1,
  },
  infoArea: {
    flex: 1,
  },
  apiDataTextColor: {
    color: 'blue',
  },
});

export default FlightDetails;
