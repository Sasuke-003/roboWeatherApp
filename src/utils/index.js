import {getWeatherIconLink} from './weatherIcon';
import {kelvinToCelsius, kelvinToFahrenheit} from './tempConverter';
import {getCurrentLocData, isDataExpired} from './asyncStorage';
import {getCurrentLatLon} from './Location';
export const utils = {
  getWeatherIconLink,
  kelvinToCelsius,
  kelvinToFahrenheit,
  getCurrentLocData,
  isDataExpired,
  getCurrentLatLon,
};
