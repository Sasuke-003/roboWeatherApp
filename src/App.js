import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {StackNavigator} from './Navigators';
import backgroundImage from './assets/images/background.png';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
    primary: 'black',
    text: 'grey',
  },
};

const App = () => {
  return (
    <ImageBackground style={{height: '100%'}} source={backgroundImage}>
      <NavigationContainer theme={MyTheme}>
        <StackNavigator />
      </NavigationContainer>
    </ImageBackground>
  );
};

export default App;
