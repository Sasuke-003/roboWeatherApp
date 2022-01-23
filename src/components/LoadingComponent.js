import React from 'react';
import {StyleSheet, View, ActivityIndicator} from 'react-native';

const LoadingComponent = () => (
  <View style={styles.container}>
    <ActivityIndicator color="black" />
  </View>
);

export default LoadingComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'transparent',
  },
});
