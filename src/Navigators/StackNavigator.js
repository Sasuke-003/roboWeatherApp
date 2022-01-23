import React, {useState, useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NAVIGATION_ROUTES} from '../constants';
import {DrawerNavigator} from '.';
import {SplashScreen, Search} from '../screens';

const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATION_ROUTES.MAIN}>
      <Stack.Screen name={NAVIGATION_ROUTES.SPLASH} component={SplashScreen} />
      <Stack.Screen name={NAVIGATION_ROUTES.SEARCH} component={Search} />
      <Stack.Screen
        name={NAVIGATION_ROUTES.MAIN}
        initialParams={{WEATHER_DATA: null}}
        component={DrawerNavigator}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
