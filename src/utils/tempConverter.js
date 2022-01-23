export const kelvinToCelsius = temp => {
  return ~~(parseInt(temp) - 273.15);
};
export const kelvinToFahrenheit = temp => {
  const tempCelsius = parseInt(temp) - 273.15;
  return ~~(tempCelsius * (9 / 5) + 32);
};
