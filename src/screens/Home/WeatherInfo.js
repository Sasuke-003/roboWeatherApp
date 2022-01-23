import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import HumidityIcon from '../../assets/images/icon_humidity_info.png';
import WindIcon from '../../assets/images/icon_wind_info.png';
import VisibilityIcon from '../../assets/images/icon_visibility_info.png';
import TempIcon from '../../assets/images/icon_temperature_info.png';
import React from 'react';
import {utils} from '../../utils';

const weatherInfoCard = ({
  item: {name, value, icon, iconHeight, iconWidth},
}) => (
  <View style={styles.infoCard}>
    <Image source={icon} style={{height: iconHeight, width: iconWidth}} />
    <View style={styles.infoContainer}>
      <Text style={styles.infoName}>{name}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);
const WeatherInfo = ({temp_min, temp_max, humidity, visibility, windSpeed}) => {
  const weatherInfo = [
    {
      name: 'Min - Max',
      value: `${utils.kelvinToCelsius(temp_min)}°-${utils.kelvinToCelsius(
        temp_max,
      )}°`,
      icon: TempIcon,
      iconHeight: 35,
      iconWidth: 19,
    },
    {
      name: 'Humidity',
      value: humidity,
      icon: HumidityIcon,
      iconHeight: 35,
      iconWidth: 26,
    },
    {
      name: 'Wind Speed',
      value: windSpeed,
      icon: WindIcon,
      iconHeight: 30,
      iconWidth: 40,
    },
    {
      name: 'Visibility',
      value: visibility,
      icon: VisibilityIcon,
      iconHeight: 25,
      iconWidth: 40,
    },
  ];

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={weatherInfo}
      renderItem={weatherInfoCard}
      ListFooterComponent={() => <View style={{marginLeft: 30}}></View>}
    />
  );
};

export default WeatherInfo;

const styles = StyleSheet.create({
  infoCard: {
    flexDirection: 'row',
    marginLeft: 35,
    // borderWidth: 1,
    alignItems: 'center',
  },
  infoContainer: {
    marginLeft: 18,
  },
  infoName: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  infoValue: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 21,
    fontWeight: '500',
    marginTop: 5,
  },
});
