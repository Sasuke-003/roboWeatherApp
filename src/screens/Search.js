import {
  StyleSheet,
  TextInput,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../components';
import BackIcon from '../assets/images/back_icon.png';
import ClearIcon from '../assets/images/clear_icon.png';
import Logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background.png';
import {useDispatch, useSelector} from 'react-redux';
import {NAVIGATION_ROUTES} from '../constants';
import {
  addRecentlySearched,
  getAllPlaces,
  replaceExistingPlaceWithRecentlySearched,
} from '../redux/reducers/placeReducer';
import {utils} from '../utils';
import {api} from '../server';
import {
  setCurrentPlace,
  getCurrentPlace,
} from '../redux/reducers/currentPlaceReducer';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={BackIcon} />
);

const headerCenterComponent = (
  searchString,
  setSearchString,
  searchForCityWeather,
) => (
  <TextInput
    style={styles.input}
    onChangeText={setSearchString}
    value={searchString}
    placeholder="Search for city"
    onSubmitEditing={({nativeEvent: {text, eventCount, target}}) => {
      searchForCityWeather(text);
    }}
  />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={ClearIcon} />
);

const Search = ({navigation}) => {
  const [searchString, setSearchString] = useState('');
  const dispatch = useDispatch();
  const places = useSelector(getAllPlaces);

  const goToHomeWithData = weatherData => {
    dispatch(setCurrentPlace(weatherData));
    navigation.navigate(NAVIGATION_ROUTES.HOME);
    // navigation.navigate(NAVIGATION_ROUTES.MAIN, {
    //   screen: NAVIGATION_ROUTES.HOME,
    //   params: {WEATHER_DATA: weatherData},
    // });
  };

  const fetchFromApi = async SEARCH_STRING => {
    try {
      const {data} = await api.weather.getDataUsingCityName(SEARCH_STRING);
      return data;
    } catch (e) {
      console.warn(e);
    }
  };

  const replaceWeatherData = weatherData => {
    if (weatherData.cod !== 200) {
      // console.warn('no such place');
      return;
    }
    const {
      weather,
      main: {temp, temp_min, temp_max, humidity},
      visibility,
      wind: {speed},
      name,
      sys: {country},
      timezone,
    } = weatherData;
    const WEATHER_DATA = {
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
      createdAt: new Date(),
      timezone,
      recentlySearched: true,
    };
    dispatch(replaceExistingPlaceWithRecentlySearched(WEATHER_DATA));
    goToHomeWithData(WEATHER_DATA);
    // console.warn(WEATHER_DATA);
  };

  const addToStorage = weatherData => {
    if (weatherData.cod !== 200) {
      // console.warn(weatherData);
      return;
    }
    const {
      weather,
      main: {temp, temp_min, temp_max, humidity},
      visibility,
      wind: {speed},
      name,
      sys: {country},
      timezone,
    } = weatherData;
    const WEATHER_DATA = {
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
      createdAt: new Date(),
      timezone,
      recentlySearched: true,
      isFav: false,
    };
    dispatch(addRecentlySearched(WEATHER_DATA));
    goToHomeWithData(WEATHER_DATA);
    // console.warn(WEATHER_DATA);
  };

  const searchForCityWeather = async SEARCH_STRING => {
    try {
      const placeIndex = places.findIndex(
        place => place.placeName.toUpperCase() === SEARCH_STRING.toUpperCase(),
      );
      if (placeIndex !== -1) {
        //place found
        if (!utils.isDataExpired(places[placeIndex])) {
          // data not expired

          addRecentlySearched(places[placeIndex]);
          goToHomeWithData(places[placeIndex]);
          return;
        }
        const weatherData = fetchFromApi(SEARCH_STRING); // if storage data expired then fetch and replace data
        replaceWeatherData(weatherData);
      }
      const weatherData = await fetchFromApi(SEARCH_STRING); // place not found in storage, fetch and add to storage
      addToStorage(weatherData);
    } catch (e) {
      console.warn(e);
    }
  };

  const headerLeftIconOnPress = () => {
    // navigation.navigate(NAVIGATION_ROUTES.HOME);
    navigation.goBack();
  };

  const headerRightIconOnPress = () => {
    setSearchString('');
  };

  return (
    // <ImageBackground style={{height: '100%'}} source={backgroundImage}>
    <View style={styles.container}>
      <Header
        backgroundColor="white"
        leftIcon={headerLeftIcon}
        leftIconOnPress={headerLeftIconOnPress}
        centerComponent={() =>
          headerCenterComponent(
            searchString,
            setSearchString,
            searchForCityWeather,
          )
        }
        rightIcon={headerRightIcon}
        rightIconOnPress={headerRightIconOnPress}
      />
      <View style={{flex: 10, backgroundColor: '#fff'}}></View>
    </View>
    // </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: '100%'},
  headerLeftIcon: {height: 12, width: 18},
  headerCenterComponent: {},
  headerRightIcon: {height: 18, width: 18},
  input: {
    height: 24,
    width: 113,
    marginLeft: 32,

    // borderWidth: 1,
  },
});
