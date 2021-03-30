import React from 'react';
import {View, Text} from 'react-native';
import axios from 'axios';
import Config from 'react-native-config';

const FetchData = async (path, flight) => {
  const options = {
    method: 'GET',
    url: path,
    params: {flight: flight.toUpperCase()},
    headers: {
      'x-rapidapi-key': Config.FLIGHT_API_KEY,
      'x-rapidapi-host': 'flight-data4.p.rapidapi.com',
    },
  };

  return await axios.get(options);
};

export default FetchData;
