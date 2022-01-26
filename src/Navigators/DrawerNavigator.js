import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {NAVIGATION_ROUTES} from '../constants';
import {Home, Search, Favourite, RecentSearch} from '../screens';

const Drawer = createDrawerNavigator();

const screenOptions = {
  headerShown: false,
};

const DrawerNavigator = ({navigation}) => {
  const goToSearch = () => {
    navigation.navigate(NAVIGATION_ROUTES.SEARCH);
  };

  const goBack = () => {
    navigation.navigate(NAVIGATION_ROUTES.HOME);
  };

  // const goToSearch = () => {
  //   navigation.navigate(NAVIGATION_ROUTES.SEARCH);
  // };

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATION_ROUTES.FAVOURITE}>
      <Drawer.Screen
        name={NAVIGATION_ROUTES.HOME}
        children={() => <Home goToSearch={goToSearch} />}
      />
      <Drawer.Screen
        name={NAVIGATION_ROUTES.RECENT_SEARCH}
        children={() => (
          <RecentSearch goToSearch={goToSearch} goBack={goBack} />
        )}
      />
      <Drawer.Screen
        name={NAVIGATION_ROUTES.FAVOURITE}
        children={() => <Favourite goToSearch={goToSearch} goBack={goBack} />}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
