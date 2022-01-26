import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  getRecentlySearchedPlaces,
  replaceMultipleExistingPlaces,
  replaceExistingPlace,
  deleteAllRecentlySearchedPlaces,
} from '../redux/reducers/placeReducer';
import {
  setCurrentPlace,
  deleteCurrentPlace,
} from '../redux/reducers/currentPlaceReducer';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import BackIcon from '../assets/images/back_icon.png';
import ClearIcon from '../assets/images/clear_icon.png';
import backgroundImage from '../assets/images/background.png';
import SearchBlack from '../assets/images/search_black.png';
import FavIcon from '../assets/images/icon_favourite.png';
import EmptyIcon from '../assets/images/icon_nothing.png';
import FavActiveIcon from '../assets/images/icon_favourite_active.png';
import {NAVIGATION_ROUTES} from '../constants';
import {Header, LoadingComponent, Card} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {utils} from '../utils';
import {api} from '../server';
import {useDeviceOrientation} from '@react-native-community/hooks';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={BackIcon} />
);

const headerCenterComponent = () => (
  <Text style={styles.headerCenterComponent}>Recent Search</Text>
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={SearchBlack} />
);

const ListEmptyComponent = () => {
  const {landscape} = useDeviceOrientation();

  return (
    <View
      style={{
        height: landscape ? '200%' : '400%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image source={EmptyIcon} style={{height: 100, resizeMode: 'contain'}} />
      <Text
        style={{
          color: '#FFFFFF',
          fontFamily: 'Roboto',
          fontSize: 18,
          marginTop: 25,
        }}>
        No recent search
      </Text>
    </View>
  );
};

const RecentSearch = ({navigation, goToSearch, goBack}) => {
  const [isFetching, setIsFetching] = useState(true);
  const recentlySearchedPlaces = useSelector(getRecentlySearchedPlaces);
  const dispatch = useDispatch();
  const {landscape} = useDeviceOrientation();
  const headerLeftIconOnPress = () => {
    // navigation.navigate(NAVIGATION_ROUTES.HOME);
    goBack();
  };

  const headerRightIconOnPress = () => {
    goToSearch();
  };

  const clickOnCard = async weatherData => {
    try {
      if (!utils.isDataExpired(weatherData.createdAt)) {
        dispatch(setCurrentPlace(weatherData));
      } else {
        const data = await fetchFromApi(weatherData.placeName);
        dispatch(replaceExistingPlace(data));
      }
      goBack();
    } catch (e) {
      console.warn(e);
    }
  };

  const deleteAll = () => {
    Alert.alert('', 'Are you Sure you want to clear recent searches?', [
      {text: 'No', style: 'No', onPress: () => {}},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteAllRecentlySearchedPlaces());
          dispatch(deleteCurrentPlace());
        },
      },
    ]);
  };

  const fetchFromApi = async SEARCH_STRING => {
    try {
      const {data} = await api.weather.getDataUsingCityName(SEARCH_STRING);
      const {
        weather,
        main: {temp, temp_min, temp_max, humidity},
        visibility,
        wind: {speed},
        name,
        sys: {country},
        timezone,
      } = data;
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
      };
      return WEATHER_DATA;
    } catch (e) {
      console.warn(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        setIsFetching(true);
        try {
          var updatedRecentlySearchedPlaces = [];
          for (let i = 0; i < recentlySearchedPlaces.length; i++) {
            if (!utils.isDataExpired(recentlySearchedPlaces[i].createdAt))
              updatedRecentlySearchedPlaces.push(recentlySearchedPlaces[i]);
            else {
              const data = await fetchFromApi(
                recentlySearchedPlaces[i].placeName,
              );
              updatedRecentlySearchedPlaces.push(data);
            }
          }
          dispatch(
            replaceMultipleExistingPlaces(updatedRecentlySearchedPlaces),
          );
          setIsFetching(false);
          return function cleanup() {
            setIsFetching(true);
            console.warn('unmounted');
          };
        } catch (e) {
          console.warn(e);
        }
      };

      getData();
    }, []),
  );

  return (
    <ImageBackground style={{height: '100%'}} source={backgroundImage}>
      <View style={[styles.container, landscape ? {maxWidth: '95%'} : {}]}>
        <Header
          backgroundColor="white"
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          centerComponent={headerCenterComponent}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
        />
        {isFetching ? (
          <LoadingComponent />
        ) : (
          <View style={{flex: 12, marginHorizontal: 16}}>
            {recentlySearchedPlaces.length > 0 && (
              <View style={styles.itemRemoveContainer}>
                <Text style={styles.itemCountText}>
                  {recentlySearchedPlaces.length} City added as favourite
                </Text>
                <TouchableOpacity onPress={deleteAll}>
                  <Text style={styles.removeAllText}>Remove All</Text>
                </TouchableOpacity>
              </View>
            )}
            <FlatList
              data={recentlySearchedPlaces}
              keyExtractor={item => item.placeName}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={({item}) => (
                <Card item={item} onClick={clickOnCard} />
              )}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000000',
    height: '100%',
  },
  headerLeftIcon: {height: 18, width: 18},
  headerCenterComponent: {
    marginLeft: 34,
    color: '#292F33',
    fontFamily: 'Roboto',
    fontSize: 20,
    fontWeight: '500',
    textShadowColor: '#00000015',
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 1,
  },
  headerRightIcon: {height: 18, width: 18},
  itemRemoveContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    marginBottom: 23,
  },
  itemCountText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 13,
  },
  removeAllText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '500',
  },
});
