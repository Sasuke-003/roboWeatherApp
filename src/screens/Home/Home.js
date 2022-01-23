import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {DateDisplay, LoadingComponent} from '../../components';
import MenuIcon from '../../assets/images/menu_icon.png';
import SearchIcon from '../../assets/images/search_icon.png';
import Logo from '../../assets/images/logo.png';
import FavIcon from '../../assets/images/icon_favourite.png';
import FavActiveIcon from '../../assets/images/icon_favourite_active.png';
import backgroundImage from '../../assets/images/background.png';

import TempDetails from './TempDetails';
import WeatherInfo from './WeatherInfo';

import {Header} from '../../components';
import {utils} from '../../utils';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {
  addFavPlace,
  checkIsFavPlace,
  getAllPlaces,
} from '../../redux/reducers/placeReducer';

import {
  setCurrentPlace,
  getCurrentPlace,
} from '../../redux/reducers/currentPlaceReducer';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={MenuIcon} />
);

const headerCenterComponent = () => (
  <Image style={styles.headerCenterComponent} source={Logo} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={SearchIcon} />
);

const datePlaceFavComps = (
  timeZone,
  placeName,
  country,
  isFavourite,
  addToFavPlace,
) => (
  <View style={styles.datePlaceFavContainer}>
    <DateDisplay options={{}} textStyle={styles.dateText} timeZone={timeZone} />
    <Text style={styles.place}>
      {placeName}, {country}
    </Text>
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity
        onPress={!isFavourite ? () => addToFavPlace() : () => {}}>
        <Image
          source={isFavourite ? FavActiveIcon : FavIcon}
          style={styles.favIcon}
        />
      </TouchableOpacity>
      <Text style={styles.addToFavText}>Add to favourite</Text>
    </View>
  </View>
);

const Home = ({goToSearch, WEATHER_DATA}) => {
  const [tempUnit, setTempUnit] = useState('celsius');
  const [weatherData, setWeatherData] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentPlace = useSelector(getCurrentPlace);
  const allPlaces = useSelector(getAllPlaces);
  const isFavourite = useSelector(state =>
    checkIsFavPlace(
      state,
      currentPlace.length === 1
        ? currentPlace[0].placeName
        : weatherData.placeName,
    ),
  );
  const addToFavPlace = () => {
    if (currentPlace.length === 1)
      dispatch(addFavPlace({...currentPlace[0], isFav: true}));
    else dispatch(addFavPlace({...weatherData, isFav: true}));
  };

  const headerLeftIconOnPress = () => {
    navigation.openDrawer();
  };

  const headerRightIconOnPress = () => {
    goToSearch();
  };

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        setIsFetching(true);
        try {
          const data = await utils.getCurrentLocData();
          setWeatherData(data);
          setIsFetching(false);
          return;
        } catch (e) {
          console.warn(e.message);
        }
      };

      getData();
    }, []),
  );

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       if (WEATHER_DATA) {
  //         setWeatherData(WEATHER_DATA);
  //         setIsFetching(false);
  //         return;
  //       }
  //       const data = await utils.getCurrentLocData();
  //       setWeatherData(data);
  //       setIsFetching(false);
  //       return;
  //     } catch (e) {
  //       console.warn(e.message);
  //     }
  //   };

  //   getData();
  // }, []);

  return (
    <ImageBackground style={{height: '100%'}} source={backgroundImage}>
      <View style={styles.container}>
        <Header
          leftIcon={headerLeftIcon}
          leftIconOnPress={headerLeftIconOnPress}
          centerComponent={headerCenterComponent}
          rightIcon={headerRightIcon}
          rightIconOnPress={headerRightIconOnPress}
        />
        <View style={styles.topContainer}>
          {isFetching ? (
            <LoadingComponent />
          ) : (
            <>
              {datePlaceFavComps(
                currentPlace.length === 1
                  ? currentPlace[0].timezone
                  : weatherData.timezone,
                currentPlace.length === 1
                  ? currentPlace[0].placeName
                  : weatherData.placeName,
                currentPlace.length === 1
                  ? currentPlace[0].country
                  : weatherData.country,
                isFavourite,
                addToFavPlace,
              )}
              <TempDetails
                iconName={
                  currentPlace.length === 1
                    ? currentPlace[0].icon
                    : weatherData.icon
                }
                tempKelvin={
                  currentPlace.length === 1
                    ? currentPlace[0].temp
                    : weatherData.temp
                }
                tempUnit={tempUnit}
                setTempUnit={setTempUnit}
                mainDesc={
                  currentPlace.length === 1
                    ? currentPlace[0].name
                    : weatherData.name
                }
              />
            </>
          )}
        </View>
        <View style={styles.bottomContainer}>
          {isFetching ? <LoadingComponent /> : <WeatherInfo {...weatherData} />}
        </View>
      </View>
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent', flex: 1},
  headerLeftIcon: {height: 12, width: 18},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 18, width: 18},
  topContainer: {
    flex: 10,
  },

  bottomContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderColor: '#FFFFFF90',
    backgroundColor: '#FFFFFF20',
    paddingBottom: 5,
  },
  datePlaceFavContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  dateText: {
    opacity: 0.6,
    color: '#FFFFFF',
    fontFamily: 'Roboto-Regular',
    fontSize: 13,
    letterSpacing: 1.5,
  },
  place: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    letterSpacing: 0,
    lineHeight: 21,
    marginTop: 10,
    marginBottom: 23,
  },
  favIcon: {
    height: 18,
    width: 19,
  },
  addToFavText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 13,
    fontWeight: '500',
    marginLeft: 7,
  },
});
