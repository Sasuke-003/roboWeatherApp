import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';

const CustomDrawer = props => {
  const {userName = 'my name'} = props;
  return (
    <SafeAreaView style={styles.container}>
      <DrawerItemList {...props} />
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
});
