import {api} from '../server';
import {convertLatinToEng} from './string';

export const getWeatherIconLink = (iconName = '01d') => {
  return `https://openweathermap.org/img/wn/${iconName}@4x.png`;
};

export const fetchValidWeatherData = async SEARCH_STRING => {
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
      placeName: convertLatinToEng(name),
      country,
      createdAt: new Date(),
      timezone,
    };
    return WEATHER_DATA;
  } catch (e) {
    console.warn(e);
  }
};
