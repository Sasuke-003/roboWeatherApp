import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Home, Search, Favourite, RecentSearch} from './screens';
import {CustomDrawer} from './components';

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <NavigationContainer
      initialRouteName="Home"
      drawerContent={props => (
        <CustomDrawer {...props} userName={route.params.userName} />
      )}
      screenOptions={{
        drawerType: 'back',
        activeTintColor: 'black',
        itemStyle: {marginVertical: 5},
        drawerLabelStyle: {marginLeft: -10, fontWeight: '700', fontSize: 16},
        drawerActiveBackgroundColor: '#1d3557',
        drawerActiveTintColor: '#f1faee',
        drawerInactiveTintColor: '#1d3557',
      }}>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="RecentSearch" component={RecentSearch} />
        <Drawer.Screen name="Favourite" component={Favourite} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
