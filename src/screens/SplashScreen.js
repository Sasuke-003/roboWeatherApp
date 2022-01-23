import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NAVIGATION_ROUTES} from '../constants';
import backgroundImage from '../assets/images/background.png';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    let timer1 = setTimeout(
      () => navigation.replace(NAVIGATION_ROUTES.MAIN),
      3000,
    );

    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <ImageBackground style={{height: '100%'}} source={backgroundImage}>
      <View style={styles.container}>
        <Text style={{fontSize: 18, fontWeight: 'bold', color: '#1d3557'}}>
          Splash
        </Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: '100%',
  },
});
