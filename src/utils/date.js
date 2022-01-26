import AsyncStorage from '@react-native-async-storage/async-storage';

const DataExpiryTime = 30; /// in minutes

export const isDataExpired = createdAt => {
  var startTime = new Date(createdAt);
  var endTime = new Date();
  var difference = endTime.getTime() - startTime.getTime(); // in milliseconds
  var resultInMinutes = Math.round(difference / 60000); // convert to seconds
  return resultInMinutes > DataExpiryTime ? true : false;
};
