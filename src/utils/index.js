import {getWeatherIconLink, fetchValidWeatherData} from './weather';
import {kelvinToCelsius, kelvinToFahrenheit} from './tempConverter';
import {isDataExpired} from './date';
import {getCurrentLatLon} from './Location';
import {convertLatinToEng} from './string';

export const utils = {
  getWeatherIconLink,
  kelvinToCelsius,
  kelvinToFahrenheit,
  isDataExpired,
  getCurrentLatLon,
  convertLatinToEng,
  fetchValidWeatherData,
};
