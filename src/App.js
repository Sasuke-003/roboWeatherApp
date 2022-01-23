import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {StackNavigator} from './navigators';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/lib/integration/react';
import {store, persistor} from './redux/store';
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
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ImageBackground style={{height: '100%'}} source={backgroundImage}>
          <NavigationContainer theme={MyTheme}>
            <StackNavigator />
          </NavigationContainer>
        </ImageBackground>
      </PersistGate>
    </Provider>
  );
};

export default App;
