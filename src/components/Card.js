import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Touchable,
} from 'react-native';
import {utils} from '../utils';
import FavIcon from '../assets/images/icon_favourite.png';
import FavActiveIcon from '../assets/images/icon_favourite_active.png';
import React from 'react';

const Card = ({item, onClick = null}) => {
  return (
    <TouchableOpacity onPress={onClick !== null ? () => onClick(item) : null}>
      <View style={styles.card}>
        <View style={styles.weatherDetailContainer}>
          <Text style={styles.placeName}>
            {item.placeName}, {item.country},{' '}
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-end',
              marginTop: 10,
            }}>
            <Image
              style={styles.weatherIcon}
              source={{uri: utils.getWeatherIconLink(item.icon)}}
            />
            <Text style={styles.temp}>
              {utils.kelvinToCelsius(item.temp)}°c
            </Text>

            <Text style={styles.name}>{item.name}</Text>
          </View>
        </View>
        <View style={styles.isFavContainer}>
          <Image
            style={styles.favIcon}
            source={item.isFav ? FavActiveIcon : FavIcon}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
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
