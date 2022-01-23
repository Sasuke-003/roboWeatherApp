import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {utils} from '../../utils';
import React from 'react';

const hitSlop = {top: 10, bottom: 10, left: 10, right: 10};

const TempDetails = ({
  iconName,
  tempKelvin,
  tempUnit,
  setTempUnit,
  mainDesc,
}) => {
  return (
    <View style={styles.weatherDetailContainer}>
      <Image
        style={styles.weatherIcon}
        source={{uri: utils.getWeatherIconLink(iconName)}}
      />
      <View style={styles.tempContainer}>
        <Text style={styles.tempText}>
          {tempUnit === 'celsius'
            ? utils.kelvinToCelsius(tempKelvin)
            : utils.kelvinToFahrenheit(tempKelvin)}
        </Text>
        <View style={styles.buttonContainer}>
          <View
            style={[
              styles.btn,
              tempUnit === 'celsius' ? styles.activeBtn : null,
            ]}>
            <Text
              style={[
                styles.degreeText,
                tempUnit === 'celsius' ? styles.degreeTextActive : null,
              ]}>
              o
            </Text>
            <TouchableOpacity
              onPress={() => setTempUnit('celsius')}
              hitSlop={hitSlop}>
              <Text
                style={[
                  styles.tempBtnText,
                  tempUnit === 'celsius' ? styles.tempBtnTextActive : null,
                ]}>
                C
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.btn,
              tempUnit === 'fahrenheit' ? styles.activeBtn : null,
            ]}>
            <Text
              style={[
                styles.degreeText,
                tempUnit === 'fahrenheit' ? styles.degreeTextActive : null,
              ]}>
              o
            </Text>
            <TouchableOpacity
              onPress={() => setTempUnit('fahrenheit')}
              hitSlop={hitSlop}>
              <Text
                style={[
                  styles.tempBtnText,
                  tempUnit === 'fahrenheit' ? styles.tempBtnTextActive : null,
                ]}>
                F
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Text style={styles.mainDesc}>{mainDesc}</Text>
    </View>
  );
};

export default TempDetails;

const styles = StyleSheet.create({
  weatherIcon: {height: 150, width: 200},
  weatherDetailContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tempContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  tempText: {
    color: '#FFFFFF',
    fontFamily: 'Roboto-Medium',
    fontSize: 56,
    fontWeight: '500',
    letterSpacing: 0,
    marginRight: 15,
    // borderWidth: 1,
  },
  buttonContainer: {
    height: 30,
    width: 55,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: 'white',
    marginBottom: 13,
  },
  btn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
  },
  activeBtn: {
    backgroundColor: 'white',
  },
  tempBtnText: {
    fontSize: 16,
    marginTop: 5,
    fontFamily: 'Roboto',
    color: 'white',
  },
  tempBtnTextActive: {
    color: '#E32843',
  },
  degreeText: {
    fontSize: 10,
    position: 'absolute',
    top: 0,
    left: '10%',
    color: 'white',
  },
  degreeTextActive: {
    color: '#E32843',
  },
  mainDesc: {
    color: '#FFFFFF',
    fontFamily: 'Roboto',
    fontSize: 18,
    marginTop: 11,
  },
});
