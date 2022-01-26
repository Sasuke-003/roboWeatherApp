import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  ImageBackground,
} from 'react-native';
import React, {useState} from 'react';
import {Header} from '../components';
import BackIcon from '../assets/images/back_icon.png';
import ClearIcon from '../assets/images/clear_icon.png';
import Logo from '../assets/images/logo.png';
import backgroundImage from '../assets/images/background.png';
import EmptyIcon from '../assets/images/icon_nothing.png';
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
  setIsError,
) => (
  <TextInput
    style={styles.input}
    onChangeText={text => {
      setSearchString(text);
      setIsError(false);
    }}
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
  const [isError, setIsError] = useState(false);
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
      setIsError(true);
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
      placeName: utils.convertLatinToEng(name),
      country,
      createdAt: new Date(),
      timezone,
      recentlySearched: true,
    };
    dispatch(replaceExistingPlaceWithRecentlySearched(WEATHER_DATA));
    goToHomeWithData(WEATHER_DATA);
  };

  const addToStorage = weatherData => {
    console.log('found');
    if (weatherData.cod !== 200) {
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
      placeName: utils.convertLatinToEng(name),
      country,
      createdAt: new Date(),
      timezone,
      recentlySearched: true,
      isFav: false,
    };
    dispatch(addRecentlySearched(WEATHER_DATA));
    goToHomeWithData(WEATHER_DATA);
  };

  const searchForCityWeather = async SEARCH_STRING => {
    try {
      const placeIndex = places.findIndex(
        place =>
          utils.convertLatinToEng(place.placeName).toUpperCase() ===
          utils.convertLatinToEng(SEARCH_STRING).toUpperCase(),
      );
      if (placeIndex !== -1) {
        //place found

        if (!utils.isDataExpired(places[placeIndex].createdAt)) {
          // data not expired

          dispatch(addRecentlySearched(places[placeIndex]));
          goToHomeWithData(places[placeIndex]);
          return;
        }
        const weatherData = await fetchFromApi(SEARCH_STRING); // if storage data expired then fetch and replace data
        replaceWeatherData(weatherData);
        return;
      }

      const weatherData = await fetchFromApi(SEARCH_STRING); // place not found in storage, fetch and add to storage
      addToStorage(weatherData);
    } catch (e) {
      // console.warn(e);
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
        style={{borderBottomWidth: 2, borderColor: '#00000015'}}
        leftIcon={headerLeftIcon}
        leftIconOnPress={headerLeftIconOnPress}
        centerComponent={() =>
          headerCenterComponent(
            searchString,
            setSearchString,
            searchForCityWeather,
            setIsError,
          )
        }
        rightIcon={headerRightIcon}
        rightIconOnPress={headerRightIconOnPress}
      />
      <View style={{flex: 10, backgroundColor: '#fff'}}>
        {isError && (
          <View
            style={{
              height: '85%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* <Image
            source={EmptyIcon}
            style={{height: 100, resizeMode: 'contain'}}
          /> */}
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 18,
                marginTop: 25,
              }}>
              Please Enter valid city name
            </Text>
          </View>
        )}
      </View>
    </View>
    // </ImageBackground>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {backgroundColor: '#fff', height: '100%'},
  headerLeftIcon: {height: 18, width: 18},
  headerCenterComponent: {},
  headerRightIcon: {height: 18, width: 18},
  input: {
    height: 24,
    width: 113,
    marginLeft: 32,

    // borderWidth: 1,
  },
});
