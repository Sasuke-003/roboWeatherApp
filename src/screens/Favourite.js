import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Alert,
  Dimensions,
  Animated,
  TouchableHighlight,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {
  getFavPlaces,
  deleteAllFavPlaces,
  replaceMultipleExistingPlaces,
  deleteFavPlace,
} from '../redux/reducers/placeReducer';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import BackIcon from '../assets/images/back_icon.png';
import SearchBlack from '../assets/images/search_black.png';
import backgroundImage from '../assets/images/background.png';
import FavIcon from '../assets/images/icon_favourite.png';
import EmptyIcon from '../assets/images/icon_nothing.png';
import FavActiveIcon from '../assets/images/icon_favourite_active.png';
import {NAVIGATION_ROUTES} from '../constants';
import {Header, LoadingComponent, Card} from '../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {utils} from '../utils';
import {SwipeListView} from 'react-native-swipe-list-view';
import {api} from '../server';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {
  setCurrentPlace,
  deleteCurrentPlace,
} from '../redux/reducers/currentPlaceReducer';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={BackIcon} />
);

const headerCenterComponent = () => (
  <Text style={styles.headerCenterComponent}>Favourite</Text>
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={SearchBlack} />
);

const ListEmptyComponent = () => (
  <View
    style={{
      height: '400%',
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
      No favourites added
    </Text>
  </View>
);

const Delete = ({placeName}) => {
  useEffect(() => {}, []);

  return <View></View>;
};

const Favourite = ({navigation, goToSearch, goBack}) => {
  const [isFetching, setIsFetching] = useState(true);
  const favPlaces = useSelector(getFavPlaces);
  const dispatch = useDispatch();
  const {landscape} = useDeviceOrientation();
  const headerLeftIconOnPress = () => {
    goBack();
  };

  const headerRightIconOnPress = () => {
    goToSearch();
  };

  const deleteAll = () => {
    Alert.alert('', 'Are you Sure you want to remove all favourites?', [
      {text: 'No', style: 'No', onPress: () => {}},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => dispatch(deleteAllFavPlaces()),
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
          var updatedFavPlaces = [];
          for (let i = 0; i < favPlaces.length; i++) {
            if (!utils.isDataExpired(favPlaces[i].createdAt))
              updatedFavPlaces.push(favPlaces[i]);
            else {
              const data = await fetchFromApi(favPlaces[i].placeName);
              updatedFavPlaces.push(data);
            }
          }
          dispatch(replaceMultipleExistingPlaces(updatedFavPlaces));
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

  const rowTranslateAnimatedValues = useRef(new Animated.Value(1)).current;

  const onSwipeValueChange = swipeData => {
    const {key, value} = swipeData;
    // console.log(key, value);

    if (value < -Dimensions.get('window').width && !this.animationIsRunning) {
      this.animationIsRunning = true;
      Animated.timing(rowTranslateAnimatedValues, {
        toValue: 0,
        duration: 200,
      }).start(async () => {
        console.log('Favorite Deleted');
        dispatch(deleteFavPlace(key));
        this.animationIsRunning = false;
      });
    }
  };

  const renderItem = ({item}) => (
    <Animated.View>
      <TouchableHighlight underlayColor={'transparent'}>
        <View>
          <Card item={item} />
        </View>
      </TouchableHighlight>
    </Animated.View>
  );

  const renderHiddenItem = () => <View></View>;

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
          <View
            style={{
              flex: 12,
              marginHorizontal: 16,
            }}>
            {favPlaces.length > 0 && (
              <View style={styles.itemRemoveContainer}>
                <Text style={styles.itemCountText}>
                  {favPlaces.length} City added as favourite
                </Text>
                <TouchableOpacity onPress={deleteAll}>
                  <Text style={styles.removeAllText}>Remove All</Text>
                </TouchableOpacity>
              </View>
            )}
            <SwipeListView
              data={favPlaces}
              keyExtractor={item => item.placeName}
              ListEmptyComponent={ListEmptyComponent}
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
              rightOpenValue={-Dimensions.get('window').width}
              onSwipeValueChange={onSwipeValueChange}
              useNativeDriver={true}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default Favourite;

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
  card: {
    backgroundColor: '#FFFFFF20',
    height: 80,
    marginBottom: 2,
    flexDirection: 'row',
    padding: 15,
  },
  weatherDetailContainer: {
    flex: 8,
  },
  isFavContainer: {
    flex: 2,
  },
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
  placeName: {
    color: '#FFE539',
    fontFamily: 'Roboto',
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 5,
  },
  weatherIcon: {
    width: 45,
    height: 32.5,
  },
  temp: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 18,
    fontWeight: '500',
    marginLeft: 8,
    marginBottom: 5,
  },
  name: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 14,
    marginLeft: 17,
    marginBottom: 5,
  },
  isFavContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  favIcon: {
    height: 17,
    width: 18,
  },
});

// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   ImageBackground,
//   Alert,
// } from 'react-native';
// import React, {useState, useEffect} from 'react';
// import {
//   getFavPlaces,
//   deleteAllFavPlaces,
//   replaceMultipleExistingPlaces,
//   deleteFavPlace,
// } from '../redux/reducers/placeReducer';
// import {useDispatch, useSelector, shallowEqual} from 'react-redux';
// import {useFocusEffect} from '@react-navigation/native';
// import BackIcon from '../assets/images/back_icon.png';
// import ClearIcon from '../assets/images/clear_icon.png';
// import backgroundImage from '../assets/images/background.png';
// import FavIcon from '../assets/images/icon_favourite.png';
// import EmptyIcon from '../assets/images/icon_nothing.png';
// import FavActiveIcon from '../assets/images/icon_favourite_active.png';
// import {NAVIGATION_ROUTES} from '../constants';
// import {Header, LoadingComponent, Card} from '../components';
// import {TouchableOpacity} from 'react-native-gesture-handler';
// import {utils} from '../utils';
// import {SwipeListView} from 'react-native-swipe-list-view';
// import {api} from '../server';
// import {
//   setCurrentPlace,
//   deleteCurrentPlace,
// } from '../redux/reducers/currentPlaceReducer';
// import {
//   SwipeableFlatList,
//   SwipeableQuickActionButton,
//   SwipeableQuickActions,
// } from 'react-native-swipe-list';

// const headerLeftIcon = () => (
//   <Image style={styles.headerLeftIcon} source={BackIcon} />
// );

// const headerCenterComponent = () => (
//   <Text style={styles.headerCenterComponent}>Favourite</Text>
// );

// const headerRightIcon = () => (
//   <Image style={styles.headerRightIcon} source={ClearIcon} />
// );

// const ListEmptyComponent = () => (
//   <View
//     style={{
//       height: '400%',
//       justifyContent: 'center',
//       alignItems: 'center',
//     }}>
//     <Image source={EmptyIcon} style={{height: 100, resizeMode: 'contain'}} />
//     <Text
//       style={{
//         color: '#FFFFFF',
//         fontFamily: 'Roboto',
//         fontSize: 18,
//         marginTop: 25,
//       }}>
//       No favourites added
//     </Text>
//   </View>
// );

// const Delete = ({placeName}) => {
//   useEffect(() => {}, []);

//   return <View></View>;
// };

// const Favourite = ({navigation, goToSearch, goBack}) => {
//   const [isFetching, setIsFetching] = useState(true);
//   const favPlaces = useSelector(getFavPlaces);
//   const dispatch = useDispatch();
//   const headerLeftIconOnPress = () => {
//     // navigation.navigate(NAVIGATION_ROUTES.HOME);
//     goBack();
//   };

//   const headerRightIconOnPress = () => {
//     goToSearch();
//   };

//   const deleteAll = () => {
//     Alert.alert('', 'Are you Sure you want to remove all favourites?', [
//       {text: 'No', style: 'No', onPress: () => {}},
//       {
//         text: 'Yes',
//         style: 'destructive',
//         onPress: () => dispatch(deleteAllFavPlaces()),
//       },
//     ]);
//   };

//   const fetchFromApi = async SEARCH_STRING => {
//     try {
//       const {data} = await api.weather.getDataUsingCityName(SEARCH_STRING);
//       const {
//         weather,
//         main: {temp, temp_min, temp_max, humidity},
//         visibility,
//         wind: {speed},
//         name,
//         sys: {country},
//         timezone,
//       } = data;
//       const WEATHER_DATA = {
//         temp,
//         temp_min,
//         temp_max,
//         humidity,
//         visibility,
//         windSpeed: speed,
//         name: weather[0].main,
//         icon: weather[0].icon,
//         placeName: utils.convertLatinToEng(name),
//         country,
//         createdAt: new Date(),
//         timezone,
//       };
//       return WEATHER_DATA;
//     } catch (e) {
//       console.warn(e);
//     }
//   };

//   useFocusEffect(
//     React.useCallback(() => {
//       const getData = async () => {
//         setIsFetching(true);
//         try {
//           var updatedFavPlaces = [];
//           for (let i = 0; i < favPlaces.length; i++) {
//             if (!utils.isDataExpired(favPlaces[i].createdAt))
//               updatedFavPlaces.push(favPlaces[i]);
//             else {
//               const data = await fetchFromApi(favPlaces[i].placeName);
//               updatedFavPlaces.push(data);
//             }
//           }
//           dispatch(replaceMultipleExistingPlaces(updatedFavPlaces));
//           setIsFetching(false);
//           return function cleanup() {
//             setIsFetching(true);
//             console.warn('unmounted');
//           };
//         } catch (e) {
//           console.warn(e);
//         }
//       };

//       getData();
//     }, []),
//   );

//   return (
//     <ImageBackground style={{height: '100%'}} source={backgroundImage}>
//       <View style={styles.container}>
//         <Header
//           backgroundColor="white"
//           leftIcon={headerLeftIcon}
//           leftIconOnPress={headerLeftIconOnPress}
//           centerComponent={headerCenterComponent}
//           rightIcon={headerRightIcon}
//           rightIconOnPress={headerRightIconOnPress}
//         />
//         {isFetching ? (
//           <LoadingComponent />
//         ) : (
//           <View style={{flex: 12, marginHorizontal: 16}}>
//             {favPlaces.length > 0 && (
//               <View style={styles.itemRemoveContainer}>
//                 <Text style={styles.itemCountText}>
//                   {favPlaces.length} City added as favourite
//                 </Text>
//                 <TouchableOpacity onPress={deleteAll}>
//                   <Text style={styles.removeAllText}>Remove All</Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             <SwipeListView
//               data={favPlaces}
//               keyExtractor={item => item.placeName}
//               ListEmptyComponent={ListEmptyComponent}
//               rightOpenValue={-20000}
//               rightActivationValue={75}
//               onRightAction={rowKey => {
//                 dispatch(deleteFavPlace(rowKey));
//               }}
//               renderHiddenItem={({item}) => (
//                 <Delete placeName={item.placeName} />
//               )}
//               renderItem={({item}) => <Card item={item} />}
//             />
//           </View>
//         )}
//       </View>
//     </ImageBackground>
//   );
// };

// export default Favourite;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#00000000',
//     height: '100%',
//   },
//   headerLeftIcon: {height: 18, width: 18},
//   headerCenterComponent: {
//     marginLeft: 34,
//     color: '#292F33',
//     fontFamily: 'Roboto',
//     fontSize: 20,
//     fontWeight: '500',
//     textShadowColor: '#00000015',
//     textShadowOffset: {width: 2, height: 2},
//     textShadowRadius: 1,
//   },
//   headerRightIcon: {height: 18, width: 18},
//   card: {
//     backgroundColor: '#FFFFFF20',
//     height: 80,
//     marginBottom: 2,
//     flexDirection: 'row',
//     padding: 15,
//   },
//   weatherDetailContainer: {
//     flex: 8,
//   },
//   isFavContainer: {
//     flex: 2,
//   },
//   itemRemoveContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//     marginBottom: 23,
//   },
//   itemCountText: {
//     color: '#FFFFFF',
//     fontFamily: 'Roboto',
//     fontSize: 13,
//   },
//   removeAllText: {
//     color: '#FFFFFF',
//     fontFamily: 'Roboto',
//     fontSize: 13,
//     fontWeight: '500',
//   },
//   placeName: {
//     color: '#FFE539',
//     fontFamily: 'Roboto',
//     fontSize: 15,
//     fontWeight: '500',
//     marginLeft: 5,
//   },
//   weatherIcon: {
//     width: 45,
//     height: 32.5,
//   },
//   temp: {
//     color: '#FFFFFF',
//     fontFamily: 'Roboto',
//     fontSize: 18,
//     fontWeight: '500',
//     marginLeft: 8,
//     marginBottom: 5,
//   },
//   name: {
//     color: '#FFFFFF',
//     fontFamily: 'Roboto',
//     fontSize: 14,
//     marginLeft: 17,
//     marginBottom: 5,
//   },
//   isFavContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginRight: 5,
//   },
//   favIcon: {
//     height: 17,
//     width: 18,
//   },
// });
