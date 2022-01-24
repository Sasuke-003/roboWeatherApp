import GetLocation from 'react-native-get-location';

export const getCurrentLatLon = async () => {
  try {
    const {latitude, longitude} = await GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    });
    // console.warn(latitude, longitude);
    return {lat: latitude, lon: longitude};
  } catch (e) {
    console.warn(e);
    return null;
  }
};
