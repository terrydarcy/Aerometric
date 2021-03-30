import FetchData from '../components/FetchData';
import axios from 'axios';

const path = 'https://flight-data4.p.rapidapi.com/get_flight_info';
const flightCode = 'AC7211';

jest.mock('axios');

describe('FetchData', () => {
  it('fetches data successfully from the API', async () => {
    const data = {
      AC7211: {
        flight: {
          latitude: 52.16579,
          longitude: -5.58419,
          callsign: 'ACA7211',
          iata: 'AC7211',
          altitude: 34000,
          heading: 280,
          groundspeed: 480,
          dep_actual: '14:05',
          distance: 6342,
          id: '1556515137',
        },
        airline: {
          icao: 'ACA',
          iata: 'AC',
          name: 'Air Canada',
        },
        aircraft: {
          reg: 'C-FIVS',
          photo1: 'C-FIVS-1616612405-0.jpg',
          photo2: 'C-FIVS-1616612405-1.jpg',
          type: 'B77W',
          desc: 'Boeing 777-333ER',
          number: '35784/797',
          ff: '11 years',
          ff_date: 'Jun 5, 2009',
        },
        dep_airport: {
          latitude: 50.0264,
          longitude: 8.54313,
          icao: 'EDDF',
          iata: 'FRA',
          name: 'Frankfurt am Main International Airport',
          city: 'Frankfurt',
          timezone_abbr: 'CEST',
          timezone_name: 'Central European Summer Time',
          timezone: '+02:00',
        },
        arr_airport: {
          latitude: 43.6772,
          longitude: -79.6306,
          icao: 'CYYZ',
          iata: 'YYZ',
          name: 'Lester B. Pearson International Airport',
          city: 'Toronto',
          timezone_abbr: 'EDT',
          timezone_name: 'Eastern Daylight Time',
          timezone: '-0-4:00',
        },
        source: 'ADSB',
        station: 'EXTRPI007309',
      },
    };

    axios.get.mockImplementationOnce(() => Promise.resolve(data));
    await expect(FetchData(path, flightCode)).resolves.toEqual(data);
  });
  it('fetches data erroneously from the API', async () => {
    const errorMessage = 'Network Error';

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage)),
    );
    await expect(FetchData(path, flightCode)).rejects.toThrow(errorMessage);
  });
});
