import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentLatLon} from './Location';
import {api} from '../server';
const DataExpiryTime = 30; /// in minutes

const storageKeys = {
  currentLocData: 'current-place-data',
};

export const isDataExpired = createdAt => {
  var startTime = new Date(createdAt);
  var endTime = new Date();
  var difference = endTime.getTime() - startTime.getTime(); // in milliseconds
  var resultInMinutes = Math.round(difference / 60000); // convert to seconds
  return resultInMinutes > DataExpiryTime ? true : false;
};

export const getCurrentLocData = async () => {
  try {
    var result = {},
      isFoundInStorage = false;
    const {lat, lon} = await getCurrentLatLon();
    var prevLocData = await AsyncStorage.getItem(storageKeys.currentLocData);
    prevLocData = prevLocData != null ? JSON.parse(prevLocData) : [];

    for (let i = 0; i < prevLocData.length; i++) {
      if (
        prevLocData[i] &&
        prevLocData[i].lat === lat &&
        prevLocData[i].lon === lon &&
        !isDataExpired(prevLocData[i].createdAt) // if users loc is not changed and data not expired
      ) {
        result = prevLocData[i];
        isFoundInStorage = true;
      }
    }
    const tempLocData = prevLocData.filter(
      place => !isDataExpired(place.createdAt),
    );
    await AsyncStorage.setItem(
      storageKeys.currentLocData,
      JSON.stringify(tempLocData),
    ); ///// clean up the cache
    if (isFoundInStorage) {
      return result;
    }
    return fetchFromApi(lat, lon); // if lat and lon not in storage
  } catch (e) {
    console.warn(e);
  }
};

const fetchFromApi = async (lat, lon) => {
  try {
    const {
      data: {
        weather,
        main: {temp, temp_min, temp_max, humidity},
        visibility,
        wind: {speed},
        name,
        sys: {country},
        timezone,
      },
    } = await api.weather.getDataUsingLatLon(lat, lon);
    const weatherData = {
      temp,
      temp_min,
      temp_max,
      humidity,
      visibility,
      windSpeed: speed,
      name: weather[0].main,
      icon: weather[0].icon,
      placeName: name,
      country,
      lat,
      lon,
      createdAt: new Date(),
      isFav: false,
      recentlySearched: false,
      timezone,
    };
    var prevLocData = await AsyncStorage.getItem(storageKeys.currentLocData);
    prevLocData = prevLocData != null ? JSON.parse(prevLocData) : [];
    prevLocData.unshift(weatherData);
    await AsyncStorage.setItem(
      storageKeys.currentLocData,
      JSON.stringify(prevLocData),
    ); // store in asyncStorage
    return weatherData;
  } catch (e) {
    console.warn(e);
  }
};

// export const getCurrentLocData = async () => {
//   try {
//     var result;
//     const {lat, lon} = await getCurrentLatLon();
//     var prevLocData = await AsyncStorage.getItem(storageKeys.currentLocData);
//     prevLocData = prevLocData != null ? JSON.parse(prevLocData) : null;

//     if (
//       prevLocData &&
//       prevLocData.lat === lat &&
//       prevLocData.lon === lon &&
//       !isDataExpired(prevLocData.createdAt) // if users loc is not changed and data not expired
//     ) {
//       return prevLocData;
//     }
//     const {
//       data: {
//         weather,
//         main: {temp, temp_min, temp_max, humidity},
//         visibility,
//         wind: {speed},
//         name,
//         sys: {country},
//         timezone,
//       },
//     } = await api.weather.getDataUsingLatLon(lat, lon);
//     const weatherData = {
//       temp,
//       temp_min,
//       temp_max,
//       humidity,
//       visibility,
//       windSpeed: speed,
//       name: weather[0].main,
//       icon: weather[0].icon,
//       placeName: name,
//       country,
//       lat,
//       lon,
//       createdAt: new Date(),
//       isFav: false,
//       recentlySearched: false,
//       timezone,
//     };
//     await AsyncStorage.setItem(
//       storageKeys.currentLocData,
//       JSON.stringify(weatherData),
//     ); // store in asyncStorage
//     return weatherData;
//   } catch (e) {
//     console.warn(e);
//   }
// };
