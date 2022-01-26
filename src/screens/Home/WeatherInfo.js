import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import HumidityIcon from '../../assets/images/icon_humidity_info.png';
import WindIcon from '../../assets/images/icon_wind_info.png';
import VisibilityIcon from '../../assets/images/icon_visibility_info.png';
import TempIcon from '../../assets/images/icon_temperature_info.png';
import {useDeviceOrientation} from '@react-native-community/hooks';
import React from 'react';
import {utils} from '../../utils';

const weatherInfoCard = (
  {name, value, icon, iconHeight, iconWidth},
  landscape,
) => (
  <View style={styles.infoCard}>
    <Image source={icon} style={{height: iconHeight, width: iconWidth}} />
    <View style={styles.infoContainer}>
      <Text style={[styles.infoName, landscape ? {fontSize: 12} : {}]}>
        {name}
      </Text>
      <Text style={[styles.infoValue, landscape ? {fontSize: 15} : {}]}>
        {value}
      </Text>
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
      iconHeight: 30,
      iconWidth: 15,
    },
    {
      name: 'Humidity',
      value: humidity + '%',
      icon: HumidityIcon,
      iconHeight: 30,
      iconWidth: 23,
    },
    {
      name: 'Wind Speed',
      value: windSpeed + 'm/s',
      icon: WindIcon,
      iconHeight: 25,
      iconWidth: 35,
    },
    {
      name: 'Visibility',
      value: visibility,
      icon: VisibilityIcon,
      iconHeight: 20,
      iconWidth: 33,
    },
  ];
  const {landscape} = useDeviceOrientation();
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={weatherInfo}
      renderItem={({item}) => weatherInfoCard(item, landscape)}
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
