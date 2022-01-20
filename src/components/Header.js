import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import React from 'react';

const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

const Header = ({
  backgroundColor = 'transparent',
  leftIcon = null,
  leftIconOnPress = null,
  centerComponent = null,
  rightIcon = null,
  rightIconOnPress = null,
}) => {
  return (
    <View style={{...styles.container, backgroundColor: backgroundColor}}>
      <TouchableOpacity hitSlop={hitSlop} onPress={leftIconOnPress}>
        {leftIcon()}
      </TouchableOpacity>
      {centerComponent()}
      <TouchableOpacity
        hitSlop={hitSlop}
        onPress={rightIconOnPress}
        style={styles.rightIcon}>
        {rightIcon()}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: (Platform.OS === 'ios' ? 30 : 0) + 5,
    height: 56,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  rightIcon: {
    position: 'absolute',
    right: 16,
  },
});
