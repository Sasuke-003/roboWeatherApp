import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {getFavPlaces} from '../redux/reducers/placeReducer';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
const Favourite = () => {
  const favPlaces = useSelector(getFavPlaces);
  // const [temp, setTemp] = useState({});

  // useFocusEffect(
  //   React.useCallback(() => {
  //     const getData = async () => {
  //       try {
  //         setTemp(currentPlace);
  //       } catch (e) {
  //         console.warn(e.message);
  //       }
  //     };

  //     getData();
  //   }, []),
  // );

  return (
    <View style={styles.container}>
      {favPlaces.map(({placeName}) => (
        <Text key={placeName}>{placeName}</Text>
      ))}
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({
  container: {backgroundColor: '#00000000', paddingTop: 50},
});
