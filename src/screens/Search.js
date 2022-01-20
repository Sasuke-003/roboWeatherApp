import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Header} from '../components';
import BackIcon from '../assets/images/back_icon.png';
import ClearIcon from '../assets/images/clear_icon.png';
import Logo from '../assets/images/logo.png';
import {NAVIGATION_ROUTES} from '../constants';

const headerLeftIcon = () => (
  <Image style={styles.headerLeftIcon} source={BackIcon} />
);

const headerCenterComponent = () => (
  <Image style={styles.headerCenterComponent} source={Logo} />
);

const headerRightIcon = () => (
  <Image style={styles.headerRightIcon} source={ClearIcon} />
);

const Search = ({navigation}) => {
  const headerLeftIconOnPress = () => {
    // navigation.navigate(NAVIGATION_ROUTES.HOME);
    navigation.goBack();
  };

  const headerRightIconOnPress = () => {};

  return (
    <View style={styles.container}>
      <Header
        backgroundColor="white"
        leftIcon={headerLeftIcon}
        leftIconOnPress={headerLeftIconOnPress}
        centerComponent={headerCenterComponent}
        rightIcon={headerRightIcon}
        rightIconOnPress={headerRightIconOnPress}
      />
      <Text>Search</Text>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {},
  headerLeftIcon: {height: 12, width: 18},
  headerCenterComponent: {height: 24, width: 113, marginLeft: 32},
  headerRightIcon: {height: 18, width: 18},
});
