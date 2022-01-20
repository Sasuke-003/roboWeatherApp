import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import MenuIcon from '../assets/images/menu_icon.png';
import SearchIcon from '../assets/images/search_icon.png';
import Logo from '../assets/images/logo.png';
import {Header} from '../components';
import {NAVIGATION_ROUTES} from '../constants';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={MenuIcon} />
);

const headerCenterComponent = () => (
  <Image style={styles.headerCenterComponent} source={Logo} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={SearchIcon} />
);

const Home = ({navigation}) => {
  const headerLeftIconOnPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const headerRightIconOnPress = () => {
    navigation.navigate(NAVIGATION_ROUTES.SEARCH);
  };

  return (
    <View style={styles.container}>
      <Header
        leftIcon={headerLeftIcon}
        leftIconOnPress={headerLeftIconOnPress}
        centerComponent={headerCenterComponent}
        rightIcon={headerRightIcon}
        rightIconOnPress={headerRightIconOnPress}
      />
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {backgroundColor: 'transparent'},
  headerLeftIcon: {height: 12, width: 18},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 18, width: 18},
});
