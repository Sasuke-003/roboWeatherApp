import axios from 'axios';

export const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
export const apiKey = '17404e911ee3942aa04aedead3b3eded';

export const axiosInstance = axios.create({baseURL});
