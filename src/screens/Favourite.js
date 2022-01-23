import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  setCurrentPlace,
  getCurrentPlace,
} from '../redux/reducers/currentPlaceReducer';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
const Favourite = () => {
  const currentPlace = useSelector(getCurrentPlace);
  const [temp, setTemp] = useState({});

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          setTemp(currentPlace);
        } catch (e) {
          console.warn(e.message);
        }
      };

      getData();
    }, []),
  );

  return (
    <View style={styles.container}>
      {console.log(temp)}
      <Text>Favourite</Text>
    </View>
  );
};

export default Favourite;

const styles = StyleSheet.create({container: {backgroundColor: '#00000000'}});
