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

  return (
    <Drawer.Navigator
      screenOptions={screenOptions}
      initialRouteName={NAVIGATION_ROUTES.HOME}>
      <Drawer.Screen
        name={NAVIGATION_ROUTES.HOME}
        children={() => <Home goToSearch={goToSearch} />}
      />
      <Drawer.Screen
        name={NAVIGATION_ROUTES.RECENT_SEARCH}
        component={RecentSearch}
      />
      {/* <Drawer.Screen name={NAVIGATION_ROUTES.SEARCH} component={Search} /> */}
      <Drawer.Screen name={NAVIGATION_ROUTES.FAVOURITE} component={Favourite} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
