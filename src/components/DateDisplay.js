import {StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';

// new Date().toUTCString()

function calcTime(offset) {
  // create Date object for current location
  d = new Date();

  // convert to msec
  // add local time zone offset
  // get UTC time in msec
  utc = d.getTime() + d.getTimezoneOffset() * 60000;

  // create new Date object for different city
  // using supplied offset
  nd = new Date(utc + 3600000 * offset);

  // return time as a string
  return nd;
}

const lang = 'en-US';

const DateDisplay = ({
  options: {
    weekday = 'short',
    year = 'numeric',
    month = 'short',
    hour = 'numeric',
    minute = 'numeric',
  },
  textStyle,
  timeZone,
}) => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  useEffect(() => {
    const timer = setInterval(() => {
      const today = calcTime(timeZone / 3600);
      // const today = new Date();
      const Weekday = today.toLocaleDateString(lang, {weekday});
      const Day = today.getDate(lang);
      const MonthYear = today.toLocaleDateString(lang, {month, year});
      const HourMinute = today.toLocaleTimeString(lang, {hour, minute});
      setDate(`${Weekday}, ${Day} ${MonthYear}`.toUpperCase());
      setTime(HourMinute);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Text style={textStyle}>
      {date}
      {'     '}
      {time}
    </Text>
  );
};

export default DateDisplay;

const styles = StyleSheet.create({});
