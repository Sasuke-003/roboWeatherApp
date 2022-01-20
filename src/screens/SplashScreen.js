import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NAVIGATION_ROUTES} from '../constants';

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
    <View style={styles.container}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#1d3557'}}>
        Splash
      </Text>
    </View>
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
