import {axiosInstance, apiKey} from '../axiosInstance';
import axios from 'axios';

export const weather = {
  getDataUsingLatLon: async (lat, lon) => {
    const url = `?lat=${lat}&lon=${lon}&appid=${apiKey}`;
    return await axiosInstance.get(url);
  },
  getDataUsingCityName: async cityName => {
    const url = `?q=${cityName}&lang=en&appid=${apiKey}`;
    // const url = `https://api.openweathermap.org/data/2.5/weather?q=puttur&appid=17404e911ee3942aa04aedead3b3eded`;
    return await axiosInstance.get(url);
  },
};
