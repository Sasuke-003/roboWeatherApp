import {getWeatherIconLink} from './weatherIcon';
import {kelvinToCelsius, kelvinToFahrenheit} from './tempConverter';
import {getCurrentLocData, isDataExpired} from './asyncStorage';
export const utils = {
  getWeatherIconLink,
  kelvinToCelsius,
  kelvinToFahrenheit,
  getCurrentLocData,
  isDataExpired,
};
