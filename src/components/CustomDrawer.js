import React from 'react';
import {StyleSheet, Text, View, ImageBackground, Image} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {SafeAreaView} from 'react-native-safe-area-context';

const drawerHeader = userName => (
  <View style={styles.menuHeader}>
    <ImageBackground
      source={{
        uri: 'https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      }}
      resizeMode="cover"
      style={styles.headerImage}>
      <Image
        style={styles.profileImage}
        source={{
          uri: 'https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1085&q=80',
        }}
      />
      <View style={{marginLeft: 20}}>
        <Text
          style={{
            color: 'white',
            fontSize: 18,
            // fontWeight: 'bold',
          }}>
          Hello
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
          }}>
          {userName}
        </Text>
      </View>
    </ImageBackground>
  </View>
);

const CustomDrawer = props => {
  const {userName} = props;
  return (
    <SafeAreaView style={styles.container}>
      {drawerHeader(userName)}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
  },
  menuHeader: {
    height: 150,
    backgroundColor: '#fff',
  },
  headerImage: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 500,
  },
});
