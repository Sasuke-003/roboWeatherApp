import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import backgroundImage from '../assets/images/background.png';

const RecentSearch = () => {
  return (
    <ImageBackground style={{height: '100%'}} source={backgroundImage}>
      <View style={styles.container}>
        <Text>Recent Search</Text>
      </View>
    </ImageBackground>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({container: {backgroundColor: '#00000000'}});
